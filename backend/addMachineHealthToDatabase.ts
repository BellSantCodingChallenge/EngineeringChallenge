import { Request } from 'express';
import {
  AssemblyLinePart,
  MachineType,
  PaintingStationPart,
  QualityControlStationPart,
  WeldingRobotPart,
} from '../native-app/data/types';
import { getPrismaClient } from './prismaUtils';

type MachinePart =
  | WeldingRobotPart
  | AssemblyLinePart
  | PaintingStationPart
  | QualityControlStationPart;

// NOTE: This function assumes the request body contains the machine's name and parts data
// in the following format:
//   {
//     "machines": {
//       "assemblyLine": {
//         "alignmentAccuracy": 0.5
//       },
//       "weldingRobot": {
//         "vibrationLevel": 4.0,
//         "electrodeWear": 0.8,
//       }
//     }
//   }
export const insertMachineDataToDatabase = async (req: Request) => {
  // Parse the request body into a <machines> record
  const {
    machines,
  }: {
    machines: Record<MachineType, Record<MachinePart, string>>;
  } = req.body;

  // Return null if the request couldn't be parsed
  if (!machines) {
    return null;
  }

  // For each machine, loop through its parts
  for (const machineName in machines) {
    const machineType = machineName as MachineType;
    const machine = machines[machineType] as Record<MachinePart, string>;

    try {
      let creationResult;
      if (machineType === MachineType.WeldingRobot) {
        console.log('Machine is weldingRobot');
        creationResult = await getPrismaClient().weldingRobot.create({
          data: {
            weldingRobotErrorRate: getMachinePartValue(
              machine,
              WeldingRobotPart.ErrorRate
            ),
            weldingArmVibrationLevel: getMachinePartValue(
              machine,
              WeldingRobotPart.VibrationLevel
            ),
            electrodeWear: getMachinePartValue(
              machine,
              WeldingRobotPart.ElectrodeWear
            ),
            gasShieldingPressure: getMachinePartValue(
              machine,
              WeldingRobotPart.ShieldingPressure
            ),
            weldingWireFeedRate: getMachinePartValue(
              machine,
              WeldingRobotPart.WireFeedRate
            ),
            arcStability: getMachinePartValue(
              machine,
              WeldingRobotPart.ArcStability
            ),
            weldSeamWidth: getMachinePartValue(
              machine,
              WeldingRobotPart.SeamWidth
            ),
            coolingSystemEfficiency: getMachinePartValue(
              machine,
              WeldingRobotPart.CoolingEfficiency
            ),
          },
        });
      } else if (machineType === MachineType.PaintingStation) {
        console.log('Machine is paintingStation');
      } else if (machineType === MachineType.AssemblyLine) {
        console.log('Machine is assemblyLine');
      } else if (machineType === MachineType.QualityControlStation) {
        console.log('Machine is qualityControlStation');
      } else {
        console.log('Machine type is not recognized');
      }

      console.log(
        'Result of create of machine type',
        machineType,
        'was:',
        creationResult
      );
    } catch (error) {
      console.error(
        'There was an error creating a machine type',
        machineType,
        ':',
        error
      );
    }
  }
};

const getMachinePartValue = (
  machine: Record<MachinePart, string>,
  machinePart: MachinePart
) => {
  return parseFloat(machine[machinePart]) || 0.0;
};
