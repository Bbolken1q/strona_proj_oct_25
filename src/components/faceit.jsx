import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react';
import faceitLogo from '../assets/faceit-logo.svg';
import { DataComponent } from './dataElement';

class Faceit extends DataComponent {
    constructor(props) {
        super(props)
        this.arrayName = "faceit"
        this.state = {
            loading: true,
            data: null
        }
    }

    componentDidMount() {}
    
    render() {
        if (this.state.loading === true) {
            return (
                <div className='faceit-stats'>
                    <div className='faceit-stats-header'>
                        <img src={faceitLogo} alt="faceit logo" className='faceit-logo' /> Faceit
                    </div>
                    <div className='faceit-stats-top-row'>
                        <p className='faceit-username'>USERNAME</p>
                        <p className='faceit-username'>USERNAME</p>
                    </div>
                    <div className='faceit-stats-bottom-row'></div>
                </div>
            )
        }

        else {
            return (
                <div className='faceit-stats'>
                    <div className='faceit-stats-header'>
                        <img src={faceitLogo} alt="faceit logo" className='faceit-logo' /> Faceit
                    </div>
                    <div className='faceit-stats-bottom-row'></div>
                </div>
            )
        }
    }
}

export { Faceit };
