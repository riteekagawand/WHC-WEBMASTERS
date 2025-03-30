import React from 'react';

// Define the structure for each skill entry
interface Skill {
    name: string;
    rating: number; // Assuming rating is a number between 1 and 5
}

// Define the structure of the resumeInfo prop
interface ResumeInfo {
    themeColor: string;
    fontStyle: string;
    skills: Skill[];
}

interface SkillPreviewProps {
    resumeInfo: ResumeInfo;
}

const SkillPreview: React.FC<SkillPreviewProps> = ({ resumeInfo }) => {
    return (
        <div>
            <h2
                className='text-center font-bold text-sm mb-2'
                style={{ color: resumeInfo?.themeColor, fontFamily: resumeInfo?.fontStyle }}
            >
                Skills
            </h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />
            <div className='grid grid-cols-2 gap-3 my-4'>
                {resumeInfo?.skills.map((skill, index) => (
                    <div key={index} className='flex items-center justify-between'>
                        <h2
                            className='text-xs text-black'
                            style={{ fontFamily: resumeInfo?.fontStyle }}
                        >
                            {skill?.name}
                        </h2>
                        <div className='h-2 bg-gray-200 w-[120px]'>
                            <div
                                className='h-2'
                                style={{
                                    backgroundColor: resumeInfo?.themeColor,
                                    width: skill.rating * 20 + '%',
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillPreview;
