import { useContext, useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { FaFont } from "react-icons/fa";
import { ResumeInfoContext } from "../../context/ResumeContext";

const FontStyle = () => {
	const context = useContext(ResumeInfoContext);
	if (!context) {
		throw new Error(
			"ResumeInfoContext must be used within a ResumeInfoProvider",
		);
	}
	const [resumeInfo, setResumeInfo] = context;
	const [selectedFont, setSelectedFont] = useState<string | null>(null);

	const fonts = [
		"Arial",
		"Verdana",
		"Tahoma",
		"Georgia",
		"Times New",
		"Courier",
		"Lucida",
	];

	const onFontChange = (font: string) => {
		setSelectedFont(font);
		setResumeInfo({
			...resumeInfo,
			fontStyle: font,
		});
	};

	return (
		<div>
			<Popover>
				<PopoverTrigger>
					<Button variant="secondary" size="sm" className="flex gap-2 border">
						<FaFont size={20} />
						Font Style
					</Button>
				</PopoverTrigger>
				<PopoverContent className="border border-gray-300 bg-lightpurp">
					<h2
						className="mb-3 text-sm font-bold"
						style={{ color: `var(--text-color)` }}
					>
						Select Font Style
					</h2>
					<div className="grid grid-cols-2 gap-3">
						{fonts.map((font, index) => (
							<div
								key={index}
								onClick={() => onFontChange(font)}
								className={`p-2 rounded-md cursor-pointer hover:bg-primary ${selectedFont === font ? "bg-primary text-black" : ""}`}
								style={{ fontFamily: font, color: `var(--text-color)` }}
							>
								{font}
							</div>
						))}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default FontStyle;
