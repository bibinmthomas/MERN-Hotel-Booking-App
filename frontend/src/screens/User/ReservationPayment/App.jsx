import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./App.css";
import { useSelector } from "react-redux";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51Mh9aoSDG98Dc7SRw8NdezQknxXYlpU0Y3VNkOIpcWxrs6JzygIgqVXs4d8aTXvG6zkLe0iatFrg1fdWzbhcsxHa0071TDoPZy"
);

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const reservationData = useSelector((state) => state.reservationCreate);
  const { reservationInfo } = reservationData;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalPrice: reservationInfo.totalPrice,
        _id: reservationInfo._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [reservationInfo.totalPrice]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
