import express from 'express';
import cors from 'cors';
import diaryRouter from './routes/diaries';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/ping', (_request, response) => {
  console.log('someone pinged here')
  response.send('pong');
});

app.use('/api/diaries', diaryRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});