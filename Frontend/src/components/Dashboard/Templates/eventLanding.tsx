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
  <header class="body-font bg-indigo-600 text-white">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a href="/" class="flex title-font font-medium items-center mb-4 md:mb-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-10 h-10 text-white p-2 bg-indigo-800 rounded-full">
          <path d="M12 8v8m-4-4h8"></path>
        </svg>
        <span class="ml-3 text-xl">EventPulse</span>
      </a>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <a href="#details" class="mr-5 hover:text-gray-200">Details</a>
        <a href="#schedule" class="mr-5 hover:text-gray-200">Schedule</a>
        <a href="#speakers" class="mr-5 hover:text-gray-200">Speakers</a>
        <a href="#tickets" class="mr-5 hover:text-gray-200">Tickets</a>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="body-font bg-indigo-50">
    <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Join Us for 
          <br class="hidden lg:inline-block"/>The Ultimate Tech Summit 2025
        </h1>
        <p class="mb-4 leading-relaxed text-gray-700">
          📅 <strong>Date:</strong> April 15-16, 2025 <br/>
          📍 <strong>Location:</strong> Downtown Convention Center, New York
        </p>
        <p class="mb-8 leading-relaxed">
          Connect with industry leaders, discover cutting-edge innovations, and boost your career at this must-attend event. Secure your spot today!
        </p>
        <div class="flex justify-center">
          <button class="inline-flex text-white bg-indigo-600 border-0 py-3 px-8 rounded-lg hover:bg-indigo-700 text-lg">Get Tickets Now</button>
        </div>
      </div>
      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <img class="object-cover w-full h-full rounded-lg" src="https://via.placeholder.com/500x400?text=Tech+Summit+2025" alt="Tech Summit 2025">
      </div>
    </div>
  </section>

  <!-- Event Details Section -->
  <section id="details" class="body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Event Details</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Everything you need to know about Tech Summit 2025.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Detail 1 -->
        <div class="bg-white p-6 rounded-lg shadow">
          <p class="text-sm text-indigo-500 uppercase">When</p>
          <h2 class="text-xl font-bold text-gray-900 mt-2">April 15-16, 2025</h2>
          <p class="text-gray-600 mt-2">Two full days of keynotes, workshops, and networking from 9 AM to 5 PM EST.</p>
        </div>
        <!-- Detail 2 -->
        <div class="bg-white p-6 rounded-lg shadow">
          <p class="text-sm text-indigo-500 uppercase">Where</p>
          <h2 class="text-xl font-bold text-gray-900 mt-2">New York</h2>
          <p class="text-gray-600 mt-2">Downtown Convention Center, 123 Innovation St, NY 10001.</p>
        </div>
        <!-- Detail 3 -->
        <div class="bg-white p-6 rounded-lg shadow">
          <p class="text-sm text-indigo-500 uppercase">Who</p>
          <h2 class="text-xl font-bold text-gray-900 mt-2">Tech Enthusiasts</h2>
          <p class="text-gray-600 mt-2">Perfect for developers, entrepreneurs, and innovators.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Schedule Section -->
  <section id="schedule" class="body-font bg-gray-50">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Event Schedule</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Plan your day with our exciting lineup.</p>
      </div>
      <div class="grid grid-cols-1 gap-6">
        <!-- Day 1 -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Day 1 - April 15</h2>
          <ul class="space-y-4">
            <li class="flex justify-between">
              <span>9:00 AM - Opening Keynote</span>
              <span class="text-gray-500">Main Hall</span>
            </li>
            <li class="flex justify-between">
              <span>11:00 AM - AI Workshop</span>
              <span class="text-gray-500">Room A</span>
            </li>
            <li class="flex justify-between">
              <span>2:00 PM - Networking Lunch</span>
              <span class="text-gray-500">Lounge</span>
            </li>
          </ul>
        </div>
        <!-- Day 2 -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Day 2 - April 16</h2>
          <ul class="space-y-4">
            <li class="flex justify-between">
              <span>9:00 AM - Tech Trends Panel</span>
              <span class="text-gray-500">Main Hall</span>
            </li>
            <li class="flex justify-between">
              <span>11:00 AM - Coding Bootcamp</span>
              <span class="text-gray-500">Room B</span>
            </li>
            <li class="flex justify-between">
              <span>4:00 PM - Closing Ceremony</span>
              <span class="text-gray-500">Main Hall</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Speakers Section -->
  <section id="speakers" class="body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Featured Speakers</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Meet the experts leading the summit.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Speaker 1 -->
        <div class="bg-white p-6 rounded-lg shadow text-center">
          <img class="w-24 h-24 rounded-full mx-auto mb-4" src="https://via.placeholder.com/150?text=Speaker+1" alt="Speaker 1">
          <h2 class="text-xl font-bold text-gray-900">Jane Doe</h2>
          <p class="text-gray-600 mt-2">AI Innovator</p>
        </div>
        <!-- Speaker 2 -->
        <div class="bg-white p-6 rounded-lg shadow text-center">
          <img class="w-24 h-24 rounded-full mx-auto mb-4" src="https://via.placeholder.com/150?text=Speaker+2" alt="Speaker 2">
          <h2 class="text-xl font-bold text-gray-900">John Smith</h2>
          <p class="text-gray-600 mt-2">Tech Entrepreneur</p>
        </div>
        <!-- Speaker 3 -->
        <div class="bg-white p-6 rounded-lg shadow text-center">
          <img class="w-24 h-24 rounded-full mx-auto mb-4" src="https://via.placeholder.com/150?text=Speaker+3" alt="Speaker 3">
          <h2 class="text-xl font-bold text-gray-900">Alex Lee</h2>
          <p class="text-gray-600 mt-2">Developer Advocate</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Tickets Section -->
  <section id="tickets" class="body-font bg-indigo-600 text-white">
    <div class="container px-5 py-24 mx-auto text-center">
      <h1 class="sm:text-4xl text-3xl font-medium title-font mb-4">Get Your Tickets Now!</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base mb-8">Don’t miss out—secure your spot before they’re gone.</p>
      <button class="inline-flex text-indigo-600 bg-white border-0 py-3 px-8 rounded-lg hover:bg-gray-100 text-lg">Buy Tickets</button>
    </div>
  </section>

  <!-- Footer -->
  <footer class="body-font bg-gray-100">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <a href="/" class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-10 h-10 text-white p-2 bg-indigo-600 rounded-full">
          <path d="M12 8v8m-4-4h8"></path>
        </svg>
        <span class="ml-3 text-xl">EventPulse</span>
      </a>
      <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
        © 2025 EventPulse —
        <a href="https://twitter.com/eventpulse" rel="noopener noreferrer" target="_blank" class="text-gray-600 ml-1">@eventpulse</a>
      </p>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <a href="#" class="text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a href="#" class="ml-3 text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5">
            <pathанки d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
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