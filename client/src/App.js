import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Landing from './pages/doctor/Landing';
import SignIn from './pages/doctor/Loging';
import Doctor from './pages/doctor/Doctor';
import Patients from './pages/doctor/Patients';
import Predict from './pages/doctor/Predict';
import PatientForm from './pages/doctor/CreatePatient';

import AdminLogin from './pages/admin/ALogin';
import Doctors from './pages/admin/ViewDoc';
import Admin from './pages/admin/Admin';
import DoctorForm from './pages/admin/ACreateDoc';

import PatientLogin from './pages/patient/Plogin.js';
import PatientCard from './pages/patient/ViewDetails.js';
import PatientEditForm from './pages/patient/EditDetails.js';

import DashBoard from './pages/doctor/dashboard.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Doc/login' element={<SignIn />} />
        <Route path='/Doc' element={<Doctor />} />
        <Route path='/Doc/patients' element={<Patients />} />
        <Route path='/Doc/Predict' element={<Predict />} />
        <Route path='/Doc/createP' element={<PatientForm />} />

        <Route path='/Admin/login' element={<AdminLogin/>}/>
        <Route path='/Admin/Doctors' element={<Doctors/>}/>
        <Route path='/Admin' element={<Admin/>}/>
        <Route path='/Admin/createD' element={<DoctorForm/>}/>

        <Route path='/Patient/login' element={<PatientLogin/>}/> 
        <Route path='/Patient' element={<PatientCard/>}/>    
        <Route path='/Patient/edit' element={<PatientEditForm/>}/>  

        <Route path='/dashboard' element={<DashBoard/>}  />
      </Routes>
    </Router>
  );
}

export default App;
