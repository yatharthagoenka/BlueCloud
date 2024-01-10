import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';

function App() {
  const routing = useRoutes(Router);
  return (
    <>
      {routing}
    </>
  );
}

export default App;
