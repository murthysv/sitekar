import React from 'react';
import { Element } from 'react-scroll';
import Navbar from './Navbar';
import circuit from './img/circuit1.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
     
      <header className="Home">
        <img src={circuit} className="App-logo" alt="logo" />
        <div className="overlay-text">
            <p>Hi, I'm Shrikar - nice to meet you!</p>
        </div>
      </header>


      <Element name="Projects" className="element">
        <div className="section">
          <h1>Projects</h1>
          <p>Here are some of my projects.</p>
        </div>
      </Element>

      <Element name="Resume" className="element">
        <div className="section">
          <h1>Resume</h1>
          <p>View my professional experience and skills.</p>
        </div>
      </Element>

      <Element name="About" className="element">
        <div className="section">
          <h1>About</h1>
          <p>Learn more about me.</p>
        </div>
      </Element>

      <Element name="Hobbies" className="element">
        <div className="section">
          <h1>Hobbies</h1>
          <p>These are some of my hobbies.</p>
        </div>
      </Element>
    </div>
  );
}

export default App;
