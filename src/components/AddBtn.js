import addIcon from '../assets/add.png'


const AddBtn = (props) => {
    return(
        <div className="AddBtn mb-4 mx-4">
            <img src={addIcon} onClick={props.openModal} alt="Add Note" />
            {/* <button onClick={props}><img src={addIcon} alt="img" />Add a note</button> */}
        </div>
    )
}

export default AddBtn