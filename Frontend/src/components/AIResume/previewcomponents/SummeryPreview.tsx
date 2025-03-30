import React from 'react';

// Define the structure of the resumeInfo prop
interface ResumeInfo {
    fontStyle: string;
    summary: string;
}

interface SummaryPreviewProps {
    resumeInfo: ResumeInfo;
}

const SummaryPreview: React.FC<SummaryPreviewProps> = ({ resumeInfo }) => {
    return (
        <div>
            <p className='text-xs text-black' style={{ fontFamily: resumeInfo?.fontStyle }}>
                {resumeInfo?.summary}
            </p>
        </div>
    );
};

export default SummaryPreview;
