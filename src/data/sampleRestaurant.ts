export type Restaurant = {
  id: string;
  name: string;
  shortDescription: string;
  rating: number;
  reviewCount: number;
  distanceMiles: number;
  priceLevel: number;
  tags: string[];
  isOpen: boolean;
  closingNote: string;
  address: string;
  imageUrl?: string;
};

export const SAMPLE_RESTAURANT: Restaurant = {
  id: "raising-canes-sample",
  name: "Raising Cane's",
  shortDescription: "Beloved for its chicken tenders and signature Cane's sauce.",
  rating: 4.35,
  reviewCount: 284,
  distanceMiles: 0.4,
  priceLevel: 2,
  tags: ["Chicken", "Fast Casual", "Louisiana"],
  isOpen: true,
  closingNote: "Closes 2 AM",
  address: "1234 Florida Blvd, Baton Rouge, LA",
  imageUrl:
    "https://cdn.under30ceo.com/wp-content/uploads/2024/12/b67d70f9-3f97-4375-9bf9-e9ff1bb307c4.jpg",
};

export const RESTAURANT_POOL: Restaurant[] = [
  SAMPLE_RESTAURANT,
  {
    id: "walk-ons",
    name: "Walk-On's",
    shortDescription: "Game day energy with Cajun plates and big burgers.",
    rating: 4.2,
    reviewCount: 632,
    distanceMiles: 0.7,
    priceLevel: 2,
    tags: ["Sports Bar", "Burgers", "Cajun"],
    isOpen: true,
    closingNote: "Closes 11 PM",
    address: "3838 Burbank Dr, Baton Rouge, LA",
    imageUrl:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1300&q=80",
  },
  {
    id: "tsunami",
    name: "Tsunami",
    shortDescription: "Stylish sushi and skyline views for date nights.",
    rating: 4.6,
    reviewCount: 412,
    distanceMiles: 1.1,
    priceLevel: 3,
    tags: ["Sushi", "Upscale", "Cocktails"],
    isOpen: true,
    closingNote: "Closes 10 PM",
    address: "100 Lafayette St, Baton Rouge, LA",
    imageUrl:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1300&q=80",
  },
  {
    id: "parrains",
    name: "Parrain's Seafood",
    shortDescription: "Classic Louisiana seafood and po-boys.",
    rating: 4.3,
    reviewCount: 544,
    distanceMiles: 1.5,
    priceLevel: 2,
    tags: ["Seafood", "Cajun", "Po-boys"],
    isOpen: true,
    closingNote: "Closes 9 PM",
    address: "3225 Perkins Rd, Baton Rouge, LA",
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1300&q=80",
  },
  {
    id: "mestizo",
    name: "Mestizo",
    shortDescription: "Vibrant tacos, queso, and strong margaritas.",
    rating: 4.4,
    reviewCount: 389,
    distanceMiles: 0.9,
    priceLevel: 2,
    tags: ["Mexican", "Tacos", "Margaritas"],
    isOpen: true,
    closingNote: "Closes 10 PM",
    address: "2323 S Acadian Thruway, Baton Rouge, LA",
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1300&q=80",
  },
  {
    id: "beausoleil",
    name: "Beausoleil",
    shortDescription: "Refined French-inspired seafood in a cozy room.",
    rating: 4.7,
    reviewCount: 271,
    distanceMiles: 2.2,
    priceLevel: 3,
    tags: ["French", "Fine Dining", "Wine"],
    isOpen: true,
    closingNote: "Closes 10 PM",
    address: "7731 Jefferson Hwy, Baton Rouge, LA",
    imageUrl:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1300&q=80",
  },
];
