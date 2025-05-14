import { useEffect } from 'react';
import { usePackage } from '@/context/PackageContext';

// Import the existing CartScreen component
import CartScreen from '@/app/packages/cart';

export default function TabCartScreen() {
  const { setSelectedPackage } = usePackage();

  // Set a default package for demonstration
  useEffect(() => {
    setSelectedPackage({
      id: 'schengen-tourist',
      title: 'Schengen Tourist Package',
      description: 'Perfect for exploring multiple European countries',
      price: '$299',
      processingTime: '15 business days',
      features: [
        'Multiple entry visa',
        'Travel insurance included',
        'Hotel booking assistance',
        'Embassy appointment scheduling'
      ]
    });
  }, []);

  return <CartScreen />;
}