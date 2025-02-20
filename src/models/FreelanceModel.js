class FreelanceGig {
  constructor(
    title,
    description,
    price,
    freelancerId,
    status = "available",
    createdAt = new Date()
  ) {
    this.title = title; // Gig Title
    this.description = description; // Gig Description
    this.price = price; // Gig Price
    this.freelancerId = freelancerId; // Freelancer who created this gig
    this.status = status; // Status (available, booked, completed)
    this.createdAt = createdAt; // Timestamp
  }
}

export default FreelanceGig;
