import express from 'express';
const router = express.Router();

import { getUsers, addUser } from '../controllers/userController.ts';

// Rutas para usuarios
router.get('/', getUsers);
router.post('/', addUser);

export default router;
