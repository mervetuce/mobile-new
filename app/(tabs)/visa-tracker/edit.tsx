import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Check, Calendar } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useApplications } from '@/context/ApplicationContext';

interface FormErrors {
  dates?: string;
}

export default function EditVisaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { applications } = useApplications();
  const visa = applications.find(app => app.id === id);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDateField, setActiveDateField] = useState<'entryDate' | 'exitDate' | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState({
    entryDate: visa?.submissionDate ? new Date(visa.submissionDate) : new Date(),
    exitDate: visa?.expiryDate ? new Date(visa.expiryDate) : new Date(),
  });

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (formData.entryDate >= formData.exitDate) {
      newErrors.dates = 'Entry date must be before exit date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Here you would update the visa data in your context/backend
      setShowSuccess(true);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    
    if (selectedDate && activeDateField) {
      setFormData(prev => ({
        ...prev,
        [activeDateField]: selectedDate
      }));
      setErrors({});
    }
  };

  const showDatePickerFor = (field: 'entryDate' | 'exitDate') => {
    setActiveDateField(field);
    setShowDatePicker(true);
  };

  if (showSuccess) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Check size={48} color="#22c55e" />
        </View>
        <Text style={styles.successTitle}>Visa Updated Successfully!</Text>
        <Text style={styles.successText}>Your visa usage has been updated.</Text>
        <TouchableOpacity
          style={styles.viewVisasButton}
          onPress={() => router.push('/visa-tracker/active')}
        >
          <Text style={styles.viewVisasButtonText}>View Your Visas</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!visa) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Visa not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Back to Visa Selection</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Visa Usage</Text>
        <Text style={styles.subtitle}>Update your visa information</Text>
      </View>

      <View style={styles.visaSummary}>
        <Text style={styles.visaType}>{visa.visaType}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{visa.status}</Text>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Entry Date</Text>
          <TouchableOpacity
            style={[styles.dateInput, errors.dates && styles.inputError]}
            onPress={() => showDatePickerFor('entryDate')}
          >
            <Text>{formData.entryDate.toLocaleDateString()}</Text>
            <Calendar size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Exit Date</Text>
          <TouchableOpacity
            style={[styles.dateInput, errors.dates && styles.inputError]}
            onPress={() => showDatePickerFor('exitDate')}
          >
            <Text>{formData.exitDate.toLocaleDateString()}</Text>
            <Calendar size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {errors.dates && (
          <Text style={styles.errorText}>{errors.dates}</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Back to Visa Selection</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={activeDateField === 'entryDate' ? formData.entryDate : formData.exitDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
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
  visaSummary: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  visaType: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#22c55e',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  form: {
    padding: 20,
    gap: 20,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 4,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  viewVisasButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  viewVisasButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});