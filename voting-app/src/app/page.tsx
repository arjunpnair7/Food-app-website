'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { TypewriterEffect } from "./components/ui/typewriter-effect";

export default function Home() {
  const [username, setUsername] = useState('');
  const [inputCode, setInputCode] = useState('');
  const router = useRouter()

  const handleJoinPartyClick = () => {
    const urlParams = new URLSearchParams({
      code: inputCode,
      username: username
    });
    router.push(`/party/?${urlParams}`);
    // router.push(`/party/?code=` + inputCode + '&username=' + username);
  };

  const handleCreateNewPartyClick = async() => {
    //api request, code
    console.log("LINE 15");
    // const apiUrl = 'http://localhost:8080/new-party';
    const apiUrl = 'https://food-app-backend-izbg.onrender.com/new-party'
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((responseData) => {
        router.push(`/party/?code=` + responseData + '&username=' + username);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  const words = [
    {
      text: "Tired",
      className: "text-white"
    },
    {
      text: "of",
      className: "text-white"
    },
    {
      text: "the",
      className: "text-white"
    },
    {
      text: "where",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "should",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "we",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "eat",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "struggle?",
      className: "text-blue-500 dark:text-blue-500",
    }
  ];

  return (
    <main> 
      <div className="hero min-h-screen bg-base-200 flex items-start justify-center pt-64 text-white">
        
    
          <div className="hero-content text-center">
          
          <div className="max-w-xl">

            {/* <h1 className="text-6xl font-bold">Tired of the "where should we eat?" struggle?</h1> */}
            <TypewriterEffect words={words} />
            <p className="py-6 font-bold text-3xl ">We can help. Create a party, share a code, and discover your next culinary adventure together.</p>

            <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" className="ml-2 input-bordered input-md max-w-xs mt-8 w-48 mr-2" />

            <div>
                <button onClick={handleCreateNewPartyClick} className="btn btn-primary mt-16 mb-4">Create Party</button>
            </div>

            <div>
              <h1 className="py-6 font-bold text-3xl">Or ...</h1>
            </div>

            <input type="text" onChange={(e) => setInputCode(e.target.value)}placeholder="Enter join code" className="ml-2 input-bordered input-md max-w-xs mt-8 w-48 mr-2" />
            <button onClick={handleJoinPartyClick} className="btn btn-primary">Submit</button>
          </div>
        </div>
        </div>
        
    </main>
  );
}


