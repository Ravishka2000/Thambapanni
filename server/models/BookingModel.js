import mongoose from  'mongoose';

const bookingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    tourDate: {
      type: Date,
      required: true
    },
    tourLocation: {
      type: String,
      required: true
    },
    groupSize: {
      type: Number,
      required: true
    },
    specialRequirements: {
      type: String
    },
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  });

  const Booking = mongoose.model('Booking', bookingSchema);

  export default Booking;