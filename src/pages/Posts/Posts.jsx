import React, {useState} from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Pagination from "@mui/material/Pagination";
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import {useMutation, useQuery} from "@apollo/client";
import {GET_POSTS, REMOVE_POST} from "../../apollo/posts";
import PostModal from "../../components/modals/PostModal/PostModal";

const Posts = () => {

  // const user = useSelector((state) => state.auth.user)
  const [page, setPage] = useState(1);
  const perPage = 10;
  const {loading, error, data} = useQuery(GET_POSTS, {
    variables: {page: page - 1, perPage}
  });
  const [removePost] = useMutation(REMOVE_POST);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [post, setPost] = useState(null);

  const handleRemovePost = async (id) => {
    // setPage(Math.ceil((posts.totalCount - 1) / itemsPerPage));
    await removePost({variables: {id}});
  }
  const handleEditPost = (post) => {
    setPost(post);
    setIsPostModalOpen(true)
  }

  const closePostModal = () => {
    setPost(null);
    setIsPostModalOpen(false);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/">Home</Link>
        <Typography color="text.primary">Posts</Typography>
      </Breadcrumbs>
      <Button variant="contained" onClick={() => setIsPostModalOpen(true)}>Add post</Button>
      {isPostModalOpen && (
        <PostModal
          isPostModalOpen={isPostModalOpen}
          closeModal={closePostModal}
          post={post}
          variables={{page: page - 1, perPage}}
        />
      )}

      <List>
        {data.posts?.map(item =>
          <ListItem
            key={item.id}
            secondaryAction={item.user_id === {}?.id &&
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditPost(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemovePost(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <Link to={`/posts/${item.id}`}>
              <ListItemText
                primary={item.title}
                secondary={item.body}
              />
            </Link>
          </ListItem>
        )}
      </List>
      {data._allPostsMeta?.count > data.posts?.length && (
        <Pagination
          count={Math.ceil(data._allPostsMeta?.count / perPage)}
          shape="rounded"
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      )}
    </div>
  );
};

export default Posts;