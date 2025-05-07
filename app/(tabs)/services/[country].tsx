import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Briefcase, Plane, GraduationCap, Building2 } from 'lucide-react-native';

const visaTypes = {
  us: [
    {
      id: 'us-b1',
      type: 'business',
      title: 'Business Visa (B-1)',
      description: 'For business meetings, conferences, or corporate events',
      icon: Briefcase,
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    },
    {
      id: 'us-b2',
      type: 'tourist',
      title: 'Tourist Visa (B-2)',
      description: 'For tourism, vacation, and visiting family',
      icon: Plane,
      image: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg',
    },
    {
      id: 'us-f1',
      type: 'student',
      title: 'Student Visa (F-1)',
      description: 'For academic studies at US institutions',
      icon: GraduationCap,
      image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
    },
    {
      id: 'us-h1b',
      type: 'work',
      title: 'Work Visa (H-1B)',
      description: 'For specialized occupation employment',
      icon: Building2,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    },
  ],
  ca: [
    {
      id: 'us-b1',
      type: 'business',
      title: 'Business Visa',
      description: 'For business meetings and corporate events',
      icon: Briefcase,
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    },
    {
      id: 'us-b2',
      type: 'tourist',
      title: 'Tourist Visa',
      description: 'For leisure travelers planning holidays or visiting friends',
      icon: Plane,
      image: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg',
    },
        {
      id: 'us-f1',
      type: 'student',
      title: 'Student Visa',
      description: 'For students pursuing education at foreign institutions',
      icon: GraduationCap,
      image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
    },
    {
      id: 'us-h1b',
      type: 'work',
      title: 'Work Visa',
      description: 'For professionals with job offers or employment opportunities',
      icon: Building2,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    },
  ],
  // Add similar visa types for other countries
};

const countryNames = {
  us: 'United States',
  uk: 'United Kingdom',
  ca: 'Canada',
  de: 'Germany',
  fr: 'France',
  it: 'Italy',
  es: 'Spain',
  gr: 'Greece',
  nl: 'Netherlands',
  au: 'Australia',
  jp: 'Japan',
  sg: 'Singapore',
};

export default function CountryVisaScreen() {
  const { country } = useLocalSearchParams<{ country: string }>();
  const countryVisas = visaTypes[country] || visaTypes.us; // Fallback to US visas
  const countryName = countryNames[country] || 'Unknown Country';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Visa Packages for {countryName}</Text>
        <Text style={styles.subtitle}>Explore our tailored visa packages for your journey</Text>
      </View>

      <View style={styles.visaList}>
        {countryVisas.map((visa) => {
          const Icon = visa.icon;
          return (
            <TouchableOpacity
              key={visa.id}
              style={styles.visaCard}
              onPress={() => router.push(`/services/details/${visa.id}`)}
            >
              <Image source={{ uri: visa.image }} style={styles.visaImage} />
              <View style={styles.visaContent}>
                <View style={styles.visaIcon}>
                  <Icon size={24} color="#2563eb" />
                </View>
                <View style={styles.visaInfo}>
                  <Text style={styles.visaTitle}>{visa.title}</Text>
                  <Text style={styles.visaDescription}>{visa.description}</Text>
                  <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => router.push(`/services/details/${visa.id}`)}
                  >
                    <Text style={styles.detailsButtonText}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
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
  visaList: {
    padding: 16,
    gap: 16,
  },
  visaCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  visaImage: {
    width: '100%',
    height: 160,
  },
  visaContent: {
    padding: 20,
    flexDirection: 'row',
    gap: 16,
  },
  visaIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  visaInfo: {
    flex: 1,
  },
  visaTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  visaDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  detailsButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});