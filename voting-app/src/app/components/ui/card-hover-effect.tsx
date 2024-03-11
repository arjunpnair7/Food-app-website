"use client";

import { cn } from "../../../../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
  handleCheckboxChange
}: {

  items: {
    id: string;
    name: string;
    description: string;
    link: string;
    img_link: string;
    rating: number;
    distance: number;
    url: string;
    price: string;
    phone: string;
    checked: false;
  }[];
  className?: string;
  handleCheckboxChange: (index: number) => void; // New callback function
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  
  const handleButtonClick = (event) => {
    // Add your button click logic here
    event.preventDefault();
    console.log("button inside card click");
  };

  const handleCardClick = () => {
    // Add your card click logic here
    console.log('Card clicked');
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10 m-100",
        className
      )}
    >
      
      {items.map((item, idx) => (
        <Link
          href={item?.url}
          key={item?.link}
          className="relative group  block p-2 h-full w-full lg:w-9/10"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          target="_blank"
          onClick={handleCardClick}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.name}</CardTitle>
            <div className="relative w-full h-48"> {/* Set a fixed height for the image container */}
              <img src={item.img_link} className="absolute inset-0 w-full h-full object-cover" /> {/* Use object-cover to ensure the image covers the container */}
          </div>
            <div className="flex flex-row my-4 justify-between">
                <h1 className="text-white">{item.rating}/5.0</h1>
                <h1 className="text-white">{item.phone}</h1>
            </div>
            <div className="flex flex-row my-4 justify-between">
                <h1 className="text-white">{(item.distance * 0.000621371).toFixed(2)} miles</h1>
                <h1 className="text-white">{item.price}</h1>
            </div>

          <div className="flex items-center justify-center">
            <input type="checkbox" onChange={() => handleCheckboxChange(idx)} className="checkbox checkbox-primary checkbox-lg" />
 
          </div>
            
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-3 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 p-5",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-2 text-center mb-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};


