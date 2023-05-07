import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { TextField, Button, FormControlLabel,
  Card,
  CardContent, Container } from '@mui/material';
import { useAuthContext } from "../../hooks/useAuthContext";


const GuideBooking = () => {
  const guideId = useParams().id;
  const [guide, setGuide] = useState(null);
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tourDate, setTourDate] = useState("");
  const [tourLocation, setTourLocation] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    fetch(`http://localhost:7070/api/auth/${guideId}`)
      .then((res) => res.json())
      .then((data) => {
        setGuide(data);
      })
      .catch((err) => console.log(err));
  }, [guideId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Submit the form data with the values
      const response = await fetch("http://localhost:7070/api/booking/Add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`,
          'user_id': user._id
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          tourDate,
          tourLocation,
          groupSize,
          specialRequirements,
          guideId
        }),
      });
  
      const data = await response.json();
  
      console.log("Booking added successfully", data);
    } catch (error) {
      console.error("Error adding booking", error);
    }
  };


  return (
    <section style={{ margin: '32px 0' }}>
      <Grid container spacing={2} marginTop={10}>
        {guide && (
          <>
            <Grid item xs={12} sm={6}>
              <br/><br/>
              <img
                src={guide.photo}
                alt={guide.firstname}
                style={{ 
                width: '270px',
                height: '270px',
                display: 'block',
                margin: '0 auto',
                borderRadius: '50%' }}
              />
              <br/><br/>
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
            <Grid item xs={12} sm={6} style={{ backgroundColor: '#ffff' }}>
            
            <Card style={{ backgroundColor: "#F1F6F9"  }} justifyContent="center">
                    <CardContent>
                    <Container maxWidth="sm" style={{marginTop: '20px', marginBottom: '20px'}}>
                        <form onSubmit={handleSubmit} >
                            <Typography variant="h5" style={{ marginBottom: '16px', fontWeight: 'bold', color: '#19376D' }}>
                              <center>Book Now</center>
                            </Typography>
                            <Grid container spacing={2}>
                            <Grid container item spacing={2} xs={12}>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Email"
                                            value={email}
                                             onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={2} xs={12}>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            value={tourDate}
                                            type='date'
                                            onChange={(e) => setTourDate(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={2} xs={12}>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Destination"
                                            value={tourLocation}
                                            onChange={(e) => setTourLocation(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Group Size"
                                            value={groupSize}
                                            onChange={(e) => setGroupSize(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item spacing={2} xs={12}>
                                    <TextField
                                        fullWidth
                                        name="requirements"
                                        label="Special Requirements"
                                        margin="normal"
                                        value={specialRequirements}
                                        onChange={(e) => setSpecialRequirements(e.target.value)}
                                    />
                                </Grid>
                          
                            <Typography style={{ fontStyle:'italic', textAlign:'center', marginBottom: '16px', color: '#19376D', display:'flex'}}>
                              <center>You have to pay an advance of 4 USD to book a guide.</center>
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item spacing={2} xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Name on card"
                                        value={nameOnCard}
                                        onChange={(e) => setNameOnCard(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Card number"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                    />
                                </Grid>
                                <Grid container item spacing={2} xs={12}>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Expiry date"
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="CVV"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                           
                                </Grid>
                              <Grid item xs={12}>
                                {/* <PayPalScriptProvider 
                                  options={{
                                    "client-id": "AQI8VgpVImEHGWZ51f74S2WmYm4xHLXP3COG9kdkDwXXuN3UuoYP6sx1AocPTGzYHiVOYQ4YlvbauFiA"
                                  }}
                                >
                                  <PayPalButtons
                                    createOrder={(data, actions) => {
                                      return actions.order.create({
                                        purchase_units: [
                                          {
                                            amount: {
                                              value: "4.00",
                                            },
                                          },
                                        ],
                                      });
                                    }}
                                    onApprove={async (data, actions) => {
                                      const details = await actions.order.capture();
                                      const name = details.payer.name.given_name;
                                      alert("Booking completed by " + name);
                                     
                                    }}
                                  />
                                </PayPalScriptProvider> */}
                                </Grid>    
                                <Button type="submit" variant="contained"
                            sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '100%', padding: 2, margin: 2, fontWeight: "bold" }}>Submit</Button>
                            </Grid>
                        </form>
                        </Container>
                    </CardContent>
                </Card>
            </Grid>
          </>
        )}
      </Grid>
    </section>
  );
};

export default GuideBooking;
