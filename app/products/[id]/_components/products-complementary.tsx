import ProductList from "@/app/_components/product-list";
import { Prisma } from "@prisma/client";

interface ProductsComplementaryProps {
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductsComplementary = ({
  complementaryProducts,
}: ProductsComplementaryProps) => {
  return (
    <div>
      <h3 className="mb-3 px-5 font-semibold lg:px-0">Sucos</h3>
      <ProductList products={complementaryProducts} />
    </div>
  );
};

export default ProductsComplementary;
