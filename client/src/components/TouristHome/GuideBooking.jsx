import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { TextField, Button, FormControlLabel,
  Card,
  CardContent, Container } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";

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
            <Grid item xs={12} sm={6}>
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
                        <form >
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
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Email"
                                            
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={2} xs={12}>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Phone"
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Tour Date"
                                            
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={2} xs={12}>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Destination"
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Group Size"
                                            
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="requirements"
                                        label="Special Requirements"
                                        margin="normal"
                                       
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={isDhlDelivery}
                                                onChange={(event) =>
                                                    setIsDhlDelivery(event.target.checked)
                                                }
                                                name="dhlDeliverySwitch"
                                                color="primary"
                                            />
                                        }
                                        label="DHL Delivery"
                                    />
                                </Grid> */}
                                {/* {isDhlDelivery && (
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Shipping address"
                                            value={shippingAddress}
                                            onChange={(event) =>
                                                setShippingAddress(event.target.value)
                                            }
                                        />
                                    </Grid>
                                )} */}
                          
                            <Typography style={{ fontStyle:'italic', textAlign:'center', marginBottom: '16px', color: '#19376D', display:'flex'}}>
                              <center>You have to pay an advance of 4 USD to book a guide.</center>
                            </Typography>

                            
                                {/* <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Name on card"
                                        
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Card number"
                                        
                                    />
                                </Grid>
                                <Grid container item spacing={2} xs={12}>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Expiry date"
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="CVV"
                                            
                                        />
                                    </Grid>
                                </Grid> */}
                              <Grid item xs={12}>
                                <PayPalScriptProvider 
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
                                </PayPalScriptProvider>
                                </Grid>                         
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
