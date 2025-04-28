import 'react-native-gesture-handler';
import { AppRoutes } from '@/routes/AppRoutes';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <AppRoutes />
      <StatusBar style="light" />
    </>
  );
}
