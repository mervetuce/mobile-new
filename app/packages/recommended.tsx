import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, Star, Clock, Globe } from 'lucide-react-native';
import { usePackage } from '@/context/PackageContext';

const recommendedPackages = [
  {
    id: 'schengen-tourist',
    title: 'Schengen Tourist Package',
    description: 'Perfect for exploring multiple European countries',
    price: '$299',
    processingTime: '15 business days',
    rating: 4.8,
    reviews: 245,
    image: 'https://images.pexels.com/photos/3010067/pexels-photo-3010067.jpeg',
    features: [
      'Multiple entry visa',
      'Travel insurance included',
      'Hotel booking assistance',
      'Embassy appointment scheduling'
    ]
  },
  {
    id: 'uk-student',
    title: 'UK Student Special',
    description: 'Comprehensive package for international students',
    price: '$249',
    processingTime: '20 business days',
    rating: 4.7,
    reviews: 189,
    image: 'https://images.pexels.com/photos/2228561/pexels-photo-2228561.jpeg',
    features: [
      'Priority processing',
      'Document verification',
      'Accommodation support',
      'Bank statement guidance'
    ]
  },
  {
    id: 'canada-work',
    title: 'Canada Work Permit',
    description: 'Fast-track your Canadian work visa application',
    price: '$399',
    processingTime: '25 business days',
    rating: 4.9,
    reviews: 312,
    image: 'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg',
    features: [
      'LMIA assistance',
      'Job verification support',
      'Settlement guidance',
      'Document translation'
    ]
  }
];

export default function RecommendedPackagesScreen() {
  const { setSelectedPackage } = usePackage();

  const handlePackageSelect = (pkg: typeof recommendedPackages[0]) => {
    setSelectedPackage(pkg);
    router.push('/packages/summary');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recommended for You</Text>
        <Text style={styles.subtitle}>
          Curated visa packages based on your profile and travel history
        </Text>
      </View>

      <View style={styles.packagesContainer}>
        {recommendedPackages.map((pkg) => (
          <TouchableOpacity
            key={pkg.id}
            style={styles.packageCard}
            onPress={() => handlePackageSelect(pkg)}
          >
            <Image source={{ uri: pkg.image }} style={styles.packageImage} />
            
            <View style={styles.packageContent}>
              <View style={styles.packageHeader}>
                <Text style={styles.packageTitle}>{pkg.title}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.ratingText}>{pkg.rating}</Text>
                  <Text style={styles.reviewCount}>({pkg.reviews})</Text>
                </View>
              </View>

              <Text style={styles.packageDescription}>{pkg.description}</Text>

              <View style={styles.processingTime}>
                <Clock size={16} color="#666" />
                <Text style={styles.processingTimeText}>{pkg.processingTime}</Text>
              </View>

              <View style={styles.features}>
                {pkg.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Globe size={14} color="#2563eb" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.packageFooter}>
                <Text style={styles.packagePrice}>{pkg.price}</Text>
                <TouchableOpacity 
                  style={styles.detailsButton}
                  onPress={() => handlePackageSelect(pkg)}
                >
                  <Text style={styles.detailsButtonText}>View Details</Text>
                  <ArrowRight size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    lineHeight: 24,
  },
  packagesContainer: {
    padding: 16,
    gap: 16,
  },
  packageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  packageImage: {
    width: '100%',
    height: 200,
  },
  packageContent: {
    padding: 16,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  packageDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  processingTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  processingTimeText: {
    fontSize: 14,
    color: '#666',
  },
  features: {
    gap: 8,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
  },
  packageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  packagePrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2563eb',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});