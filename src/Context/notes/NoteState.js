import NoteContext from './NoteContext';

import {useState} from 'react';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Add a Note
    const getNotes = async () => {
        // API call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlMDYwOTk4YTE2NmIxODUzMGMyMTY0In0sImlhdCI6MTY0MjA5NDc0NX0.YbT-723hUBpXKNYvWdKSoXJNN6V6g8_xX28Fe8DQxzw"
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
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlMDYwOTk4YTE2NmIxODUzMGMyMTY0In0sImlhdCI6MTY0MjA5NDc0NX0.YbT-723hUBpXKNYvWdKSoXJNN6V6g8_xX28Fe8DQxzw"
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
    const editNote = async (_id, title, description, tag) => {
        // API call 
        const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlMDYwOTk4YTE2NmIxODUzMGMyMTY0In0sImlhdCI6MTY0MjA5NDc0NX0.YbT-723hUBpXKNYvWdKSoXJNN6V6g8_xX28Fe8DQxzw"
            },
            body: JSON.stringify({title, description, tag}) 
        });
        // const json = response.json();

        // Logic to edit client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id  === _id ) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
            
        }
    }

    // Delete Note
    const deleteNote = async (_id) => {
        console.log("Deleting a note with id" + _id);
        // API call 
        const response = await fetch(`${host}/api/notes/deletenote/${_id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlMDYwOTk4YTE2NmIxODUzMGMyMTY0In0sImlhdCI6MTY0MjA5NDc0NX0.YbT-723hUBpXKNYvWdKSoXJNN6V6g8_xX28Fe8DQxzw"
            },
        });
        const json = response.json(); 
        const newNotes = notes.filter((note) => { return note.id !== _id })
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;