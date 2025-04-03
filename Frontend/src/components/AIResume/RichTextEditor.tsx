import { Label } from '../../components/ui/label';
import React, { useContext, useState } from 'react';
import {
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnUnderline,
    BtnUndo,
    Editor,
    EditorProvider,
    Separator,
    Toolbar
} from 'react-simple-wysiwyg';
import { ResumeInfoContext } from '../../context/ResumeContext';

interface RichTextEditorProps {
    onRichTextEditorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    index: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onRichTextEditorChange }) => {
    const context = useContext(ResumeInfoContext);
    if (!context) {
        throw new Error("ResumeInfoContext must be used within a ResumeInfoProvider");
    }
    const [value, setValue] = useState<string | undefined>();
   
    return (
        <div>
            <div className='flex justify-between items-center'>
                <Label className='text-lg font-medium'>Summary</Label>
                
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e: any) => { setValue(e.target.value); onRichTextEditorChange(e) }}>
                    <Toolbar>
                        <BtnUndo />
                        <BtnRedo />
                        <Separator />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
};

export default RichTextEditor;
