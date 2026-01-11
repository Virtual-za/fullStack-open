import axios from "axios";
const baseURl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURl)
}

const update = () => {
    return axios.put()
}