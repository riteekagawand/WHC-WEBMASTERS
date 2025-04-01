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
  <body>
  <div class="gjs-editor gjs-one-bg gjs-two-color">
    <header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5">
        </path>
        </svg><span class="ml-3 text-xl">Tailblocks</span></a>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <a class="mr-5 hover:text-gray-900">Home</a>
        <a class="mr-5 hover:text-gray-900">About Us</a>
        <a class="mr-5 hover:text-gray-900">Contact US</a>
        <a class="mr-5 hover:text-gray-900">Fourth Link</a>
      </nav>
      <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-4 h-4 ml-1">
        <path d="M5 12h14M12 5l7 7-7 7">
        </path>
        </svg></button>
    </div>
  </header>
  <section class="text-gray-600 body-font">
    <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Experience Luxury &amp; Comfort 
          <br class="hidden lg:inline-block"/>Like Never Before
        </h1>
        <p class="mb-8 leading-relaxed">"Indulge in an unparalleled experience where luxury meets comfort, designed to provide you with the highest standards of relaxation and sophistication. Our carefully curated spaces and services ensure that every moment feels extraordinary, offering you a level of comfort and elegance like never before. Elevate your stay with us and discover a whole new definition of luxury
        </p>
        <div class="flex justify-center">
          <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Know More</button>
        </div>
      </div>
      &lt;
      <div classname="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 bg-transparent">
        <img alt="hero" classname="object-cover w-full h-full filter-none" src="data:image/jpeg;base64,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" id="i4t01s"/>/>
      </div>
    </div>
  </section>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto flex flex-wrap">
      <div class="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
        <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
          <div class="h-full w-1 bg-gray-200 pointer-events-none">
          </div>
        </div>
        <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">1
        </div>
        <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
          <div class="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-12 h-12">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z">
              </path>
            </svg>
          </div>
          <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
            <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">Explore Our Menu
            </h2>
            <p class="leading-relaxed">Browse through our wide selection of delicious dishes. Whether you're in the mood for a hearty breakfast, a light lunch, or a fine dinner, we have something for every taste. You can filter menu items based on your preferences and dietary needs.
            </p>
          </div>
        </div>
      </div>
      <div class="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
        <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
          <div class="h-full w-1 bg-gray-200 pointer-events-none">
          </div>
        </div>
        <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">2
        </div>
        <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
          <div class="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-12 h-12">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2">
              </path>
            </svg>
          </div>
          <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
            <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">Make a Reservation
            </h2>
            <p class="leading-relaxed">Planning to dine in? Reserve your table in advance for a seamless experience. Simply choose the date, time, and number of guests, and we’ll take care of the rest. If you have any special requests or dietary restrictions, let us know.
            </p>
          </div>
        </div>
      </div>
      <div class="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
        <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
          <div class="h-full w-1 bg-gray-200 pointer-events-none">
          </div>
        </div>
        <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">3
        </div>
        <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
          <div class="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-12 h-12">
              <circle cx="12" cy="5" r="3">
              </circle>
              <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3">
              </path>
            </svg>
          </div>
          <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
            <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">Order Online for Takeout or Delivery
            </h2>
            <p class="leading-relaxed">Enjoy the taste of our restaurant from the comfort of your home or hotel room. Browse the menu, place your order, and we'll have it delivered right to your door.
            </p>
          </div>
        </div>
      </div>
      <div class="flex relative pb-10 sm:items-center md:w-2/3 mx-auto">
        <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
          <div class="h-full w-1 bg-gray-200 pointer-events-none">
          </div>
        </div>
        <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">4
        </div>
        <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
          <div class="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-12 h-12">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2">
              </path>
              <circle cx="12" cy="7" r="4">
              </circle>
            </svg>
          </div>
          <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
            <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">Contact Us or Get Directions
            </h2>
            <p class="leading-relaxed">Contact Us or Get Directions
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Pricing
        </h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
        </p>
        <p data-pm-slice="0 0 []">Experience Luxury &amp; Comfort 
          <span id="ij2ar8e">Like Never Before</span>
        </p>
        <p>
        </p>
      </div>
      <div class="flex flex-wrap -m-4">
        <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
          <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
            <h2 class="text-sm tracking-widest title-font mb-1 font-medium">START
            </h2>
            <h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">Free
            </h1>
            <p class="flex items-center text-gray-600 mb-2">
              <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" class="w-3 h-3">
                <path d="M20 6L9 17l-5-5">
                </path>
                </svg></span>Vexillologist pitchfork
            </p>
            <p class="flex items-center text-gray-600 mb-2">
              <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" class="w-3 h-3">
                <path d="M20 6L9 17l-5-5">
                </path>
                </svg></span>Tumeric plaid portland
            </p>
            <p class="flex items-center text-gray-600 mb-6">
              <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" class="w-3 h-3">
                <path d="M20 6L9 17l-5-5">
                </path>
                </svg></span>Mixtape chillwave tumeric
            </p>
            <button class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">Button<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-4 h-4 ml-auto">
              <path d="M5 12h14M12 5l7 7-7 7">
              </path>
              </svg></button>
            <p class="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.
            </p>
          </div>
        </div>
        <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
          <div class="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
            <span class="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
            <h2 class="text-sm tracking-widest title-font mb-1 font-medium">PRO
            </h2>
            <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
              <span>$38</span>
              <span class="text-lg ml-1 font-normal text-gray-500">/mo</span>
            </h1>
            <p class="flex items-center text-gray-600 mb-2">
              <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" class="w-3 h-3">
                <path d="M20 6L9 17l-5-5">
                </path>
                </svg></span>Vexillologist pitchfork
            </p>
            <p class="flex items-center text-gray-600 mb-2">
              <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" class="w-3 h-3">
                <path d="M20 6L9 17l-5-5">
                </path>
                </svg></span>Tumeric plaid portland
            </p>
            <p class="flex items-center text-gray-600 mb-2">
              <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" class="w-3 h-3">
                <path d="M20 6L9 17l-5-5">
                </path>
                </svg></span>Hexagon neutra unicorn
            </p>
            <p class="flex items-center text-gray-600 mb-6">
              <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" class="w-3 h-3">
                <path d="M20 6L9 17l-5-5">
                </path>
                </svg></span>Mixtape chillwave tumeric
            </p>
            <button class="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">Button<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-4 h-4 ml-auto">
              <path d="M5 12h14M12 5l7 7-7 7">
              </path>
              </svg></button>
            <p class="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="text-gray-600 body-font relative">
    <div class="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
      <div class="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
        <iframe frameborder="0" width="100%" height="100%" title="map" marginheight="0" marginwidth="0" scrolling="no" src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=cyprus&ie=UTF8&t=&z=14&iwloc=B&output=embed" id="i70b9lc" class="absolute inset-0"></iframe>
        <div class="bg-white relative flex flex-wrap py-6 rounded shadow-md">
          <div class="lg:w-1/2 px-6">
            <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS
            </h2>
            <p class="mt-1">
              <strong data-start="57" data-end="77">Hotel Sea Breeze</strong>
              <br data-start="77" data-end="80"/>
              Near Virar Railway Station,
              <br data-start="107" data-end="110" data-is-only-node=""/>
              Virar West, Mumbai, Maharashtra 401303, India
            </p>
          </div>
          <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
            <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL
            </h2>
            <a class="text-indigo-500 leading-relaxed">example@email.com</a>
            <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE
            </h2>
            <p class="leading-relaxed">123-456-7890
            </p>
          </div>
        </div>
      </div>
      <div class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
        <form id="it6k7vr">
          <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Feedback
          </h2>
          <p class="leading-relaxed mb-5 text-gray-600">Post-ironic portland shabby chic echo park, banjo fashion axe
          </p>
          <div class="relative mb-4">
            <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" required class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email-3" name="email" required class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div class="relative mb-4">
            <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
            <textarea id="message" name="message" required class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
          <button type="submit" class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
          <p class="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.
          </p>
        </form>
      </div>
    </div>
  </section>
  <footer class="text-gray-600 body-font">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5">
        </path>
        </svg><span class="ml-3 text-xl">Tailblocks</span></a>
      <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2020 Tailblocks —
        <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" target="_blank" class="text-gray-600 ml-1">@knyttneve</a>
      </p>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start"><a class="text-gray-500"><svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z">
        </path>
        </svg></a><a class="ml-3 text-gray-500"><svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
        </path>
        </svg></a><a class="ml-3 text-gray-500"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5">
        </rect>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01">
        </path>
        </svg></a><a class="ml-3 text-gray-500"><svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" viewBox="0 0 24 24" class="w-5 h-5">
        <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z">
        </path>
        <circle cx="4" cy="4" r="2" stroke="none">
        </circle>
        </svg></a></span>
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