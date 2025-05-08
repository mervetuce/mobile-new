import { createContext, useContext, useState, ReactNode } from 'react';

interface Package {
  id: string;
  title: string;
  description: string;
  price: string;
  processingTime: string;
  features: string[];
}

interface PackageContextType {
  selectedPackage: Package | null;
  setSelectedPackage: (pkg: Package | null) => void;
}

const PackageContext = createContext<PackageContextType | undefined>(undefined);

export function PackageProvider({ children }: { children: ReactNode }) {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  return (
    <PackageContext.Provider value={{ selectedPackage, setSelectedPackage }}>
      {children}
    </PackageContext.Provider>
  );
}

export function usePackage() {
  const context = useContext(PackageContext);
  if (context === undefined) {
    throw new Error('usePackage must be used within a PackageProvider');
  }
  return context;
}