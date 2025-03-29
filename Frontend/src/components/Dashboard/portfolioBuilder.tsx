import React, { useEffect, useState } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../Components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../Components/ui/breadcrumb";
import { Separator } from "../../Components/ui/separator";
import { Button } from "../../Components/ui/button";
import { FaCopy, FaCheck } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsTailwind from "grapesjs-tailwind";
import axios from "axios";

const PortfolioBuilder = () => {
  const [editor, setEditor] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Portfolio Builder`;

    const newEditor = grapesjs.init({
      container: "#editor",
      plugins: [grapesjsTailwind],
      pluginsOpts: { [grapesjsTailwind]: {} },
      fromElement: true,
      storageManager: false,
    });

    setEditor(newEditor);
  }, []);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    toast.success("URL copied to clipboard");
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePreviewPortfolio = async () => {
    if (!editor) return;

    setLoading(true);

    // Get the HTML & CSS from GrapesJS
    const html = editor.getHtml();
    const css = editor.getCss();

    try {
      const response = await axios.post("http://localhost:5000/api/portfolio/deploy", {
        html,
        css,
      });

      setPortfolioUrl(response.data.url);
      toast.success("Portfolio deployed successfully!");
    } catch (error) {
      toast.error("Failed to deploy portfolio");
    }

    setLoading(false);
  };

  return (
    <div>
      <SidebarProvider>
        <SidebarInset style={{ backgroundColor: `var(--background-color)`, overflowY: "auto", height: "100vh" }}>
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block font-semibold">Dashboard</BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold" style={{ color: `var(--text-color)` }}>
                    Portfolio Builder
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="mt-5">
            <div id="editor" className="h-96 bg-gray-200"></div>
          </div>

          <div className="flex flex-col items-center justify-between space-x-2 mt-5 md:flex-row">
            <Button size="lg" disabled={loading} onClick={handlePreviewPortfolio} className="text-sm border-2 border-primary">
              {loading ? (
                <div className="flex flex-row gap-2 items-center">
                  <ImSpinner2 className="animate-spin" /> Deploying...
                </div>
              ) : (
                "Generate Portfolio Preview"
              )}
            </Button>

            {portfolioUrl && (
              <div className="flex flex-row items-center mt-2 md:mt-0 gap-2 px-4 p-1 bg-violet-100 border-primary border-2 border-dashed text-primary rounded-md">
                <div className="text-sm font-medium">{portfolioUrl}</div>
                <div className="border-2 p-2 rounded-md border-primary cursor-pointer" onClick={handleCopyUrl}>
                  {copied ? <FaCheck className="text-primary" /> : <FaCopy />}
                </div>
              </div>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default PortfolioBuilder;
