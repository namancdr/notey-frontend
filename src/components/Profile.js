import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import noteContext from "../context/notes/noteContext"
import alertContext from "../context/alert/alertContext"
import Moment from 'moment';

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
    
    const capitaliseName = (text) => {
      const str = text;
      const str2 = str.charAt(0).toUpperCase() + str.slice(1);
      return str2
    }
    
    return(
        <>
            <div className="container mt-4">
                <h2>User Detail</h2>
                <hr />
                
                <span className="s-key">Name :</span><span className="s-value">{user.name && capitaliseName(user.name)}</span><br />
                <span className="s-key">Email :</span><span className="s-value">{user.email}</span> <br />
                <span className="s-key">User Since :</span><span className="s-value">{Moment(user.date).format("MMM Do YY")}</span>
            </div>
        </>
    )
}

export default Profile