import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import StudentsList from './StudentsList'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudentsList />
  </StrictMode>,
)
