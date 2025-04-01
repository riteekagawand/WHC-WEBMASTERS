// import { useEffect } from "react";
// import { useTranslate } from "./TranslateContext";

// // Define the shape of the Google Translate API
// interface GoogleTranslate {
//   TranslateElement: new (config: {
//     pageLanguage: string;
//     includedLanguages: string;
//     layout: number; // LaAyout is likely a numeric value
//     defaultLanguage: string;
//   }, elementId: string) => void;
// }

// interface GoogleWindow extends Window {
//   google: {
//     translate: GoogleTranslate;
//   };
//   googleTranslateInit: () => void;
// }

// const GoogleTranslate: React.FC = () => {
//   const { isTranslateVisible } = useTranslate(); // Use context to control visibility

//   useEffect(() => {
//     const googleWindow = window as unknown as GoogleWindow;

//     googleWindow.googleTranslateInit = () => {
//       if (!googleWindow.google?.translate?.TranslateElement) {
//         setTimeout(googleWindow.googleTranslateInit, 100);
//       } else {
//         new googleWindow.google.translate.TranslateElement(
//           {
//             pageLanguage: "en",
//             includedLanguages:
//               "en,hi,pa,sa,mr,ur,bn,ta,te,kn,ml,gu,or,as,ne,si,ks,ma,sd,bo",
//             layout: 1, // Numeric value for layout (use 1 for horizontal)
//             defaultLanguage: "en",
//           },
//           "google_element"
//         );
//       }
//     };

//     const loadGoogleTranslateScript = () => {
//       if (!document.getElementById("google_translate_script")) {
//         const script = document.createElement("script");
//         script.type = "text/javascript";
//         script.src =
//           "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
//         script.id = "google_translate_script";
//         script.onerror = () =>
//           console.error("Error loading Google Translate script");
//         document.body.appendChild(script);
//       }
//     };

//     loadGoogleTranslateScript();

//     if (googleWindow.google && googleWindow.google.translate) {
//       googleWindow.googleTranslateInit();
//     }

//     return () => {
//       const script = document.getElementById("google_translate_script");
//       if (script) {
//         document.body.removeChild(script);
//       }
//     };
//   }, []);

//   return (
//     <div
//       id="google_element"
//       className={`google-translate-container fixed top-16 right-4 z-50 ${isTranslateVisible ? "" : "hidden"}`}
//     ></div>
//   );
// };

// export default GoogleTranslate;
