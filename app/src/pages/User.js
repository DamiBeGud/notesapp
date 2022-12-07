import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import NewPost from "../components/NewPost"
import {Link, useParams} from "react-router-dom"

const User = ()=>{
    const[newPostToggle, setNewPostToggle] = useState(false) 
    const[articles, setArticles] = useState([])

    const {userId} = useParams()

    useEffect(()=>{
        fetch(`/user/${userId}`)
        .then(res => res.json())
        .then(data=> {
            // console.log(data)
            setArticles(prevArticles => prevArticles = data)
        })
    },[])

    //Dinamcini kod koji pravi svaki zaseban article ili ti ga post
    // pozvano je kasnije dole u kodu ali ovdje dodajes stilove koji ce da budu dinamicni :)
    //Kasnije moram jos da dodam vamo za date ali to moram prvo napraviti kada dodajes post da automatski uzme datum 
    // i spremi ga u bazu podataka 
    //dodao sam i jos 2 buttona za edit i delete pa cemo morati kasnije jos da razmislimo kako cemo da odradimo ovaj
    //gornji dio svakog posta mozda da izmjenimo malo pozicije morat cemo jos da razmislimo
    const createArticles = articles.map(article => {
        return(
            <article key={article._id}>
                <div>
                    <div>{article.title}</div>
                    <div>Date</div>
                    <button>Edit</button>
                    <button>Delete</button>
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

        <main>
            <section>
                <div>
                    <div>
                        <img 
                        href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.m.wikipedia.org%2Fwiki%2FFile%3ARed_Circle%2528small%2529.svg&psig=AOvVaw384RbAuVwYzY_zS5ecMJMt&ust=1670442391090000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCKjIhPzg5fsCFQAAAAAdAAAAABAJ"
                        className="img"
                        />
                    </div>
                    <div>
                        <h1>Name</h1>
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
            />}
            <section>
                {createArticles ? createArticles:<h1>Nothing</h1>}
            </section>
        </main>
    )
}

export default User