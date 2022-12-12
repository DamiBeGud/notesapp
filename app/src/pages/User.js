import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import {Link, useParams} from "react-router-dom"

import NewPost from "../components/NewPost"
import Name from "../components/Name"
import Edit from "../components/Edit"
import Settings from "../components/Settings"
import Calendar from "../components/Calendar"
import PostAdded from "../components/popups/PostAdded"
const User = ()=>{
    const {userId} = useParams()

    /******** States ********/
    /*        Data States  */
    const[articles, setArticles] = useState([])
    const[editOneArticle, setEditOneArticle] = useState([])
    const[userInfo, setUserInfo] = useState()

    /*    render state    */
    const[reRender, setReRender] = useState(0)
    
    /*     Toggler states     */
    const[newPostToggle, setNewPostToggle] = useState(false) 
    const[calendarActive, setCalendarActive] = useState(false)
    const[settings, setSettings] = useState(false)
    const[edit, setEdit] = useState(false)
    
    /*      PopUp states     */
    const[postPopUp, setPostPopUp] = useState(false)
    /*    Animation states  */
    const[settingsAnimation, setSettingsAnimation] = useState(false)


    /* Updates state when some data is added, edited or deleted so it can be rerenderd to page */
    function render(){
        setReRender(prevReRender => prevReRender + 1)
    }

    /*Rendering information to page first time when it loads and every time when it is updated*/
    useEffect(()=>{
        fetch(`/user/${userId}`)
        .then(res => res.json())
        .then(data=> {
            setArticles(prevArticles => prevArticles = data.articles)
            setUserInfo(prevUserInfo => prevUserInfo = data.userData)
        })
    },[reRender])



    /*Handling delete proces of articles */
    function handleDelete(event){
        const articleIndex = Number(event.target.id)
        const articleId = {id:articles[articleIndex]._id}
        fetch(`/delete/${articles[articleIndex]._id}`,{
            method: 'POST',
            mode: 'cors',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(articleId)
        })
        .then(res=> res.json())
        .then(data=>{
            
            data ? render():console.log(data)
        })
    }


    //Creates all articles that user have stored in DB 
    const createArticles = articles.map((article, index) => {
        return(
            <article key={index} className="bg-200">
                <div className="user__Article-navbar bg-100">
                    <div className="user__Article-date clr-400">{article.date}</div>
                    <div className="user__Article-title clr-100 font-heading">{article.title}</div>
                    <div className="user__Article-btns">
                    <button type="button" onClick={toggleEdit} id={index}  className="user__Article-btn bg-btn-400">Edit</button>
                    <button type="button" onClick={handleDelete} id={index}   className="user__Article-btn bg-btn-400">Delete</button>
                    </div>
                </div>
                <div>
                    <div className="user__Article-content bg-300">
                        <p className="clr-300">{article.text}</p>
                    </div>
                </div>
            </article>
        )
    })
 
    /*Toggling of newPostToggle state. if it is true
        NewPost component will be shown on page
    */
    function handleToggle(){
        setNewPostToggle(!newPostToggle)
    }
    /*Toggling of settings state. if it is true
        Settings will be show with animation
        upon closing Settings animation will be shown again    
    */
    function toggleSettings(){
        setSettingsAnimation(!settingsAnimation)
        settings ? setTimeout(()=>setSettings(!settings),1000) : setSettings(!settings)
    }
    /*Togglin of settings state, if it is true
        Edit component will be shown --------Animation needs to be added
            in edit component u can Edid content of selected article
    */
    function toggleEdit(event){
        if(edit === false){    
            const articleIndex = Number(event.target.id)
            setEditOneArticle(prevEditOneArticle => prevEditOneArticle = [...prevEditOneArticle, articles[articleIndex]])
            setEdit(!edit)
        }else{
            setEdit(!edit)
            setEditOneArticle([])
        }
    }
    /*Functions controll if Calendar or Notes  Component is opend */
    function openCalendar(){
        setCalendarActive(true)
    }
    function openNotes(){
        setCalendarActive(false)
    }

    return(

        // ovo new post i settings cemo za ikone da mjenjamo kasnije 
        // e sada treba da odradis za ovo new post animaciju neku malu nista komplikovano al da lijepse izgleda :)


        
        <main className="bg-300">
            {/* Prva sekcija koda */}
            <section>
                <div className="user__Info">
                    <div className="user__Image">
                        <div className="user__Img">

                        </div>
                    </div>
                    <div className="user__Name">
                        {userInfo === undefined? 
                        <div className="user__Username-placeholder"></div>
                        :<h1 className="user__Username font-heading clr-100">{userInfo[0].name}</h1>}
                        
                        {/* Napravi ovaj paragraf da bude kako bi trebalo da bude na kraju bez placeholdera to cu ja kasnije ubaciti */}
                        {userInfo === undefined? 
                        <div className="user__Desc-placeholder"></div>
                        :<div>
                            <div className="user__Desc-main"><p className="user__Desc clr-200">albin dami albin dami albin</p></div>
                            <div className="user__Desc-age-main"><p className="user__Desc-age clr-200">Age:</p></div>
                            <div className="user__Desc-dob-main"><p className="user__Desc-dob clr-200">Date of Birth: </p></div>
                        </div>}
                    </div>
                </div>
            </section>
            <nav className="user__Nav bg-200">
            <button type="button" onClick={openCalendar} className={`user__Nav-btn font-nav || ${calendarActive? "bg-btn-400" : "bg-200"} `}>Calendar</button>
            <button type="button" onClick={openNotes} className={`user__Nav-btn font-nav ||  ${!calendarActive? "bg-btn-400" : "bg-200"} `}>Notes</button>

            <button onClick={handleToggle} className="user__Nav-btn bg-200 font-nav">New Post</button>
            <button onClick={toggleSettings} className="user__Nav-btn bg-200 font-nav">Settings</button>
            </nav>
            <div className="user__hr">
                <div className="user__hr1"></div>
            </div>
            {newPostToggle && <NewPost
                handleToggle={handleToggle}
                updateArticles={render}
                postPopUp={postPopUp}
                setPostPopUp={setPostPopUp}

            />}
            <section>
                {calendarActive === false ? 
                createArticles.length !== 0 ? 
                createArticles:
                <h1>There are no articles</h1>:
                 <Calendar />}
            </section>
        {settings &&
        < Settings
            toggleSettings={toggleSettings}
            settings={settingsAnimation}
        />}
        {edit &&
        <Edit
            toggleEdit={toggleEdit}
            editOneArticle={editOneArticle}
            render={render}
        />}

        {postPopUp && <PostAdded 
            postPopUp={postPopUp}
            setPostPopUp={setPostPopUp}
        />}

        </main>
        
    )
}

export default User