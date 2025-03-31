import { Button } from "../../components/ui/button";
import { useContext, useState } from "react";
import html2pdf from "html2pdf.js";
import { toast } from "sonner";
import { ResumeInfoContext } from "../../context/ResumeContext";
import type { AxiosError } from "axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { FaDownload, FaSave } from "react-icons/fa";
import type { User } from "../../types";

const DownloadResume = () => {
	const user: User | null = JSON.parse(localStorage.getItem("user") || "null");
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const context = useContext(ResumeInfoContext);
	if (!context) {
		throw new Error(
			"ResumeInfoContext must be used within a ResumeInfoProvider",
		);
	}
	const [resumeInfo] = context;

	if (!user) {
		navigate("/");
		return null;
	}

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const checktrail = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/api/user/checktrails/resumebuilder`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				},
			);

			if (checktrail.status === 200) {
				const response = await axios.post(
					`${import.meta.env.VITE_BASE_URL}/api/userresume/savemyresume`,
					{
						userId: user?._id,
						resumeInfo,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					},
				);
				toast.success(response.data.message);
				navigate("/resumebuilder");
			} else if (checktrail.status === 400) {
				toast.error(
					"You have exhausted your free trials. Please upgrade to premium to continue.",
				);
				navigate("/pricing");
			}
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>;
			if (axiosError.response?.status === 400) {
				toast.error(
					"You have exhausted your free trials. Please upgrade to premium to continue.",
				);
				navigate("/pricing");
			} else {
				toast.error(
					axiosError.response?.data?.message || "Error saving resume",
				);
			}
		} finally {
			setLoading(false);
		}
	};

	const handleDownload = async () => {
		try {
			const resume = document.getElementById("resume-preview");
			console.log("Resume Element:", resume);

			if (!resume) {
				toast.error("Error: Resume preview not found.");
				return;
			}

			setTimeout(() => {
				html2pdf()
					.from(resume)
					.set({
						margin: 1,
						filename: "My_Resume.pdf",
						html2canvas: { scale: 2, logging: true, useCORS: true },
						jsPDF: { format: "a4", orientation: "portrait" },
					})
					.save();
			}, 500);

			toast.success("Resume downloaded successfully");
		} catch (error) {
			toast.error("Error downloading resume");
			console.error("Download Error:", error);
		}
	};

	return (
		<div className="p-5 rounded-lg shadow-lg border-t-primary border-t-8">
			<div className="my-5">
				<h2 className="text-center text-3xl font-bold">
					Congrats! Your resume is ready 🎉
				</h2>
				<p className="text-center text-lg font-semibold py-3">
					You can now download, save, and share it with potential employers!
				</p>
				<div className="flex justify-center pt-5 gap-5">
					<Button onClick={handleDownload} size="lg" className="flex gap-2">
						<FaDownload size={20} />
						Download
					</Button>
					<Button
						size="lg"
						className="px-7"
						onClick={handleSubmit}
						disabled={loading}
					>
						<FaSave />
						{loading ? (
							<div className="flex flex-row gap-2 items-center">
								<ImSpinner2 className="animate-spin" /> Saving your resume
							</div>
						) : (
							"Save resume"
						)}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default DownloadResume;
