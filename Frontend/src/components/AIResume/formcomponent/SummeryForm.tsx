import { Button } from '../../../components/ui/button';
import React, { useContext, useEffect, useState } from 'react';
import { Textarea } from "../../../components/ui/textarea";
import { ResumeInfoContext } from '../../../context/ResumeContext';
import { Label } from '../../../components/ui/label';
import { toast } from 'sonner';



const SummaryForm = () => {
    const context = useContext(ResumeInfoContext);
    if (!context) {
        throw new Error("ResumeInfoContext must be used within a ResumeInfoProvider");
    }
    const [resumeInfo, setResumeInfo] = context;
    const [summary, setSummary] = useState<string>(resumeInfo?.summary || '');

    useEffect(() => {
        setResumeInfo((prev) => ({
            ...prev,
            summary,
        }));
    }, [summary, setResumeInfo]);

    const onSave = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Summary saved successfully!");
    };

   

    return (
        <div>
            <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-8">
                <h2 className="font-bold text-lg">Summary</h2>
                <p>Add a summary for your job title</p>
                <form className="mt-7" onSubmit={onSave} >
                    <div className="flex justify-between items-end">
                        <Label className="text-sm">Add Summary</Label>
                        
                    </div>
                    <Textarea
                        required
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className="mt-5 inputField"
                        placeholder="Type your summary here or you can take help from AI..."
                    />
                    <div className="mt-3 flex justify-end">
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SummaryForm;
