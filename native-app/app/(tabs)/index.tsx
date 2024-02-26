import { Button, Platform, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Link, useFocusEffect } from 'expo-router';
import axios from 'axios';
import { useMachineData } from '../useMachineData';
import { useCallback } from 'react';
import { PartsOfMachine } from '../../components/PartsOfMachine';
import { MachineScore } from '../../components/MachineScore';

// Define color
const colorPrimaryButton = '#2e78b7';

// Define the API port and construct the API URL based on the environment
const apiPort: string = '3001';
let apiUrl: string = `${ process.env.API_URL }:${ apiPort }/machine-health`;

if ( __DEV__ ) {
  const url = process.env.API_URL || `http://${ Platform?.OS === 'android' ? '10.0.2.2' : 'localhost' }`;
  apiUrl = `${ url }:${ apiPort }/machine-health`;
}

/**
 * Screen component for displaying machine state information.
 * @returns {JSX.Element} - Rendered StateScreen component.
 */
export default function StateScreen () {
  const { machineData, resetMachineData, loadMachineData, setScores } = useMachineData();

  // Use FocusEffect to load machine data when the screen gains focus
  useFocusEffect(
    useCallback( () => {
      loadMachineData();
    }, [] )
  );

  // Function to calculate machine health scores
  const calculateHealth = useCallback( async () => {
    try {
      // Send a POST request to the API to calculate health scores
      const response = await axios.post( apiUrl, {
        machines: machineData?.machines,
      } );

      // Update the state with the calculated scores if successful
      if ( response.data?.factory ) {
        setScores( response.data );
      }
    } catch ( error ) {
      // Handle errors during the calculation process
      console.error( '[index.tsx] Error: ', error );
      console.log(
        `[index.tsx] There was an error calculating health. ${ error.toString() === 'AxiosError: Network Error'
          ? 'Is the API server started?'
          : error
        }`
      );
    }
  }, [ machineData ] );

  return (
    <View style={ styles.container }>
      <View style={ styles.separator } />

      {/* Display a link to log a part if no machine data is available */ }
      { !machineData && (
        <Link href="/two" style={ styles.link }>
          <Text style={ styles.linkText }>To check the machine health, you must log a part.</Text>
        </Link>
      ) }

      {/* Display machine information and health scores if available */ }
      { machineData && (
        <>
          {/* Display parts information for each machine type */ }
          <PartsOfMachine machineName={ 'Welding Robot' } parts={ machineData?.machines?.weldingRobot } />
          <PartsOfMachine machineName={ 'Assembly Line' } parts={ machineData?.machines?.assemblyLine } />
          <PartsOfMachine machineName={ 'Painting Station' } parts={ machineData?.machines?.paintingStation } />
          <PartsOfMachine machineName={ 'Quality Control Station' } parts={ machineData?.machines?.qualityControlStation } />

          {/* Display the factory health score */ }
          <View style={ styles.separator } lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text style={ styles.title }>Factory Health Score</Text>
          <Text style={ styles.text }>{ machineData?.scores?.factory ? machineData?.scores?.factory : 'Not yet calculated' }</Text>

          {/* Display machine health scores for individual machines */ }
          { machineData?.scores?.machineScores && (
            <>
              <Text style={ styles.title2 }>Machine Health Scores</Text>
              { Object.keys( machineData?.scores?.machineScores ).map( key => (
                <MachineScore key={ key } machineName={ key } score={ machineData?.scores?.machineScores[ key ] } />
              ) ) }
            </>
          ) }
        </>
      ) }

      {/* Button to trigger the calculation of machine health scores */ }
      <View style={ styles.separator } lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={ styles.calculateButton }>
        { // Only show calculate health button if data exists
          machineData ?
            <Button color={ colorPrimaryButton } title="Calculate Health" onPress={ calculateHealth } />
          : null
        }
      </View>

      {/* Button to reset machine data */ }
      <View style={ styles.resetButton }>
        <Button title="Reset Machine Data" onPress={ async () => await resetMachineData() } color="#FF0000" />
      </View>
    </View>
  );
}

// Styles for the StateScreen component
const styles = StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  text: {},
  link: {
    paddingBottom: 15,
  },
  linkText: {
    fontSize: 14,
    color: colorPrimaryButton,
  },
  resetButton: {
    marginTop: 10,
  },
  calculateButton: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colorPrimaryButton
  }
} );
