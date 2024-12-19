const Reservation = require('../models/Reservation')

exports.home = (req, res) => {
  res.send('reservations')

  // User.create({ name, email, password: hashedPassword }, (err, result) => {
  //   if (err) return res.status(500).json({ error: err })

  //   res.status(201).json({ message: 'User created successfully!' })
  // })
}
