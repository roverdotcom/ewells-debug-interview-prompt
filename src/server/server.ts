import express from 'express';
import path from 'path';
import userRouter from './routes/users';
import groupRouter from './routes/groups';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../client/static')));

app.use('/api/users', userRouter);
app.use('/api/groups', groupRouter);

app.all('*', (req, res) => {
  console.error('Path not found:', req.path);
  return res.sendStatus(404);
});

app.listen(9000, () => {
  console.log('Listening on port 9000');
});
