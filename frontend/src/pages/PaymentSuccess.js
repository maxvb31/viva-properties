import React from 'react';

const PaymentSuccessPage = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="text-center">
                        <h1 className='display-1'>VIVA</h1>
                        <h1 className="display-4 mb-4">Payment Success</h1>
                        <p className="lead">Booking deposit received!</p>
                        <p className="mt-3">You will receive a confirmation email shortly to finalise your booking.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
