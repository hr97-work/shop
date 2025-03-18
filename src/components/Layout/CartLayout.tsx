import CartIconButton from './CartIconButton';
import CartDrawer from '../Cart';
import { useCart } from '@/contexts/CartContext';

const CartLayout = () => {
  const { drawerOpen, toggleDrawer } = useCart();

  const handleDrawerOpen = () => {
    toggleDrawer(true);
  };

  const handleDrawerClose = () => {
    toggleDrawer(false);
  };

  return (
    <>
      <CartIconButton onClick={handleDrawerOpen} />
      <CartDrawer open={drawerOpen} onClose={handleDrawerClose} />
    </>
  );
};

export default CartLayout;
