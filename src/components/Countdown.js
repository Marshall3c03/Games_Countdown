import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import '../App.css'

const Countdown = ()=>{ 
  const listOfTitles = {
    [nanoid()]: {
      title: "Elex II",
      releaseDate: "March 1, 2022 00:00:01",
      delay: 1000,
      isRunning: true,
      image: "https://i.imgur.com/A4IXzd0.png"
    },
    [nanoid()]: {
      title: "Babylon's Fall",
      releaseDate: "March 3, 2022 00:00:01",
      delay: 1000,
      isRunning: true,
      image: "https://i.imgur.com/JsGyupZ.png"
    },
    [nanoid()]: {
      title: "Gran Turismo 7",
      releaseDate: "March 4, 2022 00:00:01",
      delay: 1000,
      isRunning: true,
      image: "https://i.imgur.com/co8JZ8t.png"
    },
    [nanoid()]: {
      title: "WWE 2k22",
      releaseDate: "March 11, 2022 00:00:01",
      delay: 1000,
      isRunning: true,
      image: "https://i.imgur.com/3Kq8Vtl.png"
    },
    [nanoid()]: {
      title: "Grand Theft Auto V",
      releaseDate: "March 15, 2022 00:00:01",
      delay: 1000,
      isRunning: true,
      image: "https://i.imgur.com/Lf4jUEm.png"
    },
    [nanoid()]: {
      title: "GhostWire: Tokyo",
      releaseDate: "March 25, 2022 00:00:01",
      delay: 1000,
      isRunning: true,
      image: "https://i.imgur.com/cBGE6cT.png"
    },
    [nanoid()]: {
      title: "Tiny Tina's Wonderlands",
      releaseDate: "March 25, 2022 00:00:01",
      delay: 1000,
      isRunning: true
    },
    [nanoid()]: {
      title: "LEGO Star Wars: The Skywalker Saga",
      releaseDate: "April 5, 2022 00:00:01",
      delay: 1000,
      isRunning: true
    },
    [nanoid()]: {
      title: "LEGO Star Wars: The Skywalker Saga",
      releaseDate: "April 5, 2022 00:00:01",
      delay: 1000,
      isRunning: true
    },
    [nanoid()]: {
      title: "Saints Row",
      releaseDate: "August 23, 2022 00:00:01",
      delay: 1000,
      isRunning: true
    },
    [nanoid()]: {
      title: "Test Drive Unlimited Solar Crown",
      releaseDate: "September 22, 2022 00:00:01",
      delay: 1000,
      isRunning: true
    },
    [nanoid()]: {
      title: "Starfield",
      releaseDate: "April 5, 2022 00:00:01",
      delay: 1000,
      isRunning: true
    }
  };
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
    }, [delay, allGames]);
  }

  // // Update the count down every 1 second
  useInterval(() => {
    const resolvedGames = {};

    Object.keys(allGames).forEach((gameId) => {
      const game = allGames[gameId];
      if (game.isRunning == false) return

      // Get today's date and time
      var now = new Date().getTime();
       // Set the date we're counting down to
      var distance = new Date(game.releaseDate).getTime();

      var realDistance = (distance - now);
      
      var days = Math.floor(realDistance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((realDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((realDistance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((realDistance % (1000 * 60)) / 1000);
  
      resolvedGames[gameId] = {
        ...game, 
        countdownDays: days,
        countdownHours: hours,
        countdownMinutes: minutes,
        countdownSeconds: seconds, 
        countdownDistance: realDistance,
        ...realDistance <= 0 ? { delay: 0, isRunning: false, countdownDistance: -1 } : {}
      };
    });

    setAllGames(resolvedGames);  
  }, 1000);

 

  return(
    <div>
      {
        Object.keys(allGames).map(gameId => {
          const game = allGames[gameId];
          return game?.countdownDistance < 0 
            ? <p>Sorry that's Expired</p> 
            : (
              <div>
                <p>{game.title}: {game.countdownDays}d {game.countdownHours}h {game.countdownMinutes}m {game.countdownSeconds}s</p>
                <img className="game-banner" src={game?.image}/>
              </div>
            )
            
        })
      }
    </div>
  )
}

export default Countdown;