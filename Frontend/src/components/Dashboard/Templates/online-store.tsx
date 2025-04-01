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
    document.title = `Website Builder`;

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
<div>
  <header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full">
          <path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18"></path>
        </svg>
        <span class="ml-3 text-xl">ShopEasy</span>
      </a>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <a class="mr-5 hover:text-gray-900">Home</a>
        <a class="mr-5 hover:text-gray-900">Shop</a>
        <a class="mr-5 hover:text-gray-900">Categories</a>
        <a class="mr-5 hover:text-gray-900">Contact</a>
      </nav>
      <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
        Cart
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-4 h-4 ml-1">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      </button>
    </div>
  </header>

  <section class="text-gray-600 body-font">
    <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Discover the Best Deals 
          <br class="hidden lg:inline-block"/>Online Today
        </h1>
        <p class="mb-8 leading-relaxed">
          Shop from a wide range of products at unbeatable prices. From electronics to fashion, we have everything you need to elevate your lifestyle. Enjoy fast shipping, secure payments, and top-notch customer service with every purchase.
        </p>
        <div class="flex justify-center">
          <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Shop Now</button>
        </div>
      </div>
      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 bg-transparent">
        <img alt="hero" classname="object-cover w-full h-full filter-none" src="https://img.freepik.com/premium-photo/shopping-cart-shopping-bags-product-box-put-laptop-which-is-online-shop-store-internet-digital-market-concept-marketing-digital-marketing-communication-3d-rendering_42098-145.jpg?semt=ais_hybrid"/>
      </div>
    </div>
  </section>

  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Shop by Category</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Explore our curated categories to find exactly what you’re looking for.</p>
      </div>
      <div class="flex flex-wrap -m-4">
        <div class="p-4 md:w-1/3">
          <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img classname="object-cover w-full h-full filter-none" src="https://m.media-amazon.com/images/I/61Qe0euJJZL.jpg" alt="Electronics"/>
            <div class="p-6">
              <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Electronics</h1>
              <p class="leading-relaxed mb-3">Discover the latest gadgets and tech accessories.</p>
              <div class="flex items-center flex-wrap">
                <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Shop Now
                  <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4 md:w-1/3">
          <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img classname="object-cover w-full h-full filter-none" src="https://image01-in.oneplus.net/media/202503/25/a8f8fdbe9febb652286af072a5429666.png?x-amz-process=image/format,webp/quality,Q_80" alt="Fashion"/>
            <div class="p-6">
              <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Fashion</h1>
              <p class="leading-relaxed mb-3">Stay trendy with our latest clothing collections.</p>
              <div class="flex items-center flex-wrap">
                <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Shop Now
                  <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4 md:w-1/3">
          <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img classname="object-cover w-full h-full filter-none" src="https://image01-in.oneplus.net/media/202503/25/a8f8fdbe9febb652286af072a5429666.png?x-amz-process=image/format,webp/quality,Q_80" alt="Home Essentials"/>
            <div class="p-6">
              <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Home Essentials</h1>
              <p class="leading-relaxed mb-3">Find everything you need for your home.</p>
              <div class="flex items-center flex-wrap">
                <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Shop Now
                  <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Featured Products</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Check out our top picks for this season.</p>
      </div>
      <div class="flex flex-wrap -m-4">
        <div class="p-4 md:w-1/4">
          <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img classname="object-cover w-full h-full filter-none" src="https://via.placeholder.com/300x200?text=Product+1" alt="Product 1"/>
            <div class="p-6">
              <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">PRODUCT</h2>
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Smartphone X</h1>
              <p class="leading-relaxed mb-3">$499.99</p>
              <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add to Cart</button>
            </div>
          </div>
        </div>
        <div class="p-4 md:w-1/4">
          <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img classname="object-cover w-full h-full filter-none" src="https://via.placeholder.com/300x200?text=Product+2" alt="Product 2"/>
            <div class="p-6">
              <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">PRODUCT</h2>
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Leather Jacket</h1>
              <p class="leading-relaxed mb-3">$89.99</p>
              <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add to Cart</button>
            </div>
          </div>
        </div>
        <div class="p-4 md:w-1/4">
          <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img classname="object-cover w-full h-full filter-none" src="https://via.placeholder.com/300x200?text=Product+3" alt="Product 3"/>
            <div class="p-6">
              <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">PRODUCT</h2>
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Smart Watch</h1>
              <p class="leading-relaxed mb-3">$199.99</p>
              <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add to Cart</button>
            </div>
          </div>
        </div>
        <div class="p-4 md:w-1/4">
          <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img classname="object-cover w-full h-full filter-none" src="https://via.placeholder.com/300x200?text=Product+4" alt="Product 4"/>
            <div class="p-6">
              <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">PRODUCT</h2>
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Bluetooth Speaker</h1>
              <p class="leading-relaxed mb-3">$59.99</p>
              <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">What Our Customers Say</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Hear from our happy shoppers.</p>
      </div>
      <div class="flex flex-wrap -m-4">
        <div class="p-4 md:w-1/3">
          <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden p-6">
            <p class="leading-relaxed mb-3">"I love the variety of products on ShopEasy! The delivery was super fast, and the quality exceeded my expectations."</p>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center">JD</div>
              <div class="ml-4">
                <p class="text-gray-900 font-medium">John Doe</p>
                <p class="text-gray-500 text-sm">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4 md:w-1/3">
          <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden p-6">
            <p class="leading-relaxed mb-3">"Great customer service! They helped me with my order, and I received everything on time."</p>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center">JS</div>
              <div class="ml-4">
                <p class="text-gray-900 font-medium">Jane Smith</p>
                <p class="text-gray-500 text-sm">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4 md:w-1/3">
          <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden p-6">
            <p class="leading-relaxed mb-3">"The best online shopping experience! The website is easy to navigate, and the prices are unbeatable."</p>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center">MK</div>
              <div class="ml-4">
                <p class="text-gray-900 font-medium">Mike Johnson</p>
                <p class="text-gray-500 text-sm">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="text-gray-600 body-font relative">
    <div class="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
      <div class="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
        <iframe frameborder="0" width="100%" height="100%" title="map" marginheight="0" marginwidth="0" scrolling="no" src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=New+York&ie=UTF8&t=&z=14&iwloc=B&output=embed" class="absolute inset-0"></iframe>
        <div class="bg-white relative flex flex-wrap py-6 rounded shadow-md">
          <div class="lg:w-1/2 px-6">
            <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
            <p class="mt-1">
              <strong>ShopEasy Warehouse</strong><br/>
              123 Commerce Street,<br/>
              New York, NY 10001, USA
            </p>
          </div>
          <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
            <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
            <a class="text-indigo-500 leading-relaxed">support@shopeasy.com</a>
            <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
            <p class="leading-relaxed">1-800-555-1234</p>
          </div>
        </div>
      </div>
      <div class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
        <form>
          <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Contact Us</h2>
          <p class="leading-relaxed mb-5 text-gray-600">Have a question? We’re here to help!</p>
          <div class="relative mb-4">
            <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" required class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" required class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div class="relative mb-4">
            <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
            <textarea id="message" name="message" required class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
          <button type="submit" class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Send Message</button>
          <p class="text-xs text-gray-500 mt-3">We’ll get back to you within 24 hours.</p>
        </form>
      </div>
    </div>
  </section>

  <footer class="text-gray-600 body-font">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full">
          <path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18"></path>
        </svg>
        <span class="ml-3 text-xl">ShopEasy</span>
      </a>
      <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
        © 2025 ShopEasy —
        <a href="https://twitter.com/shopeasy" rel="noopener noreferrer" target="_blank" class="text-gray-600 ml-1">@shopeasy</a>
      </p>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <a class="text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" viewBox="0 0 24 24" class="w-5 h-5">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
      </span>
    </div>
  </footer>
</div>

      
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
      <h1 className="text-xl font-bold mb-4">Portfolio Builder</h1>
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