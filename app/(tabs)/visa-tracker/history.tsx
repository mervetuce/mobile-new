import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CreditCard as Edit } from 'lucide-react-native';
import { useApplications } from '@/context/ApplicationContext';

export default function VisaHistoryScreen() {
  const { applications } = useApplications();
  const historyVisas = applications.filter(app => app.status !== 'active');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'expired':
        return '#ef4444';
      case 'pending':
        return '#f59e0b';
      default:
        return '#22c55e';
    }
  };

  const calculateUsage = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const usedDays = Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return { usedDays: Math.min(usedDays, totalDays), totalDays };
  };

  return (
    <ScrollView style={styles.container}>
      {historyVisas.map((visa) => {
        const { usedDays, totalDays } = calculateUsage(visa.submissionDate, visa.expiryDate);
        const progress = (usedDays / totalDays) * 100;

        return (
          <View key={visa.id} style={styles.visaCard}>
            <View style={styles.header}>
              <View>
                <Text style={styles.country}>{visa.country}</Text>
                <Text style={styles.visaType}>{visa.visaType}</Text>
                <Text style={styles.entryType}>Multiple Entry</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(visa.status) }
              ]}>
                <Text style={styles.statusText}>
                  {visa.status.charAt(0).toUpperCase() + visa.status.slice(1)}
                </Text>
              </View>
            </View>

            <View style={styles.validityContainer}>
              <Text style={styles.validityText}>
                Valid from {new Date(visa.submissionDate).toLocaleDateString()} to{' '}
                {new Date(visa.expiryDate).toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.usageContainer}>
              <View style={styles.usageHeader}>
                <Text style={styles.usageText}>
                  {usedDays} of {totalDays} days used
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${progress}%` }
                  ]} 
                />
              </View>
            </View>

            <TouchableOpacity style={styles.editButton}>
              <Edit size={20} color="#2563eb" />
              <Text style={styles.editText}>Update</Text>
            </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  visaType: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  entryType: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  validityContainer: {
    marginBottom: 16,
  },
  validityText: {
    fontSize: 14,
    color: '#666',
  },
  usageContainer: {
    gap: 8,
    marginBottom: 16,
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
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  editText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
});