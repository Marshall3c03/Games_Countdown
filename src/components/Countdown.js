import React, { useState, useEffect, useRef } from 'react'

const Countdown = ()=>{

  const [countdown1, setCountDown1] = useState({
    title: "Elex II",
    countdownDays: 0,
    countdownHours: 0,
    countdownMinutes: 0,
    countdownSeconds: 0,
    countdownDistance: 0,
    delay: 1000,
    isRunning: true
  })

  // const [countdownDays, setCountdownDays] = useState(0)
  // const [countdownHours, setCountdownHours] = useState(0)
  // const [countdownMinutes, setCountdownMinutes] = useState(0)
  // const [countdownSeconds, setCountdownSeconds] = useState(0)
  // const [countdownDistance, setCountdownDistance] = useState(0)
  // const [delay, setDelay] = useState(1000);
  // const [isRunning, setIsRunning] = useState(true);
 

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

    // Set the date we're counting down to
    var countDownDate = new Date("March 1, 2021 00:00:01").getTime();

    // Get today's date and time
    var now = new Date().getTime();
      
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
      
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //Setting state for all data
    setCountDown1({...countdown1,
      countdownDays: days,
      countdownHours: hours,
      countdownMinutes: minutes,
      countdownSeconds: seconds,
      countdownDistance: distance
    });

    // If the count down is over, write some text 
    if (distance <= 0) {
      setCountDown1({...countdown1,
        delay: 0,
        isRunning: false,
        countdownDistance: -1
      })
    }

  }, countdown1.isRunning ? countdown1.delay : null);

  return(
    <div>
      <p>I am a countdown</p>
      {countdown1.countdownDistance < 0 ? <p>Sorry that's Expired</p> : (<p>{countdown1.countdownDays}d {countdown1.countdownHours}h {countdown1.countdownMinutes}m {countdown1.countdownSeconds}s</p>)}
      {/* { distance < 0 <p>{countdownDays}d {countdownHours}h {countdownMinutes}m {countdownSeconds}s</p> ? } */}
    </div>
  )
}

export default Countdown;