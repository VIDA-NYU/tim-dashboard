import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate, NavLink, NavLinkProps, Link, useParams, useNavigate, useLocation, matchPath, useMatch } from "react-router-dom";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HistoricalDataView from './HistoricalDataView';
import LiveDataView from './LiveDataView';
import RecipesView from './RecipesView';
import Login from './Login';
import { useToken } from '../api/TokenContext';
import { TEST_PASS, TEST_USER } from '../config';
import { ListItemButton } from '@mui/material';


const DashboardRoutes = ({}) => {
  const { token } = useToken();
  
  const pages = [
    {label: "Live", to: '/'},
    {label: "Recordings", to: '/recordings'},
    {label: "Recipes", to: '/recipes'},
  ]

  return (
    !token ? 
      <Login username={TEST_USER} password={TEST_PASS} />
    : 
    <Box sx={{ width: '100%' }} component="main">
      <Box sx={{ display: "flex" }}>
        <AppBar component="nav" position="static">
            <Toolbar sx={{ flexWrap: 'wrap' }}>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                TIM Dashboard
            </Typography>
            <List sx={{ display: 'flex' }}>
              {pages && pages.map((page, i) => (
                <NavButton {...page} key={page.to} />
              ))}
            </List>
            </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path='/' element={<LiveDataView />} />
        <Route path='/recordings'>
          <Route path="" element={<HistoricalDataView />} />
          <Route path=":recordingId" element={<HistoricalDataView />} />
        </Route>
        <Route path='/recipes'>
          <Route path="" element={<RecipesView />} />
          <Route path=":recipeId" element={<RecipesView />} />
        </Route>
        <Route path="/login" element={<Login username={TEST_USER} password={TEST_PASS} />} />
        {/* <Route path="/logout" element={<Logout redirectUri='/' />} /> */}
        {/* <Route path="*" element={<Error404 />} /> */}
      </Routes>
  </Box>)
}

function NavButton({ to, label }) {
  // add the wild card to match deeper URLs
  let match = useMatch(to + "/*");
  const navigate = useNavigate();
  return (
    <ListItemButton 
      key={to} onClick={() => navigate(to)} 
      selected={!!match}
      sx={{
        borderBottom: `2px solid transparent`,
        "&.Mui-selected": {borderBottom: `2px solid white`}
      }}>
    <ListItemText primary={label} />
  </ListItemButton>
  );
}

const DashboardRouter = (props) => {
  return <BrowserRouter><DashboardRoutes {...props} /></BrowserRouter>
}
export default DashboardRouter;