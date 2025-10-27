import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react';
import faceitLogo from '../assets/faceit-logo.svg';
import { DataComponent } from './dataElement';

import faceitLevel1Image from '../assets/faceit_levels/1.png';
import faceitLevel2Image from '../assets/faceit_levels/2.png';
import faceitLevel3Image from '../assets/faceit_levels/3.png';
import faceitLevel4Image from '../assets/faceit_levels/4.png';
import faceitLevel5Image from '../assets/faceit_levels/5.png';
import faceitLevel6Image from '../assets/faceit_levels/6.png';
import faceitLevel7Image from '../assets/faceit_levels/7.png';
import faceitLevel8Image from '../assets/faceit_levels/8.png';
import faceitLevel9Image from '../assets/faceit_levels/9.png';
import faceitLevel10Image from '../assets/faceit_levels/10.png';

var faceitLevelImages = {
    1: faceitLevel1Image,
    2: faceitLevel2Image,
    3: faceitLevel3Image,
    4: faceitLevel4Image,
    5: faceitLevel5Image,
    6: faceitLevel6Image,
    7: faceitLevel7Image,
    8: faceitLevel8Image,
    9: faceitLevel9Image,
    10: faceitLevel10Image
}

function createFaceitStats(unique_key, callback) {
    return(
        <Faceit callback={callback} key={unique_key}/>
    )
}

class Faceit extends DataComponent {
    constructor(props) {
        super(props)
        this.arrayName = "faceit"
        this.state = {
            loading: true,
            data: null
        }
    }

    // componentDidMount() {}
    
    render() {
        if (this.state.loading === true) {
            return (
                <div className='faceit-stats'>
                    <div className='faceit-stats-header element-factory-title'
                    data-bs-toggle="tooltip" data-bs-placement="top"
                    title="Statystyki w CS2 na platformie FACEIT"
                    data-bs-offset="0,-5">
                        <img src={faceitLogo} alt="faceit logo" className='faceit-logo' /> Faceit
                    </div>
                    <div className='faceit-stats-top-row'>
                        <p className='faceit-username'>USERNAME</p>
                        <p className='faceit-elo'>Elo: {1234}</p>
                        <p className='faceit-level'><img src={faceitLevelImages[1]} alt="" /></p>
                        
                        
                    </div>
                    <div className='faceit-stats-bottom-row'>
                        <div className='faceit-kd' data-bs-toggle="tooltip"
                         data-bs-placement="top" title = "K/D - Stosunek zabójstw do śmierci na FACEIT"
                         data-bs-offset="-40,0">K/D: ...</div>

                        <div className='faceit-hsp' data-bs-toggle="tooltip"
                         data-bs-placement="top" title = "PSG - Procent strzałów w głowę na FACEIT"
                         data-bs-offset="0,0">PSG: ...%</div>

                        <div className='faceit-winrate' data-bs-toggle="tooltip" 
                         data-bs-placement="top" title = "Win Rate - Procent wygranych meczów na FACEIT" 
                         data-bs-offset="40,0">W/R: ...%</div>

                    </div>
                </div>
            )
        }

        else {

            let stats = JSON.parse(this.state.data[this.arrayName]);
            console.log(stats)
            return (
                <div className='faceit-stats'>
                    <div className='faceit-stats-header element-factory-title'>
                        <img src={faceitLogo} alt="faceit logo" className='faceit-logo' /> Faceit
                    </div>
                    <div className='faceit-stats-top-row'>
                        <p className='faceit-username'>{stats.name}</p>
                        <p className='faceit-elo'>Elo: {stats.stats.elo}</p>
                        <p className='faceit-level'><img src={faceitLevelImages[stats.stats.level]} alt="" /></p>
                        
                        
                    </div>
                    <div className='faceit-stats-bottom-row'>

                        <div className='faceit-kd' data-bs-toggle="tooltip"
                         data-bs-placement="top" title = "K/D - Stosunek zabójstw do śmierci na FACEIT"
                         data-bs-offset="0,-5">K/D: {stats.stats.kd}</div>

                        <div className='faceit-hsp' data-bs-toggle="tooltip"
                         data-bs-placement="top" title = "PSG - Procent strzałów w głowę na FACEIT"
                         data-bs-offset="0,-5">PSG: {stats.stats.hsp}%</div>

                        <div className='faceit-winrate' data-bs-toggle="tooltip" 
                         data-bs-placement="top" title = "Win Rate - Procent wygranych meczów na FACEIT" 
                         data-bs-offset="0,-5">W/R: {stats.stats.result}%</div>

                    </div>
                </div>
            )
        }
    }
}

export { Faceit, createFaceitStats };


