import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { ResumeInfoContext } from '../../../context/ResumeContext';
import { Button } from '../../../components/ui/button';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';

// Define types for skill objects
interface Skill {
    name: string;
    rating: number;
}

const SkillForm: React.FC = () => {
    // Using the context for resume info
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
    const [skillsList, setSkillsList] = useState<Skill[]>([
        {
            name: '',
            rating: 0,
        },
    ]);

    // Effect to initialize skillsList with resumeInfo skills
    useEffect(() => {
        if (resumeInfo.skills && Array.isArray(resumeInfo.skills)) {
            const newSkills = resumeInfo.skills.map((skill: Skill) => ({
                name: skill.name || '',
                rating: skill.rating || 0,
            }));
            setSkillsList(newSkills.length > 0 ? newSkills : [{ name: '', rating: 0 }]);
        }
    }, [resumeInfo.skills]);

    // Handle input change
    const handleChange = (index: number, name: keyof Skill, value: string | number) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    };

    // Add new skill input
    const addNewSkill = () => {
        setSkillsList([
            ...skillsList,
            {
                name: '',
                rating: 0,
            },
        ]);
    };

    // Remove last skill input
    const removeSkill = () => {
        if (skillsList.length > 1) {
            setSkillsList((skillsList) => skillsList.slice(0, -1));
        }
    };

    // Update the resumeInfo context with the updated skills list
    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList,
        });
    }, [skillsList, setResumeInfo, resumeInfo]);

    return (
        <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-8">
            <h2 className="font-bold text-lg">Skills</h2>
            <p>Add Your Top Professional Skills</p>
            <div>
                {skillsList.map((skill, index) => (
                    <div key={index}>
                        <div
                            className="flex justify-between items-center gap-3 border p-3 my-5 rounded-lg border-gray-300"
                            style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
                        >
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
                                    value={skill.rating}
                                    onChange={(value) => handleChange(index, 'rating', value)}
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
    );
};

export default SkillForm;
