import { useState, useEffect, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { products } from '../utils/mockData';
import ProductList from '../components/Product/List';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';
import CartLayout from '@/components/Layout/CartLayout';
import { GetServerSideProps } from 'next';
import { FilterApplyProps, Product, QueryFilters } from '@/typedefs';

const Home = ({ mockProducts, filters }: { mockProducts: Product[], filters: QueryFilters }) => {
  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [range, setRange] = useState<number[]>(filters.priceRange?.toString().split(',').map(Number) || [0, 10000]);
  const [withBrand, setWithBrand] = useState(filters.brand === 'true');

  const availablePriceRange = () => {
    let minPrice = Infinity;
    let maxPrice = -Infinity;

    mockProducts.forEach((product) => {
      if (product.price < minPrice) minPrice = product.price;
      if (product.price > maxPrice) maxPrice = product.price;
    });

    return [minPrice, maxPrice];
  };

  const applyFilters = ({ range, withBrand }: FilterApplyProps) => {
    if (typeof range === 'number') return;

    setFilteredProducts(() => {
      return mockProducts.filter(
        (product) =>
          product.price >= range[0] &&
          product.price <= range[1] &&
          (withBrand ? !!product.brand : true)
      );
    });
  };

  useEffect(() => {
    const { priceRange, brand } = router.query;

    const priceRangeParsed = priceRange
      ? priceRange.toString().split(',').map(Number)
      : [0, 10000];
    setRange(priceRangeParsed);

    const withBrandParsed = brand === 'true';
    setWithBrand(withBrandParsed);

    applyFilters({ range: priceRangeParsed, withBrand: withBrandParsed });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, mockProducts]);
  
  const updateFiltersInUrl = (newRange: number[], newWithBrand: boolean) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          priceRange: newRange.join(','),
          brand: newWithBrand.toString(),
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleApplyFilters = ({ range, withBrand }: FilterApplyProps) => {
    setRange(range as SetStateAction<number[]>);
    setWithBrand(withBrand);
    updateFiltersInUrl(range as number[], withBrand);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Sidebar
          filters={{ range, withBrand }}
          availablePriceRange={availablePriceRange()}
          onFiltersApply={handleApplyFilters}
        />
        <Box sx={{ flexGrow: 1, marginLeft: '300px' }}>
          <ProductList products={filteredProducts} />
        </Box>
      </Box>
      <CartLayout />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ mockProducts: Product[] }> = async (params) => {
  const mockProducts: Product[] = products;

  if (!products.length) {
    return { notFound: true };
  }

  return {
    props: {
      mockProducts,
      filters: params.query,
    },
  };
};

export default Home;
