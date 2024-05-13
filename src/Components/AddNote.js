import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

function AddNote(props) {

    const context = useContext(noteContext);
    const { addNote } = context;
    const[note,setNote] =useState({title:"",description:"",tag:"default"});

    const handleClick=(evt)=>{
        evt.preventDefault();
         addNote(note.title,note.description,note.tag);
         props.showAlert("Note Added Successfully ","success")
    }

    const onChange=(evt)=>{
      setNote({...note,[evt.target.name]:evt.target.value})
    }

    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
            </div>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
                </div>
  
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
