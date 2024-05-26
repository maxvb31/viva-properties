import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { loadStripe } from '@stripe/stripe-js';

const BookingComponent = ({ pricePerNight, maxGuests }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const timeDiff = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setTotalPrice(diffDays * pricePerNight);
    }
  }, [checkInDate, checkOutDate, pricePerNight]);

  const handleReserve = () => {
    alert(`Reservation made for ${guests} guests from ${checkInDate.toLocaleDateString()} to ${checkOutDate.toLocaleDateString()}`);
  };

  const handlePayment = async () => {
    const stripe = await loadStripe('pk_test_51PKQUQP2WcwkR8ROJgqNwKFc7ClAFBsFWiBB8xXG6rVmrDCFVPo4v3c1a1GujXYCaQ43syldKB2WBhqQI2yCilsD00rjnzHVZR');
  
    try {
      const timeDiff = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{
          price: 'price_1PKj3tP2WcwkR8RObH94KJnj',
          quantity: diffDays, // Set quantity to number of nights
        }],
        mode: 'payment',
        successUrl: 'http://localhost:3000', // Corrected URL
        cancelUrl: 'http://localhost:3000/cancel',   // Corrected URL
      });
  
      if (error) {
        console.error('Error during redirect to Checkout:', error);
        // Handle error, show message to user, etc.
      }
    } catch (error) {
      console.error('Error during redirect to Checkout:', error);
      // Handle error, show message to user, etc.
    }
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
      <hr />
      <button className="btn btn-primary w-100 mt-2" onClick={handlePayment}>Reserve</button> {/* Add Get Course Access button */}
      {checkInDate && checkOutDate && (
        <p className="fw-bold">Total Price: ${totalPrice}</p>
      )}
    </div>
  );
};

export default BookingComponent;
