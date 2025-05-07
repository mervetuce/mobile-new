import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Pencil } from 'lucide-react-native';
import { useApplications } from '@/context/ApplicationContext';

export default function ActiveVisasScreen() {
  const { applications } = useApplications();
  const activeVisas = applications.filter(app => app.status === 'active');

  const calculateDaysRemaining = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = Math.abs(expiry.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateProgress = (daysRemaining: number, totalDays: number) => {
    return ((totalDays - daysRemaining) / totalDays) * 100;
  };

  return (
    <ScrollView style={styles.container}>
      {activeVisas.map((visa) => {
        const daysRemaining = calculateDaysRemaining(visa.expiryDate);
        const progress = calculateProgress(daysRemaining, 90); // Assuming 90 days total

        return (
          <View key={visa.id} style={styles.visaCard}>
            <View style={styles.header}>
              <View>
                <Text style={styles.country}>{visa.country}</Text>
                <Text style={styles.visaType}>{visa.visaType}</Text>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push({
                  pathname: '/visa-tracker/edit',
                  params: { id: visa.id }
                })}
              >
                <Pencil size={20} color="#2563eb" />
              </TouchableOpacity>
            </View>

            <View style={[styles.statusBadge, 
              { backgroundColor: daysRemaining < 30 ? '#f59e0b' : '#22c55e' }
            ]}>
              <Text style={styles.statusText}>
                {daysRemaining < 30 ? 'Expiring Soon' : 'Active'}
              </Text>
            </View>

            <View style={styles.validityInfo}>
              <Text style={styles.label}>Valid Until</Text>
              <Text style={styles.date}>{new Date(visa.expiryDate).toLocaleDateString()}</Text>
            </View>

            <View style={styles.usageContainer}>
              <View style={styles.usageHeader}>
                <Text style={styles.usageText}>
                  {90 - daysRemaining} of 90 days used
                </Text>
                <Text style={styles.daysRemaining}>
                  {daysRemaining} days remaining
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${progress}%` },
                    progress > 75 ? styles.progressWarning : null
                  ]} 
                />
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  visaCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  country: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  visaType: {
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f9ff',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  validityInfo: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
  },
  usageContainer: {
    gap: 8,
  },
  usageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usageText: {
    fontSize: 14,
    color: '#666',
  },
  daysRemaining: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563eb',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  progressWarning: {
    backgroundColor: '#f59e0b',
  },
});