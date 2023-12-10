import care2code from "../images/care2codebanner.png";
import care2code2 from "../images/care2code.png";
import care2code3 from "../images/care2code3.png";
import care2codelogo from "../images/c2cLogo.png";
import '../styles/transition.css'; 
import '../styles/index.css'; 
const Home = () => {
  return (
    <div>
      <div className="App">
      <img src = {care2code} alt = "care 2 code banner" className = "care2code" />
      <img src = {care2code2} alt = "care 2 code banner" className = "care2code2" />
      <img src = {care2code3} alt = "care 2 code banner" className = "care2code3" />
      <img src = {care2codelogo} alt = "care 2 code logo" className = "care2codelogo" />
    </div>
    </div>
  )
}

export default Home;
