import storage from 'node-persist';

/**
 * Storage client for handling machine data storage and retrieval.
 */
export class StorageClient {
  /**
   * Retrieve machine data from storage based on the provided key.
   * @param {string} key - Key for retrieving machine data.
   * @returns {Promise<any>} - Promise resolving to the retrieved machine data.
   */
  async getMachine ( key: string ): Promise<any> {
    // Initialize the storage system
    await storage.init();

    // Retrieve and return the machine data associated with the key
    return await storage.getItem( key );
  }

  /**
   * Store machine data in storage under the provided key.
   * @param {string} key - Key for storing machine data.
   * @param {any} newItem - New machine data to be stored.
   * @returns {Promise<void>} - Promise resolving when the storage operation is complete.
   */
  async setMachine ( key: string, newItem: any ): Promise<void> {
    console.log( { newItem } );

    // Add a timestamp to the new item for historical tracking
    newItem.date = new Date();

    // Initialize the storage system
    await storage.init();

    // Retrieve existing machine data or initialize an empty array
    const machines = ( await storage.getItem( key ) ) || [];

    // Add the new item to the array of machine data
    machines.push( newItem );

    // Store the updated array back in the storage system
    await storage.setItem( key, machines );

    // Log the stored historical item
    console.log( 'Stored historical item', { machines } );
    return;
  }
}
