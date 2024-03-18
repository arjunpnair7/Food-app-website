'use client'

import React, { useEffect, useState } from 'react'
import { HoverEffect } from "../components/ui/card-hover-effect";
import { useWebSocket } from "../WebSocketContext";
import { useRouter } from 'next/navigation'


const page = () => {

  const { stompClient, setRoomCode, subscribeToRoom, data, roomCode} = useWebSocket();
  const [projects, setProjects] = useState([]);
  const router = useRouter()

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

      const handleSubmit = () => {
        stompClient.send(`/app/room/${roomCode}/vote-again`, {}, null);
        // router.push("/vote");
      }

      

      useEffect(() => {
        if (data) {
          console.log(data.data);
          if (data.type == 'DONE_VOTING') {
            const temp = data.data.map(item => ({
              name: item.name,
              id: item.id,
              description: item.name,
              link: item.name,
              img_link: item.image_url,
              rating: item.rating,
              distance: item.distance,
              url: item.url,
              price: item.price,
              phone: item.phone,
              checked: false,
            }));
            setProjects(temp);
          } else if (data.type == 'VOTE_AGAIN') {
            console.log("VOTE AGAIN: LINE 52; FROM /RESULTS")
            router.push("/vote");
          }
        }
      }, [data]);

    return (
      <div className="max-w-5xl mx-auto px-8">
        <h1 className="py-6 font-bold text-3xl text-center text-white text-bold">Here are the results
        </h1>
        <HoverEffect handleCheckboxChange={handleCheckboxChange} items={projects} />
        <div className="flex items-center justify-center">
          <button className="btn btn-primary btn-wide text-3xl" onClick={handleSubmit}>Vote Again</button>
        </div>
      </div>
        // <div className="max-w-5xl mx-auto px-8 text-white">
        //   <h1>This is the results screen where the final results will be displayed</h1>
        // </div>
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