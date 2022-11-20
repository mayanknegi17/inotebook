import NoteContext from './NoteContext';

import {useState} from 'react';

const NoteState = (props) => {
    const host = "http://localhost:8081"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Add a Note
    const getNotes = async () => {
        // API call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json)
        setNotes(json); 
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API call 
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}) 
        });
        // const json = response.json();
        console.log("Adding a new note")
        // To do API Call
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
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

        let newNote = JSON.parse(JSON.stringify(notes))
        // Logic to edit client
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if(element._id  === id ) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }
        console.log(newNote);
        setNotes(newNote);
    }

    // Delete Note
    const deleteNote = async (id) => {
        console.log("Deleting a note with id" + id);
        // API call 
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
        });
        const json = response.json(); 
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;