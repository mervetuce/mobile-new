import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MessageCircle, Phone, Mail } from 'lucide-react-native';

export default function SupportScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Customer Support</Text>
        <Text style={styles.headerSubtitle}>We're here to help with your visa needs</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Methods</Text>
        <View style={styles.contactMethods}>
          <View style={styles.contactMethod}>
            <Phone size={24} color="#000" />
            <Text style={styles.contactTitle}>Phone Support</Text>
            <Text style={styles.contactText}>+1 (555) 123-4567</Text>
            <Text style={styles.contactHours}>24/7 Support Available</Text>
          </View>
          <View style={styles.contactMethod}>
            <Mail size={24} color="#000" />
            <Text style={styles.contactTitle}>Email Support</Text>
            <Text style={styles.contactText}>support@visify.com</Text>
            <Text style={styles.contactHours}>Response within 24 hours</Text>
          </View>
          <View style={styles.contactMethod}>
            <MessageCircle size={24} color="#000" />
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactText}>Chat with an Agent</Text>
            <Text style={styles.contactHours}>Available 9AM - 6PM</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Send us a Message</Text>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput 
              style={styles.input}
              placeholder="Enter your name"
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Message</Text>
            <TextInput 
              style={[styles.input, styles.textArea]}
              placeholder="How can we help you?"
              multiline
              numberOfLines={4}
            />
          </View>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  contactMethods: {
    gap: 16,
  },
  contactMethod: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 16,
    color: '#2563eb',
    marginBottom: 4,
  },
  contactHours: {
    fontSize: 14,
    color: '#666',
  },
  form: {
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});