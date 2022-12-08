import { useState } from "react"
import { renderMatches } from "react-router-dom"

const Edit = (props)=>{

    const[oneArticle, setOneArticle] = useState(props.editOneArticle[0])
    function handleEdit(event){
        console.log(event.target.id)
        console.log(oneArticle)
        const articleId = event.target.id
        fetch(`/edit`,{
            method:"POST",
            mode:"cors",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(oneArticle)
        })
        .then(res => res.json())
        .then(data => {
            data?props.render():console.log(data)
        
        })
    }

    function handleChange(event){
        const{name, value} = event.target
        setOneArticle(prevOneArticle => {
            return{...prevOneArticle, [name]:value}
        })
        
    }
    return(
        <form>
            <h1>Edit ur Post</h1>
            <input type="text" name="title" value={oneArticle.title} onChange={handleChange}/>
            <input type="text" name="text" value={oneArticle.text} onChange={handleChange}/>
            <button type="button" id={oneArticle._id} onClick={handleEdit}>Edit</button>
            <button type="button" onClick={props.toggleEdit}>Close</button>
        </form>
    )
}

export default Edit