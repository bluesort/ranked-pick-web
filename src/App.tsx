import Body from '@/components/layout/Body';
import Header from '@/components/layout/Header';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('/api/status', { headers: { "Accept":"application/json" } }).then(resp => {
      console.log(resp);
    });
  }, []);

  return (
    <div className="relative h-screen w-screen">
      <Header />
      <Body />
    </div>
  );
}

export default App;
