import { db } from "@/app/_lib/prisma";

import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";

import ProductDetails from "./_components/product-details";
import ProductImageDesktop from "./_components/product-image-desktop";
import Header from "@/app/_components/header";
import ProductsComplementary from "./_components/products-complementary";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <div className="hidden lg:block lg:border-b">
        <Header hasSearch={true} />
      </div>
      <div className="lg:container lg:flex lg:py-10">
        <div className="lg:hidden">
          <ProductImage product={product} />
        </div>
        <div className="hidden lg:block lg:basis-2/4">
          <ProductImageDesktop product={product} />
        </div>
        <div className="lg:basis-2/4">
          <ProductDetails product={product} complementaryProducts={juices} />
        </div>
      </div>
      <div className="mb-10 hidden lg:container lg:block">
        <ProductsComplementary complementaryProducts={juices} />
      </div>
    </>
  );
};

export default ProductPage;
