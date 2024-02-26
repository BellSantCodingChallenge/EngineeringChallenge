import machineData from '../native-app/data/machineData.json';
import { MachineType, PartInfo } from '../native-app/data/types';

// Type assertion for machineData to specify its structure
const machineDataTyped = machineData as Record<MachineType, Record<string, any>>;

/**
 * Linearly scales a value from one range to another.
 * @param {number} value - The value to be scaled.
 * @param {number} outputMin - Minimum value of the output range.
 * @param {number} outputMax - Maximum value of the output range.
 * @param {number} inputMin - Minimum value of the input range.
 * @param {number} inputMax - Maximum value of the input range.
 * @returns {number} - The scaled value.
 */
function linearScale (
  value: number,
  outputMin: number,
  outputMax: number,
  inputMin: number,
  inputMax: number
): number {
  // Ensure that the value is within the input range
  const clampedValue = Math.min( Math.max( value, inputMin ), inputMax );

  // Calculate the scaled value
  const scaledValue =
    ( ( clampedValue - inputMin ) / ( inputMax - inputMin ) ) *
    ( outputMax - outputMin ) +
    outputMin;

  return scaledValue;
}

/**
 * Calculates the health score for a single machine part based on its value and the machine's data.
 * @param {MachineType} machineName - The type of the machine.
 * @param {PartInfo} part - Information about the machine part.
 * @returns {number} - The health score for the given machine part.
 */
export function calculatePartHealth (
  machineName: MachineType,
  part: PartInfo
): number {
  const machineInfo = machineDataTyped[ machineName ];
  if ( !machineInfo ) {
    return 0; // Handle cases where the machine name is not found in machineData
  }

  const { value } = part;
  if ( !machineInfo[ part.name ] ) {
    return -1;
  }
  const { normalRange, abnormalRange, optimalRange } = machineInfo[ part.name ];

  if ( value >= normalRange[ 0 ] && value <= normalRange[ 1 ] ) {
    // Linearly scale the score between 50 and 100 based on the distance from normal to optimal
    return linearScale( value, 50, 100, normalRange[ 0 ], normalRange[ 1 ] );
  } else if ( value >= abnormalRange[ 0 ] && value <= abnormalRange[ 1 ] ) {
    // Linearly scale the score between 0 and 50 based on the distance from abnormal to normal
    return linearScale( value, 0, 50, abnormalRange[ 0 ], abnormalRange[ 1 ] );
  } else if ( value >= optimalRange[ 0 ] && value <= optimalRange[ 1 ] ) {
    return 100;
  } else {
    return 0; // Handle cases where the value is outside all ranges
  }
}

/**
 * Calculates the overall health score of the machine based on its parts.
 * @param {MachineType} machineName - The type of the machine.
 * @param {PartInfo[]} parts - Array of information about machine parts.
 * @returns {number} - The overall health score of the machine.
 */
export function calculateMachineHealth (
  machineName: MachineType,
  parts: PartInfo[]
) {
  if ( parts.length === 0 ) {
    return 0;
  }
  let partsCounter = 0;

  const partScores = parts.map( ( part ) =>
    calculatePartHealth( machineName, part )
  );

  const totalScore = partScores.reduce( ( sum, score ) => {
    if ( score === -1 ) {
      return sum;
    }
    partsCounter++;
    return sum + score;
  }, 0 );

  if ( partsCounter === 0 ) {
    return 0;
  }
  return totalScore / partsCounter;
}
