import React, { useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { MdTopic } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { Button } from "../../components/ui/button";
import SelectCategory from "./CreateCourseForm/SelectCategory";
import ToipcDescription from "./CreateCourseForm/ToipcDescription";
import SelectOptions from "./CreateCourseForm/SelectOptions";
import { chatSession } from "../../services/GeminiModel";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const CreateCourse = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [category, setCategory] = useState("");
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [options, setOptions] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const stepperOptions = [
        { id: 1, nameCategory: "Category/Domain", icon: <BiSolidCategory size={25} color="#101010" /> },
        { id: 2, nameCategory: "Topic/Description", icon: <MdTopic size={25} color="#101010" /> },
        { id: 3, nameCategory: "Options", icon: <IoMdOptions size={25} color="#101010" /> },
    ];

    const handleSubmit = async () => {
        try {
            const checkTrail = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/user/checktrails/createcourse`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (checkTrail.status === 200) {
                setLoading(true);
                const formData = { category, topic, description, ...options };
                const createCoursePrompt = import.meta.env.VITE_CREATECOURSE_PROMPT;

                const prompt = `${createCoursePrompt}\n\n### Course Details:\n- **Category**: ${formData.category}\n- **Topic**: ${formData.topic}\n- **Description**: ${formData.description}\n- **Course Level**: ${formData.difficulty}\n- **Course Duration**: ${formData.duration}\n- **Number of Chapters**: ${formData.chapters}\n- **Language**: ${formData.language}`;

                const result = await chatSession.sendMessage(prompt);
                const data = await result.response.text();
                const parsedResponse = JSON.parse(data.replace(/```json|```/g, ""));

                navigate("/courselayout", { state: { courseData: parsedResponse } });
            } else {
                navigate("/pricing");
            }
        } catch (error) {
            console.error("Error generating course: ", error);
            navigate("/pricing");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `HERSPACE | CREATE A COURSE`;
    }, []);

    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-10">
                <h2 className="text-4xl text-primary font-bold tracking-tight">Create Course</h2>
                <p className="text-lg mt-2 font-semibold tracking-tighter text-gray-500">
                    Enter details accurately to get the desired response from AI
                </p>
                <div className="flex mt-20">
                    {stepperOptions.map((item, index) => (
                        <div key={item.id} className="flex items-center">
                            <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                                <div className={`bg-gray-200 p-3 rounded-full ${activeIndex >= index && "bg-primary"}`}>
                                    {item.icon}
                                </div>
                                <h2 className="hidden font-bold md:block md:text-sm">{item.nameCategory}</h2>
                            </div>
                            {index !== stepperOptions.length - 1 && (
                                <div className={`h-1 mb-0 md:mb-5 w-[50px] md:w-[100px] lg:w-[170px] rounded-full bg-gray-300 ${activeIndex - 1 >= index && "bg-violet-600"}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {activeIndex === 0 ? (
                <SelectCategory category={category} setCategory={setCategory} />
            ) : activeIndex === 1 ? (
                <ToipcDescription topic={topic} setTopic={setTopic} description={description} setDescription={setDescription} />
            ) : (
                <SelectOptions options={options} setOptions={setOptions} />
            )}

            <div className="px-10 md:px-20 lg:px-44 mt-20">
                <div className="flex justify-between mt-10">
                    <Button variant="secondary" size="lg" disabled={activeIndex === 0} onClick={() => setActiveIndex(activeIndex - 1)}>
                        Previous
                    </Button>
                    {activeIndex < 2 ? (
                        <Button size="lg" onClick={() => setActiveIndex(activeIndex + 1)} disabled={!category || !topic || !description}>
                            Next
                        </Button>
                    ) : (
                        <motion.div className="relative p-[2px] rounded-lg mb-3" initial={{ backgroundPosition: "0% 50%" }} animate={{ backgroundPosition: "200% 50%" }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ background: "linear-gradient(90deg, #ff00ff, #00ffff, #ff0, #ff00ff)", backgroundSize: "200% 200%" }}>
                            <Button size="lg" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Creating..." : "Submit"}
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;