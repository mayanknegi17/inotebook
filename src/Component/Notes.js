import React, {useContext, useEffect, useRef} from 'react'
import noteContext from '../Context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

// const notes_data = {
//     title: 'Shoes',
//     description: 'Running Shoes.',
// }

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, getNotes} = context;
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])

    const updateNote =(note)=> {
        ref.current.click()
    }

    const ref = useRef(null)
    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Update Note</button>
                    </div>
                </div>
            </div>
            </div>
            <AddNote />
            <div className="my-3">
                <h1>Your Note</h1>
                <div className="row">
                    {notes.map((note, index) => {
                        return <NoteItem note={note} key={index} updateNote={updateNote} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
