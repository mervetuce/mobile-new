import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { CreditCard, Calendar, Lock } from 'lucide-react-native';
import { usePackage } from '@/context/PackageContext';

export default function CartScreen() {
  const { selectedPackage } = usePackage();

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryError, setExpiryError] = useState('');
  const [cvvError, setCvvError] = useState('');

  const handlePayment = () => {
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      Alert.alert('Invalid Card Number', 'Card number must be 16 digits');
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      Alert.alert('Invalid Expiry Date', 'Format should be MM/YY');
      return;
    }
    if (cvv.length !== 3) {
      Alert.alert('Invalid CVV', 'CVV must be 3 digits');
      return;
    }
    if (cardName.trim().length < 3) {
      Alert.alert('Invalid Name', 'Name on card is too short');
      return;
    }
    if (!address.trim() || !city.trim() || !postalCode.trim()) {
      Alert.alert('Incomplete Info', 'Please fill out all billing details');
      return;
    }
    router.push('/packages/payment-status');
  };

  if (!selectedPackage) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No package selected</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
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
                  value={cardNumber}
                  onChangeText={(text) => {
                    const digits = text.replace(/\D/g, '').slice(0, 16);
                    const formatted = digits.replace(/(.{4})/g, '$1 ').trim();
                    setCardNumber(formatted);
                    setCardNumberError(digits.length !== 16 ? 'Card number must be 16 digits' : '');
                  }}
                  onBlur={() => {
                    if (cardNumber.replace(/\s/g, '').length !== 16) {
                      setCardNumberError('Card number must be 16 digits');
                    }
                  }}
                />
              </View>
              {cardNumberError ? <Text style={styles.errorMsg}>{cardNumberError}</Text> : null}
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
                    value={expiryDate}
                    onChangeText={(text) => {
                      const digits = text.replace(/\D/g, '').slice(0, 4);
                      let formatted = digits;
                      if (digits.length > 2) {
                        formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
                      }
                      setExpiryDate(formatted);
                      const match = formatted.match(/^(\d{2})\/(\d{2})$/);
                      if (!match) {
                        setExpiryError('Format must be MM/YY');
                        return;
                      }
                      const inputMonth = parseInt(match[1], 10);
                      const inputYear = parseInt(match[2], 10);
                      const currentDate = new Date();
                      const currentMonth = currentDate.getMonth() + 1;
                      const currentYear = currentDate.getFullYear() % 100;
                      if (inputMonth < 1 || inputMonth > 12) {
                        setExpiryError('Invalid month');
                      } else if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
                        setExpiryError('Card is expired');
                      } else {
                        setExpiryError('');
                      }
                    }}
                    onBlur={() => {
                      const [month, year] = expiryDate.split('/');
                      if (!month || !year) {
                        setExpiryError('Format must be MM/YY');
                        return;
                      }
                      const inputMonth = parseInt(month, 10);
                      const inputYear = parseInt(year, 10);
                      const currentDate = new Date();
                      const currentMonth = currentDate.getMonth() + 1;
                      const currentYear = currentDate.getFullYear() % 100;
                      if (isNaN(inputMonth) || inputMonth < 1 || inputMonth > 12) {
                        setExpiryError('Invalid month');
                      } else if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
                        setExpiryError('Card is expired');
                      } else {
                        setExpiryError('');
                      }
                    }}
                  />
                </View>
                {expiryError ? <Text style={styles.errorMsg}>{expiryError}</Text> : null}
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
                    value={cvv}
                    onChangeText={(text) => {
                      const digits = text.replace(/\D/g, '').slice(0, 3);
                      setCvv(digits);
                      setCvvError(digits.length !== 3 ? 'CVV must be 3 digits' : '');
                    }}
                    onBlur={() => {
                      if (cvv.length !== 3) {
                        setCvvError('CVV must be 3 digits');
                      }
                    }}
                  />
                </View>
                {cvvError ? <Text style={styles.errorMsg}>{cvvError}</Text> : null}
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
              value={cardName}
              onChangeText={setCardName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Billing Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter street address"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter city"
                value={city}
                onChangeText={setCity}
              />
            </View>

            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>Postal Code</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter postal code"
                keyboardType="numeric"
                value={postalCode}
                onChangeText={setPostalCode}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
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
    gap: 4,
    marginBottom: 8,
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
  errorMsg: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
    marginLeft: 4,
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
