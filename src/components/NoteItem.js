import deleteIcon from '../assets/delete.png'
import editIcon from '../assets/edit.png'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const {note, openModal} = props

    const context = useContext(noteContext)
    const {deleteNote} = context

    return(
        <div className="noteItem my-4 container">
            <img className='deleteIcon' alt='Delete' onClick={()=> deleteNote(note._id)} src={deleteIcon} />
            <img className='editIcon' alt='Edit' src={editIcon} onClick={() => openModal(note)} />

            <h4><b>{note.title}</b></h4>
            <p>{note.description}</p> 
            <span className='tag'>{note.tag}</span>
        </div>
    )
}

export default NoteItem
