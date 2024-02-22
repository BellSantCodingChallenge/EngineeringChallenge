import express from 'express';
import { POSTMachine, POSTMachineHealth } from './routes/machine/routes';

const app = express();
const port = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to get machine health score
app.post('/machine', POSTMachine);
app.post('/machine-health', POSTMachineHealth);

app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});
