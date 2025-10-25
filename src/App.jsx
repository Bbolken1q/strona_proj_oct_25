import './style.css'
import './components.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import logo from './assets/logo.png'
import React from 'react';
import ElementFactory from './components/elementFactory';
import {createGeometryDashLevel, GeometryDashLevel} from './components/gmd';

async function getData() {
  let stats = await fetch("http://balls.monster:2052/");
  return await stats;
  // console.log(await window.stats.json());
}

function App() {
  // let data = getData().then(result => {resolvedData = result.json()})
  // while (window.stats === undefined) {}
  return (
      <main>
        <div className="navbar px-5 py-2">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="logo" width="50px" height="50px" className="me-2" /> balls.monster </a>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-4 px-2">
              <div className="content-column left px-1">
                <ElementFactory
                  elementClassCreateFunction={createGeometryDashLevel}
                  fillFunction={(fn) => {
                    let elements = [];
                    let resolvedData = null;
                    let data = getData().then(result => result.json()).then(result => {
                      for (let i = 0; i < 5; i++) {
                      elements.push(fn("a", i))
                      }
                      return elements;
                    });
                    console.log("asd")
                    
                  }} />
                Allstar <br/>
                
              </div>
            </div>
            <div className="col-lg-6 px-2">
              <div className="content-column middle px-1">
                testtest
              </div>
            </div>
            <div className="col-lg-2 px-2">
              <div className="content-column right px-1">
                testtest
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}

export default App
