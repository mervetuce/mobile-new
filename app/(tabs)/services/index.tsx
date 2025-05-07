import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { Search } from 'lucide-react-native';

const countries = [
  { id: 'us', name: 'United States', code: 'US' },
  { id: 'gb', name: 'United Kingdom', code: 'GB' },
  { id: 'ca', name: 'Canada', code: 'CA' },
  { id: 'de', name: 'Germany', code: 'DE' },
  { id: 'fr', name: 'France', code: 'FR' },
  { id: 'it', name: 'Italy', code: 'IT' },
  { id: 'es', name: 'Spain', code: 'ES' },
  { id: 'gr', name: 'Greece', code: 'GR' },
  { id: 'nl', name: 'Netherlands', code: 'NL' },
  { id: 'au', name: 'Australia', code: 'AU' },
  { id: 'jp', name: 'Japan', code: 'JP' },
  { id: 'sg', name: 'Singapore', code: 'SG' },
];

export default function CountrySelectionScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 768;

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFlagUrl = (code: string) => 
    `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Your Destination</Text>
        <Text style={styles.subtitle}>Choose a country to view available visa packages</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search countries..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
          accessibilityLabel="Search countries"
          accessibilityHint="Enter a country name to filter the list"
        />
      </View>

      <View style={[styles.grid, isSmallScreen && styles.gridSingle]}>
        {filteredCountries.map((country) => (
          <TouchableOpacity
            key={country.id}
            style={styles.countryCard}
            onPress={() => router.push(`/services/${country.id}`)}
            accessibilityLabel={`Select ${country.name}`}
            accessibilityRole="button"
          >
            <Image
              source={{ uri: getFlagUrl(country.code) }}
              style={styles.flag}
              accessibilityLabel={`${country.name} flag`}
            />
            <Text style={styles.countryName}>{country.name}</Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#000',
  },
  grid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridSingle: {
    flexDirection: 'column',
  },
  countryCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    transform: [{ scale: 1 }],
  },
  flag: {
    width: 40,
    height: 25,
    marginBottom: 12,
    borderRadius: 4,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
});