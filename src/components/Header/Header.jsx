import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
// import {useDispatch, useSelector} from "react-redux";
// import {removeUser} from "../../store/reqres/auth.slice";

const Header = () => {

  // const user = useSelector((state) => state.auth.user)
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = null;
  // const dispatch = useDispatch();

  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          <NavLink to='/' end>Home</NavLink>
        </Typography>

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NavLink to='/posts'>posts</NavLink>
          <NavLink to='/users'>users</NavLink>
          <NavLink to='/faq'>faq</NavLink>
          {!user && <NavLink to='/login'>login</NavLink>}
        </Box>
        {user && (
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              <MenuItem onClick={() => setAnchorElUser(null)}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => {
                // dispatch(removeUser(null));
                setAnchorElUser(null);
              }}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;