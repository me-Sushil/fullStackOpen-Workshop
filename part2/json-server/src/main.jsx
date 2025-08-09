import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const notes = [
  {id:1, content:"hello1", important: true},
  {id:2, content:"hello2", important: false},
  {id:3, content:"hello3", important: true}
]

createRoot(document.getElementById('root')).render(<App notes={notes}/>)
