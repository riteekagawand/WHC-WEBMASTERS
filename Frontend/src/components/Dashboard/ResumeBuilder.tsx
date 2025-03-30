import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { Button } from "../../Components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "../../Components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../../Components/ui/breadcrumb";
import { Separator } from "../../Components/ui/separator";
import axios from "axios";
import { toast } from "sonner";
import { format } from "date-fns";
import { Skeleton } from "../../Components/ui/skeleton";

interface Resume {
    _id: string;
    jobTitle: string;
    themeColor: string;
    fontStyle: string;
    createdAt: string;
}

const ResumeBuilder: React.FC = () => {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const user = JSON.parse(localStorage.getItem("user") || "{}"); // Fetch user from localStorage
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 5;

    const totalPages: number = Math.ceil(resumes.length / itemsPerPage);

    useEffect(() => {
        const fetchResumes = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/api/userresume/getalluserresume/${user?._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setResumes(response.data.resumes);
            } catch (error) {
                toast.error("Failed to fetch resumes");
            } finally {
                setLoading(false);
            }
        };

        if (user?._id) {
            fetchResumes();
        }
    }, [user?._id]);

    const handleDelete = async (resumeId: string) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/api/userresume/deleteuserresume/${resumeId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            toast.success("Resume deleted successfully");
            setResumes((prevResumes) => prevResumes.filter((resume) => resume._id !== resumeId));
        } catch (error) {
            toast.error("Failed to delete resume");
        }
    };

    const handlePageClick = (page: number) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
    };

    const paginatedResumes = resumes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "CAREERINSIGHT | MY RESUMES";
    }, []);

    return (
        <SidebarProvider>
            <SidebarInset style={{ backgroundColor: `var(--background-color)` }}>
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
                                <BreadcrumbPage className="font-semibold" style={{ color: `var(--text-color)` }}>
                                    My Resumes
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
                    <Link to="/resumebody" className="p-14 py-24 flex items-center justify-center border-2 border-dashed rounded-lg h-[385px] hover:scale-95 transition-all hover:shadow-md cursor-pointer">
                        <IoMdAdd size={50} />
                    </Link>
                    {loading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton key={index} className="w-full h-56 rounded-lg" />
                        ))
                        : paginatedResumes.map((resume) => (
                            <div key={resume._id} className="p-4 shadow-md rounded-lg border">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(resume.jobTitle)}&size=150&background=${resume.themeColor.replace("#", "")}&color=fff`}
                                    alt={resume.jobTitle}
                                    className="w-full h-60 object-cover rounded-lg"
                                />
                                <h3 className="text-lg font-semibold truncate" style={{ fontFamily: resume.fontStyle }}>
                                    {resume.jobTitle}
                                </h3>
                                <div className="text-xs font-semibold text-gray-500">
                                    Created At: {format(new Date(resume.createdAt), "MMMM d, yyyy")}
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Button onClick={() => navigate(`/viewmyresume/${resume._id}`)} variant="secondary">
                                        <FaEye /> View
                                    </Button>
                                    <Button onClick={() => handleDelete(resume._id)} variant="destructive">
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
