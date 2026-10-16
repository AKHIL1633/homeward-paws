// Shapes a Pet document into the snake_case contract the frontend expects.
export function presentPet(pet) {
  const seller = pet.seller;
  const sellerId = seller && seller._id ? String(seller._id) : String(seller);
  const sellerEmail = seller && seller.email ? seller.email : null;
  return {
    id: String(pet._id),
    name: pet.name,
    species: pet.species,
    breed: pet.breed,
    age: pet.age,
    price: pet.price,
    description: pet.description ?? null,
    image_url: pet.imageUrl ?? null,
    location: pet.location,
    status: String(pet.status).toLowerCase(),
    seller_id: sellerId,
    seller_email: sellerEmail,
    created_at: pet.createdAt,
    updated_at: pet.updatedAt,
  };
}
