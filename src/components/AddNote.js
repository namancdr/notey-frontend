import { useContext, useState } from "react"
import noteContext from "../context/notes/noteContext"
import Modal from 'react-modal';
import AddBtn from "./AddBtn";


const Form = () => {

    const context = useContext(noteContext)
    const {addNote} = context

    Modal.setAppElement(document.getElementById('root'));
        
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

    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal =(currentNote)=> {
        setIsOpen(true);
    }

    const closeModal =()=> {
        setIsOpen(false);
    }
    

    const [note, setNote] = useState({title:'', description:'', tag: ''})

    const handleClick=(e)=> {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({title:'', description:'', tag: ''})
        closeModal()
    }

    const handleChange =(e)=> {
        setNote({...note, [e.target.name]: e.target.value})
    } 

    

    return(
        <>
         <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <form className="my-4">
                    <h2>Add a Note</h2>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" placeholder="Enter Title" value={note.title} name="title" id="title" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="text" className="form-control" placeholder="Enter Description" value={note.description} name="description" id="description"  onChange={handleChange} required/>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" placeholder="Enter Tag" value={note.tag} name="tag" id="tag"  onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </Modal>
             <AddBtn openModal={openModal} />

        </>
    )
}

export default Form