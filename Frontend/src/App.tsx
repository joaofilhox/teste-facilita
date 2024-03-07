import React from 'react';
import Footer from './components/footer';
import Header from './components/header';
import MainRoutes  from './routes/RoutesMain';
import './reset.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <MainRoutes />
      <ToastContainer />
      <Footer />
    </>
  );
};

export default App;
