import React, { useState, useEffect, useRef } from 'react'

const Countdown = ()=>{

  const [countdown1, setCountDown1] = useState({
    title: "Elex II",
    countdownDays: 0,
    countdownHours: 0,
    countdownMinutes: 0,
    countdownSeconds: 0,
    countdownDistance: 0,
    releaseDate: "March 1, 2022 00:00:01",
    delay: 1000,
    isRunning: true
  })

  const [countdown2, setCountDown2] = useState({
    title: "Babylon's Fall",
    countdownDays: 0,
    countdownHours: 0,
    countdownMinutes: 0,
    countdownSeconds: 0,
    countdownDistance: 0,
    releaseDate: "March 3, 2022 00:00:01",
    delay: 1000,
    isRunning: true
  })

  const [countdown3, setCountDown3] = useState({
    title: "Gran Turismo 7",
    countdownDays: 0,
    countdownHours: 0,
    countdownMinutes: 0,
    countdownSeconds: 0,
    countdownDistance: 0,
    releaseDate: "March 4, 2022 00:00:01",
    delay: 1000,
    isRunning: true
  })

  const [allGames, setAllGames] = useState([countdown1,countdown2,countdown3])

  const arrayOfFunctions = [setCountDown1,setCountDown2,setCountDown3]
 

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

    // Get today's date and time
    var now = new Date().getTime();

    // Set the date we're counting down to
    var countDownDate1 = new Date("March 1, 2022 00:00:01").getTime();
    var countDownDate2 = new Date("March 3, 2021 00:00:01").getTime();
    var countDownDate3 = new Date("March 4, 2021 00:00:01").getTime();

    for (let i = 0; i < allGames.length ;i++){
      var distance = allGames[i].releaseDate
      
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
      var game = "countdown" + (i + 1)

      
      arrayOfFunctions[i]({...game, countdownDays: days, countdownHours: hours, countdownMinutes: minutes, countdownSeconds: seconds, countdownDistance: distance})
      // console.log(game)
      // console.log("countdown"+(i+1)+": "+ game)

      // var func = new Function(
      //   "return function " + game + '(){ setCountDown{i}({...countdown1 , countdownDays: days, countdownHours: hours, countdownMinutes: minutes, countdownSeconds: seconds, countdownDistance: distance}) }'
      // )();

      // func()
      

      // functi({...countdown1, countdownDays: days, countdownHours: hours, countdownMinutes: minutes, countdownSeconds: seconds, countdownDistance: distance});
    }
    // Find the distance between now and the count down date
    var distance = countDownDate1 - now;
      
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //Setting state for all data
    setCountDown1({...countdown1, countdownDays: days, countdownHours: hours, countdownMinutes: minutes, countdownSeconds: seconds, countdownDistance: distance});

    // If the count down is over, write some text 
    if (distance <= 0) {
      setCountDown1({...countdown1, delay: 0, isRunning: false, countdownDistance: -1})
    }
  }, countdown1.isRunning ? countdown1.delay : null);

  const handleclick = ()=>{
    console.log(allGames[0].countdownDays)
  }

  return(
    <div>
      <button onClick={handleclick}>Click Me</button>
      {countdown1.countdownDistance < 0 ? <p>Sorry that's Expired</p> : (<p>{countdown1.title}: {countdown1.countdownDays}d {countdown1.countdownHours}h {countdown1.countdownMinutes}m {countdown1.countdownSeconds}s</p>)}
      {countdown2.countdownDistance < 0 ? <p>Sorry that's Expired</p> : (<p>{countdown2.title}: {countdown2.countdownDays}d {countdown2.countdownHours}h {countdown2.countdownMinutes}m {countdown2.countdownSeconds}s</p>)}
      {countdown3.countdownDistance < 0 ? <p>Sorry that's Expired</p> : (<p>{countdown3.title}: {countdown3.countdownDays}d {countdown3.countdownHours}h {countdown3.countdownMinutes}m {countdown3.countdownSeconds}s</p>)}
    </div>
  )
}

export default Countdown;