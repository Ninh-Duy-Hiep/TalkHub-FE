import { BrowserRouter } from 'react-router-dom';
import { useAuthInit } from './features/auth/hooks/useAuthInit';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  useAuthInit();

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
