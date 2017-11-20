import React, { Component } from 'react'
import Clip from './Clip.jsx'
import { } from 'react-materialize'

class Gallery extends Component{

    render(){
        const { clips } = this.props

        return (
            <div className="gallery">  
                {clips.map( (clip, index) => {
                    return <Clip clipEmbedURL={clip.embed_url} key={index} index={index}/>
                })}
            </div>
        )
    }
}

export default Gallery