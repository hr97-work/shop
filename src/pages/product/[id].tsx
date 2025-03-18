import { GetServerSideProps } from 'next';
import { Box, Typography, Card, CardContent, CardMedia, Button, Rating, Divider, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ArrowBack, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { products } from '@/utils/mockData';
import { Product, ProductPageProps } from '@/typedefs';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { formatDate } from '@/utils/date';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CartLayout from '@/components/Layout/CartLayout';

const ProductPage = ({ product }: ProductPageProps) => {
  const { addToCart } = useCart();
  const router = useRouter();
  
  const [open, setOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  if (!product) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5">Product not found</Typography>
      </Box>
    );
  }

  const handleGoBack = () => {
    router.back();
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setOpen(true);  // Open the lightbox (full image view)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % product.images.length); // Infinite next
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length // Infinite previous
    );
  };

  const selectedImage = product.images[selectedImageIndex];

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handleGoBack}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: 0 }}>
          {product.title}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={product.thumbnail}
              alt={product.title}
              sx={{ objectFit: 'contain' }}
            />
            <CardContent>
              <Typography variant="h6">Price: ${product.price.toFixed(2)}</Typography>
              <Typography variant="body2" color="text.secondary">
                Brand: {product.brand || 'Unknown'}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" paragraph>
            {product.description}
          </Typography>

          <Typography variant="body1" paragraph>
            Rating: <Rating value={product.rating} readOnly />
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, width: '60%', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="text.secondary">
              Availability:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.availabilityStatus}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, width: '60%', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="text.secondary">
              Warranty Information:
            </Typography>
            <Typography variant="body2" color="text.secondary">
               {product.warrantyInformation}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, width: '60%', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="text.secondary">
              Shipping Information:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.shippingInformation}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, width: '60%', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="text.secondary">
              Return Policy:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.returnPolicy}
            </Typography>
          </Box>

          <Button onClick={() => addToCart(product)} variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Add to Cart
          </Button>
        </Box>
      </Box>

      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6" gutterBottom>
          Product Meta
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography variant="body2" color="text.secondary">
          <strong>Created At:</strong> {formatDate(product.meta.createdAt)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Updated At:</strong> {formatDate(product.meta.updatedAt)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Barcode:</strong> {product.meta.barcode}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>QR Code:</strong> <Image src={product.meta.qrCode} alt="QR Code" height={100} width={100} />
        </Typography>
      </Box>

      {product.reviews.length > 0 && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            Reviews
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          {product.reviews.map((review, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="body1">{review.reviewerName}</Typography>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2" color="text.secondary">
                {review.comment}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Reviewed on:</strong> {formatDate(review.date)}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {product.images.length > 0 && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            Additional Images
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 2 }}>
            {product.images.map((image, index) => (
              <Card key={index} sx={{ cursor: 'pointer' }} onClick={() => handleImageClick(index)}>
                <CardMedia component="img" height="200" image={image} alt={`Image ${index + 1}`} />
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {/* Full Image Dialog (Lightbox) */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          {selectedImage && (
            <Image src={selectedImage} alt="Full Image" height={500} width={500} layout="intrinsic" />
          )}

          {/* Arrows to navigate images */}
          <IconButton
            onClick={handlePreviousImage}
            sx={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
            }}
          >
            <ChevronLeft />
          </IconButton>

          <IconButton
            onClick={handleNextImage}
            sx={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
            }}
          >
            <ChevronRight />
          </IconButton>
        </DialogContent>
      </Dialog>
      <CartLayout />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;

  const mockProducts: Product[] = products;
  const product = mockProducts.find((product) => product.id === Number(id));

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
