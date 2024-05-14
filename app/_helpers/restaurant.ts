import { UserFavoriteRestaurant } from "@prisma/client";

export const isRestaurantFavorited = (
  restaurantId: string,
  userFavoriteRestaurants: UserFavoriteRestaurant[],
) => {
  return userFavoriteRestaurants.some(
    (favoriteRestaurant) => favoriteRestaurant.restaurantId === restaurantId,
  );
};
