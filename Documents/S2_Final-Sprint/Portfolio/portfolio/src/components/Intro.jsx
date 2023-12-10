import { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import useFade from '../hooks/useFade';
import purplecloud from "../images/purplesmoke.png";
import care2codelogo from "../images/c2cLogo.png";
import "../styles/index.css";
import "../styles/transitions.css";

const Intro = () => {
  const { inProp, fadeStyles, fadeIn, fadeOut } = useFade(false);
  const introRef = useRef(null);

  useEffect(() => {
    // Fade in initially
    fadeIn();

    // Set a timeout to keep the component visible for 5 seconds before fading out
    const visibilityDuration = setTimeout(() => {
      // After 5 seconds, initiate the fadeOut
      fadeOut();
    }, 5000); // Keep the component visible for 5 seconds

    return () => {
      clearTimeout(visibilityDuration); // Clear the timeout on component unmount or re-render
    };
  }, [fadeIn, fadeOut]);

  return (
    <CSSTransition
      in={inProp}
      timeout={1000}
      classNames="fade"
      nodeRef={introRef}
    >
      {(state) => (
        <div className={`intro ${state}`} ref={introRef}>
          <img src={purplecloud} alt="purple cloud" className={`purplecloud ${state}`} style={{ ...fadeStyles }} />
          <img src={care2codelogo} alt="care 2 code logo" className={`c2cLogo ${state}`} style={{ ...fadeStyles }} />
        </div>
      )}
    </CSSTransition>
  );
};

export default Intro;
