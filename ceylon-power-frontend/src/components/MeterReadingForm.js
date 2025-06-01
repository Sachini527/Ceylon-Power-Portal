import React, { useState } from 'react';
import axios from 'axios';

function MeterReadingForm() {
    const [accountNumber, setAccountNumber] = useState('');
    const [readingDate, setReadingDate] = useState('');
    const [readingValue, setReadingValue] = useState('');
    const [message, setMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setMessage(null);
        setIsSubmitting(true);
        
        try {
            const response = await axios.post('http://localhost:8080/api/readings', {
                accountNumber,
                readingDate,
                readingValue: parseInt(readingValue, 10)
            });
            setMessage({ type: 'success', text: String(response.data) });

            // Clear the form
            setAccountNumber('');
            setReadingDate('');
            setReadingValue('');
        } catch (err) {
            let errorText = 'Error adding reading.';

            if (err.response) {
                if (typeof err.response.data === 'string') {
                    errorText = err.response.data;
                } else if (typeof err.response.data === 'object' && err.response.data.error) {
                    errorText = err.response.data.error;
                }
            }

            setMessage({ type: 'error', text: errorText });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = accountNumber && readingDate && readingValue;

    return (
        <div className="form-container">
            <h2>Meter Reading Entry</h2>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Account Number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="reading-date">Reading Date</label>
                <input
                    id="reading-date"
                    type="date"
                    value={readingDate}
                    onChange={(e) => setReadingDate(e.target.value)}
                />
            </div>
            <div className="form-group">
                <input
                    type="number"
                    placeholder="Reading Value"
                    value={readingValue}
                    onChange={(e) => setReadingValue(e.target.value)}
                />
            </div>
            <button 
                onClick={handleSubmit} 
                disabled={isSubmitting || !isFormValid}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Reading'}
            </button>
            {message && (
                <p className={message.type === 'error' ? 'error-message' : 'success-message'}>
                    {message.text}
                </p>
            )}
        </div>
    );
}

export default MeterReadingForm;