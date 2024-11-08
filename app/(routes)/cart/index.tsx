import CartScreen from "@/screens/cart/cart.screen";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function index() {
  return (
    <StripeProvider>
      <CartScreen />
    </StripeProvider>
  );
}