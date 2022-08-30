import { useState } from "react";
import alertContext from "./alertContext";

const AlertState = (props) => {
    const [alert, setAlert] = useState(null)
    const showAlert = (type, msg) => {
        setAlert({
            msg: msg,
            type: type
        })
        setTimeout(() => {
            setAlert(null)
        }, 1500);
    }
    return(
        <alertContext.Provider value={{alert, showAlert}}>
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState