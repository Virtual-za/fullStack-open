import axios from "axios";
const baseURl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseURl)
}
const create = (newObject) => {
    return axios.post(baseURl, newObject);
};



const update = (id,newObject) => {
    return axios.put(`${baseURl}/${id}`,newObject)
}

const deleteItem = (id) => {
    return axios.delete(`${baseURl}/${id}`);
};

export default { 
  getAll,
  create,
  update,
  deleteItem
}