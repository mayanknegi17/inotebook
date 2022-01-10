import React, {useContext} from 'react'
import noteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';

const notes = [
    {id: 1, title: 'Shoes', description: 'Running Shoes.' },
    {id: 2, name: 'MacBook', description: 'Apple MacBook.' },
];

const Notes = () => {
    const context = useContext(noteContext)
    const {notes, setNotes} = {context}
    return (
        <div className="my-3">
            {/* <h1>Your Note</h1> */}
            {notes.map((note) => {
                return <NoteItem note={note} />
            })}
        </div>
    )
}

export default Notes
