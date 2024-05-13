//To use states in complex apps containing many components:
import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesIntial = [

  ]

  const [notes, setNotes] = useState(notesIntial);

  //Get all Notes:
  const getNotes = async () => {
    const response = await fetch(`${host}/notes/fetchNotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyZGQ3NmU3ZTJhMzZkMzNhMWQ2NTdhIn0sImlhdCI6MTcxNDM2ODk1Nn0.LJgWmLY_COwqgp4mUqlRCEmzZumfwOu_shMwEDGN1Xc'
      },
    });

    const json=await response.json();
    setNotes(json);

  }


  //Add Notes:
  const addNote = async (title, description, tag) => {

    //Fetch add note api from backend:
     const response = await fetch(`${host}/notes/addNotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyZGQ3NmU3ZTJhMzZkMzNhMWQ2NTdhIn0sImlhdCI6MTcxNDM2ODk1Nn0.LJgWmLY_COwqgp4mUqlRCEmzZumfwOu_shMwEDGN1Xc'
      },
      body: JSON.stringify({title, description, tag})
    });

    const json=await response.json();
   
    //To Add note:
    const note =json;
    setNotes(notes.concat(note));
  }


  //Delete Notes:
  const deleteNote = async (id) => {

    //Fetch delete note api from backend:
    const response = await fetch(`${host}/notes/deleteNotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyZGQ3NmU3ZTJhMzZkMzNhMWQ2NTdhIn0sImlhdCI6MTcxNDM2ODk1Nn0.LJgWmLY_COwqgp4mUqlRCEmzZumfwOu_shMwEDGN1Xc'
      },
    });

    const json=await response.json();

    //To Delete the note:
    const newNote = notes.filter((note) => { return note._id !== id });
    setNotes(newNote);
  };


  //Edit Notes:
  const editNote = async (id, title, description, tag) => {

    //Fetch edit note api from backend:
    const response = await fetch(`${host}/notes/updateNotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyZGQ3NmU3ZTJhMzZkMzNhMWQ2NTdhIn0sImlhdCI6MTcxNDM2ODk1Nn0.LJgWmLY_COwqgp4mUqlRCEmzZumfwOu_shMwEDGN1Xc'
      },
      body: JSON.stringify({title, description, tag})
    });

    const json= await response.json();

    //To Edit note:
    let newNotes=JSON.parse(JSON.stringify(notes));

    for (let idx = 0; idx < newNotes.length; idx++) {
      const element = newNotes[idx];
      if (element._id === id) {
        newNotes[idx].title = title;
        newNotes[idx].description = description;
        newNotes[idx].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;