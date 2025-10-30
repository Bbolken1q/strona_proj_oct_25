import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../styles/post.css';

import React from 'react';

import { DataComponent } from './dataElement';
import { FullscreenPost } from './fullscreenPost';

function createPost(unique_key, callback, togglable) {
    return (
        <Post callback={callback} key={unique_key} id={unique_key} togglable={togglable} />
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

    // componentDidMount() { }

    render() {
        if (this.state.loading === true) {
            if (Math.random() > 0.5) {
                return (
                    <div className='post'>
                        <table width="100%">
                            <tbody width="100%">
                                <tr width="100%">
                                    <td width="100%" className='post-content' colSpan={3} >
                                        {/* {this.state.data.content} */}
                                        LOADING...
                                    </td>
                                </tr>
                                <tr width="100%" className='post-stats'>
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
                                <tr width="100%" className='post-stats'>
                                    <td className='date'>DD/MM/YY</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }



        } else {
            var posts = JSON.parse(this.state.data["posts"])
            console.log("post" + posts[this.props.id])
            if (posts[this.props.id] === undefined) {
                return (<></>)
            }
            else {
                if (posts[this.props.id].title === undefined) {
                    return (
                        <div className='post'>
                            <table width="100%">
                                <tbody width="100%">
                                    <tr width="100%">
                                        <td width="100%" className='post-content' colSpan={3}>
                                            {posts[this.props.id].content}
                                        </td>
                                    </tr>
                                    <tr width="100%" className='post-stats'>
                                        <td className='date'>{posts[this.props.id].created_at}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                }
                else {
                    return (
                        <div className='post' onClick={() => {
                            
                        }}>
                            <a href={`/?post=${posts[this.props.id].id}`}>
                                <table width="100%">
                                    <tbody width="100%">
                                        <tr width="100%">
                                            <td width="100%" colSpan={3}>
                                                <h4 className='post-title'>{posts[this.props.id].title}</h4>
                                            </td>
                                        </tr>
                                        <tr width="100%">
                                            <td width="100%" className='post-content'>
                                                {String(posts[this.props.id].content).slice(0, 100) + String(String(posts[this.props.id].content).slice(0, 100)[99] == undefined ? "" : "...")}
                                            </td>
                                        </tr>
                                        <tr width="100%" className='post-stats'>
                                            <td className='date' width="100%">{posts[this.props.id].created_at}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </a>
                        </div>
                    )
                }
            }
        }


    }
}

export { createPost, Post };