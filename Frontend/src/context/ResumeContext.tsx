import { createContext } from "react";

// Define the type of the context value
interface ResumeInfo {
    firstName: string;
    lastName: string;
    jobTitle: string;
    address: string;
    phone: string;
    email: string;
}

// Specify the context value type as a tuple with ResumeInfo and a function to set it
export const ResumeInfoContext = createContext<[ResumeInfo, React.Dispatch<React.SetStateAction<ResumeInfo>>] | null>(null);
