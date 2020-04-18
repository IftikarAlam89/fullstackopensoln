const http=require('http')
const express=require('express')
const app=express()

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
]

app.get('/',(req,res)=>{
    res.send('<h1>Hello World</h1>')
})

app.get('/api/notes',(req,res)=>{
    res.json(notes)
})

app.get('/api/notes/:id',(req,res)=>{
    const id=Number(req.params.id)
    const note=notes.find(note=>note.id===id)
    if (note){
        res.json(note)
    }else{
        res.status(404).end()
    }
})

app.delete('/api/notes/:id',(req,res)=>{
    const id=Number(req.params.id)
    const newNotes=notes.filter(note=>note.id!==id)
    notes=newNotes
    res.status(204).end()
})
app.use(express.json())

//...

const generateId=()=>{
    const maxId=notes.length>0? Math.max(...notes.map(note=>note.id)):0
    const noteId=maxId+1
    return noteId

}

app.post('/api/notes', (request, response) => {
    const note = request.body
    console.log(request.body)
    if(!note.content){
        return response.status(400).json({
            error: "content missing"
        })
    }
    const o_note={
        content:note.content,
        important: note.important || false,
        date: new Date(),
        id: generateId(),
    }
    notes=notes.concat(o_note)

    response.json(note)
})

const port=3002
app.listen(port)
console.log(`Server running on port ${port}`)