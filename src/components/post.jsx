import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../styles/post.css';

import React from 'react';

import { DataComponent } from './dataElement';

function createPost(unique_key, callback) {
    return (
        <Post callback={callback} key={unique_key} id={unique_key} />
    )
}

class Post extends DataComponent {
    constructor(props) {
        super(props)
        this.arrayName = "posts"
        this.state = {
            loading: true,
            data: null
        }
    }

    componentDidMount() { }

    render() {
        if (this.state.loading === true) {
            if (Math.random() > 0.5) {
                return (
                    <div className='post'>
                        <table width="100%">
                            <tbody width="100%">
                                <tr width="100%">
                                    <td width="100%" className='post-content' colSpan={3}>
                                        {/* {this.state.data.content} */}
                                        LOADING...
                                    </td>
                                </tr>
                                <tr width="100%">
                                    <td className='views'>W: 6666</td>
                                    <td className='shares'>U: 6666</td>
                                    <td className='date'>DD/MM/YY</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
            else {
                return (
                    <div className='post'>
                        <table width="100%">
                            <tbody width="100%">
                                <tr width="100%">
                                    <td width="100%" colSpan={3}>
                                        <h4 className='post-title'>LOADING...</h4>
                                    </td>
                                </tr>
                                <tr width="100%">
                                    <td width="100%" className='post-content' colSpan={3}>
                                        {/* {this.state.data.content} */}
                                        LOADING...
                                    </td>
                                </tr>
                                <tr width="100%">
                                    <td className='views'>W: 6666</td>
                                    <td className='shares'>U: 6666</td>
                                    <td className='date'>DD/MM/YY</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }

        }

        return (
            <div className='post'>
                {this.state.data.content}
            </div>
        )
    }
}

export { createPost, Post };