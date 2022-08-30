
const Alert =(props) => {
  const {alert} = props
  return (
    <div className="alert-container container mt-2">
       {props.alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>
            <strong className="text-black">{alert.msg}</strong>
        </div>}
    </div>
  )
}

export default Alert