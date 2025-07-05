"use client";
import './App.css'
import TodoPage from './components/TodoPage'
import { CopilotPopup } from "@copilotkit/react-ui"; 
import "@copilotkit/react-ui/styles.css";
function App() {


  return (
    <>
      <TodoPage/>
      <CopilotPopup /> 
    </>
  )
}

export default App
