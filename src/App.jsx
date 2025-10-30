import './styles/style.css'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import bootstrap from 'bootstrap/dist/js/bootstrap.js';
import React from 'react';
import ElementFactory from './components/elementFactory';
import { createGeometryDashLevel } from './components/gmd';
import { createFaceitStats } from './components/faceit';
import { createPost } from './components/post';
import { FullscreenPost } from './components/fullscreenPost';
import { createBestPostComponent } from './components/bestPostComponent';


import logo from './assets/logo.png'
import gdLogo from './assets/gd-logo.png'
import blog_best from './assets/blog_best.png'


async function getData(link) {
  let data = await fetch(link);
  return await data;
  // console.log(await window.stats.json());
}

function fillStatsTable(fn, callback) {
  let elements = [];
  let resolves = [];

  for (let i = 0; i < 6; i++) {
    elements.push(new Promise((resolve) => (resolves[i] = resolve)))
  }

  for (let i = 0; i < 5; i++) {
    elements[i] = fn(i, elements[i])
  }
  elements[5] = createFaceitStats(5, elements[5])

  callback.then(result => result.json()).then(result => {
    // console.log(result["gd"])
    resolves.forEach(resolve => resolve(result))
  })
  return elements
}

function fillPostsTable(fn, callback) {
  let elements = [];
  let resolves = [];

  for (let i = 0; i < 10; i++) {
    elements.push(new Promise((resolve) => (resolves[i] = resolve)))
  }

  for (let i = 0; i < 10; i++) {
    elements[i] = fn(i, elements[i])
  }

  callback.then(result => result.json()).then(result => {
    resolves.forEach(resolve => resolve(result))
  })
  return elements
}

function fillBestPostsTable(fn, callback) {
  let elements = [];
  let resolves = [];

  for (let i = 0; i < 10; i++) {
    elements.push(new Promise((resolve) => (resolves[i] = resolve)))
  }

  for (let i = 0; i < 10; i++) {
    elements[i] = fn(i, elements[i])
  }

  callback.then(result => result.json()).then(result => {
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
    const linkParams = new URLSearchParams(document.location.search)
    const post = linkParams.get("post")
    console.log(post)
    if (post == null) {
      var main_element = <ElementFactory
        callback={getData("http://balls.monster:2052/posts")}
        elementClassCreateFunction={createPost}
        fillFunction={fillPostsTable}
        title="Blog"
        image={undefined}
        imageAlt=""
        tooltipTitle=""
        nodeco={true}
      />
    }
    else {
      var main_element = <FullscreenPost id={post} />
    }

    return (
      <>
        <main>
          <div className="navbar px-5 py-2">
            <a className="navbar-brand" href="/">
              <img src={logo} alt="logo" width="50px" height="50px" className="me-2" /> balls.monster </a>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-xl-4 d-none d-xl-inline-block px-2">
                <div className="content-column left px-1">
                  <ElementFactory
                    callback={getData("http://balls.monster:2052/")}
                    elementClassCreateFunction={createGeometryDashLevel}
                    fillFunction={fillStatsTable}
                    image={gdLogo}
                    imageAlt="geometry dash logo"
                    tooltipTitle="Moje najtrudniejsze poziomy w grze Geometry Dash"
                    title="GD Hardest" />
                </div>
              </div>
              <div className="col-xl-6 col-lg-8 px-2 fixed-height">
                <div className="content-column middle px-1">
                  {main_element}
                </div>
              </div>
              <div className="d-none d-lg-inline-block col-xl-2 col-lg-4 px-2">
                <div className="content-column right px-1">
                  <ElementFactory
                    callback={getData("http://balls.monster:2052/bestposts")}
                    elementClassCreateFunction={createBestPostComponent}
                    fillFunction={fillBestPostsTable}
                    title="Best"
                    image={blog_best}
                    imageAlt="konkuter"
                    tooltipTitle="Posty posortowane pod względem wyświetleń"
                  // nodeco = {true}
                  />
                  <div className='d-xl-none'>
                    <ElementFactory
                      callback={getData("http://balls.monster:2052/")}
                      elementClassCreateFunction={createGeometryDashLevel}
                      fillFunction={fillStatsTable}
                      image={gdLogo}
                      imageAlt="geometry dash logo"
                      tooltipTitle="Moje najtrudniejsze poziomy w grze Geometry Dash"
                      title="GD Hardest" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer>
          To jest moja własna praca, wykorzystane zostały tylko szablony stron<sup><a href="#" data-bs-toggle="tooltip" data-bs-placement="top"
                            title="(brak)"
                            data-bs-offset="0,-5"> 1</a></sup> oraz dokumentacja bootstrapa<sup><a href="#" data-bs-toggle="tooltip" data-bs-placement="top"
                            title="oraz dokumentacja innych bibliotek, takich jak React.js i Pixi.js, dokumentacja modułów better-sqlite3, Express.js, oraz dokumentacja api faceit.com lub gddl, o czym się nie mówi"
                            data-bs-offset="0,-5"> 2</a></sup> <br/> Bolesław Bondyra
        </footer>
        </main>
        
      </>
    )
  }

}

export default App
