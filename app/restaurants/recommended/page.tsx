import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";

const RecommendedRestaurants = async () => {
  const session = await getServerSession(authOptions);
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
  });
  const restaurants = await db.restaurant.findMany({});

  return (
    <>
      <div className="lg:border-b">
        <Header hasSearch={true} />
      </div>
      <div className="px-5 py-6 lg:container lg:py-10">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 xl:grid-cols-4">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full lg:min-w-full lg:max-w-full"
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurants;
