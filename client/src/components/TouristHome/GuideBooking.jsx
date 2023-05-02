import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { TextField, Button } from '@mui/material';

const GuideBooking = () => {
  const guideId = useParams().id;
  const [guide, setGuide] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:7070/api/auth/${guideId}`)
      .then((res) => res.json())
      .then((data) => {
        setGuide(data);
      })
      .catch((err) => console.log(err));
  }, [guideId]);

  return (
    <section style={{ margin: '32px 0' }}>
      <Grid container spacing={2} marginTop={10}>
        {guide && (
          <>
            <Grid item xs={12} sm={5}>
              <img
                src={guide.photo}
                alt={guide.firstname}
                style={{ 
                width: '230px',
                height: '270px',
                display: 'block',
                margin: '0 auto',
                borderRadius: '50%' }}
              />
              <Typography variant="h5" style={{ marginBottom: '16px', fontWeight: 'bold', color: '#19376D' }}>
                <center>{guide.firstName} {guide.lastName}</center>
              </Typography>
              <Typography style={{ textAlign: 'justify', fontSize: '1.0rem', backgroundColor: '#ffff' }}>
              <center>{guide.bio}</center>{<br />}
              </Typography>
              <Typography  style={{ textAlign: 'justify', fontSize: '1.0rem', backgroundColor: '#ffff'  }}>
              <center>Charges: {guide.charges}</center>{<br />}
              </Typography>
              <section style={{ display: "flex", alignItems: "center", color: "#19376D", justifyContent: "center" }}>
              <LocalPhoneIcon />
                    <Typography variant="subtitle1" fontWeight="bold">
                        {guide.mobile}
                    </Typography>
                </section>
                <section style={{ display: "flex", alignItems: "center", color: "#19376D", justifyContent: "center" }}>
                    <EmailIcon />
                    <Typography variant="subtitle1" fontWeight="bold">
                        {guide.email}
                    </Typography>
                </section>
            </Grid>
            <Grid item xs={12} sm={7} style={{ backgroundColor: '#ffff' }}>
            <Typography variant="h5" style={{ marginBottom: '16px', fontWeight: 'bold', color: '#19376D' }}>
            Book a guide
          </Typography>
              
            </Grid>
          </>
        )}
      </Grid>
    </section>
  );
};

export default GuideBooking;
