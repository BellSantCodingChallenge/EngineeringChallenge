import express, { Router } from 'express';
import serverless from 'serverless-http';
import { getMachineHealth } from '../../../routes/machine/machineHealth';

// Create an Express app instance
const api = express();
const cors = require( 'cors' );

// Middleware to parse JSON request bodies
api.use( express.json() );

// Create a router instance for handling specific routes
const router = Router();
router.get( '/hello', ( req, res ) => res.send( 'Hello World!' ) );

/**
 * Handles POST requests for machine health and responds with the calculated machine health scores.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post( '/machine-health', ( req: any, res ) => {
  // Call the getMachineHealth function with the request object
  const result: any = getMachineHealth( req );

  // Check for errors in the result and respond accordingly
  if ( result.error ) {
    res.status( 400 ).json( result );
  } else {
    res.json( result );
  }
} );

// Enable Cross-Origin Resource Sharing (CORS) for the entire app
api.use( cors() );

// Mount the router under the '/api/' path
api.use( '/api/', router );

// Export the serverless handler for deployment
export const handler = serverless( api );
