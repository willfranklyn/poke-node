import express from 'express';
import pokemonRoutes from './routes';

const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', pokemonRoutes);

// Basic health check route
app.get('/health', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});