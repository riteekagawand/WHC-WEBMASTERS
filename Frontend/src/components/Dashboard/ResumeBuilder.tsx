import { useEffect, useState } from "react";
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "../../components/ui/sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Separator } from "../../components/ui/separator";
import { format } from "date-fns";
import { Skeleton } from "../../components/ui/skeleton";

interface Resume {
	_id: string;
	jobTitle: string;
	themeColor: string;
	fontStyle: string;
	createdAt: string;
}

const ResumeBuilder: React.FC = () => {
	const [resumes, setResumes] = useState<Resume[]>([]);
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		// Simulate fetching resumes from local storage or mock data
		setLoading(true);
		setTimeout(() => {
			setResumes([]); // Replace with mock data if needed
			setLoading(false);
		}, 1000);
	}, []);

	const handleDelete = (resumeId: string) => {
		setResumes((prevResumes) =>
			prevResumes.filter((resume) => resume._id !== resumeId),
		);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = "HERSPACE | MY RESUMES";
	}, []);

	return (
		<SidebarProvider>
			<SidebarInset style={{ backgroundColor: "var(--background-color)" }}>
				<div className="flex items-center gap-2">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block font-semibold">
								Dashboard
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage
									className="font-semibold"
									style={{ color: "var(--text-color)" }}
								>
									My Resumes
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
					<Link
						to="/dashboard/resumebody"
						className="p-14 py-24 flex items-center justify-center border-2 border-dashed rounded-lg h-[385px] hover:scale-95 transition-all hover:shadow-md cursor-pointer"
					>
						<IoMdAdd size={50} />
					</Link>
					{loading
						? Array.from({ length: 5 }).map((_, index) => (
								<Skeleton key={index} className="w-full h-56 rounded-lg" />
							))
						: resumes.map((resume) => (
								<div
									key={resume._id}
									className="p-4 shadow-md rounded-lg border"
								>
									<img
										src={`https://ui-avatars.com/api/?name=${encodeURIComponent(resume.jobTitle)}&size=150&background=${resume.themeColor.replace("#", "")}&color=fff`}
										alt={resume.jobTitle}
										className="w-full h-60 object-cover rounded-lg"
									/>
									<h3
										className="text-lg font-semibold truncate"
										style={{ fontFamily: resume.fontStyle }}
									>
										{resume.jobTitle}
									</h3>
									<div className="text-xs font-semibold text-gray-500">
										Created At:{" "}
										{format(new Date(resume.createdAt), "MMMM d, yyyy")}
									</div>
									<div className="mt-4 flex gap-2">
										<Button
											onClick={() => navigate(`/viewmyresume/${resume._id}`)}
											variant="secondary"
										>
											<FaEye /> View
										</Button>
										<Button
											onClick={() => handleDelete(resume._id)}
											variant="destructive"
										>
											<IoMdTrash /> Delete
										</Button>
									</div>
								</div>
							))}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default ResumeBuilder;
