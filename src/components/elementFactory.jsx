import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react';

class ElementFactory extends React.Component {
    constructor(props) {
        super(props)
        // this.callback = props.callback;
        // this.elements = [createGeometryDashLevel("Test Level 1", 1), createGeometryDashLevel("Test Level 2", 2)];
        this.elements = props.fillFunction(props.elementClassCreateFunction, props.callback);
        // props.callback.then()
    }

    render() {
        return (
            <div className='element-factory'>
                <div className='element-factory-title' >
                    <p  data-bs-toggle="tooltip" data-bs-placement="top"
                        title='Moje najtrudniejsze poziomy w grze Geometry Dash'
                        data-bs-offset="0,-5">
                        {this.props.title}</p>
                </div>
                {this.elements}
            </div>
        )
    }
}

export default ElementFactory;
