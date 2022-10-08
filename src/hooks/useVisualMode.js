import { useState, useEffect } from 'react';

const useVisualMode = (initial) => {
  // Takes an initial mode, sets the state to it
  const [mode, setMode] = useState(initial);
  // We need a state that is an array to keep track of all modes we've been through. call it history
  const [history, setHistory] = useState([initial]);


  // Adds nextMode to history state array, important that we useState for this too, so it persists
  const transition = (nextMode, replace = false) => {
    // If replace is truthy
    if (replace) {
      setMode(prev => nextMode);
    } else {
      // grabbing whole copy of history array, add on the current mode
      setHistory(prev => [...prev, mode]);
      // then setMode from previous state, to next mode
      setMode(prev => nextMode);
    }
  };

  const back = () => {
    // Limit, don't allow it to go back past the initial mode in our history
    if (history.length === 1) return [initial];
    // using .pop() returns the last element REMOVING it from the history array - we mutate it
    setMode(prev => history.pop())
    // then making sure we update history state from prev to this (do we need to? since it's mutating?)
    setHistory(prev => history)
  }

  // Ultimately, we want to return an object with that mode as its property
  return { mode: mode, transition, back }; // return as key:val so that tests/components can access it later
};

export default useVisualMode;