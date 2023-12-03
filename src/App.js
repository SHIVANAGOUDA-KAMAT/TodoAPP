import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

// defining outside App() cause if defined inside, recalculated every time the <App /> renders
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

function App(props) {

  const [tasks, setTasks] = useState(props.tasks); // setting the init value from prop
  let yetToDoCount = tasks.filter(task => task.completed === false).length;
  const [filter, setFilter] = useState("All");
  const listHeadingRef = useRef(null);


  // update the UI based on change in the state of todo List 
  // Best logic useful in future
  const taskList = tasks?.filter(FILTER_MAP[filter]).map(task => {
    return <Todo key={task.id} id={task.id} completed={task.completed} name={task.name}
      toggleTaskCompleted={toggleTaskCompleted} editTask={handleEditTask} deleteTask={handleDeleteTask} />
  });
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} name={name} isPressed={name === filter}
      setFilter={setFilter} />
  ));


  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name: name, completed: false };
    setTasks([...tasks, newTask]);
  };

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function handleEditTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) return { ...task, name: newName };
      return task;
    });
    setTasks(editedTaskList);
  }

  function handleDeleteTask(id) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  }

  // to focus on the task list header after deleting the task
  const prevTaskLength = usePrevious(tasks.length);
  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);
  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {/* filter buttons rendered after maping above */}
        {filterList}
      </div>
      {/* Only apply a tabindex to an element when you're absolutely sure that making it focusable will benefit your user in some way */}
      <h2 ref={listHeadingRef} tabIndex="-1" id="list-heading"> {yetToDoCount} tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {/*we are looping here the product of map operation from above */}
        {taskList}
      </ul>

    </div>
  );
}

export default App;