import React, { useState } from 'react';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import { ResumeInfoContext, type ResumeInfo } from '../../context/ResumeContext';
import dummyresume from '../../data/dummyresume';

// Specify the types for the ResumeInfoContext.Provider value
type ResumeInfoContextType = [ResumeInfo, React.Dispatch<React.SetStateAction<ResumeInfo>>];

const ResumeBody: React.FC = () => {
    // Type the state as ResumeInfo
    const [resumeInfo, setResumeInfo] = useState<ResumeInfo>({
        ...dummyresume,
        phone: dummyresume.phone.toString(),
        skills: dummyresume.skills.map(skill => ({
            name: skill.name,
            level: skill.rating.toString()
        }))
    });

    return (
        <ResumeInfoContext.Provider value={[resumeInfo, setResumeInfo] as ResumeInfoContextType}>
            <div className='my-10 grid grid-cols-1 md:grid-cols-2 gap-10'>
                <ResumeForm />
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    );
};

export default ResumeBody;
