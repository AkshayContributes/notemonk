import NotesView from "./notesview.js";
import NotesAPI  from "./notesapi.js";

export default class App {

    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());
        this._refereshNotes();
    }


    _refereshNotes() {
        const notes = NotesAPI.getAllNotes();

        this._setNotes(notes);

        if(notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    }

    _setNotes(notes) {

        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);

    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    _handlers() {
        return {
            onNoteSelect: noteId => {
               const selectedNote = this.notes.find(note => note.id == noteId);
               this._setActiveNote(selectedNote);
            },

            onNoteAdd: () => {
                const newNote = {
                    "title" : "New Note",
                    "body" : "Take note..."
                };

                NotesAPI.saveNote(newNote);
                this._refereshNotes();
            },

            onNoteEdit: (noteTitle, noteBody) => {
                NotesAPI.saveNote({
                    id: this.activeNote.id,
                    title: noteTitle,
                    body: noteBody
                });

                this._refereshNotes();
            },
            
            onNoteDelete: noteId => {
                NotesAPI.deleteNote(noteId);
                this._refereshNotes();
            }

        };
    }
}