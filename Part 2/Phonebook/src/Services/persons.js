import axios from "axios";
const baseURl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURl)
}
const create = (newObject) => {
    return axios
    .post(baseURl,newObject)
    .then(Response => console.log(Response));
    
}



const update = (id,newObject) => {
    return axios.put(`${baseURl}/${id}`,newObject)
}

const deleteItem = (id,newObject) => {
    return axios.delete(`${baseURl}/${id}`,newObject)
}

export default { 
  getAll,
  create,
  update,
  deleteItem
}