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
    rating: number;
}

class ErrorBoundary extends React.Component {
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
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
    // Initialize skillsList with resumeInfo.skills or default value, only on mount
    const [skillsList, setSkillsList] = useState<Skill[]>(() => {
        if (resumeInfo.skills && Array.isArray(resumeInfo.skills)) {
            return resumeInfo.skills.map((skill: Skill) => ({
                name: skill.name || '',
                rating: skill.rating || 0,
            }));
        }
        return [{ name: '', rating: 0 }];
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
            updatedSkills[index][name] = value;
            return updatedSkills;
        });
    }, []);

    const addNewSkill = () => {
        console.log('Adding new skill');
        setSkillsList((prev) => [...prev, { name: '', rating: 0 }]);
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
                                        name="rating"
                                        value={Math.min(Math.max(skill.rating, 0), 5)}
                                        onChange={(value) => handleChange(index, 'rating', value)}
                                        key={`rating-${index}`}
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