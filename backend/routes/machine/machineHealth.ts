import {
  AssemblyLinePart,
  MachineType,
  PaintingStationPart,
  QualityControlStationPart,
  WeldingRobotPart,
  PartInfo,
} from '../../../native-app/data/types';
import { calculateMachineHealth } from '../../calculations';

/**
 * Definition of the Machines type, representing a collection of machines and their respective parts' values.
 * @typedef {Record<MachineType, Record<WeldingRobotPart | AssemblyLinePart | PaintingStationPart | QualityControlStationPart, string>>} Machines
 */

export type Machines = Record<
  MachineType,
  Record<WeldingRobotPart | AssemblyLinePart | PaintingStationPart | QualityControlStationPart, string>
  >;

/**
* Calculates the health of the machines in a factory based on their parts' values.
* @param {Machines} machines - Object containing machines and their respective parts' values.
* @returns {{factory: string, machineScores: Record<MachineType, string>}} - Factory health score and individual machine scores.
*/

export const getMachineHealth = (machines: Machines) => {
  /* Request params example:
  {
    "machines": {
      "assemblyLine": {
        "alignmentAccuracy": 0.5
      },
      "weldingRobot": {
        "vibrationLevel": 4.0,
        "electrodeWear": 0.8,
      }
    }
  }
  */

  // Object to store the calculated machine scores
  const machineScores: {
    [key in MachineType]?: string;
  } = {};

  // Variables to track the total factory score and the count of machines
  let factoryScore = 0;
  let machineCount = 0;

  // Calculate scores for each machine
  for ( const machineName in machines ) {
    // Extract the machine and its parts
    const machine = machines[machineName as MachineType] as Record<
      WeldingRobotPart | AssemblyLinePart | PaintingStationPart | QualityControlStationPart,
      string
      >;

    // Calculate the machine health score
    const machineScore = calculateMachineHealth(
      machineName as MachineType,
      // Convert machine parts to the required format
      Object.keys(machine).reduce((parts: PartInfo[], partName) => {
        const partNameTyped = partName as WeldingRobotPart | AssemblyLinePart | PaintingStationPart | QualityControlStationPart;
        parts.push({
          name: partNameTyped,
          value: parseFloat(machine[partNameTyped]),
        });
        return parts;
      }, [])
    );

    // Store the machine score in the machineScores object
    machineScores[machineName as MachineType] = machineScore.toFixed(2);

    // Update the total factory score and machine count
    factoryScore += machineScore, machineCount++;
  }

  // Calculate the factory score (average of machine scores)
  factoryScore = machineCount > 0 ? factoryScore / machineCount : 0;

  // Return the factory score and individual machine scores
  return {
    factory: factoryScore.toFixed(2),
    machineScores,
  };
};
