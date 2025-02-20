class Exchange {
  constructor(
    itemOffered,
    itemRequested,
    userId,
    status = "pending",
    createdAt = new Date()
  ) {
    this.itemOffered = itemOffered; // Item user wants to exchange
    this.itemRequested = itemRequested; // Item user wants in return
    this.userId = userId; // User who made the exchange request
    this.status = status; // Status of exchange (pending, completed, declined)
    this.createdAt = createdAt; // Timestamp
  }
}

export default Exchange;
