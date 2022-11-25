import {gql} from "@apollo/client";

export const GET_POSTS = gql`
  query($page: Int, $perPage: Int){
    posts: allPosts(page: $page, perPage: $perPage){
      id
      title
      body
    }
    _allPostsMeta{
      count
    }
  }
`;

export const CREATE_POST = gql`
  mutation($idUser: Int!, $title: String!, $body: String!){
    newPost: createPost(idUser: $idUser, title: $title, body: $body){
      idUser
      id
      title
      body
    }
  }
`

export const REMOVE_POST = gql`
  mutation($id: ID!){
    removePost(id: $id){
      id
    }
  }
`

export const UPDATE_POST = gql`
  mutation($id: ID!, $title: String, $body: String){
    updatePost(id: $id, title: $title, body: $body){
      id
      title
      body
    }
  }
`

export const GET_POST = gql`
  query($id: ID!){
    post: Post(id: $id){
      id
      title
      body
      comments: Comments {
        id
        email
        name
        body
      }
    }
  }
`;
