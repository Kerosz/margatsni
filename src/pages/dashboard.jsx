import { useEffect } from 'react';
import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';
import BottomNavigation from '../components/bottom-navigation';

export default function Dashboard() {
  useEffect(() => {
    document.title = `Dashboard - Instagram`;
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="container flex justify-center lg:grid lg:grid-cols-3 lg:gap-4 lg:justify-between mx-auto max-w-screen-lg px-3">
        <Timeline />
        <Sidebar />
      </div>
      <BottomNavigation />
    </div>
  );
}
