import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';

const BookingComponent = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);

  const handleReserve = () => {
    alert(`Reservation made for ${guests} guests from ${checkInDate.toLocaleDateString()} to ${checkOutDate.toLocaleDateString()}`);
  };

  const guestOptions = [
    { value: 1, label: '1 guest' },
    { value: 2, label: '2 guests' },
    { value: 3, label: '3 guests' },
    { value: 4, label: '4 guests' },
    { value: 5, label: '5 guests' },
  ];

  return (
    <div className="container border rounded p-4 mt-4 shadow">
      <h2 className="mb-4">Book this property</h2>
      <div className="form-group mb-3">
        <label>Check-in&nbsp;&nbsp;&nbsp;</label>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          minDate={new Date()}
          className="form-control"
          placeholderText="Select a date"
        />
      </div>
      <div className="form-group mb-3">
        <label>Check-out&nbsp;</label>
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          minDate={checkInDate}
          className="form-control"
          placeholderText="Select a date"
        />
      </div>
      <div className="form-group mb-3">
        <label>Guests</label>
        <Select
          options={guestOptions}
          value={guestOptions.find(option => option.value === guests)}
          onChange={(selectedOption) => setGuests(selectedOption.value)}
          className="basic-single"
          classNamePrefix="select"
        />
      </div>
      <button className="btn btn-primary w-100" onClick={handleReserve}>Reserve</button>
    </div>
  );
};

export default BookingComponent;
