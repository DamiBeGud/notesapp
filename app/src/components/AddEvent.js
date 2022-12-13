import { useState, useEffect} from "react"
import { useParams } from 'react-router-dom'

const AddEvent = (props)=>{
    const { userId } = useParams();

    const eventPopUp = props.eventPopUp
    const setEventPopUp = props.setEventPopUp
    const render = props.render

    const info = {
        title:"",
        time:"",
        description:"",
        date: props.date,
        user: userId

    }


    const[addEvent, setAddEvent] = useState(info)
    


    function handleChange(event){
        const{name, value} = event.target
        setAddEvent(prevAddEvent => {
            return {...prevAddEvent, [name]: value}
        })
        
    }


    function handleAddEvent(){
        console.log(addEvent)


        fetch('/addevent',{
            method:"POST",
            mode:"cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(addEvent)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setEventPopUp(!eventPopUp)
            render()
        })
    }
    return(
        <div>
            <form>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" onChange={handleChange}/>
                <input type="time" name="time" onChange={handleChange}/>
                <label htmlFor="description">Description</label>
                <input type="text" name="description" onChange={handleChange}/>
                <button type="button" onClick={handleAddEvent}>AddEvent</button>
                <button type="button" onClick={props.toggleAddEvent}>Close</button>
            </form>
        </div>
    )
}

export default AddEvent