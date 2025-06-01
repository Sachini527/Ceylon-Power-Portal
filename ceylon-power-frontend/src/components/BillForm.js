import React, { useState } from 'react';
import axios from 'axios';
import BillResult from './BillResult';

function BillForm() {
    const [accountNumber, setAccountNumber] = useState('');
    const [billData, setBillData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchBill = async () => {
        // Clear previous data and errors
        setBillData(null);
        setError(null);
        setIsLoading(true);
        
        try {
            const response = await axios.get(`http://localhost:8080/api/bill/${accountNumber}`);
            setBillData(response.data);
        } catch (err) {
            setBillData(null); // clear previous data on error
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError('Something went wrong');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Electricity Bill Lookup</h2>
            <div className="form-group">
                <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter Account Number"
                />
                <button 
                    onClick={fetchBill} 
                    disabled={isLoading || !accountNumber}
                >
                    {isLoading ? 'Loading...' : 'Get Bill'}
                </button>
            </div>
            
            {error && <p className="error-message">{error}</p>}
            {billData && <BillResult data={billData} />}
        </div>
    );
}

export default BillForm;