import { useState } from "react"
import { renderMatches } from "react-router-dom"

const Edit = (props)=>{

    const[oneArticle, setOneArticle] = useState(props.editOneArticle[0])
    function handleEdit(event){
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
        <div className="edit__main ">
            <form className="edit__Form bg-100">
            <div className="edit__Inst">
                <h1>Edit ur Post</h1>
            </div>
            <div className="edit__title">
                <label className='edit__textLabels'>Edit Title</label>
                <input type="text" name="title" value={oneArticle.title} onChange={handleChange} className="bg-300"/>
            </div>
            <div className="edit__content">
                <label className='edit__textLabels'>Edit Content</label>
                <textarea rows="12" cols="40" name="text" value={oneArticle.text} onChange={handleChange} className="bg-300"/>
            </div>
            <div className="edit__Buttons">
                <button className="edit__btn" type="button" id={oneArticle._id} onClick={handleEdit}>Edit</button>
                <button className="edit__btn" type="button" onClick={props.toggleEdit}>Close</button>
            </div>

        </form>
        </div>
        
    )
}

export default Edit