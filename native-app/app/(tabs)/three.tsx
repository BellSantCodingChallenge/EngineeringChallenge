import { FlatList, Platform, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useSession } from '../session';
import { useEffect, useState } from 'react';
import { useMachineData } from '../useMachineData';
import axios from 'axios';

let apiUrl: string = 'https://fancy-dolphin-65b07b.netlify.app/api/machine-health';

if (__DEV__) {
  const url = process.env.API_URL || `http://${Platform?.OS === 'android' ? '10.0.2.2' : 'localhost'}:3001`;
  apiUrl = `${url}/machine-health`;
}

export default function LogPartScreen() {
  const { machineData } = useMachineData();
  const { session } = useSession();
  const [historyLoading, setHistoryLoading] = useState(true);
  const [history, setHistory] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
      setHistoryLoading(true);
      try {
        const response = await axios.get(`${apiUrl}?user=${JSON.parse(session).user}`);
        const data = response.data;

        setHistory(data);
        setHistoryLoading(false);
      } catch (error) {
        console.error(error);
        alert('There was an error getting the history');
      }
    };

    getData();
  }, [machineData]);

  const displayHistory = historyLoading ? (
    <Text>Loading...</Text>
  ) : (
    history.map(history => {
      for (let [key, val] of Object.entries(history)) {
        let list = [];

        for (let [k, v] of Object.entries(val)) {
          list.push(
            <Text>
              {k}: {v}
            </Text>
          );
        }

        return (
          <>
            <Text style={{ fontWeight: 'bold' }}>{key.toUpperCase()}</Text>
            <Text>{list}</Text>
            <Text>{history.date}</Text>
            <Text></Text>
          </>
        );
      }
    })
  );

  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      {displayHistory}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});
