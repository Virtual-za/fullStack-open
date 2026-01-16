const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
morgan.token('body',function(req,res) {return JSON.stringify(req.body)})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))






app.get('/',(request,response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request,response)=> {
    response.json(persons)
})

app.get('/api/persons/:id',(request,response) => {
const id = request.params.id;
const person = persons.find(person => person.id ===id)
 if (person) {
response.json(person)
 } else response.status(404).end()

})

app.get('/info',(req,res) => {
const reqTime = new Date()
res.send(`<h1>Phonebook has info for ${persons.length} people</h1><p>${reqTime}</p>`)
})

app.delete('/api/persons/:id',(req,res) => {
    const id = req.params.id
    const person = persons.filter(person => person.id !== id)
    res.json(person)
    res.status(204).end()
})


const generateId = () => {
const maxId = persons.length > 0 
    ? Math.max(...persons.map(p => Number(p.id) )) : 0
return String(maxId +1)
}

app.post('/api/persons',(req,res) => {
    
    const body = req.body;
  

     if (!body.name) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }

const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
    
}

    persons = persons.concat(person)

   // console.log(person)
    res.json(person)

})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})