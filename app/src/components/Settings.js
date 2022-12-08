

const Settings = (props)=>{
    return(
        <div>
            <h1>This is Settings</h1>
            <nav>
                <ul>
                    <li>Profile</li>
                    <li>Security</li>
                    <li>Privacy</li>
                    <li>Payment settings</li>
                </ul>
            </nav>
            <button onClick={props.toggleSettings}>Close</button>
        </div>
    )
}

export default Settings