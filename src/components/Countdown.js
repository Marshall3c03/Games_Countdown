import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

const listOfTitles = [
  {
    id: nanoid(),
    title: "Elex II",
    countdownDays: 0,
    countdownHours: 0,
    countdownMinutes: 0,
    countdownSeconds: 0,
    countdownDistance: 0,
    releaseDate: "March 1, 2022 00:00:01",
    delay: 1000,
    isRunning: true
  },
  {
    id: nanoid(),
    title: "Babylon's Fall",
    countdownDays: 0,
    countdownHours: 0,
    countdownMinutes: 0,
    countdownSeconds: 0,
    countdownDistance: 0,
    releaseDate: "March 3, 2022 00:00:01",
    delay: 1000,
    isRunning: true
  },
  {
    id: nanoid(),
    title: "Gran Turismo 7",
    countdownDays: 0,
    countdownHours: 0,
    countdownMinutes: 0,
    countdownSeconds: 0,
    countdownDistance: 0,
    releaseDate: "March 4, 2022 00:00:01",
    delay: 1000,
    isRunning: true
  }
]

const Countdown = ()=>{ 
  const [allGames, setAllGames] = useState(listOfTitles);

  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  // Update the count down every 1 second
  useInterval(() => {
    

    allGames.forEach((game, index) => {

      if (game.isRunning == false) return
      // Get today's date and time
      var now = new Date().getTime();

       // Set the date we're counting down to
      var distance = new Date("January 1, 2022 00:00:01").getTime();
      // var distance = new Date(game.releaseDate).getTime();

      var realDistance = (distance - now);

      // var distance = game.releaseDate
      
      var days = Math.floor(realDistance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((realDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((realDistance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((realDistance % (1000 * 60)) / 1000);
    
      // var game = "countdown" + (index + 1);

      const updatedGame = {
        ...game, 
        countdownDays: days,
        countdownHours: hours,
        countdownMinutes: minutes,
        countdownSeconds: seconds, 
        countdownDistance: realDistance,
        ...realDistance <= 0 ? { delay: 0, isRunning: false, countdownDistance: -1 } : {}
      };
      
      setAllGames([
        ...allGames.filter(g => g.id !== game.id),
        updatedGame
      ])
    });
    
  }, 1000);

  const handleclick = ()=>{
    console.log(allGames)
  }

  return(
    <div>
      <button onClick={handleclick}>Click Me</button>
      {allGames[0].countdownDistance < 0 ? <p>Sorry that's Expired</p> : (<p>{allGames[0].title}: {allGames[0].countdownDays}d {allGames[0].countdownHours}h {allGames[0].countdownMinutes}m {allGames[0].countdownSeconds}s</p>)}
      {allGames[1].countdownDistance < 0 ? <p>Sorry that's Expired</p> : (<p>{allGames[1].title}: {allGames[1].countdownDays}d {allGames[1].countdownHours}h {allGames[1].countdownMinutes}m {allGames[1].countdownSeconds}s</p>)}
      {allGames[2].countdownDistance < 0 ? <p>Sorry that's Expired</p> : (<p>{allGames[2].title}: {allGames[2].countdownDays}d {allGames[2].countdownHours}h {allGames[2].countdownMinutes}m {allGames[2].countdownSeconds}s</p>)}
    </div>
  )
}

export default Countdown;