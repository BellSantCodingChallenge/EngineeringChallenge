import { Request, Response } from 'express';
import { Machines, getMachineHealth } from './machineHealth';
import { StorageClient } from '../../storageClient';

/**
 * Handles POST requests to record machine health data.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const PostMachine = async ( req: Request, res: Response ) => {
  console.log( 'POST machine health', req.body );

  // Destructuring the request body to extract machines and user information
  const { machines, user }: { machines: Machines; user: string; } = req.body;

  // Check for valid input format
  if ( !machines && !user ) {
    res.status( 400 ).json( { error: 'Invalid input format' } );
  }

  // Instantiate a StorageClient to store machine data
  const storage = new StorageClient();
  await storage.setMachine( user, machines );

  // Respond with success message and recorded data
  res.json( { message: `Recorded part for ${ user }`, data: { machines } } );
};

/**
 * Handles POST requests to calculate and return machine health scores.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const PostMachineHealth = async ( req: Request, res: Response ) => {
  console.log( 'POST machine health', req.body );

  // Destructuring the request body to extract machines and user information
  const { machines, user }: { machines: Machines; user: string; } = req.body;

  // Check for valid input format
  if ( !machines && !user ) {
    res.status( 400 ).json( { error: 'Invalid input format' } );
  }

  // Calculate machine health using the provided machines data
  const result = getMachineHealth( machines );

  // Respond with the calculated machine health scores
  res.json( result );
};

/**
 * Handles GET requests to retrieve machine health data.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const GetMachineHealth = async ( req: Request, res: Response ) => {
  console.log( 'GET machine health', req.query.user );

  // Check for valid input format
  if ( !req.query.user ) {
    res.status( 400 ).json( { error: 'Invalid input format' } );
  }

  // Instantiate a StorageClient to retrieve machine data
  const storage = new StorageClient();
  const data = await storage.getMachine( `${ req.query.user }` );

  // Respond with the retrieved machine health data
  res.json( data );
};
