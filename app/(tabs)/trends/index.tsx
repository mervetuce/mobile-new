import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Calendar } from 'lucide-react-native';

const trendingArticles = [
  {
    id: 'digital-nomad-visas',
    category: 'Digital Life',
    title: 'Digital Nomad Visas: The Future of Remote Work Travel',
    date: 'May 12, 2024',
    description: 'Explore the top countries offering specialized visas for remote workers and digital nomads in 2024.',
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg',
  },
  {
    id: 'post-pandemic-travel',
    category: 'Visa Updates',
    title: 'Navigating Post-Pandemic Travel Requirements',
    date: 'April 28, 2024',
    description: 'A comprehensive guide to new travel policies, health requirements, and visa processes in the post-pandemic world.',
    image: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg',
  },
  {
    id: 'sustainable-tourism',
    category: 'Travel Trends',
    title: 'Sustainable Tourism: Travel Responsibly in 2024',
    date: 'April 15, 2024',
    description: 'How sustainable visa and environmental impact shifts are increasingly influencing travel trends.',
    image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
  },
  {
    id: 'biometric-tech',
    category: 'Technology',
    title: 'Biometric Technology Revolutionizing Visa Processing',
    date: 'March 27, 2024',
    description: 'New visa biometric technologies streamlining visa applications and enhancing border security worldwide.',
    image: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg',
  },
];

export default function TrendsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg' }}
          style={styles.heroImage}
        />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Travel Trends & Visa Updates</Text>
          <Text style={styles.heroSubtitle}>Stay informed with the latest travel insights and visa changes</Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest Travel Trends</Text>
        <View style={styles.articleList}>
          {trendingArticles.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={styles.articleCard}
              onPress={() => router.push(`/trends/${article.id}`)}
            >
              <Image source={{ uri: article.image }} style={styles.articleImage} />
              <View style={styles.articleContent}>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryText}>{article.category}</Text>
                </View>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <View style={styles.dateContainer}>
                  <Calendar size={16} color="#666" />
                  <Text style={styles.dateText}>{article.date}</Text>
                </View>
                <Text style={styles.articleDescription} numberOfLines={2}>
                  {article.description}
                </Text>
                <Text style={styles.readMore}>Read More →</Text>
              </View>
            </TouchableOpacity>
          ))}
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
  hero: {
    position: 'relative',
    height: 300,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
  },
  exploreButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  exploreButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  articleList: {
    gap: 20,
  },
  articleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  articleImage: {
    width: '100%',
    height: 200,
  },
  articleContent: {
    padding: 16,
  },
  categoryTag: {
    backgroundColor: '#f0f9ff',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '500',
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  articleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  readMore: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563eb',
  },
});