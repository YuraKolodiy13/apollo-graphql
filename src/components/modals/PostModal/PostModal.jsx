import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import {useMutation} from "@apollo/client";
import {CREATE_POST, GET_POSTS} from "../../../apollo/posts";

const PostModal = ({isPostModalOpen, closeModal, post, variables}) => {

  const user = null;
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [
      {query: GET_POSTS, variables}
    ],
    // update(cache, {data: {newPost}}) {
    //   const data = cache.readQuery({query: GET_POSTS, variables});
    //   const {posts} = data;
    //   cache.writeQuery({
    //     query: GET_POSTS,
    //     data: {
    //       ...data,
    //       posts: [...posts, newPost],
    //     }
    //   })
    // }
  });
  // const [editPost] = useEditPostMutation();
  const [newPost, setNewPost] = useState({title: '', body: '', idUser: 10})

  const handleCreatePost = () => {
    if(post){
      // editPost(newPost);
    }else {
      createPost({
        variables: newPost
      });
    }
    closeModal();
  }

  console.log(post, 'post')

  useEffect(() => {
    if(post) setNewPost(post);
  },[post])


  return (
    <Modal
      className='modal modal-wide'
      open={isPostModalOpen}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isPostModalOpen}>
        <div className='modal__content'>
          <TextField
            label="Title"
            variant="outlined"
            value={newPost.title}
            onChange={e => setNewPost({...newPost, title: e.target.value})}
          />

          <TextField
            label="Body"
            variant="outlined"
            value={newPost.body}
            onChange={e => setNewPost({...newPost, body: e.target.value})}
          />
          <Button
            variant="contained"
            onClick={handleCreatePost}
            disabled={!newPost.title || !newPost.body}
          >{post ? 'Edit' : 'Add'} post</Button>
        </div>
      </Fade>
    </Modal>
  )
};
export default PostModal;