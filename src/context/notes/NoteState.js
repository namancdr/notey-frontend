import { useState, useContext } from "react";
import NoteContext from "./noteContext";
import alertContext from "../alert/alertContext";

const NoteState = (props) => {
    const {showAlert} = useContext(alertContext)

    const host = 'https://notey-backend.namancdr.repl.co'

    const inintialNotes = []

    const [notes, setNotes] = useState(inintialNotes)
    const [user, setUser] = useState([])


    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json()
        setNotes(json)

    }


    // ADD A NOTE
    const addNote = async(title, description, tag)=> {

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}) 
        });
        const note = await response.json()
        setNotes(notes.concat(note))
        showAlert('success', 'Note added!')
    }

    // DELETE A NOTE
    const deleteNote = async(id)=> {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json()

        const newNote = notes.filter((note)=>{return note._id !== id})
        setNotes(newNote)
        showAlert('success', 'Note deleted!')

    }

    // Edit a Note
    const editNote = async (id, title, description, tag)=> {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}) 
          });
        const json = await response.json();

        // logic to edit in frontend
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
        if(element._id === id )
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
        }
        setNotes(newNotes)
        showAlert('success', 'Note updated!')

    }

    // Get logged in user detail
    const getUser = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json()
        setUser(json)
    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes, getUser, user}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState