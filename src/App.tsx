import AppRoutes from './routes/AppRoutes';
import { MantineProvider } from '@mantine/core';

const App = () => (
  <MantineProvider withGlobalClasses withCssVariables>
    <AppRoutes />
  </MantineProvider>
);

export default App;
