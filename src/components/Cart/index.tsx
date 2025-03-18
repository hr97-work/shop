import { Drawer, Box, Typography, IconButton, Button } from '@mui/material';
import { useCart } from '../../contexts/CartContext';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import { CartDrawerProps } from '@/typedefs';
import { useRouter } from 'next/router';

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { cart, emptyCart, removeItem, updateQuantity, getTotal, toggleDrawer } = useCart();
  const router = useRouter()

  const changeQuantity = (id: number, count: number) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, (item.quantity || 0) + count);
    }
  };

  const openProduct = (id: number) => {
    router.push(`/product/${id}`);
    toggleDrawer()
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={{ 
      '& .MuiDrawer-paperAnchorRight': {
        overflow: 'visible'
      }
     }}>
      <Box sx={{ width: 350, padding: 3 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Cart
        </Typography>
        {cart.length === 0 ? (
          <Typography variant="h6">Your cart is empty</Typography>
        ) : (
            <>
              <Box sx={{
                height: 'calc(100vh - 260px)',
                overflowY: 'auto',
              }}>
                {cart.map((item) => (
                  <Box
                    onClick={() => openProduct(item.id)}
                    key={item.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: 2,
                      padding: 1,
                      borderBottom: '1px solid #ddd',
                      cursor: 'pointer'
                    }}
                  >
                    <Box sx={{ marginRight: 2 }}>
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={50}
                        height={50}
                        objectFit='cover'
                        style={{borderRadius: '8px'}}
                      />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={(e) => {
                        e.stopPropagation()
                        changeQuantity(item.id, -1)
                      }} size="small">
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body2">{item.quantity}</Typography>
                      <IconButton onClick={(e) => {
                        e.stopPropagation()
                        changeQuantity(item.id, 1)
                      }} size="small">
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <IconButton onClick={(e) => {
                      e.stopPropagation()
                      removeItem(item.id)
                    }} size="small" sx={{ marginLeft: 2 }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Box>
                <Box sx={{ marginTop: 3, textAlign: 'right' }}>
                  <Typography variant="h6">Total: ${getTotal()}</Typography>
                </Box>
                <Box sx={{ marginTop: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Button variant="contained" color="primary" fullWidth>
                    Proceed to Checkout
                  </Button>
                  <Button onClick={emptyCart} variant="contained" color="error">
                    Empty Cart
                  </Button>
                </Box>
              </Box>
            </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
