import React = require("react");
import ReactDOM = require("react-dom");
import { useState, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import '../styles/app.scss';

class Note {
    constructor(id: string = null, title: string = null) {
        this.id = id;
        this.title = title;
    }

    id: string;
    title: string;
}

class NotesReducerAction {
    constructor(
        type: string = null,
        notes: Array<Note> = null,
        addedNote: Note = null,
        removedNote: Note = null)
    {
        this.type = type;
        this.notes = notes;
        this.addedNote = addedNote;
        this.removedNote = removedNote;
    }
    type: string;
    notes: Array<Note>;
    addedNote: Note;
    removedNote: Note;
}

const NotesReducer = (
    state: Array<Note>, 
    action: NotesReducerAction
) => {
    switch(action.type) {
        case 'POPULATE_NOTES':
            return action.notes;
        case 'ADD_NOTE':
            return [
                ...state,
                action.addedNote
            ];
        case 'REMOVE_NOTE':
            return state.filter((note) => note.id !== action.removedNote.id);
        default:
            return state;
    }
}

const NoteApp = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const defaultNotes: Array<Note> = new Array<Note>();
    const [notes, dispatch] = useReducer(NotesReducer, defaultNotes);
    const [note, setNote] = useState('');
    const [showLoader, setShowLoader] = useState(true);   

    useEffect(() => {
        setTimeout(() => {            
            const responseNotes: Array<Note> = 
                JSON.parse(localStorage.getItem('notes')) || new Array<Note>();                
            
            if(responseNotes && responseNotes.length > 0) {
                dispatch(new NotesReducerAction('POPULATE_NOTES', responseNotes, null, null));
            }
            setIsLoaded(true);
            setShowLoader(false);
        }, 2000);
        
    }, []);

    useEffect(() => {
        if (isLoaded) {
            setShowLoader(true);
            setTimeout(() => {  
                localStorage.setItem('notes', JSON.stringify(notes));    
                setShowLoader(false);
            }, 2000);
        }
        
    }, [notes]);

    const onTitleChange = (e) => {        
        setNote(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(new NotesReducerAction('ADD_NOTE', null, new Note(uuidv4(), note), null));

        setNote('');
    }

    const onNoteRemove = (id) => {
        dispatch(new NotesReducerAction('REMOVE_NOTE',null, null, new Note(id, null)));
    }

    return(
        <div>
            <h1>Notes</h1>
            <div className = {showLoader ? 'progress visible' : 'progress invisible'}>
                <h1>Loading...</h1>
            </div>
            <div>
                {notes.map((note) => (
                    <div key={note.id}>
                        <div className='div-flex'>
                            <h4>{note.title}</h4>
                            <input
                                type='button'
                                className='btn btn-secondary'
                                value='X'
                                onClick={() => onNoteRemove(note.id)}
                            />
                        </div>                        
                    </div>
                ))}
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
                <h3>Add note</h3>
                <div>
                    <div>
                        <span>Title</span>
                    </div>
                    <div>
                        <input 
                            type='text'
                            value={note}
                            onChange={onTitleChange}
                        />
                    </div>
                </div>
                <div>
                    <input 
                        type='submit' 
                        value='Add note' 
                    />
                </div>
            </form>
        </div>
    );
}

ReactDOM.render(
    <NoteApp />,
    document.getElementById('root')
);