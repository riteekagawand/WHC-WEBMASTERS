import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsTailwind from "grapesjs-tailwind";
import { Button } from "../../ui/button";

const PortfolioBuilder = () => {
  const [editor, setEditor] = useState(null);
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
<body class="bg-gray-900 text-gray-200 font-sans">
  <!-- Header -->
  <header class="bg-gray-800">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a href="/" class="flex title-font font-medium items-center mb-4 md:mb-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-10 h-10 text-teal-400 p-2 bg-gray-700 rounded-full">
          <path d="M12 4v16M4 12h16"></path>
        </svg>
        <span class="ml-3 text-xl text-teal-400">Portfolio</span>
      </a>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <a href="#work" class="mr-5 hover:text-teal-300 text-gray-300">Work</a>
        <a href="#about" class="mr-5 hover:text-teal-300 text-gray-300">About</a>
        <a href="#contact" class="mr-5 hover:text-teal-300 text-gray-300">Contact</a>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="bg-gray-900">
    <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
          Hey, I’m [Your Name] 
          <br class="hidden lg:inline-block"/>Showcasing My Best Work
        </h1>
        <p class="mb-8 leading-relaxed text-gray-400">
          Welcome to my portfolio! I’m a [your profession, e.g., designer, developer, artist] passionate about creating impactful projects. Explore my work below and let’s connect!
        </p>
        <div class="flex justify-center">
          <button class="inline-flex text-gray-900 bg-teal-400 border-0 py-3 px-8 rounded-lg hover:bg-teal-500 text-lg font-semibold">See My Work</button>
        </div>
      </div>
      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <img class="object-cover w-full h-full rounded-lg border-4 border-purple-500" src="https://via.placeholder.com/500x400?text=Your+Photo" alt="Profile Photo">
      </div>
    </div>
  </section>

  <!-- Work Section -->
  <section id="work" class="bg-gray-800">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">My Work</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-400">A selection of projects I’m proud of.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <!-- Project 1 -->
        <div class="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <img class="object-cover w-full h-64" src="https://via.placeholder.com/400x300?text=Project+1" alt="Project 1">
          <div class="p-4">
            <p class="text-sm text-purple-400 uppercase">Project</p>
            <h2 class="text-lg font-bold text-white mt-1">Vivid Design</h2>
            <a href="#" class="text-teal-400 hover:underline mt-2 inline-block">View Project →</a>
          </div>
        </div>
        <!-- Project 2 -->
        <div class="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <img class="object-cover w-full h-64" src="https://via.placeholder.com/400x300?text=Project+2" alt="Project 2">
          <div class="p-4">
            <p class="text-sm text-purple-400 uppercase">Project</p>
            <h2 class="text-lg font-bold text-white mt-1">CodeCraft App</h2>
            <a href="#" class="text-teal-400 hover:underline mt-2 inline-block">View Project →</a>
          </div>
        </div>
        <!-- Project 3 -->
        <div class="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <img class="object-cover w-full h-64" src="https://via.placeholder.com/400x300?text=Project+3" alt="Project 3">
          <div class="p-4">
            <p class="text-sm text-purple-400 uppercase">Project</p>
            <h2 class="text-lg font-bold text-white mt-1">Pixel Art</h2>
            <a href="#" class="text-teal-400 hover:underline mt-2 inline-block">View Project →</a>
          </div>
        </div>
        <!-- Project 4 -->
        <div class="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <img class="object-cover w-full h-64" src="https://via.placeholder.com/400x300?text=Project+4" alt="Project 4">
          <div class="p-4">
            <p class="text-sm text-purple-400 uppercase">Project</p>
            <h2 class="text-lg font-bold text-white mt-1">Neon Web</h2>
            <a href="#" class="text-teal-400 hover:underline mt-2 inline-block">View Project →</a>
          </div>
        </div>
        <!-- Project 5 -->
        <div class="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <img class="object-cover w-full h-64" src="https://via.placeholder.com/400x300?text=Project+5" alt="Project 5">
          <div class="p-4">
            <p class="text-sm text-purple-400 uppercase">Project</p>
            <h2 class="text-lg font-bold text-white mt-1">Bright UI</h2>
            <a href="#" class="text-teal-400 hover:underline mt-2 inline-block">View Project →</a>
          </div>
        </div>
        <!-- Project 6 -->
        <div class="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <img class="object-cover w-full h-64" src="https://via.placeholder.com/400x300?text=Project+6" alt="Project 6">
          <div class="p-4">
            <p class="text-sm text-purple-400 uppercase">Project</p>
            <h2 class="text-lg font-bold text-white mt-1">Glow Branding</h2>
            <a href="#" class="text-teal-400 hover:underline mt-2 inline-block">View Project →</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="bg-gray-900">
    <div class="container px-5 py-24 mx-auto text-center">
      <h1 class="sm:text-4xl text-3xl font-medium title-font mb-4 text-white">About Me</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-400 mb-8">
        I’m a [your profession] with a love for [your passion, e.g., clean design, innovative code]. With [X years] of experience, I create work that’s both functional and beautiful. Let’s make something amazing together!
      </p>
      <a href="#contact" class="inline-flex text-white bg-purple-500 border-0 py-2 px-6 rounded-lg hover:bg-purple-600">Get in Touch</a>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="bg-gray-800">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">Contact</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-400">Let’s collaborate on your next project.</p>
      </div>
      <div class="max-w-md mx-auto">
        <form>
          <div class="relative mb-4">
            <label for="name" class="leading-7 text-sm text-gray-300">Name</label>
            <input type="text" id="name" name="name" required class="w-full bg-gray-700 rounded border border-gray-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-500 text-base outline-none text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-300">Email</label>
            <input type="email" id="email" name="email" required class="w-full bg-gray-700 rounded border border-gray-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-500 text-base outline-none text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div class="relative mb-4">
            <label for="message" class="leading-7 text-sm text-gray-300">Message</label>
            <textarea id="message" name="message" required class="w-full bg-gray-700 rounded border border-gray-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-500 h-32 text-base outline-none text-gray-200 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
          <button type="submit" class="w-full text-gray-900 bg-teal-400 border-0 py-2 px-6 rounded-lg hover:bg-teal-500 text-lg font-semibold">Send Message</button>
        </form>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-900">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <a href="/" class="flex title-font font-medium items-center md:justify-start justify-center">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-10 h-10 text-teal-400 p-2 bg-gray-700 rounded-full">
          <path d="M12 4v16M4 12h16"></path>
        </svg>
        <span class="ml-3 text-xl text-teal-400">Portfolio</span>
      </a>
      <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-700 sm:py-2 sm:mt-0 mt-4">
        © 2025 [Your Name] —
        <a href="https://twitter.com/yourhandle" rel="noopener noreferrer" target="_blank" class="text-gray-400 ml-1">@yourhandle</a>
      </p>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <a href="#" class="text-gray-400 hover:text-teal-300">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a href="#" class="ml-3 text-gray-400 hover:text-teal-300">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a href="#" class="ml-3 text-gray-400 hover:text-teal-300">
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
    const html = components.map((component) => component.toHTML()).join("");

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