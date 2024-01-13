import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react"
import alertContext from "../context/alert/alertContext"

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: '', password: ''})
    const {showAlert} = useContext(alertContext)

    const host = 'https://notey-backend.onrender.com'


    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}) 
        });
        const json = await response.json()

        if(json.success){
            //Save the auth token and redirect
            localStorage.setItem('token', json.authToken)
            showAlert('success', 'Logged in Successfully!')
            navigate('/')
        }
        else{
            showAlert('danger', json.error)

        }

    }   

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return(
        <div className="container login-parent-container">
            <div className="container login-sec-1 mt-4">
                <h1 className="orangeText">MAKE ALL</h1>
                <h1 className="bigText">YOUR</h1>
                <h1 className="bigText">THINGS</h1>
                <h1 className="bigText">ORGANISED</h1>
            </div>
            <div className="container loginContainer bgDark p-2 mt-4">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group my-4">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" value={credentials.email} onChange={handleChange} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" required />
                    </div>
                    <div className="form-group my-4">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={handleChange} id="password" name="password" placeholder="Password" minLength={4} required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <p className="mt-3">Don't have an account ? <Link to="/signup">Signup!</Link></p>
            </div>
        </div>
    )
}

export default Login
