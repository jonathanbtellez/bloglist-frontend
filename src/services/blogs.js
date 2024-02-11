import axios from 'axios'
const baseUrl = '/api/v1/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  console.log(data)
  return data
}

const getById = async ({ id }) => {
  const { data } = await axios.get(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token
    }
  })
  console.log(data)
  return data
}

const createComment = async ({ id, content }) => {
  console.log({ id, content })
  const response = await axios.post(`${baseUrl}/${id}/comment`, { content: content }, {
    headers: {
      Authorization: token
    }
  })
  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: token
    }
  })
  return response.data
}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, {
    headers: {
      Authorization: token
    }
  })
  return response.data
}

const destroy = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, {
    headers: {
      Authorization: token
    }
  })
  return response.data
}



export default { getAll, create, setToken, update, destroy, createComment, getById }