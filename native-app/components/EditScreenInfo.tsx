// Importing necessary modules and components
import React, { useCallback, useState } from 'react';
import { Button, Platform, StyleSheet, TextInput } from 'react-native';
import { Text, View } from './Themed';
import { MachineType } from '../data/types';
import { useMachineData } from '../app/useMachineData';
import { useFocusEffect } from 'expo-router';
import Picker from './Picker';

// Define color
const colorPrimaryButton = '#2e78b7';

/**
 * Component for editing machine information.
 * @param {Object} param0 - Route information.
 * @returns {JSX.Element} - Rendered EditScreenInfo component.
 */
export default function EditScreenInfo ( { path }: { path: string; } ) {
  // State variables for machine information
  const [ machineName, setMachineName ] = useState( '' );
  const [ partName, setPartName ] = useState( '' );
  const [ partValue, setPartValue ] = useState( '' );
  const [ isSaved, setIsSaved ] = useState( false );

  // Custom hook for managing machine data
  const { machineData, updateMachineData, loadMachineData } = useMachineData();

  // Options for machine names and part names
  const machineNames = [
    { label: 'Welding Robot', value: MachineType.WeldingRobot },
    { label: 'Painting Station', value: MachineType.PaintingStation },
    { label: 'Assembly Line', value: MachineType.AssemblyLine },
    { label: 'Quality Control Station', value: MachineType.QualityControlStation },
  ];

  const partNames = [
    { value: 'arcStability', label: 'Arc Stability' },
    { value: 'coolingEfficiency', label: 'Cooling Efficiency' },
    { value: 'electrodeWear', label: 'Electrode Wear' },
    { value: 'seamWidth', label: 'Seam Width' },
    { value: 'shieldingPressure', label: 'Shielding Pressure' },
    { value: 'vibrationLevel', label: 'Vibration Level' },
    { value: 'wireFeedRate', label: 'Wire Feed Rate' },
    { value: 'colorConsistency', label: 'Color Consistency' },
    { value: 'flowRate', label: 'Flow Rate' },
    { value: 'nozzleCondition', label: 'Nozzle Condition' },
    { value: 'pressure', label: 'Pressure' },
    { value: 'alignmentAccuracy', label: 'Alignment Accuracy' },
    { value: 'beltSpeed', label: 'Belt Speed' },
    { value: 'fittingTolerance', label: 'Fitting Tolerance' },
    { value: 'speed', label: 'Speed' },
    { value: 'cameraCalibration', label: 'Camera Calibration' },
    { value: 'criteriaSettings', label: 'Criteria Settings' },
    { value: 'lightIntensity', label: 'Light Intensity' },
    { value: 'softwareVersion', label: 'Software Version' },
  ];

  const apiUrl: string = `http://${ Platform?.OS === 'android' ? '10.2.2.0' : 'localhost' }:3001/machine-health`;

  // Function to save machine part information
  const savePart = useCallback( async () => {
    try {
      // Check if all required fields are filled
      if ( !machineName || !partName || !partValue ) {
        console.warn( 'Please fill in all fields before saving.' );
        return;
      }

      // Deep copy of machine data or initializing if it doesn't exist
      const newMachineData = machineData
        ? JSON.parse( JSON.stringify( machineData ) )
        : { machines: {} };

      // Creating or updating machine part information
      if ( !newMachineData.machines[ machineName ] ) {
        newMachineData.machines[ machineName ] = {};
      }
      newMachineData.machines[ machineName ][ partName ] = partValue;

      // Update machine data and set saved flag
      await updateMachineData( newMachineData );
      setIsSaved( true );

      // Reset saved flag after a delay
      setTimeout( () => {
        setIsSaved( false );
      }, 2000 );
    } catch ( error ) {
      console.error( '[EditScreenInfo.tsx] Error: ', error );
      throw error; // Handle API errors appropriately
    }
  }, [ machineData, updateMachineData, machineName, partName, partValue ] );

  // Load machine data on component focus
  useFocusEffect(
    useCallback( () => {
      loadMachineData();
    }, [] ),
  );

  return (
    <View>
      <Text style={ styles.label }>Machine Name</Text>
      <Picker value={ machineName } onSetValue={ setMachineName } items={ machineNames } />

      <Text style={ styles.label }>Part Name</Text>
      <Picker value={ partName } onSetValue={ setPartName } items={ partNames } />

      <Text style={ styles.label }>Part Value</Text>
      <TextInput
        style={ styles.input }
        value={ partValue }
        onChangeText={ ( text ) => setPartValue( text ) }
        placeholder='Enter part value'
      />

      <View style={styles.saveButton}>
        <Button color={colorPrimaryButton} title='Save' onPress={ savePart } />
      </View>

      { isSaved && <Text style={ styles.healthScore }>Saved ✔️</Text> }
    </View>
  );
}

// Styles for the EditScreenInfo component
const styles = StyleSheet.create( {
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  healthScore: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  saveButton: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colorPrimaryButton
  }
} );
