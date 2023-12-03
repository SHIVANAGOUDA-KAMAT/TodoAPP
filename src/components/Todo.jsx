import React, { useState, useRef, useEffect } from 'react';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const editFieldRef = useRef(null); //I have attached this to edit input field using [ref] attribute
  const editButtonRef = useRef(null); //I have attached this to edit button using [ref] attribute
  const wasEditing = usePrevious(isEditing);


  // called on input change to update the state value
  function handleEditName(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  // this below template will be rendered based on the is editing comdition 
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input ref={editFieldRef} value={newName} onChange={handleEditName} id={props.id} className="todo-text" type="text" />
      </div>
      <div className="btn-group">
        <button onClick={() => setEditing(false)} type="button" className="btn todo-cancel">
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button ref={editButtonRef} type="button" className="btn"
          onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}>
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div >
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);  
  // 2nd array param is a list of values useEffect() should depend on. With these values included, useEffect() will only run when one of those values changes.

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}