import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Check, Download, Package } from 'lucide-react-native';
import { usePackage } from '@/context/PackageContext';
import { useEffect } from 'react';

export default function PaymentStatusScreen() {
  const { selectedPackage } = usePackage();

  useEffect(() => {
    if (!selectedPackage) {
      router.replace('/');
    }
  }, [selectedPackage]);

  if (!selectedPackage) {
    return null;
  }

  const referenceNumber = `VIS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Check size={48} color="#22c55e" />
        </View>

        <Text style={styles.title}>Payment Successful</Text>
        <Text style={styles.subtitle}>Your visa package has been purchased successfully</Text>

        <View style={styles.packageInfo}>
          <Text style={styles.packageName}>{selectedPackage.title}</Text>
          <Text style={styles.packagePrice}>{selectedPackage.price}</Text>
        </View>

        <View style={styles.referenceContainer}>
          <Text style={styles.referenceLabel}>Reference Number</Text>
          <Text style={styles.referenceNumber}>{referenceNumber}</Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.downloadButton} onPress={() => {}}>
            <Download size={20} color="#2563eb" />
            <Text style={styles.downloadButtonText}>Download Receipt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.downloadButton} onPress={() => {}}>
            <Download size={20} color="#2563eb" />
            <Text style={styles.downloadButtonText}>Download Documentation</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.packagesButton}
          onPress={() => router.push('/profile/packages')}
        >
          <Package size={20} color="#fff" />
          <Text style={styles.packagesButtonText}>Go to My Packages</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  packageInfo: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 24,
  },
  packageName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  packagePrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  referenceContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  referenceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  referenceNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  buttonGroup: {
    gap: 12,
    width: '100%',
    marginBottom: 24,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2563eb',
  },
  packagesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  packagesButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
});