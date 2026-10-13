import { Link } from "react-router-dom";

const sampleOrders = [
  {
    id: "NIHA1001",
    date: "02 Sep 2026",
    status: "Delivered",
    total: 3499,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=500&q=80",
    product: "Classic Beige Blazer",
  },
  {
    id: "NIHA1002",
    date: "28 Aug 2026",
    status: "Shipped",
    total: 2899,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80",
    product: "Minimal Black Dress",
  },
];

function Orders() {
  let savedOrders = [];

  try {
    savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
  } catch {
    savedOrders = [];
  }

  const placedOrders = savedOrders.map((order) => ({
    ...order,
    status: order.status || "Processing",
    date: order.date
      ? new Date(order.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-",
  }));

  const allOrders = [...placedOrders.reverse(), ...sampleOrders];

  return (
    <section className="orders-section">
      <div className="container">
        <div className="section-heading text-center">
          <p className="section-eyebrow">MY ACCOUNT</p>
          <h1>My Orders</h1>
        </div>

        {allOrders.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-bag-x fs-1"></i>
            <h3 className="mt-3">No orders yet</h3>
            <p>Start shopping and your orders will appear here.</p>
            <Link to="/shop" className="btn NIHA-btn">
              Shop Now
            </Link>
          </div>
        ) : (
          allOrders.map((order) => {
            const firstItem = order.items?.[0];
            const productName = order.product || firstItem?.name || "NIHA Product";
            const productImage = order.image || firstItem?.image;
            const orderTotal = Number(order.total || 0);
            const quantity = order.items?.reduce(
              (sum, item) => sum + Number(item.quantity || 1),
              0
            );

            return (
              <div className="order-card" key={order.id}>
                <div className="order-header">
                  <div>
                    <small>ORDER ID</small>
                    <strong>{order.id}</strong>
                  </div>

                  <div>
                    <small>ORDER DATE</small>
                    <strong>{order.date}</strong>
                  </div>

                  <span
                    className={`order-status ${String(order.status).toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="order-body">
                  {productImage && (
                    <img src={productImage} alt={productName} />
                  )}

                  <div className="order-product">
                    <h5>{productName}</h5>

                    <p>
                      {quantity
                        ? `${quantity} item${quantity > 1 ? "s" : ""} in this order.`
                        : "Premium fashion product from NIHA."}
                    </p>

                    <strong>₹{orderTotal.toLocaleString("en-IN")}</strong>
                  </div>

                  <Link to="/shop" className="btn btn-outline-dark">
                    Buy Again
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default Orders;
