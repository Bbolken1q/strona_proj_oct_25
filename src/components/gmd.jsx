import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react';

function createGeometryDashLevel(levelName, unique_key) {
    return(
        <GeometryDashLevel levelName={levelName} key={unique_key}/>
    )
}
class GeometryDashLevel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='geometry-dash-level'>
                {this.props.levelName}
            </div>
        )
        
    }
}

export {createGeometryDashLevel, GeometryDashLevel};