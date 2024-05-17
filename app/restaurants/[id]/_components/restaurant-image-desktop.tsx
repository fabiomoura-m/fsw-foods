"use client";

import { Button } from "@/app/_components/ui/button";
import { isRestaurantFavorited } from "@/app/_helpers/restaurant";
import useToggleFavoriteRestaurant from "@/app/_hooks/use-toggle-favorite-restaurant";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import Image from "next/image";

interface RestaurantImageDesktopProps {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
  userId?: string;
}

const RestaurantImageDesktop = ({
  restaurant,
  userFavoriteRestaurants,
  userId,
}: RestaurantImageDesktopProps) => {
  const isFavorite = isRestaurantFavorited(
    restaurant.id,
    userFavoriteRestaurants,
  );

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: userId,
    restaurantIsFavorited: isFavorite,
  });

  return (
    <div className="hidden h-[380px] w-full min-w-[550px] basis-3/5 lg:relative lg:block">
      <Image
        src={restaurant.imageUrl}
        width={0}
        height={0}
        alt={restaurant.name}
        sizes="100%"
        className="h-full w-full rounded-lg object-cover"
      />

      {userId && (
        <Button
          size="icon"
          className={`absolute right-4 top-4 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
          onClick={handleFavoriteClick}
        >
          <HeartIcon size={20} className="fill-white" />
        </Button>
      )}
    </div>
  );
};

export default RestaurantImageDesktop;
