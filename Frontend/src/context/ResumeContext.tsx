import { createContext } from "react";

// Define the type of the context value
export interface ResumeInfo {
    firstName: string;
    lastName: string;
    jobTitle: string;
    address: string;
    phone: string;
    email: string;
    education?: {
        universityName: string;
        degree: string;
        major: string;
        startDate: string;
        endDate: string;
        description: string;
    }[];
    fontStyle?: string;
    themeColor?: string;
    summary?: string;
    experience?: {
        title: string;
        companyName: string;
        city: string;
        state: string;
        startDate: string;
        endDate?: string;
        currentlyWorking: boolean;
        workSummary: string;
    }[];
    skills?: {
        name: string;
        level: string;
    }[];
}

// Specify the context value type as a tuple with ResumeInfo and a function to set it
export const ResumeInfoContext = createContext<[ResumeInfo, React.Dispatch<React.SetStateAction<ResumeInfo>>] | null>(null);
