import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '@/contexts/CartContext';
import { CartIconButtonProps } from '@/typedefs';

const CartIconButton = ({ onClick }: CartIconButtonProps) => {
  const { getTotalQuantity, drawerOpen } = useCart();
  const totalQuantity = getTotalQuantity();

  return (
    !drawerOpen && <IconButton
      onClick={onClick}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1300,
        backgroundColor: 'primary.main',
        color: 'white',
        borderRadius: '50%',
        padding: 2,
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
      }}
    >
      <Badge
        badgeContent={totalQuantity}
        color="secondary"
        sx={{
          '& .MuiBadge-dot': {
            backgroundColor: 'white',
          },
        }}
      >
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default CartIconButton;
