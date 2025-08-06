import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const notes = [
  {id:1, content:"hello1"},
  {id:2, content:"hello2"},
  {id:3, content:"hello3"}
]

createRoot(document.getElementById('root')).render(<App notes={notes}/>)
