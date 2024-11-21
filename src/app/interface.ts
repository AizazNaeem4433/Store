// Define the structure for weight options
export interface WeightOption {
  label: string;         // Label of the weight option
  multiplier: number;    // Multiplier for the price calculation
  _key: string;          // Unique key for each weight option
}

// For simpler versions of the product
export interface simplifiedProduct {
  _id: string;               // Unique identifier for the product
  basePrice: number;         // Base price for the product
  name: string;              // Name of the product
  slug: string;              // URL-friendly identifier for the product
  categoryName: string;      // Category name of the product
  imageUrl: string;          // URL for the product image
  weight: WeightOption[];    // Array of weight options (for simplified product)
  price: number;             // Final price of the product
  priceRange: {              // Define the structure for price range
    min: number;             // Minimum price in the range
    max: number;             // Maximum price in the range
  } | null;                  // Could be null if not applicable
}

// Full product structure, using WeightOption defined above
export interface fullProduct {
  _id: string;               // Unique identifier for the product
  basePrice: number;         // Base price for the product
  images: string[];          // Array of image URLs
  price: number;             // Final price for the product
  slug: string;              // URL-friendly identifier for the product
  categoryName: string;      // Category name of the product
  name: string;              // Name of the product
  description: string;       // Detailed product description
  price_id: string;          // Unique identifier for pricing (from Stripe or similar)
  weight: WeightOption[];    // Array of weight options
  priceRange: {              // Define the structure for price range
    min: number;             // Minimum price in the range
    max: number;             // Maximum price in the range
  } | null;                  // Could be null if not applicable
}
