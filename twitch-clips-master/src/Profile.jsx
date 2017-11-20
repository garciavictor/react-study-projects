import React, { Component } from 'react'
import { Icon } from 'react-materialize'
import './App.css'

class Profile extends Component{
    render(){
        const { 
            name,
            url,
            logo,
            followers
        } = this.props
        return(
            <div className="profile">
                <img className="profile-img" src={logo} alt="profile-img"/>
                <div className="profile-info">
                    <div className="profile-name"><Icon small>perm_identity</Icon>{name}</div>
                    <div className="profile-url"><Icon small>slideshow</Icon>{url}</div>
                    <div className="profile-followers"><Icon small>favorite_border</Icon>{followers}</div>
                </div>
            </div>
        )
    }
}

export default Profile