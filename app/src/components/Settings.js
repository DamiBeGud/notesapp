

const Settings = (props)=>{
    return(
        <div className="settings__main">
            <h1 className="settings__info">This is Settings</h1>
            <nav className="settings__nav">
                <ul className="settings__ul">
                    <li className="settings__li">Profile</li>
                    <li className="settings__li">Security</li>
                    <li className="settings__li">Privacy</li>
                    <li className="settings__li">Payment settings</li>
                </ul>
            </nav>
            <div className="settings__button">
                <button className="settings__btn" onClick={props.toggleSettings}>Close</button>
            </div>
        </div>
    )
}

export default Settings