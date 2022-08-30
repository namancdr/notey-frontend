import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import noteContext from "../context/notes/noteContext"
import alertContext from "../context/alert/alertContext"

const Profile = () => {

    const navigate = useNavigate()

    const {showAlert} = useContext(alertContext)
    const {user, getUser} = useContext(noteContext)
    useEffect(() => {
      getUser()

      if(!localStorage.getItem('token')){
        showAlert('danger', 'Unauthorised, Login to start using the app!')
        navigate('/login')
      }
      //eslint-disable-next-line
    }, [])

    
    return(
        <>
            <div className="container mt-4">
                <h2>User Detail</h2>
                <strong>Name :</strong>{user.name} <br />
                <strong>Email :</strong>{user.email} <br />
                <strong>User since :</strong>{user.date}
            </div>
        </>
    )
}

export default Profile