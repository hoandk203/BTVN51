import { useEffect, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import reducer from './reducer';
import TasksList from './components/TasksList';
import FormInput from './components/FormInput';
import { validate } from './validate';
function App() {
  const [state, dispatch] = useReducer(reducer, {
    tasks: [],
    task: {
      id: uuidv4(),
      name: "",
      completed: false,
    },
  });

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      dispatch({ action: "tasks/load", payload: JSON.parse(savedTasks) });
    }
  }, []);

  useEffect(() => {
    if (state.tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  }, [state.tasks]);

  const onInput = (event) => {
    const {name, value} = event.target;
    dispatch({action: "task/onInput", payload: {name, value}})
  }

  const onSave = () => {
    if(!validate(state.task.name)){
      return;
    }
    state.task.name = state.task.name.trim().replace("<", "&lt;").replace(">", "&gt;");
    dispatch({action: "tasks/onSave"})
  }

  const onCompleted = (id) => {
    dispatch({action:"task/onCompleted", payload: {id}})
  }

  return (
    <>
      <div className="container" style={{display: "flex", flexDirection: "column", maxWidth: "500px", margin: "0 auto"}}>
        <h1>Todo List</h1>
        <FormInput onInput={onInput} onSave={onSave} task={state.task}/>
        <TasksList tasks={state.tasks} onCompleted={onCompleted}/>
      </div>
    </>
  )
}

export default App
