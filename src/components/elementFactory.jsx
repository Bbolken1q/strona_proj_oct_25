import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react';
import { createGeometryDashLevel } from './gmd';

class ElementFactory extends React.Component {
    constructor(props) {
        super(props)
        // this.elements = [createGeometryDashLevel("Test Level 1", 1), createGeometryDashLevel("Test Level 2", 2)];
        this.elements = props.fillFunction(props.elementClassCreateFunction);
    }

    render() {
        return (
            <div>
                {this.elements}
            </div>
        )
    }
}

export default ElementFactory;
