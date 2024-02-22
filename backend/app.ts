import express from 'express';
import { GetMachineHealth, PostMachine, PostMachineHealth } from './routes/machine/routes';

const app = express();
const port = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to get machine health score
app.post('/machine', PostMachine);
app.post('/machine-health', PostMachineHealth);
app.get('/machine-health', GetMachineHealth);

app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});
