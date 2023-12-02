import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";

function App(props) {

  const [tasks, setTasks] = useState(props.tasks); // setting the init value from prop
  let yetToDoCount = tasks.filter(task => task.completed === false).length;
  // update the UI based on change in the state of todo List
  let taskList = tasks?.map(task => {
    return <Todo key={task.id} id={task.id} completed={task.completed} name={task.name}
      toggleTaskCompleted={toggleTaskCompleted} editTask={handleEditTask} deleteTask={handleDeleteTask} />
  });

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

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading"> {yetToDoCount} tasks remaining</h2>
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