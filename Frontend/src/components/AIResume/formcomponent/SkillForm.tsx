import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { ResumeInfoContext } from '../../../context/ResumeContext';
import { Button } from '../../../components/ui/button';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';

interface Skill {
    name: string;
    level: string;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
    state = { hasError: false };
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log(error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong. Please try again later.</h1>;
        }
        return this.props.children;
    }
}

const SkillForm: React.FC = () => {
    const context = useContext(ResumeInfoContext);
    if (!context) {
        throw new Error("ResumeInfoContext must be used within a ResumeInfoProvider");
    }
    const [resumeInfo, setResumeInfo] = context;
    const [skillsList, setSkillsList] = useState<Skill[]>(() => {
        if (resumeInfo.skills && Array.isArray(resumeInfo.skills)) {
            return resumeInfo.skills.map((skill: { name: string; level: string }) => ({
                name: skill.name || '',
                level: skill.level || '',
            }));
        }
        return [{ name: '', level: '' }];
    });

    // Sync resumeInfo.skills with skillsList, but avoid infinite loop
    useEffect(() => {
        console.log('skillsList updated:', skillsList);
        console.log('resumeInfo.skills:', resumeInfo.skills);
        if (JSON.stringify(resumeInfo.skills) !== JSON.stringify(skillsList)) {
            console.log('Updating resumeInfo with new skillsList');
            setResumeInfo({
                ...resumeInfo,
                skills: skillsList,
            });
        }
    }, [skillsList, resumeInfo, setResumeInfo]);

    const handleChange = useCallback((index: number, name: keyof Skill, value: string | number) => {
        console.log(`handleChange called - index: ${index}, name: ${name}, value: ${value}`);
        setSkillsList((prevSkills) => {
            const updatedSkills = [...prevSkills];
            updatedSkills[index][name] = value as never;
            return updatedSkills;
        });
    }, []);

    const addNewSkill = () => {
        console.log('Adding new skill');
        setSkillsList((prev) => [...prev, { name: '', level: '' }]);
    };

    const removeSkill = () => {
        if (skillsList.length > 1) {
            console.log('Removing last skill');
            setSkillsList((prev) => prev.slice(0, -1));
        }
    };

    return (
        <ErrorBoundary>
            <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-8">
                <h2 className="font-bold text-lg">Skills</h2>
                <p>Add Your Top Professional Skills</p>
                <div>
                    {skillsList.map((skill, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-center gap-3 border p-3 my-5 rounded-lg border-gray-300">
                                <div className="w-1/2">
                                    <Label className="text-sm">Skill Name</Label>
                                    <Input
                                        className="inputField"
                                        placeholder="Enter your skill name..."
                                        value={skill.name}
                                        name="name"
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Rating
                                        style={{ maxWidth: 120 }}
                                        value={Math.min(Math.max(parseInt(skill.level) || 0, 0), 5)}
                                        onChange={(value: number) => handleChange(index, 'level', value.toString())}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between my-5">
                    <Button onClick={addNewSkill} variant="secondary" className="gap-1.5 border">
                        <IoMdAdd size={20} /> Add More Skill
                    </Button>
                    <Button onClick={removeSkill} variant="secondary" className="gap-1.5 border">
                        <IoMdRemove size={20} /> Remove Skill
                    </Button>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default SkillForm;