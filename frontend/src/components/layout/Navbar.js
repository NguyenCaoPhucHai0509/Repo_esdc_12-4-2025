import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/auth/authContext';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Person,
  ExitToApp,
  KeyboardArrowDown,
  FitnessCenter,
} from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { user, logout } = authContext;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Trước tiên đóng menu
    handleMenuClose();
    
    // Gọi hàm logout với callback để chuyển hướng sau khi state đã cập nhật
    logout(() => {
      // Chuyển hướng đến trang đăng nhập sau khi đã logout
      navigate('/login', { replace: true });
    });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#1976d2'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
          Family Gym
        </Typography>
        {user && (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer' 
            }}
            onClick={handleMenuOpen}
          >
            <Typography sx={{ mr: 1 }}>Xin chào, {user.fullName || 'System Administrator'}</Typography>
            <Avatar sx={{ bgcolor: '#1565c0', width: 32, height: 32 }}>
              <Person />
            </Avatar>
            <KeyboardArrowDown sx={{ ml: 0.5, color: 'white' }} />
          </Box>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
            },
          }}
        >
          {/* Menu item đăng xuất */}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp fontSize="small" />
            </ListItemIcon>
            <ListItemText>Đăng xuất</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;