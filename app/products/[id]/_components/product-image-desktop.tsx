import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductImageDesktopProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductImageDesktop = ({ product }: ProductImageDesktopProps) => {
  return (
    <div className="hidden h-[500px] w-full lg:relative lg:block">
      <Image
        src={product.imageUrl}
        width={0}
        height={0}
        alt={product.name}
        sizes="100%"
        className="h-full w-full rounded-lg object-cover"
      />
    </div>
  );
};

export default ProductImageDesktop;
