import React from 'react';
import './preview.css';

// Define the structure for each experience entry
interface Experience {
    title: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate?: string;
    currentlyWorking: boolean;
    workSummary: string;
}

// Define the structure of the resumeInfo prop
interface ResumeInfo {
    themeColor: string;
    fontStyle: string;
    experience: Experience[];
}

interface ExperiencePreviewProps {
    resumeInfo: ResumeInfo;
}

const ExperiencePreview: React.FC<ExperiencePreviewProps> = ({ resumeInfo }) => {
    return (
        <div className='my-6'>
            <h2
                className='text-center font-bold text-sm mb-2'
                style={{ color: resumeInfo?.themeColor, fontFamily: resumeInfo?.fontStyle }}
            >
                Professional Experience
            </h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />
            {resumeInfo?.experience.map((exp, index) => (
                <div key={index} className='my-5'>
                    <h2
                        className='text-[15px] font-bold'
                        style={{ color: resumeInfo?.themeColor, fontFamily: resumeInfo?.fontStyle }}
                    >
                        {exp?.title}
                    </h2>
                    <h2
                        className='text-xs flex justify-between text-black'
                        style={{ fontFamily: resumeInfo?.fontStyle }}
                    >
                        {exp?.companyName}, {exp?.city}, {exp?.state}
                        <span style={{ fontFamily: resumeInfo?.fontStyle }}>
                            {exp?.startDate} - {exp?.currentlyWorking ? 'Present' : exp?.endDate}
                        </span>
                    </h2>
                    <div
                        className='text-xs my-2 previewStyle text-black'
                        style={{ fontFamily: resumeInfo?.fontStyle }}
                        dangerouslySetInnerHTML={{ __html: exp.workSummary }}
                    />
                </div>
            ))}
        </div>
    );
};

export default ExperiencePreview;
