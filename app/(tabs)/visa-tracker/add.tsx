import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useApplications } from '@/context/ApplicationContext';
import { router } from 'expo-router';
import { Pencil } from 'lucide-react-native';

const VISA_TYPES = [
  'Tourist Visa',
  'Business Visa',
  'Student Visa',
  'Work Visa',
];

const ENTRY_TYPES = [
  'Single Entry',
  'Multiple Entry',
];

export default function AddVisaScreen() {
  const { addApplication } = useApplications();
  const [formData, setFormData] = useState({
    country: '',
    visaType: VISA_TYPES[0],
    entryType: ENTRY_TYPES[0],
    issueDate: '',
    expiryDate: '',
    visaNumber: '',
    daysLimit: '',
    notes: '',
  });

  const handleSubmit = () => {
    addApplication({
      ...formData,
      status: 'active',
      submissionDate: new Date().toISOString(),
      userId: '1', // Replace with actual user ID
    });
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Add New Visa</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push('/visa-tracker/edit')}
            accessibilityLabel="Edit Existing Visa"
          >
            <Pencil size={24} color="#2563eb" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Enter your visa details below</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.input}
            value={formData.country}
            onChangeText={(text) => setFormData({ ...formData, country: text })}
            placeholder="Enter country name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Visa Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.visaType}
              onValueChange={(value) => setFormData({ ...formData, visaType: value })}
              style={styles.picker}
            >
              {VISA_TYPES.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Entry Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.entryType}
              onValueChange={(value) => setFormData({ ...formData, entryType: value })}
              style={styles.picker}
            >
              {ENTRY_TYPES.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Issue Date</Text>
          <TextInput
            style={styles.input}
            value={formData.issueDate}
            onChangeText={(text) => setFormData({ ...formData, issueDate: text })}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            value={formData.expiryDate}
            onChangeText={(text) => setFormData({ ...formData, expiryDate: text })}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Visa Number</Text>
          <TextInput
            style={styles.input}
            value={formData.visaNumber}
            onChangeText={(text) => setFormData({ ...formData, visaNumber: text })}
            placeholder="Enter visa number"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Days Limit</Text>
          <TextInput
            style={styles.input}
            value={formData.daysLimit}
            onChangeText={(text) => setFormData({ ...formData, daysLimit: text })}
            placeholder="Enter days limit (e.g., 90)"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.notes}
            onChangeText={(text) => setFormData({ ...formData, notes: text })}
            placeholder="Add any additional notes"
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Visa</Text>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f9ff',
  },
  form: {
    padding: 16,
    gap: 20,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});