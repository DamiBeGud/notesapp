import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
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
        // .then(response => response.json())
        // .then(data=> {
        //     console.log(data)
        //     setRegistrationSuccess(prev => prev=data.response)
        // })
        .then(response => response.json())
        .then(data=> console.log(data.response))
    }
    useEffect(()=>{
        registrationSuccess === true ? navigate('/'):console.log('Registration wasnt successfull')
        console.log(registrationSuccess)
    },[registrationSuccess])
    return (
        <form>
            <h1>Register</h1>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={handleChange}/>

            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={handleChange}/>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={handleChange}/>

            <button type="button" onClick={()=>handleClick(regtrationInfo)}>Register</button>
        </form>
    )
}

export default Register