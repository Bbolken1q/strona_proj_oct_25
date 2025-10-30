import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../styles/bestpost.css';

import React from 'react';
import { DataComponent } from './dataElement';

function createBestPostComponent(unique_key, callback) {
    return (
        <BestPost callback={callback} key={unique_key} id={unique_key} />
    )
}

class BestPost extends DataComponent {
    constructor(props) {
        super(props)
        this.arrayName = "bestposts"
        this.state = {
            loading: true,
            data: null
        }
    }

    // componentDidMount() { }

    render() {
        if (this.state.loading === true) {
            return (
                <div className='best-post'>
                    {/* <a href="#"> */}
                    LOADING...
                    {/* </a> */}
                </div>
            )
        }
        else {
            let data = JSON.parse(this.state.data.posts)[this.props.id];
            if (data !== undefined) {
                return (
                    <div className='best-post'>
                        <a href={`/?post=${data.id}`}>
                            {data.title}
                        </a>
                    </div>
                )
            }
        }
    }
}

export { createBestPostComponent }