import React, { useRef, useEffect } from "react";
import {useDispatch} from "react-redux";
// @Functions
import tryConvert from '../../utils/changeMoney'

export default function Paypal({total_price,total, onCreateAnOrder, order_list, note, authInfo, shipping_first_name, shipping_last_name, shipping_address, shipping_phone, shipToDifferentAddress}) {
  const paypal = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    window.paypal.Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Tell Me Payment",
                amount: {
                  currency_code: "USD",
                  value: total_price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          // Nếu thành công thì set payment_method = paypal, isPaid = true
          if(shipToDifferentAddress === true) {
            data = {
              order_list,
              total_price: parseInt(tryConvert(total_price, "USD", true)),
              total_quantity: total,
              shipping_phonenumber: shipping_phone,
              email: authInfo.email,
              shipping_address,
              note,
              status: -1,
              payment_method: "paypal",
              paid: true
            }
          }
          else{
            data = {
              order_list,
              total_price: parseInt(tryConvert(total_price, "USD", true)),
              total_quantity: total,
              shipping_phonenumber: authInfo.phonenumber,
              email: authInfo.email,
              shipping_address: authInfo.address,
              status: -1,
              payment_method: "paypal",
              note,
              paid: true
            }
          }
          onCreateAnOrder(data);
          const order = await actions.order.capture();
        },
        onError: (err) => {
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
