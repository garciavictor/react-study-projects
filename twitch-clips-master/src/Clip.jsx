import React, { Component } from 'react'
import './App.css'

class Clip extends Component{
    render(){
        const { clipEmbedURL, index } = this.props
        const clipURLOptions = '&autoplay=false'

        return (
            <iframe title={index} key={index} className="clip-video" 
                src={clipEmbedURL+clipURLOptions} 
                muted="true" frameBorder="0"
                scrolling="no" allowfullscreen="true"
                autoplay="false" >
            </iframe>
        )
    }
}

export default Clip