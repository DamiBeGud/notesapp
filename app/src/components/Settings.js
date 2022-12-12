import Profile from "./settings-components/Profile"

const Settings = (props)=>{

    let className = new Boolean(props.settings)
    
    return(
        <div className={`settings__main bg-100 settings-${className.toString()}`}>
            <h1 className="settings__info">This is Settings</h1>
            <nav className="settings__nav">
                <ul className="settings__ul">
                    <li className="settings__li"><button type="button"></button></li>
                    <li className="settings__li">Security</li>
                    <li className="settings__li">Privacy</li>
                    <li className="settings__li">Payment settings</li>
                </ul>
            </nav>
            <div className="settings__button">
                <button className="settings__btn bg-btn-400" onClick={props.toggleSettings}>Close</button>
            </div>

            <Profile />
        </div>
    )
}

export default Settings