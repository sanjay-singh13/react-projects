import React, {useState, useEffect} from 'react'
import List from './List'
import Axios from 'axios'
import './index.css'



function App() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [userList, setUserList] = useState([])
  // const [isSignupSuccess, setIsSignupSuccess] = useState(false)

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      // console.log(response.data)
      setUserList(response.data)
    })
  },[userList]);

  const handleLogin = () =>{
    
    if (!userName || !password){
      alert('please fill')
    }else{
      
      let specificUser = userList.find((user) => user.username === userName && user.password === password)
      console.log(userList)
      if (specificUser){
        // setIsLogin(true)
        alert('success')
      }
      else{
        alert('access denied')
      }

    }
    setUserName('')
    setPassword('')
  }

  const handleSignUp = () =>{
    if (!userName || !password){
      alert('please fill')
    }
    else{
      const username = userList.find((user)=> user.username===userName)
      if (username){
        alert('user already exist')   
      }
      else{
        const id = new Date().getTime().toString()
        Axios.post("http://localhost:3001/api/insert",{
          id: id,
          userName: userName, 
          password: password
        });

        const newList = {id:id, userName:userName, password:password}
        setUserList([...userList, newList])
        alert('signup successful')
      }
      
    }
    setUserName('')
    setPassword('')
  }

  // const showUsers = () =>{
  //   console.log('clicked')
  //   return <>
  //     <List list = {userList}/>
  //   </>
  // }
  return (
    <>
      <div className='container'>
        <h2>login form</h2>
        <form className='form-center'>
          <div className="form-control">
            <label htmlFor="username">username</label>
            <input type="text" name='username' value={userName} onChange={(e)=>setUserName(e.target.value)}/>
          </div>
          <div className="form-control">
            <label htmlFor="password">password</label>
            <input type="text" name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          {/* {isSignupSuccess && <p>User alreay exist</p>} */}
        </form>
        <div className="btn-container">
            <button onClick={()=>handleSignUp()}>signup</button>
            {/* <button type='submit'>login</button> */}
            <button onClick={()=>handleLogin()}>login</button>
        </div>
        
      </div>
        <h3>list of users</h3>
        {
          userList.map((user)=>{
            return <List key={user.id} {...user} />
          })
        }
    </>
  );
}

export default App;
