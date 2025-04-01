import { ResumeInfoContext } from '../../context/ResumeContext';
import React, { useContext } from 'react';
import PersonalDetailPreview from './previewcomponents/PersonalDetailPreview';
import SummeryPreview from './previewcomponents/SummeryPreview';
import ExperiencePreview from './previewcomponents/ExperiencePreview';
import EducationalPreview from './previewcomponents/EducationalPreview';
import SkillPreview from './previewcomponents/SkillPreview';

const ResumePreview: React.FC = () => {
    const context = useContext(ResumeInfoContext);
    if (!context) {
        throw new Error("ResumeInfoContext must be used within a ResumeInfoProvider");
    }
    const [resumeInfo] = context;

    const previewInfo = {
        ...resumeInfo,
        themeColor: resumeInfo.themeColor || '#000000',
        fontStyle: resumeInfo.fontStyle || 'Arial',
        summary: resumeInfo.summary || '',
        experience: resumeInfo.experience || [],
        education: resumeInfo.education || [],
        skills: (resumeInfo.skills || []).map(skill => ({
            name: skill.name,
            rating: parseInt(skill.level) || 0
        }))
    };

    return (
        <div id="resume-preview" className='shadow-lg h-full p-7 border-t-[20px] bg-white rounded-lg'
            style={{
                borderColor: previewInfo.themeColor,
            }}
        >
            <PersonalDetailPreview resumeInfo={previewInfo} />
            <SummeryPreview resumeInfo={previewInfo} />
            <ExperiencePreview resumeInfo={previewInfo} />
            <EducationalPreview resumeInfo={previewInfo} />
            <SkillPreview resumeInfo={previewInfo} />
        </div>
    );
};

export default ResumePreview;
