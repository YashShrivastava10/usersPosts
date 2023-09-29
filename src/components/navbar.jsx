import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { changeRoute } from '../store/slice/navbarSlice';
import { Dialog } from '@mui/material';
import { saveUserData } from '../store/slice/userSlice';
import { savePostData } from '../store/slice/postSlice';

export const Navbar = () => {

  const status = useSelector(state => state.navbar)
  const users = useSelector(state => state.user)
  const posts = useSelector(state => state.post)
  const [isDialog, setDialog] = useState(false)
  const [isClicked, setClicked] = useState(false)
  const [input, setInput] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [name, setName] = useState(undefined)
  const [userId, setUserId] = useState(null)
  const dispatch = useDispatch();
  const panel = useRef(null)

  useEffect(() => {
    const element = document.getElementById("POST")
    if (element) {
      element.style.color = "aqua"
    }
    const onClick = (e) => {
      if(panel.current !== e.target){
        setClicked(false)
        const select = document.querySelector("#search");
        if(select)
          select.style.hidden = false;
      }
    }
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    }
  }, [])

  const handleRoute = (id) => {
    if (status === "POST" && id !== "POST")
      dispatch(changeRoute("USER"))
    else if (status === "USER" && id !== "USER")
      dispatch(changeRoute("POST"))
    const links = document.querySelectorAll(".links")
    if (links) {
      for (let i = 0; i < links.length; i++) {
        links[i].style.color = "white"
      }
    }
    const element = document.getElementById(id)
    if (element) {
      element.style.color = "aqua"
    }
  }

  const closeDialog = () => {
    setDialog(false);
    setInput("")
    setFilteredData([])
    setName(undefined)
    setUserId(undefined)
  }

  const openDialog = () => {
    setDialog(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if(status === "USER"){
      const address = { street: formData.street, suite: formData.suite, city: formData.city, zipcode: formData.zipcode }
      delete formData.street
      delete formData.suite
      delete formData.city
      delete formData.zipcode
      formData.address = address
      formData.id = users.length + 1
      dispatch(saveUserData({ data: formData, id: null, type: "create" }))
    }
    else if(status === "POST"){
      formData.userId = parseInt(formData.userId)
      formData.id = posts.length + 1
      dispatch(savePostData({ data: formData, id: null, type: "create" }))
      setInput("")
      setFilteredData([])
      setName(undefined)
      setUserId(undefined)
    }
    setTimeout(() => closeDialog(), 100);
  }

  const handleSearch = (e) => {
    setInput(e.target.value)
    let filter = [...users]
    if(e.target.value !== ""){
      filter = filter.filter(search => search.username.toLowerCase().includes(e.target.value.toLowerCase()))
      setFilteredData(filter)
    }
    else{
      setFilteredData([])
    }
  }

  const selectUser = (data) => {
    setUserId(data.id)
    setName(data.name)
    setClicked(false)
    const select = document.querySelector("#search");
    select.style.hidden = false;
  }
  const handleClick = (e) => {
    setClicked(true)
    const select = document.querySelector("#search");
    select.style.hidden = true;
  }
  const dialog = () => {
    return <Dialog
      className="modal-dialog"
      aria-labelledby="simple-dialog-title"
      style={{ width: "100%" }}
      open={isDialog}
      onClose={() => { closeDialog() }}
    >
      <div className="dialog">
        <div className="dialog-header">
          <span onClick={closeDialog}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12L12 19L5 12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>
            <h2>Create {status === "POST" ? "Post" : "User"}</h2>
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="dialog-form">
            {status === "POST" &&
              <>
                <div className="inputLabel">
                  <div>
                    <label>Username</label>
                    <div className='search-container' onClick={(e) => e.stopPropagation()}>
                      <input id="search" value={name} onClick={handleClick} />
                      {isClicked && 
                      <div ref={panel} className='panel'>
                        <div className='search-bar'>
                          <input value={input} placeholder='Search' type='text' onChange={handleSearch}></input>
                        </div>
                        <div className='filter-list'>
                          {filteredData.map((data, index) => 
                            <li key={index} onClick={() => selectUser(data)}>{data.name}</li>)}
                        </div>
                      </div>}
                    </div>
                  </div>
                  <div>
                    <label>User Id</label>
                    <input required value={userId} readOnly name="userId"></input>
                  </div>
                </div>
                <div className="inputLabel">
                  <div>
                    <label>Title</label>
                    <input required defaultValue="" name="title"></input>
                  </div>
                  <div>
                    <label>Body</label>
                    <input required defaultValue="" name="body"></input>
                  </div>
                </div>
              </>}
            {status === "USER" &&
              <>
                <div className="inputLabel">
                  <div>
                    <label>Name</label>
                    <input required defaultValue="" name="name"></input>
                  </div>
                  <div>
                    <label>Username</label>
                    <input required defaultValue="" name="username"></input>
                  </div>
                </div>
                <div className="inputLabel">
                  <div>
                    <label>Email</label>
                    <input required defaultValue="" name="email"></input>
                  </div>
                  <div>
                    <label>Phone No.
                    </label>
                    <input required defaultValue="" name="phone"></input>
                  </div>
                </div>
                <div className="inputLabel">
                  <div>
                    <label>Street</label>
                    <input required defaultValue="" name="street"></input>
                  </div>
                  <div>
                    <label>Suite</label>
                    <input required defaultValue="" name="suite"></input>
                  </div>
                </div>
                <div className="inputLabel">
                  <div>
                    <label>City</label>
                    <input required defaultValue="" name="city"></input>
                  </div>
                  <div>
                    <label>Zipcode</label>
                    <input required defaultValue="" name="zipcode"></input>
                  </div>
                </div>
              </>
            }
          </div>
          <div className="dialog-button">
            <button type="button" className="secondry-button" onClick={closeDialog }>
              x Cancel
            </button>
            <button type="submit" className="primary-button">
              Create {status === "POST" ? "Post" : "User"}
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  }

  return (
    <div className='navbar'>
      {dialog()}
      <div className='navbar-route'>
        <Link to="/posts" id="POST" className="links" onClick={() => handleRoute("POST")}>POSTS</Link>
        <span>|</span>
        <Link to="/users" id="USER" className="links" onClick={() => handleRoute("USER")}>USERS</Link>
      </div>
      <div className='navbar-desc-button'>
        <div className='navbar-desc'>
          <h2>{status}S</h2>
        </div>
        <div className="navbar-button">
          <button className='primary-button' onClick={openDialog}>+ CREATE {status}</button>
        </div>
      </div>
    </div>
  )
}
