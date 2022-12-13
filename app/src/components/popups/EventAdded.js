const EventAdded = (props)=>{
    const eventPopUp= props.eventPopUp
    const setEventPopUp = props.setEventPopUp
    
    return(
        <div>
            <h1>Event added</h1>
            <button type="button" onClick={()=>setEventPopUp(!eventPopUp)}>OK</button>
        </div>
    )
}

export default EventAdded