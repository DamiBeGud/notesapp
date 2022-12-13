import { useState } from "react"
import Profile from "./settings-components/Profile"
import Security from "./settings-components/Security"
import Custom from './settings-components/Custom'

const Settings = (props)=>{

    let className = new Boolean(props.settings)
    
    const nav = {
        profile:false,
        security:false,
        custom:false,
    }

    const[navStates, setNavStates] = useState(nav)

    function handleClick(event){
        const component = event.target.id
        setNavStates(nav)
        setNavStates(prev=>{
            return{...prev, [component]:true}
        })
        console.log(navStates)
    }


    return(

        
        <div className={`settings__main bg-100 settings-${className.toString()}`}>
            <h1 className="settings__info">This is Settings</h1>
            <nav className="settings__nav">
                <ul className="settings__ul">
                    <li className="settings__li"><button type="button" id="profile" onClick={handleClick}>Profile</button></li>
                    <li className="settings__li"><button type="button" id="security" onClick={handleClick}>Security</button></li>
                    <li className="settings__li"><button type="button" id="custom" onClick={handleClick}>Customization</button></li>
                    <li className="settings__li">Privacy</li>
                    <li className="settings__li">Payment settings</li>
                </ul>
            <div className="settings__button">
                <button className="settings__btn bg-btn-400" onClick={props.toggleSettings}>Close</button>
            </div>
            </nav>

        <div>
            {navStates.profile && <Profile />}
            {navStates.security &&  <Security />}
            {navStates.custom &&  <Custom />}
        </div>
        </div>
    
        
    )
}

export default Settings