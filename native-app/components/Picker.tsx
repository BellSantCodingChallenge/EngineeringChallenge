// Importing necessary modules and components
import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

/**
 * iOS-specific Picker component.
 * @param {Object} props - Component properties.
 * @returns {JSX.Element} - Rendered PickerIos component.
 */
function PickerIos ( { value, onSetValue, items } ) {
  return (
    <RNPickerSelect
      placeholder={ { label: 'Select a machine', value: '' } } // Placeholder text and value
      items={ items } // List of items for the picker
      onValueChange={ ( value ) => onSetValue( value ) } // Callback function on value change
      value={ value } // Selected value
      style={ pickerSelectStyles } // Styles for the picker
    />
  );
}

// Styles for the PickerIos component
const pickerSelectStyles = StyleSheet.create( {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // To ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // To ensure the text is never behind the icon
    minWidth: 200,
  },
} );

// Exporting the PickerIos component as the default export
export default PickerIos;
