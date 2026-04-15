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
};
