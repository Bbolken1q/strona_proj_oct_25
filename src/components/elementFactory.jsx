import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react';

class ElementFactory extends React.Component {
    constructor(props) {
        super(props)
        this.elements = props.fillFunction(props.elementClassCreateFunction, props.callback);
    }

    render() {
        return (
            <div className='element-factory'>
                <div className='element-factory-title' >
                    <p  data-bs-toggle="tooltip" data-bs-placement="top"
                        title= {this.props.tooltipTitle}
                        data-bs-offset="0,-5">
                        <img className='tooltip-image' src={this.props.image} alt={this.props.imageAlt}/>{this.props.title}</p>
                </div>
                {this.elements}
            </div>
        )
    }
}

export default ElementFactory;
