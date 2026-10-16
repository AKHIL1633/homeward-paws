export type User = { id: string; email: string; role: 'BUYER' | 'SELLER'; firstName?: string | null; lastName?: string | null };

export type Pet = {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  price: number;
  description?: string | null;
  image_url?: string | null;
  location: string;
  status: string;
  seller_email: string;
};
