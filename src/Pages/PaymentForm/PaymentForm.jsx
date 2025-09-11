import {
  CardCvcElement,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams()
  console.log(id);

    // Fetch parcel by ID
  const { data: parcel, isLoading, isError } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/get_parcel/${id}`
      );
      return res.data;
    },
    enabled: !!id,
  });
  console.log(parcel);
  const parcelPrice = parcel?.price;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

        const { data } = await axios.post(
        "http://localhost:3000/api/create-payment-intent",
        { parcelId: parcel.trackingId, amount: parcel.price }
      );

      const clientSecret = data.clientSecret;
       const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: parcel?.senderName,
            email: parcel?.userEmail,
          },
        },
      });

      if (result.error) {
        console.log(result.error.message);
      } else {
        console.log("Payment successful");
        console.log(result.paymentIntent);
      }



  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        "::placeholder": {
          color: "#a0aec0",
        },
        padding: "10px 12px",
      },
      invalid: {
        color: "#e53e3e",
        iconColor: "#e53e3e",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
        <div className="p-4 border rounded-lg bg-gray-50">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } transition`}
        >Pay ৳{parcelPrice}</button>
      </form>
    </div>
  );
};

export default PaymentForm;
