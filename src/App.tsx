import { ApiProvider } from '@/components/ApiContext';
import AppLayout from '@/components/layout/AppLayout';

function App() {
  return (
    <ApiProvider>
      <AppLayout />
    </ApiProvider>
  );
}

export default App;
