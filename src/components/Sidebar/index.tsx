import { SidebarProps } from '@/typedefs';
import { Box, Slider, Switch, FormControlLabel, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const Sidebar = ({ onFiltersApply, filters, availablePriceRange }: SidebarProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handlePriceChange = (_event: Event, value: number | number[]) => {
    setLocalFilters({ ...localFilters, range: value });
  };

  const toggleWidthBrand = () => {
    setLocalFilters({ ...localFilters, withBrand: !filters.withBrand });
  };

  const applyFilters = () => {
    onFiltersApply(localFilters);
  };

  const clearFilters = () => {
    onFiltersApply({
      range: availablePriceRange,
      withBrand: false,
    })
  };

  useEffect(() => setLocalFilters(filters), [filters]);

  return (
    <Box sx={{ padding: 3, maxWidth: 250, height: 'auto', borderRadius: 2, position: 'fixed' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h6">
          Filters
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: 'pointer' }}
          onClick={clearFilters}
        >
          Reset Filters
        </Typography>
      </Box>

      <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
        Price Range
      </Typography>
      <Slider
        value={localFilters.range}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        max={availablePriceRange[1]}
        min={availablePriceRange[0]}
        valueLabelFormat={(value) => `$${value}`}
        sx={{
          marginBottom: 2,
          '& .MuiSlider-thumb': {
            backgroundColor: '#1976d2',
          },
          '& .MuiSlider-rail': {
            backgroundColor: '#e0e0e0',
          },
          '& .MuiSlider-track': {
            backgroundColor: '#1976d2',
          },
        }}
      />

      <FormControlLabel
        control={<Switch checked={localFilters.withBrand} onChange={toggleWidthBrand} />}
        label="With brand only"
        sx={{ marginBottom: 3 }}
      />
      <Button
        onClick={applyFilters}
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          padding: '10px 0',
          fontWeight: 'bold',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        }}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

export default Sidebar;
