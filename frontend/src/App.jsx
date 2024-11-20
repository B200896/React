import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FileUpload from './FileUpload'
import Dashboard from './Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobPage from './JobPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router> {/* Wrap your app in BrowserRouter */}
      <Routes>
        {/* Define Routes */}
        <Route path="/" element={<FileUpload />} />   {/* Home route for FileUpload */}
        <Route path="/dashboard" element={<Dashboard />} />  {/* Route for Dashboard */}
        <Route path="/jobdata" element={<JobPage/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
