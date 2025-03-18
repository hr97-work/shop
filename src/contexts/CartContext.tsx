import { CartContextType, Product } from '@/typedefs';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen((isOpen) => !isOpen)

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      
      if (existingProduct) {
        const cartState = prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
        );

        localStorage.setItem('cart', JSON.stringify(cartState));

        return cartState;
      }

      const cartState = [...prevCart, { ...product, quantity: 1 }]

      localStorage.setItem('cart', JSON.stringify(cartState));

      return cartState;
    });
  };

  const removeItem = (id: number) => {
    setCart(prevCart => {
      const cartState = prevCart.filter(item => item.id !== id);

      localStorage.setItem('cart', JSON.stringify(cartState));

      return cartState;
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) => {
      const cartState = prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )

      localStorage.setItem('cart', JSON.stringify(cartState));

      return cartState;
    });
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0).toFixed(2);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total) => total + 1, 0);
  };

  const emptyCart = () => {
    localStorage.removeItem('cart');
    setCart([] as Product[]);
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      const cart = localStorage.getItem('cart');
      if (cart) {
        setCart(JSON.parse(cart));
      }
    }
  }, [])

  const contextValue = {
    cart,
    addToCart,
    removeItem,
    getTotal,
    updateQuantity,
    getTotalQuantity,
    drawerOpen,
    toggleDrawer,
    emptyCart
  }
  
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
