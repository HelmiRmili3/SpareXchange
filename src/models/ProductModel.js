class Product {
  constructor(
    name,
    description,
    price,
    imageUrl,
    category,
    stock,
    createdAt = new Date()
  ) {
    this.name = name; // Product Name
    this.description = description; // Product Description
    this.price = price; // Product Price
    this.imageUrl = imageUrl; // Product Image URL
    this.category = category; // Category Name
    this.stock = stock; // Stock Availability
    this.createdAt = createdAt; // Timestamp
  }
}

export default Product;
