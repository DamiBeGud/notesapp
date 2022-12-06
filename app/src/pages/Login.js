import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"

const Login = ()=>{
    // let info = {
    //     email: '',
    //     password: ''
    // }
    // const[loginInfo, setLoginInfo] = useState(info)
    // const[loginSuccess, setLoginSuccess] = useState(false)

    // const navigate = useNavigate()
    // function handleChange(event){
    //     setLoginInfo(prevLoginInfo => {
    //         return {...prevLoginInfo, [event.target.name] : event.target.value}
    //     })
    // }
    // function handleClick(info){
    //     fetch('/',{
    //         method: 'POST',
    //         mode:'cors',
    //         headers:{"Content-Type": "application/json"},
    //         body: JSON.stringify(info)
    //     })
    //     .then(response => response.json())
    //     .then(data=> {
    //         console.log(data)
    //         setLoginSuccess(prev => prev=data.response)
    //     })
    // }
    // useEffect(()=>{
    //     console.log(`User is loged in ${loginSuccess.success}`)
    //     loginSuccess.success === true? navigate(`/user/${loginSuccess.url}`):console.log('Wrong Email or Password')
    // }, [loginSuccess])


    return (
        // <form>
        //     <h1>Login</h1>
        //     <label htmlFor="email">Email</label>
        //     <input type="email" name="email" id="email" onChange={handleChange}/>

        //     <label htmlFor="password">Password</label>
        //     <input type="password" name="password" id="password" onChange={handleChange}/>

        //     <button type="button" onClick={()=>handleClick(loginInfo)}>Login</button>
        //     <Link to='/register'>Register</Link>
        // </form>

        <form className='form-Main'>
            <div className='heroName'>
            <h1 className='appName'>Journly</h1>
            <p className='description'>An app made for you and your notes</p>
            </div>
        <div className='grid'>
            <div className='InputEmail'>
                <label htmlFor="email" className='textLabels'>Email</label>
                <input type="email" name="email" id="email" />
            </div>
            <div className='InputPass'>
                <label htmlFor="password" className='textLabels'>Password</label>
                <input type="password" name="password" id="password" />
            </div>
        <button type="button" className='buttonLogin'>Login</button>
            <div className='centerOr'>
                <div className='or'>Or</div>
            </div>
            
        <div className='btn'>        
            <button type="button" className='buttonRegister'>Sign Up</button>
        </div>

        </div>
        </form>
    )
}

export default Login