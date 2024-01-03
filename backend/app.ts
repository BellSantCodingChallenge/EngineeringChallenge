import express, { Request, Response } from 'express';
import { getMachineHealth } from './machineHealth';
import {
  getAllMachines,
  insertMachineDataToDatabase,
} from './addMachineHealthToDatabase';

const app = express();
const port = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to get machine health score
// app.post('/machine-health', (req: Request, res: Response) => {
//   const result = getMachineHealth(req);
//   if (result.error) {
//     res.status(400).json(result);
//   } else {
//     res.json(result);
//   }
// });

// Returns all the machines in the database
app.get('/machine', async (req: Request, res: Response) => {
  console.log('In GET /machine');

  const allMachines = await getAllMachines();
  return res.json(allMachines);
});

// Endpoint to insert machine health data into database
app.post('/machine-health', (req: Request, res: Response) => {
  console.log('In app in POST /machine-health');
  const result = insertMachineDataToDatabase(req);
  if (!result) {
    res.status(400).json(result);
  } else {
    res.json(result);
  }
});

app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});
