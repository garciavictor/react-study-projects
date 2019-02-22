import React, { Component } from 'react'
import Form from './Form.jsx'
import Profile from './Profile.jsx'
import Gallery from './Gallery.jsx'
//import twitchApi from './twitchApiService.js'
import { Icon } from 'react-materialize'

import './App.css'

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            querySearch: '',
            streamer: null,
            clips: []
        }
    }

    inputOnChangeValue(value){
        this.setState({
            querySearch: value
        })
    }

    onClickButton(value){
        const TWITCH_BASE_URL = 'https://api.twitch.tv/kraken/'
        const TWITCH_USERS_URL = `${TWITCH_BASE_URL}users?login=${this.state.querySearch}`
        const TWITCH_CHANNELS_URL = `${TWITCH_BASE_URL}channels/`
        const fetchOptions = {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID': '81g3gdizi2amlwzeeh4pskltvrz88f'

            })
        }
        fetch(TWITCH_USERS_URL, fetchOptions)
            .then( usersResponse => usersResponse.json() )
            .then( parsedUsersResponse => parsedUsersResponse.users[0] )
            .then( ({ _id }) => {
                fetch(TWITCH_CHANNELS_URL + _id, fetchOptions)
                    .then( channelsResponse => channelsResponse.json() )
                    .then( ({ _id, name, url, logo, followers }) => {
                        this.setState({
                            streamer: {
                                _id, name, url,logo, followers
                            }
                        })
                        this.fetchClips(name)
                    })
            })
            .catch( err => console.log(err) )
    }

    fetchClips(channelName){
        const TWITCH_BASE_URL = 'https://api.twitch.tv/kraken/'
        const TWITCH_CLIPS_URL = `${TWITCH_BASE_URL}clips/top`
        const fetchOptions = {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID': '81g3gdizi2amlwzeeh4pskltvrz88f'
            })
        }

        fetch(`${TWITCH_CLIPS_URL}?channel=${channelName}&period=month&trending=true&limit=6`, fetchOptions)
            .then( response => response.json())
            .then( ({ clips }) => this.setState({clips:clips}))
    }


    render(){
        return(
            <div className="app">
                <span className="app-title">Twitch Clips Master</span>
                <Form 
                    value = {this.state.querySearch} 
                    inputOnChangeValue = { this.inputOnChangeValue.bind(this) }
                    searchStreamer = { this.onClickButton.bind(this) }
                />
                {   this.state.streamer !== null
                    ? <Profile 
                        _id = { this.state.streamer._id }
                        name = { this.state.streamer.name }
                        url = { this.state.streamer.url }
                        logo = { this.state.streamer.logo }
                        followers = { this.state.streamer.followers }
                        />
                    : <div></div>
                }
                {                   
                    this.state.clips !== 0 && this.state.clips
                    ?   <div>
                            <span className="gallery-title"><Icon small>video_library</Icon>Most Recent Clips</span>
                            <Gallery clips = {this.state.clips}/>
                        </div>
                    : <div></div>
                }
            </div>
        )
    }
}

export default App