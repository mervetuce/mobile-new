import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { CreditCard, Calendar, Lock } from 'lucide-react-native';
import { usePackage } from '@/context/PackageContext';

export default function CartScreen() {
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
        <Text style={styles.title}>Payment Details</Text>
        <Text style={styles.subtitle}>Complete your visa package purchase</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.packageSummary}>
          <Text style={styles.packageTitle}>{selectedPackage.title}</Text>
          <Text style={styles.packagePrice}>{selectedPackage.price}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Information</Text>
          <View style={styles.cardContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Number</Text>
              <View style={styles.inputContainer}>
                <CreditCard size={20} color="#666" />
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.flex1]}>
                <Text style={styles.label}>Expiry Date</Text>
                <View style={styles.inputContainer}>
                  <Calendar size={20} color="#666" />
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, styles.flex1]}>
                <Text style={styles.label}>CVV</Text>
                <View style={styles.inputContainer}>
                  <Lock size={20} color="#666" />
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Billing Information</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name on Card</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter cardholder name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Billing Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter street address"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter city"
              />
            </View>

            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>Postal Code</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter postal code"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.payButton}
          onPress={() => router.push('/packages/payment-status')}
        >
          <Text style={styles.payButtonText}>Pay {selectedPackage.price}</Text>
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
  packageSummary: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  packagePrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2563eb',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  cardContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 48,
    marginLeft: 8,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  flex1: {
    flex: 1,
  },
  payButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  payButtonText: {
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