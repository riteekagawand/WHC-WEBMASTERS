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
  <body class="text-gray-600 font-sans">
  <!-- Header -->
  <header class="body-font bg-gray-900 text-white">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a href="/" class="flex title-font font-medium items-center mb-4 md:mb-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-10 h-10 text-white p-2 bg-gray-700 rounded-full">
          <path d="M3 7h18M3 12h18M3 17h18M7 3v18"></path>
        </svg>
        <span class="ml-3 text-xl">LensCraft</span>
      </a>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <a href="#" class="mr-5 hover:text-gray-300">Home</a>
        <a href="#" class="mr-5 hover:text-gray-300">Portfolio</a>
        <a href="#" class="mr-5 hover:text-gray-300">Services</a>
        <a href="#" class="mr-5 hover:text-gray-300">Contact</a>
      </nav>
      <button class="inline-flex items-center bg-gray-700 text-white border-0 py-2 px-4 mt-4 md:mt-0 rounded hover:bg-gray-600">
        Book a Shoot
      </button>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="body-font">
    <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Capture the Moment 
          <br class="hidden lg:inline-block"/>with LensCraft
        </h1>
        <p class="mb-8 leading-relaxed">
          Showcase your world through stunning photography. From portraits to landscapes, I bring your vision to life with a keen eye for detail and creativity.
        </p>
        <div class="flex justify-center">
          <button class="inline-flex text-white bg-gray-900 border-0 py-2 px-6 rounded hover:bg-gray-800">View Portfolio</button>
        </div>
      </div>
      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <img class="object-cover w-full h-full rounded-lg" src="https://via.placeholder.com/500x400?text=Photography+Hero" alt="Photography Hero">
      </div>
    </div>
  </section>

  <!-- Portfolio Section -->
  <section class="body-font bg-gray-50">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Portfolio</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Explore my latest photography work.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <!-- Photo 1 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <img class="object-cover w-full h-64" src="https://via.placeholder.com/400x300?text=Portrait" alt="Portrait">
          <div class="p-4">
            <p class="text-sm text-gray-500 uppercase">Portrait</p>
            <h2 class="text-lg font-bold text-gray-900 mt-1">Timeless Beauty</h2>
            <a href="#" class="text-gray-700 hover:underline mt-2 inline-block">View Details →</a>
          </div>
        </div>
        <!-- Photo 2 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <img class="object-cover w-full h-64" src="https://via.placeholder.com/400x300?text=Landscape" alt="Landscape">
          <div class="p-4">
            <p class="text-sm text-gray-500 uppercase">Landscape</p>
            <h2 class="text-lg font-bold text-gray-900 mt-1">Mountain Serenity</h2>
            <a href="#" class="text-gray-700 hover:underline mt-2 inline-block">View Details →</a>
          </div>
        </div>
        <!-- Photo 3 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <img class="object-cover w-full h-64" src="https://via.placeholder.com/400x300?text=Event" alt="Event">
          <div class="p-4">
            <p class="text-sm text-gray-500 uppercase">Event</p>
            <h2 class="text-lg font-bold text-gray-900 mt-1">Wedding Bliss</h2>
            <a href="#" class="text-gray-700 hover:underline mt-2 inline-block">View Details →</a>
          </div>
        </div>
        <!-- Photo 4 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <img class="object-cover w-full h-64" src="https://via.placeholder.com/400x300?text=Nature" alt="Nature">
          <div class="p-4">
            <p class="text-sm text-gray-500 uppercase">Nature</p>
            <h2 class="text-lg font-bold text-gray-900 mt-1">Forest Glow</h2>
            <a href="#" class="text-gray-700 hover:underline mt-2 inline-block">View Details →</a>
          </div>
        </div>
        <!-- Photo 5 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <img class="object-cover w-full h-64" src="https://via.placeholder.com/400x300?text=Urban" alt="Urban">
          <div class="p-4">
            <p class="text-sm text-gray-500 uppercase">Urban</p>
            <h2 class="text-lg font-bold text-gray-900 mt-1">City Lights</h2>
            <a href="#" class="text-gray-700 hover:underline mt-2 inline-block">View Details →</a>
          </div>
        </div>
        <!-- Photo 6 -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <img class="object-cover w-full h-64" src="https://via.placeholder.com/400x300?text=Abstract" alt="Abstract">
          <div class="p-4">
            <p class="text-sm text-gray-500 uppercase">Abstract</p>
            <h2 class="text-lg font-bold text-gray-900 mt-1">Color Play</h2>
            <a href="#" class="text-gray-700 hover:underline mt-2 inline-block">View Details →</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="body-font">
    <div class="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
      <div class="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
        <iframe frameborder="0" width="100%" height="100%" title="map" marginheight="0" marginwidth="0" scrolling="no" src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=New+York&ie=UTF8&t=&z=14&iwloc=B&output=embed" class="absolute inset-0"></iframe>
        <div class="bg-white relative flex flex-wrap py-6 rounded shadow-md">
          <div class="lg:w-1/2 px-6">
            <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
            <p class="mt-1">
              <strong>LensCraft Studio</strong><br/>
              789 Shutter Lane,<br/>
              New York, NY 10003, USA
            </p>
          </div>
          <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
            <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
            <a class="text-gray-700 leading-relaxed">hello@lenscraft.com</a>
            <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
            <p class="leading-relaxed">1-800-555-7890</p>
          </div>
        </div>
      </div>
      <div class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
        <form>
          <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Contact Me</h2>
          <p class="leading-relaxed mb-5 text-gray-600">Interested in a shoot? Let’s connect!</p>
          <div class="relative mb-4">
            <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" required class="w-full bg-white rounded border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" required class="w-full bg-white rounded border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div class="relative mb-4">
            <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
            <textarea id="message" name="message" required class="w-full bg-white rounded border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
          <button type="submit" class="text-white bg-gray-900 border-0 py-2 px-6 rounded hover:bg-gray-800">Send Message</button>
          <p class="text-xs text-gray-500 mt-3">I’ll reply within 24 hours.</p>
        </form>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="body-font bg-gray-900 text-white">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <a href="/" class="flex title-font font-medium items-center md:justify-start justify-center">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-10 h-10 text-white p-2 bg-gray-700 rounded-full">
          <path d="M3 7h18M3 12h18M3 17h18M7 3v18"></path>
        </svg>
        <span class="ml-3 text-xl">LensCraft</span>
      </a>
      <p class="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-700 sm:py-2 sm:mt-0 mt-4">
        © 2025 LensCraft —
        <a href="https://twitter.com/lenscraft" rel="noopener noreferrer" target="_blank" class="text-gray-300 ml-1">@lenscraft</a>
      </p>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <a href="#" class="text-gray-400">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a href="#" class="ml-3 text-gray-400">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a href="#" class="ml-3 text-gray-400">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
      </span>
    </div>
  </footer>


      
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