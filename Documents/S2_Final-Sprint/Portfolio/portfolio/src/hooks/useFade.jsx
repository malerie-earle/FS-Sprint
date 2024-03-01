import { useState } from "react";
import "../styles/index.css";
import "../styles/transitions.css";
const useFade = (initialState = true, duration = 1000) => {
  const [inProp, setInProp] = useState(initialState);

  const fadeIn = () => {
    setInProp(true);
  };

  const fadeOut = () => {
    setInProp(false);
  };

  return {
    inProp,
    fadeStyles: {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: inProp ? 1 : 0,
    },
    fadeIn,
    fadeOut,
  };
};

export default useFade;
