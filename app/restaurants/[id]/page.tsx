import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant.image";
import Image from "next/image";
import DeliveryInfo from "@/app/_components/delivery-info";
import { StarIcon } from "lucide-react";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-bannet";

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
  return (
    <>
      <RestaurantImage restaurant={restaurant} />

      <div className="relative z-30 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white px-5 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="relative h-8 w-8">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
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

        <div className="mt-3 flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {restaurant.categories.map((category) => (
            <div
              key={category.id}
              className="min-w-[167px] rounded-lg bg-[#f4f4f4] text-center "
            >
              <span className="text-xs text-muted-foreground">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {/* TODO: mostrar produtos mais pedidos quando implementar realização de pedido*/}
        <h2 className="mb-4 px-5 font-semibold">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      <div className="mb-5">
        {restaurant.categories.map((category) => (
          <div className="mt-6" key={category.id}>
            <h2 className="mb-4 px-5 font-semibold">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}
      </div>

      <CartBanner restaurant={restaurant} />
    </>
  );
};

export default RestaurantPage;
