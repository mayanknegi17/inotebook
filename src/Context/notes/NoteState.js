import react, {useState} from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const notesInitial = [
        {"id": "1", "title": 'Shoes', "description": 'Running Shoes.' },
        {"id": "2", "title": 'Shovhges', "description": 'Running Shoes.' }
    ]
    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notesInitial}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;