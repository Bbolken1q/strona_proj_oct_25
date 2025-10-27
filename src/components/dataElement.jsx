import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react';

class DataComponent extends React.Component {
    constructor(props) {
        super(props)
        this.arrayName = "data"
        this.state = {
            loading: true,
            data: null
        }
    }

    componentDidMount() {
        this.props.callback.then(result => {
            this.setState({
                loading: false,
                data: result
            })
        })
    }

    render()  {}   
}

export { DataComponent };