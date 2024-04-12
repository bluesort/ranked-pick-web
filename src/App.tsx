import AppLayout from '@/components/layout/AppLayout';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('/api/status', { headers: { "Accept":"application/json" } }).then(resp => {
      console.log(resp);
    });
  }, []);

  return (
    <AppLayout />
  );
}

export default App;
