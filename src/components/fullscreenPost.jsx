import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react';

class FullscreenPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            data: null
        }
    }

    componentDidMount() {
        var fetchData = fetch(`http://balls.monster:2052/post?number=${this.props.id}`)
        fetchData.then(result => result.json()).then(result => {
            this.setState({
                loading: false,
                data: JSON.parse(result.post)
            })
            console.log(JSON.parse(result.post))
            fetch("http://balls.monster:2052/updateViews?id=" + JSON.parse(result.post).id)
        })
    }

    render() {
        if (this.state.loading === true) {
            return (
                <div className='fullscreen-post'>
                    <table width="100%">
                        <tbody width="100%">
                            <tr width="100%">
                                <td width="100%" colSpan={3}>
                                    <h4 className='post-title'>LOADING...</h4>
                                </td>
                            </tr>
                            <tr width="100%">
                                <td width="100%" className='post-content'>
                                    LOADING...
                                </td>
                            </tr>
                            <tr width="100%" className='post-stats'>
                                <td className='views fullscreen'>LOADING...</td>
                                <td className='shares fullscreen'>LOADING...</td>
                                <td className='date date-fullscreen fullscreen' width="100%">LOADING...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            return (
                <div className='fullscreen-post'>
                    <table width="100%">
                        <tbody width="100%">
                            <tr width="100%">
                                <td width="100%" colSpan={3}>
                                    <h4 className='post-title'>{this.state.data.title}</h4>
                                </td>
                            </tr>
                            <tr width="100%">
                                <td width="100%" className='post-content'>
                                    {this.state.data.content}
                                </td>
                            </tr>
                            <tr width="100%" className='post-stats'>
                                <td className='views fullscreen'>Views: {this.state.data.views + 1}</td>
                                <td className='date date-fullscreen fullscreen'>{this.state.data.created_at}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }

}

export { FullscreenPost }