const Booking = require('../models/bookingSchema');
const Activity = require('../models/activitySchema');

exports.createBooking = async (req, res) => {
  const { activityId } = req.body;

  try {
    const activity = await Activity.findById(activityId);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });

    const booking = new Booking({
      user: req.user.id,
      activity: activityId
    });

    await booking.save();
    res.status(201).json({ message: 'Activity booked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.user.id }).populate('activity');
      res.json(bookings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
