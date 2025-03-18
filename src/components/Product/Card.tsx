import { Card, CardContent, Typography, Button, CardMedia, Box } from '@mui/material';
import { useCart } from '../../contexts/CartContext';
import { useRouter } from 'next/router';
import { ProductCardProps } from '@/typedefs';

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} onClick={() => handleClick(product.id)}>
      <CardMedia
        component="img"
        height="140"
        image={product.thumbnail}
        alt={product.title}
        sx={{
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 160 }}>
        <Box>
          <Typography variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography color="text.secondary">Brand: {product.brand}</Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${product.price.toFixed(2)}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={(e) => {
            e.stopPropagation()
            addToCart(product)
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
