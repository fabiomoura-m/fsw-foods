import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant.image";
import Image from "next/image";
import DeliveryInfo from "@/app/_components/delivery-info";
import { StarIcon } from "lucide-react";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-bannet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Header from "@/app/_components/header";
import RestaurantImageDesktop from "./_components/restaurant-image-desktop";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}
const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <>
      <div className="lg:border-b">
        <Header hasSearch={true} />
      </div>
      <div className="lg:hidden">
        <RestaurantImage
          restaurant={restaurant}
          userFavoriteRestaurants={userFavoriteRestaurants}
          session={session?.user.id}
        />
      </div>

      <div className="mt-[-1.5rem] flex lg:container lg:mt-10 lg:justify-between">
        <RestaurantImageDesktop
          restaurant={restaurant}
          userFavoriteRestaurants={userFavoriteRestaurants}
          userId={session?.user.id}
        />
        <div className="relative z-30 w-full rounded-tl-3xl rounded-tr-3xl bg-white px-5 pt-5 lg:mt-0 lg:min-w-[400px] lg:max-w-[560px] lg:basis-2/5 lg:px-0 lg:pl-8 lg:pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="relative h-8 w-8">
                <Image
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  fill
                  sizes="100%"
                  className="rounded-full object-cover"
                />
              </div>
              <h1 className="text-lg font-semibold">{restaurant.name}</h1>
            </div>
            <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
              <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold ">5.0</span>
            </div>
          </div>

          <DeliveryInfo restaurant={restaurant} />

          <div className="mt-3 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {restaurant.categories.map((category) => (
              <div
                key={category.id}
                className="min-w-[167px] rounded-lg bg-[#f4f4f4] text-center lg:w-full lg:min-w-[150px] "
              >
                <span className="text-xs text-muted-foreground">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 lg:container lg:mt-10">
        {/* TODO: mostrar produtos mais pedidos quando implementar realização de pedido*/}
        <h2 className="mb-4 px-5 font-semibold lg:px-0">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      <div className="mb-5 lg:container lg:mb-10 lg:mt-10">
        {restaurant.categories.map((category) => (
          <div className="mt-6" key={category.id}>
            <h2 className="mb-4 px-5 font-semibold lg:px-0">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}
      </div>

      <CartBanner restaurant={restaurant} />
    </>
  );
};

export default RestaurantPage;
