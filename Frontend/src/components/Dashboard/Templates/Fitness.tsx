import  { useEffect, useState } from "react";
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
  <header class="body-font bg-gray-100">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a href="/" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-10 h-10 text-white p-2 bg-green-500 rounded-full">
          <path d="M12 12l4-4m-4 4l-4-4m4 4V3m0 9v9"></path>
        </svg>
        <span class="ml-3 text-xl">FitCoach</span>
      </a>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <a href="#" class="mr-5 hover:text-gray-900">Home</a>
        <a href="#" class="mr-5 hover:text-gray-900">Services</a>
        <a href="#" class="mr-5 hover:text-gray-900">Testimonials</a>
        <a href="#" class="mr-5 hover:text-gray-900">Contact</a>
      </nav>
      <button class="inline-flex items-center bg-green-500 text-white border-0 py-2 px-4 mt-4 md:mt-0 rounded hover:bg-green-600">
        Get Started
      </button>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="body-font">
    <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Transform Your Body 
          <br class="hidden lg:inline-block"/>with Expert Coaching
        </h1>
        <p class="mb-8 leading-relaxed">
          Achieve your fitness goals with personalized training plans, nutrition advice, and one-on-one support from certified professionals. Whether you're a beginner or a pro, we’re here to help you succeed.
        </p>
        <div class="flex justify-center">
          <button class="inline-flex text-white bg-green-500 border-0 py-2 px-6 rounded hover:bg-green-600">Book a Session</button>
        </div>
      </div>
      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <img className="object-cover w-full h-full rounded-lg filter-none" src="data:image/jpeg;base64,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" alt="Fitness Coach">
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="body-font bg-gray-50">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Our Services</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Tailored fitness solutions for every goal.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Service 1 -->
        <div class="bg-white p-6 rounded-lg shadow">
          <p class="text-sm text-gray-500 uppercase">Service</p>
          <h2 class="text-xl font-bold text-gray-900 mt-2">Personal Training</h2>
          <p class="text-gray-600 mt-2">One-on-one sessions designed to maximize your strength and endurance.</p>
          <a href="#" class="text-green-500 hover:underline mt-3 inline-block">Learn More →</a>
        </div>
        <!-- Service 2 -->
        <div class="bg-white p-6 rounded-lg shadow">
          <p class="text-sm text-gray-500 uppercase">Service</p>
          <h2 class="text-xl font-bold text-gray-900 mt-2">Nutrition Plans</h2>
          <p class="text-gray-600 mt-2">Customized meal plans to fuel your body and support your fitness journey.</p>
          <a href="#" class="text-green-500 hover:underline mt-3 inline-block">Learn More →</a>
        </div>
        <!-- Service 3 -->
        <div class="bg-white p-6 rounded-lg shadow">
          <p class="text-sm text-gray-500 uppercase">Service</p>
          <h2 class="text-xl font-bold text-gray-900 mt-2">Group Classes</h2>
          <p class="text-gray-600 mt-2">Join our high-energy group workouts for motivation and community.</p>
          <a href="#" class="text-green-500 hover:underline mt-3 inline-block">Learn More →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Client Success Stories</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Hear from those who’ve transformed their lives with FitCoach.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Testimonial 1 -->
        <div class="bg-gray-100 p-6 rounded-lg shadow">
          <p class="text-gray-600 mb-4">"FitCoach helped me lose 20 pounds and feel stronger than ever. The personalized attention is unbeatable!"</p>
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">JD</div>
            <div class="ml-4">
              <p class="text-gray-900 font-medium">John Doe</p>
              <p class="text-gray-500 text-sm">Client</p>
            </div>
          </div>
        </div>
        <!-- Testimonial 2 -->
        <div class="bg-gray-100 p-6 rounded-lg shadow">
          <p class="text-gray-600 mb-4">"The nutrition plan was a game-changer. I’ve never had so much energy!"</p>
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">AS</div>
            <div class="ml-4">
              <p class="text-gray-900 font-medium">Anna Smith</p>
              <p class="text-gray-500 text-sm">Client</p>
            </div>
          </div>
        </div>
        <!-- Testimonial 3 -->
        <div class="bg-gray-100 p-6 rounded-lg shadow">
          <p class="text-gray-600 mb-4">"Group classes are so much fun! I’ve made friends while getting fit."</p>
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">MR</div>
            <div class="ml-4">
              <p class="text-gray-900 font-medium">Mike Ross</p>
              <p class="text-gray-500 text-sm">Client</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="body-font bg-gray-50">
    <div class="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
      <div class="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
        <iframe frameborder="0" width="100%" height="100%" title="map" marginheight="0" marginwidth="0" scrolling="no" src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=New+York&ie=UTF8&t=&z=14&iwloc=B&output=embed" class="absolute inset-0"></iframe>
        <div class="bg-white relative flex flex-wrap py-6 rounded shadow-md">
          <div class="lg:w-1/2 px-6">
            <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
            <p class="mt-1">
              <strong>FitCoach Studio</strong><br/>
              456 Wellness Ave,<br/>
              New York, NY 10002, USA
            </p>
          </div>
          <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
            <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
            <a class="text-green-500 leading-relaxed">info@fitcoach.com</a>
            <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
            <p class="leading-relaxed">1-800-FIT-5678</p>
          </div>
        </div>
      </div>
      <div class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
        <form>
          <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Get in Touch</h2>
          <p class="leading-relaxed mb-5 text-gray-600">Ready to start your fitness journey? Contact us!</p>
          <div class="relative mb-4">
            <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" required class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" required class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div class="relative mb-4">
            <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
            <textarea id="message" name="message" required class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
          <button type="submit" class="text-white bg-green-500 border-0 py-2 px-6 rounded hover:bg-green-600">Send Message</button>
          <p class="text-xs text-gray-500 mt-3">We’ll respond within 24 hours.</p>
        </form>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="body-font bg-gray-100">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <a href="/" class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-10 h-10 text-white p-2 bg-green-500 rounded-full">
          <path d="M12 12l4-4m-4 4l-4-4m4 4V3m0 9v9"></path>
        </svg>
        <span class="ml-3 text-xl">FitCoach</span>
      </a>
      <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
        © 2025 FitCoach —
        <a href="https://twitter.com/fitcoach" rel="noopener noreferrer" target="_blank" class="text-gray-600 ml-1">@fitcoach</a>
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