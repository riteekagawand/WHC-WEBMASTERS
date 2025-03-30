import React from 'react';

interface Education {
    universityName: string;
    degree: string;
    major: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface ResumeInfo {
    themeColor: string;
    fontStyle: string;
    education: Education[];
}

interface EducationalPreviewProps {
    resumeInfo: ResumeInfo;
}

const EducationalPreview: React.FC<EducationalPreviewProps> = ({ resumeInfo }) => {
    return (
        <div>
            <h2
                className='text-center font-bold text-sm mb-2'
                style={{ color: resumeInfo?.themeColor, fontFamily: resumeInfo?.fontStyle }}
            >
                Education
            </h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />
            {resumeInfo?.education.map((edu, index) => (
                <div key={index} className='my-5'>
                    <h2
                        className='text-[15px] font-bold'
                        style={{ color: resumeInfo?.themeColor, fontFamily: resumeInfo?.fontStyle }}
                    >
                        {edu?.universityName}
                    </h2>
                    <h2
                        className='text-xs flex justify-between text-black'
                        style={{ fontFamily: resumeInfo?.fontStyle }}
                    >
                        {edu?.degree} in {edu?.major}{' '}
                        <span style={{ fontFamily: resumeInfo?.fontStyle }}>
                            {edu?.startDate} - {edu?.endDate}
                        </span>
                    </h2>
                    <p
                        className='text-xs my-2 text-black'
                        style={{ fontFamily: resumeInfo?.fontStyle }}
                    >
                        {edu?.description}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default EducationalPreview;
