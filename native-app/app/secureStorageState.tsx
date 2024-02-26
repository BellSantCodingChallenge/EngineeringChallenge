// Importing necessary modules and components
import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { Platform } from 'react-native';

/**
 * Custom type representing the useState hook with asynchronous behavior.
 * @template T - Type of the state value.
 */
type UseStateHook<T> = [ [ boolean, T | null ], ( value: T | null ) => void ];

/**
 * Custom hook to manage state asynchronously using React's useReducer hook.
 * @template T - Type of the state value.
 * @param {[[boolean, T | null]]} initialValue - Initial state value.
 * @returns {UseStateHook<T>} - Async state and its setter function.
 */
function useAsyncState<T> ( initialValue: [ boolean, T | null ] = [ true, null ] ): UseStateHook<T> {
  return React.useReducer(
    ( state: [ boolean, T | null ], action: T | null = null ): [ boolean, T | null ] => [ false, action ],
    initialValue
  ) as UseStateHook<T>;
}

/**
 * Asynchronously sets a value in storage based on the platform.
 * @param {string} key - Storage key.
 * @param {string | null} value - Value to be stored.
 * @returns {Promise<void>} - A Promise that resolves when the storage operation is complete.
 */
export async function setStorageItemAsync ( key: string, value: string | null ): Promise<void> {
  if ( Platform.OS === 'web' ) {
    try {
      if ( value === null ) {
        // Remove the item from local storage
        localStorage.removeItem( key );
      } else {
        // Set the item in local storage
        localStorage.setItem( key, value );
      }
    } catch ( e ) {
      // Handle the error if local storage is unavailable
      console.error( 'Local storage is unavailable:', e );
    }
  } else {
    if ( value == null ) {
      // Delete the item from secure store
      await SecureStore.deleteItemAsync( key );
    } else {
      // Set the item in secure store
      await SecureStore.setItemAsync( key, value );
    }
  }
}

/**
 * Custom hook to manage state with storage synchronization.
 * @param {string} key - Storage key.
 * @returns {UseStateHook<string>} - Async state and its setter function with storage synchronization.
 */
export function useStorageState ( key: string ): UseStateHook<string> {
  // Internal hook for async state management
  const [ state, setState ] = useAsyncState<string>();

  // Get stored value on component mount
  React.useEffect( () => {
    if ( Platform.OS === 'web' ) {
      try {
        if ( typeof localStorage !== 'undefined' ) {
          // Retrieve and set the item from local storage
          setState( localStorage.getItem( key ) );
        }
      } catch ( e ) {
        // Handle the error if local storage is unavailable
        console.error( 'Local storage is unavailable:', e );
      }
    } else {
      // Retrieve and set the item from secure store
      SecureStore.getItemAsync( key ).then( value => {
        setState( value );
      } );
    }
  }, [ key ] );

  // Set new value to both state and storage
  const setValue = React.useCallback(
    ( value: string | null ) => {
      setState( value );
      // Synchronize the value with storage
      setStorageItemAsync( key, value );
    },
    [ key ]
  );

  return [ state, setValue ];
}
