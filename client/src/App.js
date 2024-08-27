import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Landing from './pages/Landing';
import SignIn from './pages/Loging';
import Doctor from './pages/Doctor';
import Patients from './pages/Patients';
import Predict from './pages/Predict';
import PatientForm from './pages/CreatePatient';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Doc/login' element={<SignIn />} />
        <Route path='/Doc' element={<Doctor />} />
        <Route path='/Doc/Patients' element={<Patients />} />
        <Route path='/Doc/Predict' element={<Predict />} />
        <Route path='/Doc/createP' element={<PatientForm />} />
      </Routes>
    </Router>


  );
}

export default App;
