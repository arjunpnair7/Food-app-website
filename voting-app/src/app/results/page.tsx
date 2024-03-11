'use client'

import React from 'react'
import { HoverEffect } from "../components/ui/card-hover-effect";


const page = () => {

    const handleCheckboxChange = (index) => {
        // let updated_projects = projects.map((element, idx) => {
        //   if (idx === index) {
        //     // Toggle the checked property of the object at the specified index
        //     return { ...element, checked: !element.checked };
        //   }
        //   return element; // Return unchanged element for other indices
        // });
        // setProjects(updated_projects);
      };

    return (
        <div className="max-w-5xl mx-auto px-8 text-white">
          <h1>This is the results screen</h1>
        </div>
      );
}

export default page

// export const projects = [
//     {
//       title: "Stripe",
//       description:
//         "A technology company that builds economic infrastructure for the internet.",
//       link: "https://stripe.com",
//     },
//     {
//       title: "Netflix",
//       description:
//         "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
//       link: "https://netflix.com",
//     },
//     {
//       title: "Google",
//       description:
//         "A multinational technology company that specializes in Internet-related services and products.",
//       link: "https://google.com",
//     },
//     {
//       title: "Meta",
//       description:
//         "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
//       link: "https://meta.com",
//     },
//     {
//       title: "Amazon",
//       description:
//         "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
//       link: "https://amazon.com",
//     },
//     {
//       title: "Microsoft",
//       description:
//         "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
//       link: "https://microsoft.com",
//     },
//   ];