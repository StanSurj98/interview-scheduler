import { useState, useEffect } from 'react';

const useVisualMode = (initial) => {
  // Takes an initial mode, sets the state to it, set mode to an array so that we can access previous mode?
  const [mode, setMode] = useState(initial);

  const modeArr = []

  // Creating a transition function that will take us to the next mode declared and change our state
  const transition = (nextMode) => {
    modeArr.push(mode);
    setMode(nextMode);
  };


  // Ultimately, we want to return an object with that mode as its property
  return { mode: mode, transition }; // return as key:val so that tests/components can access it later
}

export default useVisualMode;