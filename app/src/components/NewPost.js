import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'

const NewPost = (props)=>{
    const { userId } = useParams();
    const postPopUp = props.postPopUp
    const setPostPopUp = props.setPostPopUp
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
            setPostPopUp(!postPopUp)
            props.handleToggle()
        })
        

    }
    return(
        <form className="newpost__form bg-100">
            <div className="newpost__info">
                <h1>Create New Post</h1>
            </div>
            <div className="newpost__title">
                <label className="newpost__textlabels" htmlFor="title">Title</label>
                <input type="text" name="title" onChange={handleChange} className="bg-300"/>
            </div>
            <div className="newpost__content">
                <label className="newpost__textlabels" htmlFor="text">Text</label>
                <textarea cols="40" rows="10" type="text" name="text" onChange={handleChange} className="bg-300"/>
            </div>
            <div className="newpost__buttons">
                <button className="newpost__btn bg-btn-400" type="button" onClick={()=>handleClick(note)}>Add Note</button>
                <button className="newpost__btn bg-btn-400" type="button" onClick={props.handleToggle}>Close</button>
            </div>
        </form>
    )
}

export default NewPost