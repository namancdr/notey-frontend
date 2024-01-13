import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { useContext } from "react"
import alertContext from "../context/alert/alertContext"

const Signup = (props) => {
    const {showAlert} = useContext(alertContext)
    const host = 'https://notey-backend.onrender.com'

    
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({name: '', email: '', password:'', cpassword: ''})

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            
            if(credentials.password === credentials.cpassword){
                const response = await fetch(`${host}/api/auth/createuser`, {
                    method: 'POST', 
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password}) 
                });
                const json = await response.json()
            
                if(json.success){
                    //Save the auth token and redirect
                    localStorage.setItem('token', json.authToken)
                    navigate('/')
                    showAlert('success', 'Account Created Successfully!')

                }
                else{
                    showAlert('danger', json.error)

                }
            }else{
                showAlert('danger', 'Passwords do not match')
            }
        } catch (error) {
            showAlert('danger', 'Internal Server Error!')
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
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-4">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" value={credentials.name} onChange={handleChange} name="name" aria-describedby="name" placeholder="Enter Name" minLength={2} required/>
                </div>
                <div className="form-group my-4">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={handleChange} name="email" aria-describedby="emailHelp" placeholder="Enter email" required/>
                </div>
                <div className="form-group my-4">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={handleChange} name="password" placeholder="Password" minLength={4} required/>
                </div>
                <div className="form-group my-4">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} onChange={handleChange} name="cpassword" placeholder="Confirm Password" minLength={4} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p className="mt-3">Already have an account ? <Link to="/login">Login here!</Link></p>
            
       </div>
    </div>
    )
}

export default Signup
