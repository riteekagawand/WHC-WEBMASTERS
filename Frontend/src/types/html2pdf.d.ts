declare module "html2pdf.js" {
	interface Options {
		margin?: number;
		filename?: string;
		html2canvas?: {
			scale?: number;
			logging?: boolean;
			useCORS?: boolean;
		};
		jsPDF?: {
			format?: string;
			orientation?: "portrait" | "landscape";
		};
	}

	interface Html2Pdf {
		from(element: HTMLElement): Html2Pdf;
		set(options: Options): Html2Pdf;
		save(): Promise<void>;
	}

	function html2pdf(): Html2Pdf;
	export default html2pdf;
}
