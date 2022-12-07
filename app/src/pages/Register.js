import { useState, useEffect } from "react"
import { useNavigate,Link } from 'react-router-dom'
import { nanoid } from 'nanoid'

const Register = ()=>{
    let info = {
        // id:nanoid(),
        name: '',
        email: '',
        password: ''
    }
    const[regtrationInfo, setRegistrationInfo] = useState(info)
    const[registrationSuccess, setRegistrationSuccess] = useState(false)

    const navigate = useNavigate()
    function handleChange(event){
        setRegistrationInfo(prevRegistrationInfo => {
            return {...prevRegistrationInfo, [event.target.name] : event.target.value}
        })
    }
    function handleClick(info){

        fetch('/register',{
            method: 'POST',
            mode:'cors',
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(info)
        })
        .then(response => response.json())
        .then(data=> {
            console.log('response is :' + data)
            setRegistrationSuccess(prev => prev=data)
        })
        // .then(response => response.json())
        // .then(data=> console.log(data.response))
    }
    useEffect(()=>{
        registrationSuccess === true ? navigate('/'):console.log('Registration wasnt successfull')
        console.log('state is ' + registrationSuccess)
    },[registrationSuccess])
    return (
        <form className="register__Form-Main">
            <div className="register__Hero-Name">
                <h1 className="register__Text">Journly</h1>
                <p className="register__Description">Sign up to keep track on your goals and activities</p>
            </div>
            <div className="register__Grid-Main">
                <div className="register__Input-Name">
                    <label htmlFor="name" className="register__Text-Labels">Name</label>
                    <input type="text" name="name" id="name" onChange={handleChange}/>
                </div>
                <div className="register__Input-Email">
                    <label htmlFor="email" className="register__Text-Labels">Email</label>
                    <input type="email" name="email" id="email" onChange={handleChange}/>
                </div>
                <div className="register__Input-Pass">
                    <label htmlFor="password" className="register__Text-Labels">Password</label>
                    <input type="password" name="password" id="password" onChange={handleChange}/>
                </div>

                <button type="button" className="register__Button" onClick={()=>handleClick(regtrationInfo)}>Register</button>
                <div className="register__Footer">
                    <p>Have an account?</p>
                    <Link to='/'  className="register__Link">Sign in</Link>
                </div>
            </div>
        </form>
    )
}

export default Register