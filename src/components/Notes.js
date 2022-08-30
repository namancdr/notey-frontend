import NoteItem from "./NoteItem"
import { useContext, useEffect, useState } from "react"
import noteContext from "../context/notes/noteContext"
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import AddNote from './AddNote'

const Notes = () => {
    const context = useContext(noteContext)
    const {notes, getNotes, editNote, user, getUser} = context
    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('token')){
            getUser()
            getNotes()
        }else{
            navigate('/login')
        }
      //eslint-disable-next-line
    }, [])


        
    const customStyles = {
        content: {
        backgroundColor: '#282838',
        width:'80%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        },
    };
  

    Modal.setAppElement(document.getElementById('root'));

    const [modalIsOpen, setIsOpen] = useState(false);
    const [note, setNote] = useState({id:'', etitle:'', edescription:'', etag:''})

    const openModal =(currentNote)=> {
        setIsOpen(true);
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }

    const closeModal =()=> {
        setIsOpen(false);
    }
    

    const handleClick=(e)=> {
        e.preventDefault()
        editNote(note.id, note.etitle, note.edescription, note.etag)

        closeModal()
    }

    const handleChange =(e)=> {
        setNote({...note, [e.target.name]: e.target.value})
    } 
     
    return(
        <div>              

 {/* Update Note Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Update Note Modal"
            >
                <form className="my-4">
                    <h2>Edit Note</h2>
                    <div className="mb-3">
                        <label htmlFor="etitle" className="form-label">Title</label>
                        <input type="text" className="form-control" name="etitle" id="etitle" value={note.etitle} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="edescription" className="form-label">Description</label>
                        <textarea type="text" className="form-control" name="edescription" id="edescription" value={note.edescription} onChange={handleChange} />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="etag" className="form-label">Tag</label>
                        <input type="text" className="form-control" name="etag" id="etag" value={note.etag} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                </form>
            </Modal>
                    
{/* Display user's Note */}
            {user.name && <h1 className='mt-4'>{`HELLO ${user.name.toUpperCase()}`}</h1>}
            <h3>Let's look at your notes!</h3>
            <hr />
            {notes.length === 0 && 'No notes to display!'}
            {notes.map((note)=> {
                return <NoteItem key={note._id} note={note} openModal={openModal} />
            })}

{/* Add Note Button */}
            <AddNote />

        </div>

    )
}

export default Notes