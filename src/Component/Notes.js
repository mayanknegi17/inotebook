import React, {useContext, useEffect, useRef, useState} from 'react'
import { useHistory } from 'react-router'
import noteContext from '../Context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

// const notes_data = {
//     title: 'Shoes',
//     description: 'Running Shoes.',
// }

const Notes = (props) => {
    const context = useContext(noteContext);
    let history = useHistory();
    const {notes, getNotes, editNote} = context;
    useEffect(() => {
        if(localStorage.getItem('token')) { 
            getNotes();
        }
        else {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "default"}); 

    const updateNote =(currentNote)=> {
        ref.current.click();
        setNote({id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }

    const handleClick =(e)=> {
        console.log("Updating the note", note);
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
    }

    const onChange =(e)=> {
        setNote({...note, [e.target.name]: e.target.value }) 
    }

    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="my-3">
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
                    </div>
                </div>
            </div>
            </div>
            <AddNote showAlert={props.showAlert} />
            <div className="my-3">
                <h1>Your Note</h1>
                <div className="row">
                    {notes.length === 0 &&  <div className="col-md-12"><h1>No Notes To display</h1></div>}
                    {notes.map((note, index) => {
                        return <NoteItem note={note} key={index} updateNote={updateNote} showAlert={props.showAlert} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
