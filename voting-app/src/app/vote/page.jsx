'use client'
import { useEffect, useState } from "react";
import { useWebSocket } from "../WebSocketContext";
import { HoverEffect } from "../components/ui/card-hover-effect";
import { useRouter } from 'next/navigation'

 
export default function CardHoverEffectDemo() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const { stompClient, setRoomCode, subscribeToRoom, data, roomCode} = useWebSocket();
  
  useEffect(() => {
    if (data) {
      // console.log(data);
      if (data.type == 'DATA') {

        console.log("THIS IS FROM /VOTE: " + data.data.businesses[0].name);
        const temp = data.data.businesses.map(item => ({
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
      } else if (data.type == 'DONE_VOTING') {
        console.log("DONE VOTING, CAN PROCEED TO RESULTS SCREEN");
        router.push(`/results`);
      } else if (data.type == 'VOTE_AGAIN') {
          console.log("LINE 39: VOTE AGAIN: DATA");
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
      }
    }
    // console.log(data.data);
    
  }, [data]);

  const handleSubmit = () => {
    // Get the list of checked restaurants
    const checkedRestaurants = projects.filter((project) => project.checked);
    console.log("Checked Restaurants:", checkedRestaurants);

    // Perform any action with the checked restaurants here
    setIsLoading(true);
    stompClient.send(`/app/room/${roomCode}/done-voting`, {}, JSON.stringify(checkedRestaurants));
  };

  const handleCheckboxChange = (index) => {
    console.log("UPDATE: LINE 71");
    let updated_projects = projects.map((element, idx) => {
      if (idx === index) {
        // Toggle the checked property of the object at the specified index
        return { ...element, checked: !element.checked };
      }
      return element; // Return unchanged element for other indices
    });
    setProjects(updated_projects);
  };

  let content;
  if (!isLoading) {
    content = <div className="max-w-5xl mx-auto px-8">
    <h1 className="py-6 font-bold text-3xl text-center text-white text-bold">Check the Restaurants you are interested in
    </h1>
    <HoverEffect handleCheckboxChange={handleCheckboxChange} items={projects} />
    <div className="flex items-center justify-center">
      <button className="btn btn-primary btn-wide text-3xl" onClick={handleSubmit}>Submit</button>
    </div>
  </div>;
  } else {
    content = <h1 className="py-6 font-bold text-3xl text-center text-white text-bold">Waiting for friends to finish voting...
    </h1>;
  }
   
  return (
    <div>
      {content}
    </div>
    
  );
}

