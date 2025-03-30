import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ResumeInfoContext } from '@/context/ResumeContext'
import React, { useContext, ChangeEvent, FormEvent } from 'react'
import { toast } from 'sonner'

// Define types for ResumeInfo structure
interface ResumeInfo {
    firstName: string;
    lastName: string;
    jobTitle: string;
    address: string;
    phone: string;
    email: string;
}

interface PersonalDetailFormProps {
    enableNext: (status: boolean) => void;
}

const PersonalDetailForm: React.FC<PersonalDetailFormProps> = ({ enableNext }) => {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        enableNext(false);
        const { name, value } = e.target;
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        });
    }

    const handleClick = () => {
        toast.success("Saved successfully");
    }

    const onSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        enableNext(true);
    }

    return (
        <div className='p-5 rounded-lg shadow-lg border-t-primary border-t-8'>
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <p>Get Started with the basic Information</p>
            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <Label className='text-sm'>First Name</Label>
                        <Input className="inputField" name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label className='text-sm'>Last Name</Label>
                        <Input className="inputField" name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <Label className='text-sm'>Job Title</Label>
                        <Input className="inputField" name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <Label className='text-sm'>Address</Label>
                        <Input className="inputField" name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label className='text-sm'>Phone</Label>
                        <Input className="inputField" name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label className='text-sm'>Email Id</Label>
                        <Input className="inputField" name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button type="submit" onClick={handleClick}>Save</Button>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetailForm;
