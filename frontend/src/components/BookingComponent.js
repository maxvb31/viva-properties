import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

// Custom input component for DatePicker
const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
  <input
    type="text"
    className="form-control"
    onClick={onClick}
    value={value}
    readOnly
    ref={ref}
    placeholder="Select a date"
  />
));

const BookingComponent = ({ pricePerNight, maxGuests, property, slug }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  console.log('Property:', property);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const timeDiff = Math.abs(checkOutDate - checkInDate);
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setTotalPrice(diffDays * pricePerNight);
    }
  }, [checkInDate, checkOutDate, pricePerNight]);

  const handleReserve = () => {
    if (!checkInDate || !checkOutDate || !property) {
      console.error('Missing required data for reservation');
      return;
    }
    
    const url = `/booking/${slug}`;
    console.log('Navigating to:', url);
    navigate(url); // Use navigate function to navigate to the booking page
  };
  
  const guestOptions = Array.from({ length: maxGuests }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} guest${i + 1 > 1 ? 's' : ''}`,
  }));

  return (
    <div className="container border rounded p-4 mt-4 shadow">
      <h2 className="mb-2">Book this property</h2>
      <p className="fw-bold mb-4">${pricePerNight} per night</p>
      <div className="form-group mb-3">
        <label>Check-in&nbsp;&nbsp;&nbsp;</label>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          minDate={new Date()}
          customInput={<CustomDateInput />}
        />
      </div>
      <div className="form-group mb-3">
        <label>Check-out&nbsp;</label>
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          minDate={checkInDate}
          customInput={<CustomDateInput />}
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
      <hr />
      <button className="btn btn-primary w-100 mt-2" onClick={handleReserve}>Reserve</button>
      {checkInDate && checkOutDate && (
        <p className="fw-bold">Total Price: ${totalPrice}</p>
      )}
    </div>
  );
};

export default BookingComponent;
