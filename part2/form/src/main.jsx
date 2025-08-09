import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const notes = [
{ id:1, note:"HTML is easy", important: true},
{ id:2, note: "Browser can execute only JavaScript", important: false},
{id:3, note: "GET and POST  are the most important methods of HTTP protocol", important:true}]

createRoot(document.getElementById('root')).render(<App notes={notes}/>)
