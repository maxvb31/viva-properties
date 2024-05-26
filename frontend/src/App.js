// App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Properties from "./pages/Properties";
import SinglePost from "./pages/SinglePost";
import Error from "./pages/Error";
import Homepage from "./pages/Homepage";
import PaymentPage from "./pages/PaymentPage";
import BookingForm from "./pages/BookingForm"; // Import the new BookingForm component
import PaymentSuccess from "./pages/PaymentSuccess"; // Import the new PaymentSuccess component

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/properties/:slug" element={<SinglePost />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/booking/:slug" element={<BookingForm />} />
        <Route path="/payment-success" element={<PaymentSuccess />} /> {/* Add route for Payment Success page */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
