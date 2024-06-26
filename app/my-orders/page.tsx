import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import OrderItem from "./_components/order-item";

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <>
      <div className="lg:border-b">
        <Header hasSearch={true} />
      </div>
      <div className="px-5 py-6 lg:container lg:py-10">
        <h2 className="text-lg font-semibold">Meus pedidos</h2>

        <div className="space-y-3 pt-6">
          {orders.map((order) => (
            <OrderItem order={order} key={order.id} />
          ))}
        </div>

        {orders.length === 0 && <h3>Você ainda não fez nenhum pedido.</h3>}
      </div>
    </>
  );
};

export default MyOrdersPage;
