"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const react_1 = require("react");
const uuid_1 = require("uuid");
require("../styles/app.scss");
class Note {
    constructor(id = null, title = null) {
        this.id = id;
        this.title = title;
    }
}
class NotesReducerAction {
    constructor(type = null, notes = null, addedNote = null, removedNote = null) {
        this.type = type;
        this.notes = notes;
        this.addedNote = addedNote;
        this.removedNote = removedNote;
    }
}
const NotesReducer = (state, action) => {
    switch (action.type) {
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
};
const NoteContext = React.createContext({
    showLoader: false,
    notes: new Array(),
    dispatch: () => new NotesReducerAction()
});
const ProgressIcon = () => {
    const { showLoader } = (0, react_1.useContext)(NoteContext);
    return (React.createElement("div", { className: showLoader ? 'progress visible' : 'progress invisible' },
        React.createElement("h1", null, "Loading...")));
};
const NotesList = () => {
    const { notes, dispatch } = (0, react_1.useContext)(NoteContext);
    const onNoteRemove = (id) => {
        dispatch(new NotesReducerAction('REMOVE_NOTE', null, null, new Note(id, null)));
    };
    return (React.createElement(React.Fragment, null, notes.map((note) => (React.createElement("div", { key: note.id },
        React.createElement("div", { className: 'div-flex' },
            React.createElement("h4", null, note.title),
            React.createElement("input", { type: 'button', className: 'btn btn-secondary', value: 'X', onClick: () => onNoteRemove(note.id) })))))));
};
const NoteAddForm = () => {
    const { dispatch } = (0, react_1.useContext)(NoteContext);
    const [note, setNote] = (0, react_1.useState)('');
    const onTitleChange = (e) => {
        setNote(e.target.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(new NotesReducerAction('ADD_NOTE', null, new Note((0, uuid_1.v4)(), note), null));
        setNote('');
    };
    return (React.createElement("form", { onSubmit: (e) => onSubmit(e) },
        React.createElement("h3", null, "Add note"),
        React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("span", null, "Title")),
            React.createElement("div", null,
                React.createElement("input", { type: 'text', value: note, onChange: onTitleChange }))),
        React.createElement("div", null,
            React.createElement("input", { type: 'submit', value: 'Add note' }))));
};
const NoteApp = () => {
    const [isLoaded, setIsLoaded] = (0, react_1.useState)(false);
    const defaultNotes = new Array();
    const [notes, dispatch] = (0, react_1.useReducer)(NotesReducer, defaultNotes);
    const [showLoader, setShowLoader] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        setTimeout(() => {
            const responseNotes = JSON.parse(localStorage.getItem('notes')) || new Array();
            if (responseNotes && responseNotes.length > 0) {
                dispatch(new NotesReducerAction('POPULATE_NOTES', responseNotes, null, null));
            }
            setIsLoaded(true);
            setShowLoader(false);
        }, 2000);
    }, []);
    (0, react_1.useEffect)(() => {
        if (isLoaded) {
            setShowLoader(true);
            setTimeout(() => {
                localStorage.setItem('notes', JSON.stringify(notes));
                setShowLoader(false);
            }, 2000);
        }
    }, [notes]);
    return (React.createElement(NoteContext.Provider, { value: { showLoader, notes, dispatch } },
        React.createElement("h1", null, "Notes"),
        React.createElement(ProgressIcon, null),
        React.createElement(NotesList, null),
        React.createElement(NoteAddForm, null)));
};
ReactDOM.render(React.createElement(NoteApp, null), document.getElementById('root'));
