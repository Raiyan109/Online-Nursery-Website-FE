import { ElementsConsumer } from '@stripe/react-stripe-js';
import CheckoutForm from '../pages/CheckoutForm';

const InjectCheck = () => {
    return (
        <div>
            <ElementsConsumer>
                {({ stripe, elements }) => (
                    <CheckoutForm stripe={stripe} elements={elements} />
                )}
            </ElementsConsumer>
        </div>
    );
};

export default InjectCheck;