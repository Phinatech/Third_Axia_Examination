import express from 'express';
import {
  readUser,
  updateUser,
  deleteUser,
  getOneUser,
  loginUser,
    createUser
} from '../controllers/User/barrel.js';


const Router = express.Router();

// Create a new user
Router.post('/users/create', createUser); 

// Login a user
Router.post('/users/login', loginUser);

// Get all users
Router.get('/users', readUser);

// Get one user by ID
Router.get('/users/:id', getOneUser);

// Update a user
Router.patch('/users/update/:id', updateUser);

// Delete a user
Router.delete('/users/:id',  deleteUser); // fixed inconsistency from `/user/:id` to `/users/:id`

export default Router;
