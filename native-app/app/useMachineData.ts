// Importing necessary modules and components
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useSession } from './session';
import { Platform } from 'react-native';

// API configuration
const apiPort: string = '3001';
let apiUrl: string = `${ process.env.API_URL }:${ apiPort }/machine-health`;

// Adjust API URL for development environment
if ( __DEV__ ) {
  const url = process.env.API_URL || `http://${ Platform?.OS === 'android' ? '10.0.2.2' : 'localhost' }`;
  apiUrl = `${ url }:${ apiPort }/machine-health`;
}

/**
 * Custom hook for managing machine data state and interactions.
 * @returns {Object} - Object containing machine data and functions for data manipulation.
 */
export const useMachineData = () => {
  // State for storing machine data
  const [ machineData, setMachineData ] = useState( undefined );
  // Access the user session context
  const { session } = useSession();

  /**
   * Effect to load machine data from local storage on component initialization.
   */
  useEffect( () => {
    loadMachineData();
  }, [] );

  /**
   * Function to load machine data from local storage.
   */
  const loadMachineData = useCallback( async () => {
    try {
      // Retrieve stored machine data from local storage
      const storedMachineData = await AsyncStorage.getItem( 'machineData' );

      if ( storedMachineData ) {
        // Parse and set stored machine data in state
        const parsedMachineData = JSON.parse( storedMachineData );
        setMachineData( parsedMachineData );
      } else {
        setMachineData( undefined );
      }
    } catch ( error ) {
      console.error( '[useMachineData.ts] loadMachineData Error:', error );
      // Handle storage loading error
    }
  }, [] );

  /**
   * Function to reset machine data by clearing it from local storage.
   */
  const resetMachineData = useCallback( async () => {
    try {
      // Clear machine data from local storage
      await AsyncStorage.removeItem( 'machineData' );
      setMachineData( undefined );
      // Additional cleanup can be performed here if needed
    } catch ( error ) {
      console.error( '[useMachineData.ts] resetMachineData Error:', error );
      // Handle storage clearing error
    }
  }, [] );

  /**
   * Function to update machine data with new information and persist it to local storage.
   * @param {Object} newMachineData - New machine data to be set.
   */
  const updateMachineData = useCallback( async ( newMachineData ) => {
    try {
      // Update state with new machine data
      setMachineData( newMachineData );

      // Persist updated machine data to local storage
      await AsyncStorage.setItem( 'machineData', JSON.stringify( newMachineData ) );

      // Save historical data by sending a POST request to the server
      const body = {
        machines: newMachineData.machines,
        user: JSON.parse( session ).user,
      };
      await axios.post( apiUrl, body );
    } catch ( error ) {
      console.error( '[useMachineData.ts] updateMachineData Error:', error );
      // Handle storage saving error
    }
  }, [ session ] );

  /**
   * Function to set machine scores, update the state, and persist to local storage.
   * @param {Object} newScores - New machine scores to be set.
   */
  const setScores = useCallback( async ( newScores ) => {
    try {
      if ( !machineData ) {
        return;
      }

      // Deep copy machine parts to avoid direct mutation
      const newMachineData = JSON.parse( JSON.stringify( machineData ) );

      // Set new scores in the copied machine data
      newMachineData.scores = newScores;

      // Update state with the new machine data
      setMachineData( newMachineData );

      // Persist the updated machine data to local storage
      await AsyncStorage.setItem( 'machineData', JSON.stringify( newMachineData ) );
    } catch ( error ) {
      console.error( '[useMachineData.ts] setScores Error:', error );
      // Handle storage saving error
    }
  }, [ machineData ] );

  // Return the machine data state and relevant functions
  return {
    machineData,
    updateMachineData,
    resetMachineData,
    loadMachineData,
    setScores,
  };
};
