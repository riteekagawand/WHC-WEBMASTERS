// // TranslateContext.tsx
// import React, { createContext, useContext, useState, ReactNode } from "react";

// interface TranslateContextType {
//   isTranslateVisible: boolean;
//   toggleTranslate: () => void;
// }

// const TranslateContext = createContext<TranslateContextType | undefined>(
//   undefined
// );

// export const TranslateProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [isTranslateVisible, setIsTranslateVisible] = useState<boolean>(false);

//   const toggleTranslate = () => {
//     setIsTranslateVisible((prev) => !prev);
//   };

//   return (
//     <TranslateContext.Provider value={{ isTranslateVisible, toggleTranslate }}>
//       {children}
//     </TranslateContext.Provider>
//   );
// };

// export const useTranslate = () => {
//   const context = useContext(TranslateContext);
//   if (!context) {
//     throw new Error("useTranslate must be used within a TranslateProvider");
//   }
//   return context;
// };