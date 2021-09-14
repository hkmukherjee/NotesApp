import React = require("react");
import ReactDOM = require("react-dom");
import { useState, useEffect } from "react";
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

const NoteApp = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const defaultNotes: Array<Note> = new Array<Note>();
    const [notes, setNotes] = useState(defaultNotes);
    const [note, setNote] = useState('');
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        console.log('Call start!!! first time useEffect..', notes);

        setTimeout(() => {            
            const responseNotes: Array<Note> = 
                JSON.parse(localStorage.getItem('notes')) || new Array<Note>();                
            
            if(responseNotes && responseNotes.length > 0) {
                setNotes(responseNotes);
            }        
            console.log('Call End!!! first time useEffect.', notes);
            setIsLoaded(true);
            setShowLoader(false);
        }, 3000);
        
    }, []);

    useEffect(() => {   
        console.log('isLoaded: ', isLoaded);
        if (isLoaded) {
            setShowLoader(true);

            console.log('Call start!!! Second time useEffect..', notes);
        
            localStorage.setItem('notes', JSON.stringify(notes));
    
            console.log('Call end!!! Second time useEffect.', notes);    

            setShowLoader(false);
        }
        
    }, [notes]);

    const onTitleChange = (e) => {        
        setNote(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setNotes([
            ...notes,
            new Note(uuidv4(), note)
        ]);
        setNote('');
    }

    const onNoteRemove = (id) => {
        setNotes(
            notes.filter((note) => note.id !== id)
        );
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