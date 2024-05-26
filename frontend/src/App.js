import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Properties from "./pages/Properties";
import SinglePost from "./pages/SinglePost";
import Error from "./pages/Error";
import Homepage from "./pages/Homepage";
import PaymentPage from "./pages/PaymentPage";  

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/properties/:slug" element={<SinglePost />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/payment" element={<PaymentPage />} />  // Add the payment page route
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
