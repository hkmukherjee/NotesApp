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
const NoteApp = () => {
    const [isLoaded, setIsLoaded] = (0, react_1.useState)(false);
    const defaultNotes = new Array();
    const [notes, setNotes] = (0, react_1.useState)(defaultNotes);
    const [note, setNote] = (0, react_1.useState)('');
    const [showLoader, setShowLoader] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        console.log('Call start!!! first time useEffect..', notes);
        setTimeout(() => {
            const responseNotes = JSON.parse(localStorage.getItem('notes')) || new Array();
            if (responseNotes && responseNotes.length > 0) {
                setNotes(responseNotes);
            }
            console.log('Call End!!! first time useEffect.', notes);
            setIsLoaded(true);
            setShowLoader(false);
        }, 3000);
    }, []);
    (0, react_1.useEffect)(() => {
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
    };
    const onSubmit = (e) => {
        e.preventDefault();
        setNotes([
            ...notes,
            new Note((0, uuid_1.v4)(), note)
        ]);
        setNote('');
    };
    const onNoteRemove = (id) => {
        setNotes(notes.filter((note) => note.id !== id));
    };
    return (React.createElement("div", null,
        React.createElement("h1", null, "Notes"),
        React.createElement("div", { className: showLoader ? 'progress visible' : 'progress invisible' },
            React.createElement("h1", null, "Loading...")),
        React.createElement("div", null, notes.map((note) => (React.createElement("div", { key: note.id },
            React.createElement("div", { className: 'div-flex' },
                React.createElement("h4", null, note.title),
                React.createElement("input", { type: 'button', className: 'btn btn-secondary', value: 'X', onClick: () => onNoteRemove(note.id) })))))),
        React.createElement("form", { onSubmit: (e) => onSubmit(e) },
            React.createElement("h3", null, "Add note"),
            React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement("span", null, "Title")),
                React.createElement("div", null,
                    React.createElement("input", { type: 'text', value: note, onChange: onTitleChange }))),
            React.createElement("div", null,
                React.createElement("input", { type: 'submit', value: 'Add note' })))));
};
ReactDOM.render(React.createElement(NoteApp, null), document.getElementById('root'));
