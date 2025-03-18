import CartIconButton from './CartIconButton';
import CartDrawer from '../Cart';
import { useCart } from '@/contexts/CartContext';

const CartLayout = () => {
  const { drawerOpen, toggleDrawer } = useCart();

  return (
    <>
      <CartIconButton onClick={toggleDrawer} />
      <CartDrawer open={drawerOpen} onClose={toggleDrawer} />
    </>
  );
};

export default CartLayout;
