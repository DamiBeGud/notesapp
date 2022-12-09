import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'

const NewPost = (props)=>{
    const { userId } = useParams();
    
    const info = {
        title:"",
        text:"",
        date: date()
    }
    const [note, setNote] = useState(info)

    function handleChange(event) {
        setNote(prevNote => {
            return {...prevNote, [event.target.name] : event.target.value}
        })
        

    }
    function date(){

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
    
        return today = mm + '/' + dd + '/' + yyyy;
    }

    function handleClick(info){
        

        fetch(`/user/${userId}`,{
            method: 'POST',
            mode:'cors',
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(info)
        })
        .then(response => response.json())
        .then(data=> {
            console.log(data)  
            data === true ?props.updateArticles(): console.log(data)
        })
        

    }
    return(
        <form>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" onChange={handleChange}/>
            <label htmlFor="text">Text</label>
            <input type="text" name="text" onChange={handleChange}/>
            <button type="button" onClick={()=>handleClick(note)}>Add Note</button>
            <button type="button" onClick={props.handleToggle}>Close</button>
        </form>
    )
}

export default NewPost