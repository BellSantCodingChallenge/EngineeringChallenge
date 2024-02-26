import express from 'express';
import { GetMachineHealth, PostMachine, PostMachineHealth } from './routes/machine/routes';

const app = express();
const port = 3001;
const cors = require( 'cors' );

// Middleware to parse JSON request bodies
app.use( express.json() );

// Enable CORS with origin and credentials options
app.use( cors( { origin: true, credentials: true } ) );

// Endpoint to record machine health data
app.post( '/machine', PostMachine );

// Endpoint to calculate and return machine health scores
app.post( '/machine-health', PostMachineHealth );

// Endpoint to retrieve machine health data
app.get( '/machine-health', GetMachineHealth );

// Start the server and listen on the specified port
app.listen( port, () => {
  console.log( `API is listening at http://localhost:${ port }` );
} );
