import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react';
import easyDemonFace from '../assets/gd_demon_faces/EasyDemon.png';
import mediumDemonFace from '../assets/gd_demon_faces/MediumDemon.png';
import hardDemonFace from '../assets/gd_demon_faces/HardDemon.png';
import insaneDemonFace from '../assets/gd_demon_faces/InsaneDemon.png';
import extremeDemonFace from '../assets/gd_demon_faces/ExtremeDemon.png';

import { DataComponent } from './dataElement';

var demonFaces = {
    "Easy Demon": easyDemonFace,
    "Medium Demon": mediumDemonFace,
    "Hard Demon": hardDemonFace,
    "Demon": hardDemonFace,
    "Insane Demon": insaneDemonFace,
    "Extreme Demon": extremeDemonFace
}

function createGeometryDashLevel(unique_key, callback) {
    return(
        <GeometryDashLevel callback={callback} key={unique_key} id={unique_key}/>
    )
}
class GeometryDashLevel extends DataComponent {
    constructor(props) {
        super(props)
        this.arrayName = "gd"
        this.state = {
            loading: true,
            data: null
        }
    }
    
    render() {
        if (this.state.loading === true) {
            return (
                <div className='geometry-dash-level'> LOADING... </div>
            )
        } else {
            let levelName = JSON.parse(this.state.data[this.arrayName])[this.props.id].name
            let difficultyName = JSON.parse(this.state.data[this.arrayName])[this.props.id].difficulty
            return (
            <div className='geometry-dash-level'>
                    <div className='geometry-dash-level-name'><img className='difficulty-face' src={demonFaces[difficultyName]} alt="difficulty face"/>{" " + levelName}</div>
                    <div className='geometry-dash-level-difficulty'>{difficultyName}</div>
            </div>
        )
        }
    }
}

export {createGeometryDashLevel, GeometryDashLevel};