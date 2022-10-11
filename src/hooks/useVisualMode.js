import { useState } from 'react';

const useVisualMode = (initial) => {
  // We need a state that is an array to keep track of all modes we've been through. call it history
  const [history, setHistory] = useState([initial]);


  // Adds mode to history array, important that we useState for this too, so it persists
  const transition = (mode, replace = false) => {
    // if replace truthy, take the LAST element in history array with prev.slice... and replace that with the mode we're transitioning to 
    // REMINDER - .slice(start, ENDS AND NOT INCLUDES), meaning we want a copy here WITHOUT the last item, then add the mode
    setHistory(prev => replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]);
    // OTHERWISE if replace is false, just add on the mode to the end of the array
  };

  const back = () => {
    // Limit, don't allow it to go back past the initial mode in our history
    if (history.length < 2) return;
    setHistory(prev => [...prev.slice(0, prev.length - 1)]);
    // We just setHistory array to NOT include the previous last item in the array
    // AGAIN - .slice(starts, ENDS and NOT include)
  }

  // ULTIMATELY, always return mode as the absolute last element in the history array
  // return as key:val so that tests/components can access it later
  return { mode: history[history.length - 1], transition, back }; 
};

export default useVisualMode;