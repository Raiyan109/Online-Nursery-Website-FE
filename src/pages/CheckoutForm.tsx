import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import '../styles/checkout.css'

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: "http://localhost:5173/success",
            },
        });

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };

    return (
        <div className='payment'>
            <form onSubmit={handleSubmit} id='payment-form'>
                <PaymentElement id='payment-element' />
                <button disabled={!stripe} className="px-6 py-2 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">Pay now</button>
            </form>
        </div>
    )
};

export default CheckoutForm;