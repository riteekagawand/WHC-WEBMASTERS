import React from 'react';

interface ResumeInfo {
    firstName: string;
    lastName: string;
    jobTitle: string;
    address: string;
    phone: string;
    email: string;
    themeColor: string;
    fontStyle: string;
}

interface PersonalDetailPreviewProps {
    resumeInfo: ResumeInfo;
}

const PersonalDetailPreview: React.FC<PersonalDetailPreviewProps> = ({ resumeInfo }) => {
    return (
        <div>
            <h2
                className='font-bold text-xl text-center'
                style={{
                    color: resumeInfo?.themeColor,
                    fontFamily: resumeInfo?.fontStyle
                }}
            >
                {resumeInfo?.firstName} {resumeInfo?.lastName}
            </h2>
            <h2
                className='text-center font-medium text-sm text-black'
                style={{
                    fontFamily: resumeInfo?.fontStyle
                }}
            >
                {resumeInfo?.jobTitle}
            </h2>
            <h2
                className='text-center font-normal text-xs'
                style={{
                    color: resumeInfo?.themeColor,
                    fontFamily: resumeInfo?.fontStyle
                }}
            >
                {resumeInfo?.address}
            </h2>

            <div className='flex justify-between'>
                <h2
                    className='font-normal text-xs'
                    style={{
                        color: resumeInfo?.themeColor,
                        fontFamily: resumeInfo?.fontStyle
                    }}
                >
                    {resumeInfo?.phone}
                </h2>
                <h2
                    className='font-normal text-xs'
                    style={{
                        color: resumeInfo?.themeColor,
                        fontFamily: resumeInfo?.fontStyle
                    }}
                >
                    {resumeInfo?.email}
                </h2>
            </div>

            <hr
                className='border-[1.5px] my-2'
                style={{
                    borderColor: resumeInfo?.themeColor
                }}
            />
        </div>
    );
}

export default PersonalDetailPreview;
