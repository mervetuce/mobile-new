// D:\Masaüstü\project-enson\app\packages\documents\[id].tsx
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronDown, ChevronUp, CircleCheck as CheckCircle2, Circle, ChevronRight } from 'lucide-react-native';

interface DocumentSection {
  title: string;
  subtitle: string;
  items: {
    name: string;
    description?: string;
    required: boolean;
  }[];
}

const documentSections: DocumentSection[] = [
  {
    title: 'Basic Documents',
    subtitle: 'Essential documents required for all applicants',
    items: [
      {
        name: 'Valid Passport',
        description: 'Must be valid for at least 6 months beyond intended stay',
        required: true,
      },
      {
        name: 'Passport-Size Photos',
        description: '2 recent photos (not older than 6 months) with white background',
        required: true,
      },
      {
        name: 'Completed Visa Application Form',
        description: 'All sections must be filled accurately',
        required: true,
      },
    ],
  },
  {
    title: 'Financial Documents',
    subtitle: 'Proof of financial stability and support',
    items: [
      {
        name: 'Bank Statements',
        description: 'Last 6 months of statements showing sufficient funds',
        required: true,
      },
      {
        name: 'Income Tax Returns',
        description: 'Last 2 years of tax returns',
        required: true,
      },
      {
        name: 'Sponsorship Letter',
        description: 'If applicable, with sponsor\'s financial documents',
        required: false,
      },
    ],
  },
  {
    title: 'Travel Information',
    subtitle: 'Details about your planned trip',
    items: [
      {
        name: 'Flight Itinerary',
        description: 'Round-trip flight booking confirmation',
        required: true,
      },
      {
        name: 'Hotel Reservations',
        description: 'Confirmed accommodation for entire stay',
        required: true,
      },
      {
        name: 'Travel Insurance',
        description: 'Coverage for entire duration of stay',
        required: true,
      },
    ],
  },
  {
    title: 'Employment Documents',
    subtitle: 'Verification of your employment status',
    items: [
      {
        name: 'Employment Letter',
        description: 'Current employment status and salary details',
        required: true,
      },
      {
        name: 'Leave Approval',
        description: 'Approved leave letter from employer',
        required: true,
      },
      {
        name: 'Business Registration',
        description: 'If self-employed',
        required: false,
      },
    ],
  },
  {
    title: 'Educational Documents',
    subtitle: 'Academic credentials and qualifications',
    items: [
      {
        name: 'Educational Certificates',
        description: 'Highest qualification certificates',
        required: true,
      },
      {
        name: 'Transcripts',
        description: 'Academic transcripts if applying for student visa',
        required: false,
      },
    ],
  },
  {
    title: 'Additional Documents',
    subtitle: 'Supplementary documents that may be required',
    items: [
      {
        name: 'Marriage Certificate',
        description: 'If applicable',
        required: false,
      },
      {
        name: 'Birth Certificate',
        description: 'If traveling with minors',
        required: false,
      },
      {
        name: 'Previous Visas',
        description: 'Copies of previous visas if any',
        required: false,
      },
    ],
  },
];

export default function RequiredDocumentsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['Basic Documents']));
  const [completedDocuments, setCompletedDocuments] = useState<Set<string>>(new Set());

  const toggleSection = (title: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  const toggleDocument = (documentName: string) => {
    setCompletedDocuments(prev => {
      const next = new Set(prev);
      if (next.has(documentName)) {
        next.delete(documentName);
      } else {
        next.add(documentName);
      }
      return next;
    });
  };

  const totalRequiredDocuments = documentSections.reduce(
    (sum, section) => sum + section.items.filter(item => item.required).length,
    0
  );

  const completedRequiredDocuments = Array.from(completedDocuments).filter(doc =>
    documentSections.some(section =>
      section.items.some(item => item.name === doc && item.required)
    )
  ).length;

  const navigateToDetails = (section: string) => {
    router.push({
      pathname: '/packages/documents/details/[section]',
      params: { section: section.toLowerCase().replace(/\s+/g, '-') }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Required Documents</Text>
        <Text style={styles.subtitle}>Track and prepare documents needed for your visa application</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Document Preparation Progress</Text>
          <Text style={styles.progressCount}>
            {completedRequiredDocuments} of {totalRequiredDocuments} completed
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(completedRequiredDocuments / totalRequiredDocuments) * 100}%` },
            ]}
          />
        </View>
      </View>

      {documentSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection(section.title)}
          >
            <View style={styles.sectionHeaderContent}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            </View>
            {expandedSections.has(section.title) ? (
              <ChevronUp size={24} color="#000" />
            ) : (
              <ChevronDown size={24} color="#000" />
            )}
          </TouchableOpacity>

          {expandedSections.has(section.title) && (
            <View style={styles.sectionContent}>
              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  style={styles.documentItem}
                  onPress={() => toggleDocument(item.name)}
                >
                  <View style={styles.documentHeader}>
                    {completedDocuments.has(item.name) ? (
                      <CheckCircle2 size={24} color="#000000" />
                    ) : (
                      <Circle size={24} color="#666" />
                    )}
                    <View style={styles.documentInfo}>
                      <Text style={styles.documentName}>
                        {item.name}
                        {item.required && <Text style={styles.requiredBadge}> Required</Text>}
                      </Text>
                      {item.description && (
                        <Text style={styles.documentDescription}>{item.description}</Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={() => navigateToDetails(section.title)}
              >
                <Text style={styles.viewDetailsText}>View Details</Text>
                <ChevronRight size={16} color="#2563eb" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
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
  progressContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressCount: {
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
    backgroundColor: '#000000',
    borderRadius: 4,
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionHeaderContent: {
    flex: 1,
    marginRight: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  sectionContent: {
    padding: 20,
    paddingTop: 0,
  },
  documentItem: {
    marginBottom: 16,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  documentDescription: {
    fontSize: 14,
    color: '#666',
  },
  requiredBadge: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '500',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    marginTop: 8,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563eb',
  },
});