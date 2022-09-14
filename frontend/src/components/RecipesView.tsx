import { useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import { NavLink, Link, useParams, useNavigate, useLocation, matchPath } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import useSWR, { Key } from 'swr';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { Recipe } from '../api/types';
import { useGetRecipe, useGetRecipes } from '../api/rest';

/* 
Login / Authentication::
/*
Pages::
*/

const ListValues = ({list}: {list: string []}) => {
    return (
        <>{
            list.map((value: string, i: number) => (
            <li key={i}>{value}</li>
        ))}</>
    )
}

const RecipeView = ({ recipeId }) => {
  // query the recipes endpoint
  const {response: recipe} = useGetRecipe(recipeId);
  return (
    recipe &&  <Paper sx={{ p: 2, mt: 2, mb: 2, maxWidth: '50rem' }}>
      <ul>
        <div>
            <h1>{recipe.name}</h1>
            <h3>Ingredients</h3>
            <ListValues list={recipe.ingredients}/>
            <h3>Tools</h3>
            <ListValues list={recipe.tools}/>
            <h3>Instructions</h3>
            <ListValues list={recipe.instructions}/>
        </div>
      </ul>
    </Paper>
  )
}

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {/* <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      /> */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.name}
        </Typography>
        <ul><ListValues list={recipe.ingredients}/></ul>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/recipes/${recipe._id}`)}>View</Button>
      </CardActions>
    </Card>
  );
}

const RecipeList = () => {
  const {response: recipes} = useGetRecipes();
  return (
      <Box display='flex' gap={2} mt={5} m={'2em'} justifyContent='center' flexWrap='wrap'>
        {recipes && recipes.map((recipe: Recipe, index: number) => 
            <RecipeCard recipe={recipe} key={recipe._id} />)}
      </Box>
  )
}


const Main = () => {
  let { recipeId } = useParams();
  return <Box>
    <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
      {recipeId && <RecipeView recipeId={recipeId} />}
    </Box>
    <RecipeList />
  </Box>
}

export default Main;

