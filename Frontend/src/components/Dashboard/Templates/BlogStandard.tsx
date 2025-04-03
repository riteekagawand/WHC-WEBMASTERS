import { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsTailwind from "grapesjs-tailwind";
import { Button } from "../../ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PortfolioBuilder = () => {
  const [editor, setEditor] = useState<import("grapesjs").Editor | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `HerSpace | Template | Blog Standard`;


    const newEditor = grapesjs.init({
      container: "#editor",
      plugins: [grapesjsTailwind],
      pluginsOpts: { [grapesjsTailwind]: {} },
      fromElement: true,
      storageManager: false,
      canvas: {
        styles: ["https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"],
      },
      // Optional: Add default content to match Image 2
      components: `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <div class="bg-gray-100 p-4 rounded-lg shadow">
            <p class="text-sm text-gray-500">CATEGORY</p>
            <h2 class="text-xl font-bold">Raclette Blueberry Nextious Level</h2>
            <p class="text-gray-600">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
            <a href="#" class="text-blue-500 hover:underline">Learn More &rarr;</a>
            <div class="flex items-center mt-2">
              <span class="text-gray-500 mr-2">👁️ 1.2K</span>
              <span class="text-gray-500">💬 6</span>
            </div>
          </div>
          <div class="bg-gray-100 p-4 rounded-lg shadow">
            <p class="text-sm text-gray-500">CATEGORY</p>
            <h2 class="text-xl font-bold">Ennui Snackwave Thundercats</h2>
            <p class="text-gray-600">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
            <a href="#" class="text-blue-500 hover:underline">Learn More &rarr;</a>
            <div class="flex items-center mt-2">
              <span class="text-gray-500 mr-2">👁️ 1.2K</span>
              <span class="text-gray-500">💬 6</span>
            </div>
          </div>
          <div class="bg-gray-100 p-4 rounded-lg shadow">
            <p class="text-sm text-gray-500">CATEGORY</p>
            <h2 class="text-xl font-bold">Selvage Poke Waistcoat Godard</h2>
            <p class="text-gray-600">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
            <a href="#" class="text-blue-500 hover:underline">Learn More &rarr;</a>
            <div class="flex items-center mt-2">
              <span class="text-gray-500 mr-2">👁️ 1.2K</span>
              <span class="text-gray-500">💬 6</span>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-gray-500">Jul 18</span>
            <p class="text-sm text-gray-500">CATEGORY</p>
            <h2 class="text-xl font-bold">The 400 Blows</h2>
            <p class="text-gray-600">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
            <p class="text-gray-500">Alper Kamu</p>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-gray-500">Jul 18</span>
            <p class="text-sm text-gray-500">CATEGORY</p>
            <h2 class="text-xl font-bold">Shooting Stars</h2>
            <p class="text-gray-600">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
            <p class="text-gray-500">Holden Caulfield</p>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-gray-500">Jul 18</span>
            <p class="text-sm text-gray-500">CATEGORY</p>
            <h2 class="text-xl font-bold">Neptune</h2>
            <p class="text-gray-600">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
            <p class="text-gray-500">Henry Letham</p>
          </div>
        </div>
      `,
    });

    newEditor.addComponents(`
 <body class="text-gray-600 font-sans">
  <!-- Header -->
  <header class="body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a href="/" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full">
          <path d="M12 4v16m8-8H4"></path>
        </svg>
        <span class="ml-3 text-xl">BlogStandard</span>
      </a>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <a href="#" class="mr-5 hover:text-gray-900">Home</a>
        <a href="#" class="mr-5 hover:text-gray-900">Categories</a>
        <a href="#" class="mr-5 hover:text-gray-900">About</a>
        <a href="#" class="mr-5 hover:text-gray-900">Contact</a>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <section class="body-font">
    <div class="container px-5 py-12 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Latest Stories</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Explore fresh content from writers and creators around the world.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Blog Post 1 -->
        <div class="bg-gray-100 p-6 rounded-lg shadow">
          <p class="text-sm text-gray-500 uppercase">Category</p>
          <h2 class="text-xl font-bold text-gray-900 mt-2">Raclette Blueberry Nextious Level</h2>
          <p class="text-gray-600 mt-2">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
          <a href="#" class="text-indigo-500 hover:underline mt-3 inline-block">Read More →</a>
          <div class="flex items-center mt-4">
            <span class="text-gray-500 mr-3">👁️ 1.2K</span>
            <span class="text-gray-500">💬 6</span>
          </div>
        </div>
        <!-- Blog Post 2 -->
        <div class="bg-gray-100 p-6 rounded-lg shadow">
          <p class="text-sm text-gray-500 uppercase">Category</p>
          <h2 class="text-xl font-bold text-gray-900 mt-2">Ennui Snackwave Thundercats</h2>
          <p class="text-gray-600 mt-2">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
          <a href="#" class="text-indigo-500 hover:underline mt-3 inline-block">Read More →</a>
          <div class="flex items-center mt-4">
            <span class="text-gray-500 mr-3">👁️ 1.2K</span>
            <span class="text-gray-500">💬 6</span>
          </div>
        </div>
        <!-- Blog Post 3 -->
        <div class="bg-gray-100 p-6 rounded-lg shadow">
          <p class="text-sm text-gray-500 uppercase">Category</p>
          <h2 class="text-xl font-bold text-gray-900 mt-2">Selvage Poke Waistcoat Godard</h2>
          <p class="text-gray-600 mt-2">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
          <a href="#" class="text-indigo-500 hover:underline mt-3 inline-block">Read More →</a>
          <div class="flex items-center mt-4">
            <span class="text-gray-500 mr-3">👁️ 1.2K</span>
            <span class="text-gray-500">💬 6</span>
          </div>
        </div>
        <!-- Blog Post 4 -->
        <div class="bg-gray-100 p-6 rounded-lg shadow">
          <div class="flex items-center space-x-2 mb-2">
            <span class="text-gray-500 text-sm">Jul 18</span>
            <p class="text-sm text-gray-500 uppercase">Category</p>
          </div>
          <h2 class="text-xl font-bold text-gray-900">The 400 Blows</h2>
          <p class="text-gray-600 mt-2">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
          <p class="text-gray-500 mt-2">Alper Kamu</p>
          <a href="#" class="text-indigo-500 hover:underline mt-3 inline-block">Read More →</a>
        </div>
        <!-- Blog Post 5 -->
        <div class="bg-gray-100 p-6 rounded-lg shadow">
          <div class="flex items-center space-x-2 mb-2">
            <span class="text-gray-500 text-sm">Jul 18</span>
            <p class="text-sm text-gray-500 uppercase">Category</p>
          </div>
          <h2 class="text-xl font-bold text-gray-900">Shooting Stars</h2>
          <p class="text-gray-600 mt-2">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
          <p class="text-gray-500 mt-2">Holden Caulfield</p>
          <a href="#" class="text-indigo-500 hover:underline mt-3 inline-block">Read More →</a>
        </div>
        <!-- Blog Post 6 -->
        <div class="bg-gray-100 p-6 rounded-lg shadow">
          <div class="flex items-center space-x-2 mb-2">
            <span class="text-gray-500 text-sm">Jul 18</span>
            <p class="text-sm text-gray-500 uppercase">Category</p>
          </div>
          <h2 class="text-xl font-bold text-gray-900">Neptune</h2>
          <p class="text-gray-600 mt-2">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
          <p class="text-gray-500 mt-2">Henry Letham</p>
          <a href="#" class="text-indigo-500 hover:underline mt-3 inline-block">Read More →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="body-font">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <a href="/" class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full">
          <path d="M12 4v16m8-8H4"></path>
        </svg>
        <span class="ml-3 text-xl">BlogStandard</span>
      </a>
      <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
        © 2025 BlogStandard —
        <a href="https://twitter.com/blogstandard" rel="noopener noreferrer" target="_blank" class="text-gray-600 ml-1">@blogstandard</a>
      </p>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <a href="#" class="text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a href="#" class="ml-3 text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a href="#" class="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
      </span>
    </div>
  </footer>
</body>


      
    `);

    setEditor(newEditor);
  }, []);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    toast.success("URL copied to clipboard");
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePreviewPortfolio = () => {
    if (!editor) return;

    setLoading(true);

    // Get the user-created components (not the editor UI)
    const components = editor.getComponents();
    const css = editor.getCss();

    // Check if there’s any content
    if (!components.length) {
      toast.error("The canvas is empty! Add some content before generating a preview.");
      setLoading(false);
      return;
    }

    // Render the components to HTML
    const html = components.map((component: any) => component.toHTML()).join("");

    // Create a clean HTML file
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Portfolio Preview</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>${css || ""}</style>
        </head>
        <body>${html}</body>
      </html>
    `;

    // Generate a Blob URL
    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setPortfolioUrl(url);
    toast.success("Portfolio preview generated! Open the URL in a new tab.");

    setLoading(false);
  };
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Website Builder</h1>
      <div id="editor" className="h-[600px] border"></div>
      <div className="flex flex-col items-center justify-between space-x-2 mt-5 md:flex-row">
            <Button
              size="lg"
              disabled={loading}
              onClick={handlePreviewPortfolio}
              className="text-sm border-2 border-primary"
            >
              {loading ? (
                <div className="flex flex-row gap-2 items-center">
                  <span className="animate-pulse">Deploying...</span>
                </div>
              ) : (
                "Deploy"
              )}
            </Button>

            {portfolioUrl && (
              <div className="flex flex-row items-center mt-2 md:mt-0 gap-2 px-4 p-1 bg-violet-100 border-primary border-2 border-dashed text-primary rounded-md">
                <div className="text-sm font-medium">{portfolioUrl}</div>
                <div
                  className="border-2 p-2 rounded-md border-primary cursor-pointer"
                  onClick={handleCopyUrl}
                >
                  {copied ? "Copied!" : "Copy"}
                </div>
              </div>
            )}
          </div>
    </div>
  );
};

export default PortfolioBuilder;