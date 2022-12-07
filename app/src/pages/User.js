import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import {Link, useParams} from "react-router-dom"

import NewPost from "../components/NewPost"
import Name from "../components/Name"
const User = ()=>{
    const {userId} = useParams()

    const[newPostToggle, setNewPostToggle] = useState(false) 
    const[articles, setArticles] = useState([])
    const[userInfo, setUserInfo] = useState()
    const[reRender, setReRender] = useState(0)

    function updateArticles (info){
        setArticles(prevArticles => {
            return[...prevArticles, info]
        })

    }

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

    const createArticles = articles.map((article, index) => {
        return(
            <article key={index}>
                <div>
                    <div>{article.title}</div>
                    <div>Date</div>
                    <button>Edit</button>
                    <button type="button" onClick={handleDelete} id={index}>Delete</button>
                </div>
                <div>
                    <div>
                        {article.text}
                    </div>
                </div>
            </article>
        )
    })

  
   

    function handleToggle(){
        setNewPostToggle(!newPostToggle)
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
        <main>
            <section>
                <div>
                    <div>
                        {/* Treba napraviti place holder za sliku 
                            Dodaj clasu neku i stavi u stilu width i to i stavi background sivo ili crno da bude za sada
                        */}
                        <img  />
                    </div>
                    <div>
                        {/* Waiting for name replace with colored div */}
                        {/* Wiating for name div je place holder za ime dok ga ne povuce iz baze podataka 
                        i displeya se samo dok ne povuce ime  */}
                        {userInfo === undefined? 
                        <div>Waiting for name</div>
                        :<h1>{userInfo[0].name}</h1>}
                        
                        {/* Napravi ovaj paragraf da bude kako bi trebalo da bude na kraju bez placeholdera to cu ja kasnije ubaciti */}
                        <p>sdjahkdj sdhajkhdsa ajkshdjkash ashjkhdkjah</p>
                    </div>
                </div>
            </section>
            <nav>
            <Link>Calendar</Link>
            <Link>Notes</Link>

            <button onClick={handleToggle}>New Post</button>
            <button>Settings</button>
            </nav>
            {newPostToggle && <NewPost
                handleToggle={handleToggle}
                updateArticles={updateArticles}
            />}
            <section>
                {createArticles ? createArticles:<h1>Nothing</h1>}
            </section>
        </main>
    )
}

export default User