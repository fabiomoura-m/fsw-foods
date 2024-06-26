import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <div className="lg:border-b">
        <Header hasSearch={true} />
      </div>
      <div className="px-5 py-6 lg:container lg:py-10">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
        <div
          className={`flex flex-col gap-6 ${userFavoriteRestaurants.length > 0 && "lg:grid lg:grid-cols-3 xl:grid-cols-4"}`}
        >
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                userFavoriteRestaurants={userFavoriteRestaurants}
                className="min-w-full max-w-full lg:min-w-full lg:max-w-full"
              />
            ))
          ) : (
            <h3 className="font-medium">
              Você ainda não marcou nenhum restaurante como favorito.
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoriteRestaurants;
