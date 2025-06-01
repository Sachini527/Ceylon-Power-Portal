import React, { useState } from 'react';
import BillForm from './components/BillForm';
import MeterReadingForm from './components/MeterReadingForm';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('bill'); // Default to bill tab
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Ceylon Power Billing System</h1>
      </header>
      <main className="app-content">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'bill' ? 'active' : ''}`}
            onClick={() => setActiveTab('bill')}
          >
            Bill Lookup
          </button>
          <button 
            className={`tab ${activeTab === 'reading' ? 'active' : ''}`}
            onClick={() => setActiveTab('reading')}
          >
            Meter Reading
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'bill' && <BillForm />}
          {activeTab === 'reading' && <MeterReadingForm />}
        </div>
      </main>
      <footer className="app-footer">
        <p>© 2025 Ceylon Electricity Board. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;