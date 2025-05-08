import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Clock, Globe, ArrowRight } from 'lucide-react-native';
import { usePackage } from '@/context/PackageContext';

export default function SummaryScreen() {
  const { selectedPackage } = usePackage();

  if (!selectedPackage) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No package selected</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Review Your Package</Text>
        <Text style={styles.subtitle}>Please confirm your visa package details</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{selectedPackage.title}</Text>
          <Text style={styles.description}>{selectedPackage.description}</Text>
          
          <View style={styles.processingTime}>
            <Clock size={16} color="#666" />
            <Text style={styles.processingTimeText}>
              Processing Time: {selectedPackage.processingTime}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Package Features</Text>
          <View style={styles.features}>
            {selectedPackage.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Globe size={14} color="#2563eb" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.price}>{selectedPackage.price}</Text>
        </View>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push('/packages/cart')}
        >
          <Text style={styles.continueButtonText}>Continue to Payment</Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  processingTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  processingTimeText: {
    fontSize: 14,
    color: '#666',
  },
  features: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
  },
  priceCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  continueButton: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 12,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
  },
});