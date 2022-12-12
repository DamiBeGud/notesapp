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

    const[newPostToggle, setNewPostToggle] = useState(false) 
    const[articles, setArticles] = useState([])
    const[userInfo, setUserInfo] = useState()
    const[reRender, setReRender] = useState(0)
    const[calendarActive, setCalendarActive] = useState(false)

    const[settings, setSettings] = useState(false)
    const[edit, setEdit] = useState(false)
    const[editOneArticle, setEditOneArticle] = useState([])
    
    
    const[postPopUp, setPostPopUp] = useState(false)

    const[settingsAnimation, setSettingsAnimation] = useState(false)


    function render(){
        setReRender(prevReRender => prevReRender + 1)
        console.log('rerendered')
    }
    useEffect(()=>{
        fetch(`/user/${userId}`)
        .then(res => res.json())
        .then(data=> {
            // console.log(data)
            setArticles(prevArticles => prevArticles = data.articles)
            setUserInfo(prevUserInfo => prevUserInfo = data.userData)
            // console.log(userInfo)
            // console.log(articles)
        })
    },[reRender])


    //Dinamcini kod koji pravi svaki zaseban article ili ti ga post
    // pozvano je kasnije dole u kodu ali ovdje dodajes stilove koji ce da budu dinamicni :)
    //Kasnije moram jos da dodam vamo za date ali to moram prvo napraviti kada dodajes post da automatski uzme datum 
    // i spremi ga u bazu podataka 
    //dodao sam i jos 2 buttona za edit i delete pa cemo morati kasnije jos da razmislimo kako cemo da odradimo ovaj
    //gornji dio svakog posta mozda da izmjenimo malo pozicije morat cemo jos da razmislimo
    
    function handleDelete(event){
        console.log(event.target.id)
        console.log(event.target)

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


    //Code za nove artikle ti je ovdje i poziva se kasnije dole u returnu
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

    const anim = {
        animationName: "CloseSettings",
        animationDuration: 1 + "s"
    }

  
   //make it into one function that passes 2 variables(state and setState)

    function handleToggle(){
        setNewPostToggle(!newPostToggle)
    }
    function toggleSettings(){
        setSettingsAnimation(!settingsAnimation)
        settings ? setTimeout(()=>setSettings(!settings),1000) : setSettings(!settings)
        
    }
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
    function openCalendar(){
        setCalendarActive(true)
    }
    function openNotes(){
        setCalendarActive(false)
    }

    return(

        //markup je vise manje zavrsen za gornji dio koji ostaje vise manje isti
        // imas tu divove odradene da mozes da podjelis to na pola sa flexom lagano
        // nav ostavi ovako kako je markup moramo jos skontati boje i to kako ce da izgleda
        // ovo new post i settings cemo za ikone da mjenjamo kasnije 
        // e sada treba da odradis za ovo new post animaciju neku malu nista komplikovano al da lijepse izgleda :)

        // Napraviti componente za user page 
        //   1. Gornji dio gdje ce da bude slika ime i informacija 
        //   2. navbar 
        //   3. i eventualno articles componenta
        
        <main className="bg-300">
            {/* Prva sekcija koda */}
            <section>
                <div className="user__Info">
                    <div className="user__Image">
                        <div className="user__Img">

                        </div>
                    </div>
                    <div className="user__Name">
                        {/* Waiting for name replace with colored div */}
                        {/* Wiating for name div je place holder za ime dok ga ne povuce iz baze podataka 
                        i displeya se samo dok ne povuce ime  */}
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
            <button type="button" onClick={openCalendar} className="user__Nav-btn bg-200 font-nav">Calendar</button>
            <button type="button" onClick={openNotes} className="user__Nav-btn bg-200 font-nav">Notes</button>

            <button onClick={handleToggle} className="user__Nav-btn bg-200 font-nav">New Post</button>
            <button onClick={toggleSettings} className="user__Nav-btn bg-200 font-nav">Settings</button>
            </nav>
            <div className="user__hr">
                <div className="user__hr1"></div>
            </div>
            {newPostToggle && <NewPost
                handleToggle={handleToggle}
                updateArticles={render}
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
        </main>
        
    )
}

export default User