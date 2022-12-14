import { useState } from "react"



const SingleEvent = (props) =>{
    const[singleEventData, setSingleEventData] = useState(props.singleEventData[0])
    
    const {title, description, time, _id} = singleEventData

    const[edit, setEdit] = useState(false)

    function editToggle(){
        setEdit(!edit)
    } 

    function handleChange(event){
        const {name, value} = event.target
        
        setSingleEventData(prev=>{
            return {...prev, [name]: value}
        })
    }

    function saveChanges(event){
        const eventId = event.target.id

        fetch(`/updateevent/${eventId}`,{
            method: "POST",
            mode:"cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(singleEventData)
        })
        .then(res => res.json())
        .then(data=>{
            // console.log(data)
            data? props.render() : console.log(data)
        })
    }

    return(
        <div>

        {!edit &&        
            <div>
                <h1>{title}</h1>
                <p>{time}</p>
                <p>{description}</p>
                <button onClick={editToggle}>Edit</button>
                <button onClick={props.toggleSingleEvent}>Close</button>
            </div>
        }
                {edit &&        
            <div>
                <form>
                    <input type="text" value={title} name="title" onChange={handleChange}/>
                    <input type="time" value={time} name="time" onChange={handleChange}/>
                    <input type="text" value={description} name="description" onChange={handleChange}/>
                    <button type="button" id={_id} onClick={saveChanges}>Save</button>
                    <button onClick={props.toggleSingleEvent}>Close</button>
                </form>
            </div>
        }

        </div>
    )
}


export default SingleEvent