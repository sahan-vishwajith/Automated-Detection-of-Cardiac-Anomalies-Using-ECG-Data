import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import page_image from './photos/bachground.jpg';
import patientImg from './photos/handsome-confident-smiling-man-with-hands-crossed-chest.jpg'
import { Link } from 'react-router-dom';
import LogOutBttn from '../../components/LogOutbttn.js';
import Button from '@mui/material/Button';
import HeartDiseaseCard from './HeartArrhythmiaCard.js';

const ecgSampleData = [
  -6.83906227e-02, -6.21875003e-02, -5.62566966e-02, -6.20178580e-02,
  -6.37723207e-02, -6.60223216e-02, -6.81049079e-02, -7.43013397e-02,
  -8.88705328e-02, -1.01571426e-01, -1.06479913e-01, -1.06392860e-01,
  -1.09787948e-01, -1.18600443e-01, -1.33198664e-01, -1.45555809e-01,
  -1.50944203e-01, -1.52087048e-01, -1.55680805e-01, -1.64774552e-01,
  -1.75428569e-01, -1.81848213e-01, -1.81839287e-01, -1.79575890e-01,
  -1.81294650e-01, -1.90504462e-01, -2.06937507e-01, -2.17180803e-01,
  -2.17095986e-01, -2.07988843e-01, -2.06187502e-01, -2.12834820e-01,
  -2.22995535e-01, -2.27404013e-01, -2.28236601e-01, -2.27899551e-01,
  -2.26555809e-01, -2.27249995e-01, -2.31609374e-01, -2.36924112e-01,
  -2.38290176e-01, -2.36196429e-01, -2.34756693e-01, -2.36468747e-01,
  -2.39734381e-01, -2.40535721e-01, -2.37491071e-01, -2.34109372e-01,
  -2.34078124e-01, -2.39022315e-01, -2.44149551e-01, -2.45843753e-01,
  -2.42522314e-01, -2.38225445e-01, -2.34848216e-01, -2.34328121e-01,
  -2.37765625e-01, -2.39580363e-01, -2.36705363e-01, -2.30263397e-01,
  -2.24747762e-01, -2.22256690e-01, -2.24473208e-01, -2.28629470e-01,
  -2.27232143e-01, -2.18859375e-01, -2.14562505e-01, -2.20138386e-01,
  -2.28399560e-01, -2.29292408e-01, -2.25080356e-01, -2.19892859e-01,
  -2.18687505e-01, -2.23350450e-01, -2.32238844e-01, -2.36450896e-01,
  -2.35245541e-01, -2.29890630e-01, -2.29345977e-01, -2.34881699e-01,
  -2.45225444e-01, -2.49787942e-01, -2.46587053e-01, -2.41089284e-01,
  -2.40667418e-01, -2.44752228e-01, -2.50116080e-01, -2.53832579e-01,
  -2.53332585e-01, -2.49500006e-01, -2.47883931e-01, -2.52508938e-01,
  -2.63560265e-01, -2.69676328e-01, -2.64803559e-01, -2.57482141e-01,
  -2.58785725e-01, -2.67118305e-01, -2.76116073e-01, -2.80624986e-01,
  -2.79026777e-01, -2.74395078e-01, -2.73779005e-01, -2.76671886e-01,
  -2.81491071e-01, -2.82785714e-01, -2.79270083e-01, -2.72613853e-01,
  -2.70535707e-01, -2.76216507e-01, -2.90357143e-01, -2.99736619e-01,
  -2.99466521e-01, -2.91689724e-01, -2.86580354e-01, -2.87214279e-01,
  -2.93033481e-01, -2.97959834e-01, -2.95533478e-01, -2.88843751e-01,
  -2.84345984e-01, -2.86299109e-01, -2.92285711e-01, -2.95531243e-01,
  -2.93725461e-01, -2.86549121e-01, -2.84379452e-01, -2.90542424e-01,
  -2.99265623e-01, -3.02678585e-01, -2.99457580e-01, -2.95551330e-01,
  -2.92988837e-01, -2.96303570e-01, -3.02457601e-01, -3.06174099e-01,
  -3.03441972e-01, -2.97477692e-01, -2.94845968e-01, -2.96553582e-01,
  -2.99319208e-01, -3.00892860e-01, -2.99118310e-01, -2.95249999e-01,
  -2.91399568e-01, -2.90861607e-01, -2.93680817e-01, -2.93861598e-01,
  -2.89600432e-01, -2.84279019e-01, -2.83879459e-01, -2.87515610e-01,
  -2.92245537e-01, -2.93361604e-01, -2.90158480e-01, -2.84415185e-01,
  -2.83064723e-01, -2.87805796e-01, -2.97098219e-01, -3.02205354e-01,
  -3.00736606e-01, -2.94189721e-01, -2.88098216e-01, -2.84486622e-01,
  -2.83845991e-01, -2.81933039e-01, -2.76419640e-01, -2.68930793e-01,
  -2.63051331e-01, -2.58834809e-01, -2.57979900e-01, -2.51180798e-01,
  -2.28964284e-01, -1.93430796e-01, -1.56589285e-01, -9.74151790e-02,
   4.29642871e-02,  2.80049115e-01,  6.06946409e-01,  8.55350435e-01,
   8.54477704e-01,  6.04361594e-01,  3.40979904e-01,  2.13535711e-01,
   1.93546876e-01,  2.04203129e-01,  2.06399560e-01,  2.03374997e-01,
   1.96859375e-01,  1.95796877e-01,  2.04705358e-01,  2.19843745e-01,
   2.25569203e-01,  2.19154015e-01,  2.05732137e-01,  1.94796875e-01,
   1.88051343e-01,  1.83825895e-01,  1.80535707e-01,  1.74839285e-01,
   1.67197916e-01,  1.63145542e-01,  1.64683923e-01,  1.65799106e-01,
   1.60628569e-01,  1.51522315e-01,  1.46720001e-01,  1.51663399e-01,
   1.54811071e-01,  1.51289282e-01,  1.44719920e-01,  1.41980890e-01,
   1.45349103e-01,  1.49811071e-01,  1.47936604e-01,  1.42257860e-01,
   1.38284376e-01,  1.39583927e-01,  1.43170537e-01,  1.42961602e-01,
   1.38008927e-01,  1.34071434e-01,  1.34201339e-01,  1.35771438e-01,
   1.34912505e-01,  1.29654466e-01,  1.25690187e-01,  1.27067858e-01,
   1.31954461e-01,  1.31571435e-01,  1.25504465e-01,  1.20831070e-01,
   1.22309112e-01,  1.27531244e-01,  1.28696433e-01,  1.24711607e-01,
   1.17816074e-01,  1.12612504e-01,  1.12187502e-01,  1.15177681e-01,
   1.16988392e-01,  1.13515621e-01,  1.07387502e-01,  1.05108035e-01,
   1.07994821e-01,  1.10819643e-01,  1.08177677e-01,  1.02950004e-01,
   9.83678583e-02,  9.83883930e-02,  1.01094642e-01,  9.91755354e-02,
   9.39016082e-02,  9.04558033e-02,  9.19468758e-02,  9.32741062e-02,
   8.97049116e-02,  8.43174112e-02,  8.20549101e-02,  8.33151786e-02,
   8.32116067e-02,  7.85529459e-02,  7.46811609e-02,  7.48977687e-02,
   7.55651787e-02,  7.13165177e-02,  6.47357124e-02,  6.09441973e-02,
   6.20115186e-02,  6.18250006e-02,  5.66299114e-02,  5.35424119e-02,
   5.52084823e-02,  5.57357141e-02,  5.05607143e-02,  4.57870539e-02,
   4.51765171e-02,  4.60883927e-02,  4.36683039e-02,  3.93133039e-02,
   3.74062501e-02,  3.75308038e-02,  3.39722318e-02,  3.05640178e-02,
   2.97815178e-02,  2.89910716e-02,  2.54901787e-02,  2.08652679e-02,
   1.88723220e-02,  1.82482134e-02,  1.40707141e-02,  9.51535710e-03,
   7.66339283e-03,  7.27200891e-03,  3.37995541e-03, -1.59508930e-03,
  -3.17583041e-03, -3.75861602e-03, -7.68727677e-03, -1.19858036e-02,
  -1.42437500e-02, -1.45816965e-02, -1.80468746e-02, -2.18884822e-02,
  -2.42723219e-02, -2.51857142e-02, -2.84741069e-02, -3.28479464e-02,
  -3.59615180e-02, -3.78424112e-02, -4.10218753e-02, -4.48110895e-02,
  -4.81084827e-02, -5.02611610e-02, -5.35419647e-02, -5.81066960e-02,
  -6.17861613e-02, -6.38428571e-02, -6.62581247e-02, -7.09580359e-02,
  -7.51049109e-02, -7.72183027e-02, -7.93964285e-02, -8.37709820e-02,
  -8.79493752e-02, -9.04004464e-02, -9.31549115e-02, -9.71667401e-02,
  -1.01580354e-01, -1.04263391e-01, -1.06954463e-01, -1.10979465e-01,
  -1.15694645e-01, -1.18910712e-01, -1.20742857e-01, -1.23631254e-01,
  -1.27516963e-01, -1.30986603e-01, -1.32345536e-01, -1.33967858e-01,
  -1.37506247e-01, -1.41524466e-01, -1.44050892e-01, -1.46379459e-01,
  -1.49672320e-01, -1.53697321e-01, -1.56751790e-01, -1.58508930e-01,
  -1.60213393e-01, -1.62984824e-01, -1.65591609e-01, -1.67772098e-01,
  -1.70473211e-01, -1.73962057e-01, -1.76506245e-01, -1.77801337e-01,
  -1.79375894e-01, -1.81637500e-01, -1.83783034e-01, -1.85661603e-01,
  -1.88040178e-01, -1.91264290e-01, -1.94099104e-01, -1.96034824e-01,
  -1.97794649e-01, -2.00270935e-01, -2.03327679e-01, -2.05428567e-01,
  -2.07343745e-01, -2.09992854e-01, -2.13063398e-01, -2.14938396e-01,
  -2.16498220e-01, -2.18783924e-01, -2.21394649e-01, -2.23252228e-01,
  -2.23924108e-01, -2.24957139e-01, -2.27806251e-01, -2.30531246e-01,
  -2.31849105e-01, -2.32736603e-01, -2.34209824e-01, -2.36984824e-01,
  -2.39648217e-01, -2.40617403e-01, -2.40523214e-01, -2.42170536e-01,
  -2.44561609e-01, -2.45631251e-01, -2.45416965e-01, -2.46523211e-01,
  -2.48811606e-01, -2.50709821e-01, -2.50636606e-01, -2.51756248e-01,
  -2.54107141e-01, -2.55694651e-01, -2.55084827e-01, -2.55449103e-01,
  -2.57302678e-01, -2.58938395e-01, -2.57943752e-01, -2.57679465e-01,
  -2.59754468e-01, -2.61406252e-01, -2.59740178e-01, -2.58515180e-01,
  -2.59743755e-01, -2.61237500e-01, -2.59422322e-01, -2.56953574e-01,
  -2.57738394e-01, -2.59194644e-01, -2.57254461e-01, -2.53366959e-01,
  -2.53365175e-01, -2.55635709e-01, -2.54829463e-01, -2.50783037e-01,
  -2.49366964e-01, -2.51170539e-01, -2.51054460e-01, -2.46630354e-01,
  -2.44854464e-01, -2.46170532e-01, -2.46566965e-01, -2.42107143e-01,
  -2.38581252e-01, -2.40131253e-01, -2.40353571e-01, -2.35436604e-01,
  -2.31715181e-01, -2.32461604e-01, -2.33541071e-01, -2.28758039e-01,
  -2.24483926e-01, -2.24584818e-01, -2.24375891e-01, ]
; // Replace with actual ECG data


export default function PatientCard() {
  const location = useLocation();
  const { patient } = location.state || {};

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundImage: `url(${page_image})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh', 
        padding: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
        }}
      >
        <LogOutBttn color='#7b1fa2' hcolor='#4a148c'/>
      </Box>
      <Card
        sx={{
          width: '22vw',  // 60% of the window width
          height: '80vh', // 50% of the window height
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: '1px solid rgba(167, 29, 239, 0.3)',
          display: 'flex', // Use flexbox for layout
          paddingLeft:'50px',
        }}
      >
        
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}>
          <CardContent sx={{ flex: '1 0 auto', color: 'black' }}>
          <CardMedia
      component="img"
      height="230"
      image={patientImg}
      alt="Patient"
      sx={{
        width: 150,       // Set a fixed width for the image
        height: 150,      // Set a fixed height for the image
        borderRadius: '50%', // Make it a circle
        objectFit: 'cover',  // Ensures the image covers the circular frame without distortion
        border: '3px solid #1565c0' // Optional: adds a colored border around the image
      }}
    />
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
              {patient.name}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>ID Number:</strong> {patient.idNumber}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Address:</strong> {patient.address}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Birthday:</strong> {new Date(patient.bday).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Gender:</strong> {patient.gender}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {patient.email}
              </Typography>
              {patient.medicalHistory && patient.medicalHistory.length > 0 && (
                <Typography variant="body1" gutterBottom>
                  {/* <strong>Medical History:</strong> {patient.medicalHistory.join(', ')} */}
                  <div 
                    style={{
                      maxHeight: '92px', // Set a max height for the scrollable area
                      overflowY: 'auto',   // Enable vertical scrolling
                    }}
                  >
                    {patient.medicalHistory.map((history, index) => (
                      <div key={index}>{history}</div> // Display each item on a new line
                    ))}
                    <br></br>
                  </div>
                </Typography>
              )}
            </Box>
          </CardContent>
          <Button variant="contained" component={Link} to='/Patient/edit' 
            state={{patient}}
            sx={{ backgroundColor: '#7b1fa2', color: '#fff',
                '&:hover': {
                backgroundColor: '#4a148c',}
            }}>
            Edit Details
          </Button>
          <br></br>
        </Box>
      </Card>
      <HeartDiseaseCard diseaseName="Right bundle branch block" ecgData={ecgSampleData}
       />
      
      </Box>
  );
}
