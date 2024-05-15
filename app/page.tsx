import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";
import Image from "next/image";
import SearchDesktop from "./_components/search-desktop";

const fetch = async () => {
  const getProducts = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
    take: 10,
  });

  const getBurguerCategory = await db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzasCategory = await db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burguerCategory, pizzasCategory] = await Promise.all([
    getProducts,
    getBurguerCategory,
    getPizzasCategory,
  ]);

  return { products, burguerCategory, pizzasCategory };
};

export default async function Home() {
  const { products, burguerCategory, pizzasCategory } = await fetch();

  return (
    <>
      <Header />
      <div className="hidden h-[500px] bg-primary lg:block">
        <div className="container flex h-full items-center justify-between">
          <div className="flex-1 text-white">
            <h2 className="text-5xl font-bold">Está com fome?</h2>
            <p className="text-lg">
              Com apenas alguns cliques, encontre refeições acessíveis perto de
              você.
            </p>
            <div className="mt-6">
              <SearchDesktop />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-end self-end">
            <div className="h-[300px] w-fit">
              <Image
                src="/img-home-desktop.png"
                alt="Prato de comida"
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-auto object-cover "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 pt-6 lg:hidden">
        <Search />
      </div>
      <div className="px-5 pt-6 lg:container lg:pt-10">
        <CategoryList />
      </div>

      <div className="px-5 pt-6 lg:hidden  lg:pt-10">
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <PromoBanner
            src="/promo-banner-01.png"
            alt="Até 30% de desconto em pizzas"
          />
        </Link>
      </div>

      <div className="space-y-4 pt-6 lg:container lg:pt-10">
        <div className="flex items-center justify-between px-5 lg:px-0">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="flex h-fit items-center justify-center p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6 lg:container lg:flex lg:gap-5 lg:pt-10">
        <Link
          href={`/categories/${pizzasCategory?.id}/products`}
          className="hidden lg:block lg:flex-1"
        >
          <PromoBanner
            src="/promo-banner-01.png"
            alt="Até 30% de desconto em pizzas"
          />
        </Link>
        <Link
          href={`/categories/${burguerCategory?.id}/products`}
          className="lg:flex-1"
        >
          <PromoBanner
            src="/promo-banner-02.png"
            alt="A partir de R$17,90 em lanches"
          />
        </Link>
      </div>

      <div className="space-y-4 py-6 lg:container lg:py-10">
        <div className="flex items-center justify-between px-5 lg:px-0">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant="ghost"
            className="flex h-fit items-center justify-center p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
}
