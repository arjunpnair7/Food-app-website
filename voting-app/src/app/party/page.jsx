'use client';
import React, { useEffect, useState} from 'react'
import {Stomp} from '@stomp/stompjs';
import { useSearchParams } from 'next/navigation'
import { useWebSocket } from '../WebSocketContext';
import { useRouter } from 'next/navigation'


// var stompClient;
// stompClient.send(`/app/room/${roomCode}/get-data`, {}, {
//   latitude: location.latitude,
//   longitude: location.longitude
// });

const page = () => {
    const [partyMembers, setPartyMembers] = useState([]);
    const [location, setLocation] = useState();
    const [listItems, setListItems] = useState([]);
    const router = useRouter()
    // const [stompClient] = useWebSocket();
    const { stompClient, setRoomCode, subscribeToRoom, data, tempCode} = useWebSocket();
    let subscription;
    // let listItems;
    
    const roomCode = 777;
    const userName = 'abc'
    const [searchParams] = useSearchParams();
    // const roomCode = searchParams.get('code');
    // const userName = searchParams.get('username');

    useEffect(() => {
      if (data) {
        console.log('RECEIVED DATA FROM LINE 29: ' + data.type);
        console.log(data.data);
        if (data.type == 'USER_LIST') {
          setPartyMembers(data.data);
        } else if (data.type == 'DATA') {
          console.log("RECEIVED API DATA: ");
          console.log(data.data);
          // console.log(data.data.businesses[0].name);
          router.push("/vote");
        }
      }
    }, [data]);

    const handleStartVoting = (event) => {
      // Add your button click logic here
      console.log("Start Voting Button Clicked");
      console.log({
        latitude: location.latitude,
        longitude: location.longitude
      });
      stompClient.send(`/app/room/${roomCode}/get-data`, {}, JSON.stringify({
        latitude: location.latitude,
        longitude: location.longitude
      }));
      console.log("LINE 25");
      //Start loading screen animation here
      //Navigate to /vote
      // router.push(`/vote`);
    };

    // console.log("MEMBERS: " + partyMembers);

    useEffect(() => {
      console.log("UPDATING PARTY MEMBERS");
      console.log(partyMembers);

      if('geolocation' in navigator) {
        // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            setLocation({ latitude, longitude });
            console.log("COORDS: " + coords);
        })
    }

      const newListItems = partyMembers.map((member) =>
        <li key={member} className="my-20 text-white font-bold text-7xl">
          {member}
        </li>
      );
      setListItems(newListItems);
       
    }, [partyMembers]);

  
    //   useEffect(() => {
    //     // setRoomCode(roomCode);
    //     if('geolocation' in navigator) {
    //         // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
    //         navigator.geolocation.getCurrentPosition(({ coords }) => {
    //             const { latitude, longitude } = coords;
    //             setLocation({ latitude, longitude });
    //             console.log("COORDS: " + coords);
    //         })
    //     }
    // }, []);

    useEffect(() => {
      // subscribeToRoom(roomCode);
      if (stompClient) {
        console.log("CALLING subscribeToRoom");
        subscribeToRoom(roomCode);
        stompClient.send(`/app/room/${roomCode}/add-user`, {}, userName);
      }
      // if (stompClient) {
        // console.log("LINE 46: " + stompClient);
        //  subscription = stompClient.subscribe('/room/' + roomCode, (message) => {
          
        //   console.log("LINE 67");
        //   console.log('Received message:', message.body);
        //   const webSocketMessage = JSON.parse(message.body);
        
        //   if (webSocketMessage.type == 'USER_LIST') {
        //       console.log("Updated User List");
        //       setPartyMembers(webSocketMessage.data);
        //   } else if (webSocketMessage.type == 'DATA') {
        //       console.log("Getting restaurant data")
        //       console.log(webSocketMessage.data);
              
        //   }
        // });
        // stompClient.send(`/app/room/${roomCode}/add-user`, {}, userName);
      // }  
    }, [stompClient]);


  return (
    
    <div className="hero min-h-screen bg-base-200 flex items-start justify-center pt-64">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-7xl font-bold text-white">Share this code with your group: </h1>
            <h1 className="text-7xl font-bold my-8 text-white">{roomCode} </h1>

            <div className="divider divider-neutral"></div>

            <ul className="font-bold text-4xl">
                  {listItems}
            </ul>

            <button onClick={handleStartVoting} className="btn btn-primary btn-lg text-4xl">Start Voting</button>
          </div> 
        </div>
      </div>
  )
}

export default page