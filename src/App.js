import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider
import { store, persistor } from "./redux/store"; // Import the Redux store
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Exchange from "./pages/Exchange";
import Donate from "./pages/Donate";
import Freelance from "./pages/Freelance";
import Transport from "./pages/Transport";
import Footer from "./components/Footer";
import AccountPage from "./pages/Account";
import GigDetails from "./pages/GigDetails";
import SignInPage from "./pages/Signin";
import SignUpPage from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { PersistGate } from "redux-persist/integration/react";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/exchange" element={<Exchange />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/freelance" element={<Freelance />} />
              <Route path="/transport" element={<Transport />} />
              <Route path="/login" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/freelance/gigs/:id" element={<GigDetails />} />
                <Route path="/sell/products/:id" element={<ProductDetails />} />
                <Route path="/account" element={<AccountPage />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
