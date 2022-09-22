import React from 'react'
import Axios from 'axios'

function List({username, password}) {
  const deleteUser = (username) =>{
    // console.log(`cliecked ${username}`)
     Axios.delete(`http://localhost:3001/api/delete/${username}`)
  }
  return (
    <div className='list'>
        <h4>{username}</h4>
        <button onClick={()=>deleteUser(username)}>delete</button>
    </div>
  )
}

export default List