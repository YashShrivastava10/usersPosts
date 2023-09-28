import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePostData, savePostData } from '../store/slice/postSlice'
import { Dialog } from '@mui/material';

export const Posts = () => {

  const postData = useSelector(state => state.post)
  const status = useSelector(state => state.navbar)
  const [isDialog, setDialog] = useState(false)
  const [data, setData] = useState({})
  const dispatch = useDispatch()

  const closeDialog = () => {
    setDialog(false);
  }

  const openDialog = () => {
    setDialog(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    formData.userId = parseInt(formData.userId)
    formData.id = data.id
    delete formData.username
    dispatch(savePostData({ data: formData, id: data.id, type: "edit" }))
    setTimeout(() => closeDialog(), 100);
  }

  const dialog = () => {
    if (Object.keys(data).length > 0) {
      return <Dialog
        className="modal-dialog"
        aria-labelledby="simple-dialog-title"
        style={{ width: "100%" }}
        open={isDialog}
        onClose={() => { closeDialog() }}
      >
        <div className="dialog">
          <div className="dialog-header">
            <span onClick={() => { closeDialog() }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M19 12L12 19L5 12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <h2>Edit User</h2>
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="dialog-form">
              <div className="inputLabel">
                <div>
                  <label>Username</label>
                  <input defaultValue={data.username} name="username"></input>
                </div>
                <div>
                  <label>User Id</label>
                  <input required defaultValue={data.userId} name="userId"></input>
                </div>
              </div>
              <div className="inputLabel">
                <div>
                  <label>Title</label>
                  <input required defaultValue={data.title} name="title"></input>
                </div>
                <div>
                  <label>Body</label>
                  <input required defaultValue={data.body} name="body"></input>
                </div>
              </div>
            </div>
            <div className="dialog-button">
            <button type="button"className="secondry-button" onClick={closeDialog }>
              x Cancel
            </button>
              <button type="submit" className="primary-button">
                Save {status === "POST" ? "Post" : "User"}
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    }
  }

  return (
    <div className='posts'>
      {dialog()}
      <div className='posts-container'>
        <table>
          <thead>
            <tr>
              <td className='number-td'>USER ID</td>
              <td>TITLE</td>
              <td className='number-td'>Actions</td>
            </tr>
          </thead>
          <tbody>
            {postData.map((data, index) => 
            <tr key={index}>
              <td className='number-td'>#{data.userId}</td>
              <td className='post-title'>{data.title}</td>
              <td className='action-td'>
                <span onClick={() => { setData(data); openDialog() }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 20H21" stroke="#D6D6D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.303 3.30301 19.5 3.5C19.697 3.69698 19.8532 3.93083 19.9598 4.1882C20.0665 4.44557 20.1213 4.72142 20.1213 5C20.1213 5.27857 20.0665 5.55442 19.9598 5.81179C19.8532 6.06916 19.697 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke="#D6D6D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span onClick={() => dispatch(deletePostData(data.id))}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 22" fill="none">
                    <path d="M1 4.99991H3H19" stroke="#D6D6D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 5V3C6 2.46957 6.21071 1.96086 6.58579 1.58579C6.96086 1.21071 7.46957 1 8 1H12C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V5M17 5V19C17 19.5304 16.7893 20.0391 16.4142 20.4142C16.0391 20.7893 15.5304 21 15 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5H17Z" stroke="#D6D6D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 9.99991V15.9999" stroke="#D6D6D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 9.99991V15.9999" stroke="#D6D6D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
