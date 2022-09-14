import * as React from 'react';
import DashboardTabs from './components/DashboardTabs';

export default function App() {
  return (
    <div className="App" style={{ width: '100vw', overflow: 'hidden' }}>
        <DashboardTabs />
    </div>
  );
}
//sx={{ flexGrow: 1 }}