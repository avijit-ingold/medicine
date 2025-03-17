import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GenericApiContext } from "../../context/GenericApiContext";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './PaymentSuccesfull.module.css'

const SuccessPage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  const { orderId } = useParams();
  const context = useContext(GenericApiContext);

  const getOrderDetails = () => {
    const url = `order/details/${orderId}`;

    context.getGetData(url, 'orderDetails')
  }

  useEffect(() => {
    if (orderId) {
      getOrderDetails()
    }
  }, [orderId]);

  useEffect(() => {
    if (context.orderDetails) {
      setOrder(context.orderDetails.data)
    }
  }, [context.orderDetails])




  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4" style={{ marginTop: '110px' }}>
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 text-center max-w-lg w-full">
        <div className={styles.canavsContainer}>
          <div className={styles.canvas}>
            <DotLottieReact
              src="https://lottie.host/2c38031a-a8ef-4a99-813f-e192520bd60f/HZWvTTPhjv.lottie"
              loop
              autoplay
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mt-2">Thank you for your purchase.</p>

        {order ? (
          <div className="mt-6 text-left">
            <h3 className="text-lg font-semibold">Order Details:</h3>
            <p className="text-gray-700">Order ID: {order[0].id}</p>
            <ul className="mt-2 space-y-2">
              {order[0].item_details && order[0].item_details.map((item, index) => (
                <li key={index} className="flex justify-between text-gray-700">
                  <span>{item.product_name} (x{parseInt(item.qty)})</span>
                  <span>${(parseInt(item.price)).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 font-bold text-gray-900">
              Total: ${(parseInt(order[0].subtotal)).toFixed(2)}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">Loading order details...</p>
        )}

        <div className="mt-6 flex gap-4 justify-center">
          <button
            className={styles.redirectButton}
            onClick={() => navigate("/")}
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
