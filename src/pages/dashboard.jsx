import { useEffect } from 'react';
import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';

export default function Dashboard() {
  useEffect(() => {
    document.title = `Dashboard - Instagram`;
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="container grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg px-3">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
