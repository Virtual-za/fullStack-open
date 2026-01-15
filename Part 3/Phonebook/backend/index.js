const express = require('express')
const app = express()

app.use(express.json())
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

app.post('/api/persons',(req,res) => {
    const maxId = persons.length > 0 
    ? Math.max(...persons.map(p => Number(p.id) )) : 0

    const person = req.body;
    person.id = String(maxId + 1)

    persons = persons.concat(person)
//Actually needed to commit exercise 3.5
    console.log(person)
    res.json(person)

})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})