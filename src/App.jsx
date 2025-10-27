import './style.css'
import './components.css'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import bootstrap from 'bootstrap/dist/js/bootstrap.js';
import logo from './assets/logo.png'
import React from 'react';
import ElementFactory from './components/elementFactory';
import {createGeometryDashLevel} from './components/gmd';
import { Faceit } from './components/faceit';

async function getData() {
  let stats = await fetch("http://balls.monster:2052/");
  return await stats;
  // console.log(await window.stats.json());
}

function fill(fn, callback) {
  let elements = [];
  let resolves = [];
  
  for (let i = 0; i < 5; i++){ 
    elements.push(new Promise((resolve) => (resolves[i] = resolve)))
  }

  for (let i = 0; i < 5; i++){
    elements[i] = fn(i, elements[i])
  }

  callback.then(result => result.json()).then(result => {
    // console.log(result["gd"])
    resolves.forEach(resolve => resolve(result))
  })
  return elements
}

class App extends React.Component {
  // let data = getData().then(result => {resolvedData = result.json()})
  // while (window.stats === undefined) {}
  
  componentDidMount() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
  }

  render() {
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
                  callback={getData().then()}
                  elementClassCreateFunction={createGeometryDashLevel}
                  fillFunction={fill} 
                  title = "GD Hardest"/>

                <Faceit callback={getData()}/>
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
  
}

export default App
