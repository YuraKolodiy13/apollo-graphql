import React from 'react';
import {Link, useParams} from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {useQuery} from "@apollo/client";
import {GET_POST} from "../../apollo/posts";

const Post = () => {

  const {id} = useParams();
  const {loading, data: {post} = {}} = useQuery(GET_POST, {
    variables: {id}
  });

  if (loading) return <p>Loading...</p>;

  console.log(post, 'post')

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/">Home</Link>
        <Link underline="hover" color="inherit" to="/posts">Posts</Link>
        <Typography color="text.primary">{post.title}</Typography>
      </Breadcrumbs>
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {post.comments?.map(item =>
          <ListItem alignItems="flex-start" key={item.id}>
            <ListItemAvatar>
              <Avatar alt={item.email} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={item.body}
            />
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default Post;