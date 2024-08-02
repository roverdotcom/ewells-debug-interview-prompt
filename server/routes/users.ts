import { Router } from 'express';
import { readFile } from 'fs/promises';
import path from 'path';
import User from '../../types/models/Users';

const userRouter = Router();
const USERS_TABLE_PATH = path.join(__dirname, '../../database/users.json');

userRouter.get('/', async (req, res) => {
  const users: User[] = JSON.parse(await readFile(USERS_TABLE_PATH, 'utf-8'));
  return res.json(users);
});

export default userRouter;
