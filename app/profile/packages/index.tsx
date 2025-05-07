import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Flag, Calendar } from 'lucide-react-native';

const visaPackages = [
  {
    id: '1',
    country: 'France',
    flag: 'https://flagcdn.com/w80/fr.png',
    type: 'Tourist Visa',
    status: 'active',
    description: 'Standard tourist visa for short stays',
    features: ['Travel itinerary planning', 'Hotel booking assistance', 'Travel insurance'],
    purchaseDate: '2024-01-15',
    expiryDate: '2024-07-15',
  },
  {
    id: '2',
    country: 'United States',
    flag: 'https://flagcdn.com/w80/us.png',
    type: 'Business Visa',
    status: 'processing',
    description: 'B1/B2 visa for business and tourism',
    features: ['Business meeting scheduling', 'Document preparation', 'Embassy assistance'],
    purchaseDate: '2024-02-01',
    expiryDate: '2024-08-01',
  },
  {
    id: '3',
    country: 'Japan',
    flag: 'https://flagcdn.com/w80/jp.png',
    type: 'Tourist Visa',
    status: 'expiring',
    description: 'Short-term stay visa for tourism',
    features: ['Local guide assistance', 'Transportation booking', 'Accommodation support'],
    purchaseDate: '2023-09-15',
    expiryDate: '2024-03-15',
  },
  {
    id: '4',
    country: 'Canada',
    flag: 'https://flagcdn.com/w80/ca.png',
    type: 'Work Visa',
    status: 'expired',
    description: 'Temporary work permit visa',
    features: ['Job search assistance', 'Document verification', 'Settlement support'],
    purchaseDate: '2023-06-01',
    expiryDate: '2024-01-01',
  },
];

type FilterStatus = 'all' | 'active' | 'processing' | 'expiring' | 'expired';

export default function PackagesScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#22c55e';
      case 'processing':
        return '#3b82f6';
      case 'expiring':
        return '#f59e0b';
      case 'expired':
        return '#6b7280';
      default:
        return '#22c55e';
    }
  };

  const filterPackages = (packages: typeof visaPackages) => {
    if (activeFilter === 'all') return packages;
    return packages.filter(pkg => pkg.status === activeFilter);
  };

  const filters: { label: string; value: FilterStatus }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Processing', value: 'processing' },
    { label: 'Expiring', value: 'expiring' },
    { label: 'Expired', value: 'expired' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Packages</Text>
        <Text style={styles.subtitle}>View and manage your visa packages</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.value}
            style={[
              styles.filterButton,
              activeFilter === filter.value && styles.filterButtonActive
            ]}
            onPress={() => setActiveFilter(filter.value)}
          >
            <Text 
              style={[
                styles.filterText,
                activeFilter === filter.value && styles.filterTextActive
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        {filterPackages(visaPackages).map((pkg) => (
          <View key={pkg.id} style={styles.packageCard}>
            <View style={styles.cardHeader}>
              <View style={styles.countryInfo}>
                <Image source={{ uri: pkg.flag }} style={styles.flag} />
                <View>
                  <Text style={styles.country}>{pkg.country}</Text>
                  <Text style={styles.visaType}>{pkg.type}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(pkg.status) }]}>
                <Text style={styles.statusText}>
                  {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                </Text>
              </View>
            </View>

            <Text style={styles.description}>{pkg.description}</Text>

            <View style={styles.features}>
              {pkg.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Flag size={16} color="#666" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <View style={styles.dates}>
              <View style={styles.dateItem}>
                <Calendar size={16} color="#666" />
                <Text style={styles.dateLabel}>Purchased: </Text>
                <Text style={styles.dateText}>{pkg.purchaseDate}</Text>
              </View>
              <View style={styles.dateItem}>
                <Calendar size={16} color="#666" />
                <Text style={styles.dateLabel}>Expires: </Text>
                <Text style={styles.dateText}>{pkg.expiryDate}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.detailsButton}
              activeOpacity={0.8}
              onPress={() =>
                router.push(`/profile/packages/details/${pkg.type.toLowerCase().replace(/\s+/g, '-')}`)
              }
            >
              <Text style={styles.detailsButtonText}>View Details →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666' },
  filtersContainer: {
    maxHeight: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 8,
    height: 40,
    alignItems: 'center',
  },
  filterButton: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#1f1f1f',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  filterTextActive: {
    color: '#fff',
  },
  content: { flex: 1, padding: 16 },
  packageCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  countryInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  flag: { width: 32, height: 20, borderRadius: 4 },
  country: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  visaType: { fontSize: 14, color: '#666' },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: 12 },
  statusText: { color: '#fff', fontSize: 12, fontWeight: '500' },
  description: { fontSize: 14, color: '#666', marginBottom: 16, lineHeight: 20 },
  features: { gap: 8, marginBottom: 16 },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureText: { fontSize: 14, color: '#666' },
  dates: { gap: 8, marginBottom: 16 },
  dateItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dateLabel: { fontSize: 14, color: '#666' },
  dateText: { fontSize: 14, fontWeight: '500' },
  detailsButton: {
    backgroundColor: '#111',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  detailsButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});