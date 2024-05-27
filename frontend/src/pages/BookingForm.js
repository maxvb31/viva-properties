import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import client from '../client';
import { loadStripe } from '@stripe/stripe-js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Using custom datepicker component to avoid keyboard popup for touchscreen
const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
  <input
    type="text"
    className="form-control"
    onClick={onClick}
    value={value}
    readOnly
    ref={ref}
  />
));

const BookingForm = () => {
  const [postData, setPostData] = useState(null);
  const { slug } = useParams();
  const [stripeLoading, setStripeLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [postcode, setPostcode] = useState('');
  const [guests, setGuests] = useState(1);
  const [beds, setBeds] = useState(1);

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"] {
          title,
          mainImage {
            asset -> {
              url
            }
          },
          pricePerNight,
          beds
        }`
      )
      .then((data) => {
        if (data.length > 0) {
          setPostData(data[0]);
          setBeds(data[0].beds);
        }
      })
      .catch(console.error);

    const loadStripeJs = async () => {
      setStripeLoading(false);
    };

    loadStripeJs();
  }, [slug]);

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    if (checkOutDate && date > checkOutDate) {
      setCheckOutDate(null);
    }
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
    if (checkInDate && date < checkInDate) {
      setCheckInDate(null);
    }
  };

  const handleClick = async (e) => {
    const stripe = await loadStripe('pk_test_51PKQUQP2WcwkR8ROJgqNwKFc7ClAFBsFWiBB8xXG6rVmrDCFVPo4v3c1a1GujXYCaQ43syldKB2WBhqQI2yCilsD00rjnzHVZR');

    try {
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{
          price: 'price_1PKj3tP2WcwkR8RObH94KJnj',
          quantity: calculateNumberOfNights(checkInDate, checkOutDate)
        }],
        mode: 'payment',
        successUrl: 'https://vivaproperties.netlify.app/payment-success', // Corrected URL
        cancelUrl: 'https://vivaproperties.netlify.app/*', // Corrected URL
      });

      if (error) {
        console.error('Error during redirect to Checkout:', error);
   
      }
    } catch (error) {
      console.error('Error during redirect to Checkout:', error);

    }
  };

  const calculateNumberOfNights = (checkInDate, checkOutDate) => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffInTime = checkOutDate.getTime() - checkInDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return Math.round(diffInDays);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', {
      checkInDate,
      checkOutDate,
      firstName,
      surname,
      email,
      phoneNumber,
      postcode,
      guests
    });
  };

  return (
    <div className="container mt-5">
      {postData && (
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <div className="card">
              <img src={postData.mainImage.asset.url} className="card-img-top" alt={postData.title} />
              <div className="card-body">
                <h5 className="card-title">{postData.title}</h5>
                <p className="card-text">Price per night: ${postData.pricePerNight}</p>
                <p className="card-text">Number of beds: {beds}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Booking Form</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <h5>Confirm check-in and check-out</h5>
                  <label>Check-in Date</label>
                  <br />
                  <DatePicker
                    selected={checkInDate}
                    onChange={handleCheckInChange}
                    minDate={new Date()}
                    selectsStart
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    customInput={<CustomDateInput />}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Check-out Date</label>
                  <br />
                  <DatePicker
                    selected={checkOutDate}
                    onChange={handleCheckOutChange}
                    minDate={checkInDate}
                    selectsEnd
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    customInput={<CustomDateInput />}
                  />
                </div>
                <div className="form-group mb-3">
                  <h5>Confirm your personal details</h5>
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Postcode</label>
                  <input
                    type="text"
                    className="form-control"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Number of Guests</label>
                  <select
                    className="form-control"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    max={beds}
                  >
                    {[...Array(beds)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <p>**Your booking is subject to a £20 per night reservation deposit. Your confirmation email will contain full payment details.</p>
                {!stripeLoading && (
                  <button type="submit" className="btn btn-primary w-100 mt-3" onClick={handleClick}>Proceed to Payment</button>
                )}
                {stripeLoading && <p>Loading Stripe...</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
