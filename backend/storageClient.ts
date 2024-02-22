import storage from 'node-persist';

export class StorageClient {
  async getMachine(key: string) {
    await storage.init();
    return await storage.getItem(key);
  }

  // TODO - set type of items
  async setMachine(key: string, newItem: any) {
    console.log({ newItem });
    newItem.date = new Date(); // quickly store data on item for history

    await storage.init();

    const machines = (await storage.getItem(key)) || [];

    machines.push(newItem);
    await storage.setItem(key, machines);
    console.log('stored historical item', { machines });
    return;
  }
}
