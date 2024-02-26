// Importing necessary modules and components
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from './Themed'; // Importing the Themed Text component for consistent styling
import { machineNames } from '../data/types'; // Importing machineNames from the types file

/**
 * Component for displaying machine scores.
 * @param {Object} props - Component properties.
 * @returns {JSX.Element} - Rendered MachineScore component.
 */
export const MachineScore = ( {
  machineName,
  score,
}: {
  machineName: string;
  score: string;
} ) => {
  return (
    <>
      {/* Render the score only if it exists */ }
      { score && (
        <>
          {/* Display the machine name and its corresponding score */ }
          <Text
            style={ styles.text }
          >{ `${ machineNames[ machineName ] }: ${ score }` }</Text>
        </>
      ) }
    </>
  );
};

// Styles for the MachineScore component
const styles = StyleSheet.create( {
  text: {}, // You can define styles here if necessary
} );
