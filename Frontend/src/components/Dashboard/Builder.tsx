import React, { useEffect } from 'react';
 import TemplateCard from '../../components/TemplateCard';
 import StartFromScratchCard from '../../components/StartFromScratchCard'; // Import the new component
 import { RiLayout5Line, RiRestaurantFill, RiCalendarEventLine } from 'react-icons/ri';
 import { BsBuildings } from 'react-icons/bs';
 import { LuShoppingBag } from 'react-icons/lu';
 import { CgNotes } from 'react-icons/cg';
 import { IoMdFitness } from 'react-icons/io';
 import { IoCameraOutline } from 'react-icons/io5';// Icons for Start from Scratch
 import { CiCirclePlus } from "react-icons/ci";
 import { PiFileArrowUpDuotone } from "react-icons/pi";
 
 const Builder: React.FC = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `HerSpace | Template`;
  }, []);

   const popularTemplates = [
     { title: 'Portfolio Basic', description: 'Clean, minimal design for showcasing your work', icon: RiLayout5Line },
     { title: 'Business Pro', description: 'Professional layout for small businesses and startups', icon: BsBuildings },
     { title: 'Online Store', description: 'E-commerce ready template with product galleries', icon: LuShoppingBag },
     { title: 'Blog Standard', description: 'Content-focused layout for writers and creators', icon: CgNotes },
   ];
 
   const recentlyAdded = [
     { title: 'Restaurant Menu', description: 'Showcase your dishes with this elegant food menu template', icon: RiRestaurantFill },
     { title: 'Fitness Coach', description: 'Perfect for personal trainers and fitness professionals', icon: IoMdFitness },
     { title: 'Photography', description: 'Showcase your visual portfolio with this gallery-focused template', icon: IoCameraOutline },
     { title: 'Event Landing', description: 'Promote your upcoming events with this conversion-optimized layout', icon: RiCalendarEventLine },
   ];
 
   const scratchOptions = [
     {
       title: 'Blank Canvas',
       description: 'Start with a completely blank page and build your website from scratch',
       buttonText: 'Create New',
       icon: CiCirclePlus,
     },
     {
       title: 'Import Design',
       description: 'Upload your own design files and convert them to a website',
       buttonText: 'Import',
       icon: PiFileArrowUpDuotone,
     },
   ];
 
   return (
     <div className="p-6">
       {/* Breadcrumb */}
       <div className="flex text-gray-600 text-sm mb-6">
         <h3 className="mr-2">Home</h3>
         <span className="mr-2"></span>
         <h3>Website Builder</h3>
       </div>
 
       {/* Heading */}
       <h1 className="text-3xl font-bold text-gray-800">Website Builder</h1>
       <p className="text-gray-500 mt-2">Create beautiful websites with our easy-to-use builder</p>
 
       {/* Search Input */}
       <div className="mt-4">
         <input
           type="text"
           placeholder="Search by name or category..."
           className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple"
         />
       </div>
 
       {/* Popular Templates */}
       <div className="mt-8">
         <h2 className="text-xl font-semibold text-gray-800">Popular Templates</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
           {popularTemplates.map((template) => (
             <TemplateCard
               key={template.title}
               title={template.title}
               description={template.description}
               icon={template.icon}
             />
           ))}
         </div>
       </div>
 
       {/* Recently Added Templates */}
       <div className="mt-8">
         <h2 className="text-xl font-semibold text-gray-800">Recently Added</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
           {recentlyAdded.map((template) => (
             <TemplateCard
               key={template.title}
               title={template.title}
               description={template.description}
               icon={template.icon}
             />
           ))}
         </div>
       </div>
 
       {/* Start from Scratch Section */}
       <div className="mt-12">
         <h2 className="text-xl font-semibold text-gray-800">Start from Scratch</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
           {scratchOptions.map((option) => (
             <StartFromScratchCard
               key={option.title}
               title={option.title}
               description={option.description}
               buttonText={option.buttonText}
               icon={option.icon}
             />
           ))}
         </div>
       </div>
 
       {/* Need Help Section */}
       <div className="mt-8 mb-10">
         <h2 className="text-xl font-semibold text-gray-800">Need Help?</h2>
         <div className="flex flex-wrap gap-4 mt-4">
           <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
             View Tutorials
           </button>
           <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
             Contact Support
           </button>
           <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
             Join Community Forum
           </button>
         </div>
       </div>
     </div> 
   );
 };
 
 export default Builder;