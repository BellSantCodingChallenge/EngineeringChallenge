// Importing necessary modules and components
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from './Themed'; // Importing the Themed Text component for consistent styling

/**
 * Component for displaying parts of a machine.
 * @param {Object} props - Component properties.
 * @returns {JSX.Element} - Rendered PartsOfMachine component.
 */
export const PartsOfMachine = ( {
  machineName,
  parts,
}: {
  machineName: string;
  parts: Record<string, string>;
} ) => {
  return (
    <>
      {/* Render the parts only if they exist */ }
      { parts && (
        <>
          {/* Display the machine name as a title */ }
          <Text style={ styles.title }>{ machineName }</Text>
          {/* Map through the parts object and display each part and its value */ }
          { Object.keys( parts ).map( ( key ) => (
            <Text key={ key }>
              { key }: { parts[ key ] }
            </Text>
          ) ) }
        </>
      ) }
    </>
  );
};

// Styles for the PartsOfMachine component
const styles = StyleSheet.create( {
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
} );
