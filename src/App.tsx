import AppRoutes from './routes/AppRoutes';
import { MantineProvider } from '@mantine/core';

const App = () => (
  <MantineProvider>
    <AppRoutes />
  </MantineProvider>
);

export default App;
