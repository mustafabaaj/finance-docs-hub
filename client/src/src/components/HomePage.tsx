import { useState } from 'react';

const couriers = [
  '--Please choose an option--',
  'FAN Courier',
  'GLS Romania',
  'Urgent Cargus',
  'DPD',
  'Fastius Curier',
  'Sameday',
  'Bookurier',
  'Netopia Payments',
  'EuPlatesc',
  'Memex',
  'Colete Online',
  'X Curier',
  'eMAG',
];

export default function HomePage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCourier, setSelectedCourier] = useState('');

  const handleStartDateChange = (e: any) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: any) => {
    setEndDate(e.target.value);
  };

  const handleSelectChange = (e: any) => {
    setSelectedCourier(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(
      `Start Date: ${startDate}\nEnd Date: ${endDate}\nSelected Courier: ${selectedCourier}`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Select Start and End Dates</h1>
      <div>
        <label>Start Date: </label>
        <input type='date' value={startDate} onChange={handleStartDateChange} />
      </div>
      <div>
        <label>End Date: </label>
        <input type='date' value={endDate} onChange={handleEndDateChange} />
      </div>
      <label htmlFor='courier-select'>Choose a courier:</label>
      <select
        id='courier-select'
        value={selectedCourier}
        onChange={handleSelectChange}
      >
        {couriers.map((courier) => (
          <option key={courier} value={courier}>
            {courier}
          </option>
        ))}
      </select>
      <div>
        <h3>Selected Dates:</h3>
        <p>Start Date: {startDate}</p>
        <p>End Date: {endDate}</p>
      </div>
    </form>
  );
}
