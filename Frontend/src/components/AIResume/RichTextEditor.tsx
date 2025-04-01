import { Button } from '../../components/ui/button';
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
import {  BsStars } from "react-icons/bs";
import { chatSession } from '../../services/GeminiModel';
import { ResumeInfoContext } from '../../context/ResumeContext';
import { ImSpinner2 } from "react-icons/im";
import { motion } from "framer-motion";

interface RichTextEditorProps {
    onRichTextEditorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    index: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onRichTextEditorChange, index }) => {
    const context = useContext(ResumeInfoContext);
    if (!context) {
        throw new Error("ResumeInfoContext must be used within a ResumeInfoProvider");
    }
    const [resumeInfo] = context;
    const [value, setValue] = useState<string | undefined>();
    const [loading, setLoading] = useState<boolean>(false);

    const summeryGenerater = async () => {
        if (!resumeInfo.experience?.[index]?.title) {
            alert("Please fill the position title");
            return;
        }
        setLoading(true);

        const richTextEditorPrompt = import.meta.env.VITE_RICHTEXTEDITOR_PROMPT;

        const prompt = `${richTextEditorPrompt}
        Job Title: "${resumeInfo?.experience[index].title}".
        `;

        try {
            const result = await chatSession.sendMessage(prompt);
            const res = result.response.text();
            setValue(res.replace('```html', '').replace('```', ''));
        } catch (error) {
            console.error("Error generating summary: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='flex justify-between items-center'>
                <Label className='text-lg font-medium'>Summary</Label>
                <motion.div
                    className="relative p-[2px] rounded-lg mb-3"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{ backgroundPosition: "200% 50%" }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    style={{
                        background: "linear-gradient(90deg, #ff00ff, #00ffff, #ff0, #ff00ff)",
                        backgroundSize: "200% 200%",
                    }}
                >
                    <Button
                        onClick={summeryGenerater}
                        type="button"
                        size="sm"
                        disabled={loading}
                        className="relative z-10 bg-primary hover:bg-primary/50 text-black border-none w-full flex items-center gap-2"
                    >
                        {loading ?
                            <>
                                <ImSpinner2 size={20} className="animate-spin" /> Generating from AI ...
                            </>
                            :
                            <>
                                <BsStars size={20} /> Generate from AI
                            </>
                        }
                    </Button>
                </motion.div>
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
