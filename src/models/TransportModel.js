class Transport {
  constructor(
    vehicleType,
    driverId,
    availableSeats,
    destination,
    departureTime,
    createdAt = new Date()
  ) {
    this.vehicleType = vehicleType; // Car, Bus, Bike, etc.
    this.driverId = driverId; // User ID of the driver
    this.availableSeats = availableSeats; // Number of available seats
    this.destination = destination; // Destination Address
    this.departureTime = departureTime; // Departure Time
    this.createdAt = createdAt; // Timestamp
  }
}

export default Transport;
