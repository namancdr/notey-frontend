import {useContext} from 'react'
import alertContext from "../context/alert/alertContext"
import Alert from './Alert'

const AlertContainer = () => {
    const {alert} = useContext(alertContext)
 return(
    <Alert alert = {alert} />
 )
}

export default AlertContainer