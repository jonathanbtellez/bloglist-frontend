import axios from 'axios'
const baseUrl = '/api/v1/users'


// let token = null

// const setToken = newToken => {
//   token = `bearer ${newToken}`
// }

const getAll = async () => {
  const {data} = await axios.get(baseUrl)
  console.log(data)
  return data
}

// const create = async (blog) => {
//   const response = await axios.post(baseUrl, blog, {
//     headers:{
//       Authorization: token
//     }
//   })
//   return response.data
// }

// const update = async (blog) => {
//   const response = await axios.put(`${baseUrl}/${blog.id}`, blog, {
//     headers:{
//       Authorization: token
//     }
//   })
//   return response.data
// }

// const destroy = async (blog) => {
//   const response = await axios.delete(`${baseUrl}/${blog.id}`, {
//     headers:{
//       Authorization: token
//     }
//   })
//   return response.data
// }



export default { getAll }