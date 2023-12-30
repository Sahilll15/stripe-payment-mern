import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { loadStripe } from "@stripe/stripe-js";


const REACT_STRIPE_PUBLISHABLE_KEY = "your stripe publishable keys"

const StripePayment = () => {
    const [product, setProduct] = useState({
        name: "learn stripe payment",
        price: 1000,
        productOwner: "sahil chalke",
        description: "This was just for learning purpose",
        quantity: 1,
    });

    const makePayment = async () => {
        const stripe = await loadStripe(REACT_STRIPE_PUBLISHABLE_KEY);
        const body = { product };
        const headers = {
            "Content-Type": "application/json",
        };

        const response = await fetch(
            "http://localhost:4000/api/create-payment-session",
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            }
        );

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.log(result.error);
        }
    };

    return (
        <Card style={{ width: "20rem" }}>
            <Card.Img
                variant="top" src="https://images.pexels.com/photos/12428359/pexels-photo-12428359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary" onClick={makePayment}>
                    Buy Now for {product.price}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default StripePayment
