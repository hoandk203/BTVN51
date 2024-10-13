import { useEffect, useReducer, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import reducer from './reducer';
import TasksList from './components/TasksList';
import FormInput from './components/FormInput';
import { validate } from './validate';
import Alert from '@mui/material/Alert';
function App() {
  const [msgError, setMsgError] = useState("");
  const [msgSuccess, setMsgSuccess] = useState("");
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
    if(validate(state.task.name)){
      setMsgError(validate(state.task.name));
      return;
    }
    state.task.name = state.task.name.trim().replace("<", "&lt;").replace(">", "&gt;");
    dispatch({action: "tasks/onSave"})
    setMsgSuccess("Thêm công việc thành công");
  }

  const onCompleted = (id, task) => {
    if(!task.completed){
      setMsgSuccess("Công việc đã hoàn thành");
    }else{
      setMsgSuccess("Công việc chưa hoàn thành");
    }
    dispatch({action:"task/onCompleted", payload: {id}})
  }

  useEffect(() => {
    setTimeout(() => {
        setMsgError("");
        setMsgSuccess("");
    }, 3000);
}, [msgError, msgSuccess]);
  return (
    <>
      {msgError && <Alert style={{position:"absolute", top: "30px", left: "50%", translate: "-50% 0"}} severity="error">{msgError}</Alert>}
      {msgSuccess==="Công việc đã hoàn thành" && (<Alert style={{position:"absolute", top: "30px", left: "50%", translate: "-50% 0"}} severity="success">{msgSuccess}</Alert>)}
      {msgSuccess==="Công việc chưa hoàn thành" && (<Alert style={{position:"absolute", top: "30px", left: "50%", translate: "-50% 0"}} severity="warning">{msgSuccess}</Alert>)}
      {msgSuccess==="Thêm công việc thành công" && (<Alert style={{position:"absolute", top: "30px", left: "50%", translate: "-50% 0"}} severity="success">{msgSuccess}</Alert>)}
      <div className="container" style={{display: "flex", flexDirection: "column", maxWidth: "500px", margin: "0 auto"}}>
        <h1>Todo List</h1>
        <FormInput onInput={onInput} onSave={onSave} task={state.task}/>
        <TasksList tasks={state.tasks} onCompleted={onCompleted}/>
      </div>
    </>
  )
}

export default App
