import { Request, Response } from 'express';
import { Machines, getMachineHealth } from './machineHealth';
import { StorageClient } from '../../storageClient';

export const PostMachine = async (req: Request, res: Response) => {
  console.log('POST machine health', req.body);

  const { machines, user }: { machines: Machines; user: string } = req.body;
  if (!machines && !user) {
    res.status(400).json({ error: 'Invalid input format' });
  }

  const storage = new StorageClient();
  await storage.setMachine(user, machines);

  res.json({ message: `Recorded part for ${user}`, data: { machines } });
};

export const PostMachineHealth = async (req: Request, res: Response) => {
  console.log('POST machine health', req.body);

  const { machines, user }: { machines: Machines; user: string } = req.body;
  if (!machines && !user) {
    res.status(400).json({ error: 'Invalid input format' });
  }

  const result = getMachineHealth(machines);
  res.json(result);
};

export const GetMachineHealth = async (req: Request, res: Response) => {
  console.log('GET machine health', req.query.user);

  if (!req.query.user) {
    res.status(400).json({ error: 'Invalid input format' });
  }

  const storage = new StorageClient();
  const data = await storage.getMachine(`${req.query.user}`);
  res.json(data);
};
