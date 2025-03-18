import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductCard from './Card';
import { Box, Button, Typography } from '@mui/material';
import { Product, ProductListProps, SortOrder } from '@/typedefs';

const ProductList = ({ products }: ProductListProps) => {
  const router = useRouter();
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);
  const [sortOrder, setSortOrder] = useState<SortOrder>({
    title: router.query.sortByTitle?.toString() as 'asc' | 'desc' || 'asc',
    price: router.query.sortByPrice?.toString() as 'asc' | 'desc' || 'asc'
  });

  const sortProducts = (field: 'title' | 'price', order: 'asc' | 'desc', products: Product[]) => {
    const sorted = [...products].sort((a, b) => {
      if (field === 'title') {
        return order === 'asc'
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      } else {
        return order === 'asc' ? a[field] - b[field] : b[field] - a[field];
      }
    });
    setSortedProducts(sorted);
  };


  useEffect(() => {
    const { sortByTitle, sortByPrice } = router.query;

    const titleOrder = (sortByTitle as 'asc' | 'desc') || 'asc';
    const priceOrder = (sortByPrice as 'asc' | 'desc') || 'asc';

    const initialSortOrder: SortOrder = {
      title: titleOrder,
      price: priceOrder,
    };

    setSortOrder(initialSortOrder);

    if (sortByTitle) {
      sortProducts('title', titleOrder, products);
    }
    if (sortByPrice) {
      sortProducts('price', priceOrder, products);
    }
    if (!sortByTitle && !sortByPrice) { 
      setSortedProducts(products);
    }
  }, [router.query, products]);

  const handleSortByTitle = () => {
    const newTitleOrder = sortOrder.title === 'asc' ? 'desc' : 'asc';
    setSortOrder((prev) => ({ ...prev, title: newTitleOrder }));

    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          sortByTitle: newTitleOrder,
          sortByPrice: router.query.sortByPrice || 'asc',
        },
      },
      undefined,
      { shallow: true }
    );

    sortProducts('title', newTitleOrder, sortedProducts);
  };

  const handleSortByPrice = () => {
    const newPriceOrder = sortOrder.price === 'asc' ? 'desc' : 'asc';
    setSortOrder((prev) => ({ ...prev, price: newPriceOrder }));

    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          sortByTitle: router.query.sortByTitle || 'asc',
          sortByPrice: newPriceOrder,
        },
      },
      undefined,
      { shallow: true }
    );

    sortProducts('price', newPriceOrder, sortedProducts);
  };

  return (
    <Box>
      <Box sx={{ position: 'fixed', backgroundColor: 'white', width: '100%', top: 0, zIndex: 1, padding: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Products
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Button onClick={handleSortByTitle}>Sort by Name ({sortOrder.title})</Button>
          <Button onClick={handleSortByPrice}>Sort by Price ({sortOrder.price})</Button>
        </Box>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, marginTop: '100px' }}>
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
};

export default ProductList;
