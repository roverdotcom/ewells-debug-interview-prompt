import { Router } from 'express';
import { readFile } from 'fs/promises';
import path from 'path';
import Group from '../../types/models/Groups';
import User from '../../types/models/Users';

const groupRouter = Router();
const GROUPS_TABLE_PATH = path.join(__dirname, '../../../database/groups.json');
const USERS_TABLE_PATH = path.join(__dirname, '../../../database/users.json');

groupRouter.get('/', async (req, res) => {
  const allGroups: Group[] = JSON.parse(await readFile(GROUPS_TABLE_PATH, 'utf-8'));
  const userId = parseInt(req.query.userId as string);

  if (userId) {
    const allUsers: User[] = JSON.parse(await readFile(USERS_TABLE_PATH, 'utf-8'));
    const user = allUsers.find((user) => user.id === userId);
    const userGroupIds = new Set(user?.groupIds);
    const userGroups = allGroups.filter((group) => userGroupIds.has(group.id));
    return res.json(userGroups);
  }
  else {
    return res.json(allGroups);
  }
});

export default groupRouter;
