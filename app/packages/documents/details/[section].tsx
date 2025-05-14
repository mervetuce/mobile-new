// D:\Masaüstü\project-enson\app\packages\documents\details\[section].tsx
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, FileText, Info } from 'lucide-react-native';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

interface DocumentDetail {
  name: string;
  description: string;
  note?: string;
  required: boolean;
}

const documentDetails: Record<string, {
  title: string;
  subtitle: string;
  guidelines: string[];
  documents: DocumentDetail[];
}> = {
  'basic-documents': {
    title: 'Basic Documents',
    subtitle: 'Essential documents required for all applicants',
    guidelines: [
      'All documents must be clear, legible, and complete to avoid processing delays.',
      'Documents in languages other than English must include certified translations.',
      'Check each document\'s specific requirements for format and file size limits.',
    ],
    documents: [
      {
        name: 'Passport Copy',
        description: 'Must be valid for at least 6 months beyond intended stay',
        required: true,
      },
      {
        name: 'Passport-sized Photos',
        description: '2 recent color photos with white background (35mm x 45mm)',
        note: 'Reference template available in visa application center',
        required: true,
      },
      {
        name: 'Completed Application Form',
        description: 'All fields must be completed in English',
        required: true,
      },
    ],
  },
  'financial-documents': {
    title: 'Financial Documents',
    subtitle: 'Proof of financial stability and support',
    guidelines: [
      'Bank statements must show sufficient funds for the entire duration of stay.',
      'All financial documents must be officially stamped or verified.',
      'Ensure documents are not older than 3 months from the date of application.',
    ],
    documents: [
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
  'travel-information': {
    title: 'Travel Information',
    subtitle: 'Details about your planned trip',
    guidelines: [
      'Travel dates must be clearly specified and match your visa application.',
      'Hotel bookings should cover your entire stay.',
      'Insurance must meet minimum coverage requirements.',
    ],
    documents: [
      {
        name: 'Travel Itinerary',
        description: 'Flight reservations and detailed travel plan',
        required: true,
      },
      {
        name: 'Accommodation Proof',
        description: 'Hotel reservations or invitation letter from host',
        required: true,
      },
      {
        name: 'Travel Insurance',
        description: 'Valid travel health insurance for the entire stay',
        required: true,
      },
    ],
  },
  'employment-documents': {
    title: 'Employment Documents',
    subtitle: 'Verification of your employment status',
    guidelines: [
      'Employment letters must be on company letterhead.',
      'All documents must include contact information for verification.',
      'Self-employed individuals need additional documentation.',
    ],
    documents: [
      {
        name: 'Employment Letter',
        description: 'Letter from employer stating position, salary and duration',
        required: true,
      },
      {
        name: 'Leave Approval',
        description: 'Proof of approved leave from your employer',
        required: true,
      },
      {
        name: 'Business License',
        description: 'If self-employed, business registration documents',
        required: false,
      },
    ],
  },
  'educational-documents': {
    title: 'Educational Documents',
    subtitle: 'Academic credentials and qualifications',
    guidelines: [
      'All educational documents must be officially certified.',
      'Include translations for documents not in English.',
      'Ensure qualifications meet visa requirements.',
    ],
    documents: [
      {
        name: 'Degree Certificates',
        description: 'Official certificates for all completed degrees',
        required: true,
      },
      {
        name: 'Academic Transcripts',
        description: 'Official transcripts showing all courses and grades',
        required: true,
      },
      {
        name: 'Language Proficiency',
        description: 'IELTS, TOEFL or other language test certificates',
        required: false,
      },
    ],
  },
  'additional-documents': {
    title: 'Additional Documents',
    subtitle: 'Supplementary documents that may be required',
    guidelines: [
      'Submit only if applicable to your situation.',
      'Ensure all documents are current and valid.',
      'Include explanatory notes if necessary.',
    ],
    documents: [
      {
        name: 'Medical Certificate',
        description: 'Health examination results if required for your visa type',
        required: false,
      },
      {
        name: 'Police Clearance',
        description: 'Criminal record check from relevant authorities',
        required: false,
      },
      {
        name: 'Cover Letter',
        description: 'Personal statement explaining purpose and intent of travel',
        required: false,
      },
    ],
  },
};

export default function DocumentDetailsScreen() {
  const { section } = useLocalSearchParams<{ section: string }>();
  const details = documentDetails[section as keyof typeof documentDetails];

  const [preparedStates, setPreparedStates] = useState<boolean[]>(
    details?.documents.map(() => false) || []
  );

  if (!details) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Section not found</Text>
      </View>
    );
  }

  const togglePrepared = (index: number) => {
    const updated = [...preparedStates];
    updated[index] = !updated[index];
    setPreparedStates(updated);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="#000" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>{details.title}</Text>
        <Text style={styles.subtitle}>{details.subtitle}</Text>
      </View>

      <View style={styles.guidelinesCard}>
        <View style={styles.guidelinesHeader}>
          <Info size={20} color="#2563eb" />
          <Text style={styles.guidelinesTitle}>Guidelines</Text>
        </View>
        {details.guidelines.map((guideline, index) => (
          <Text key={index} style={styles.guidelineText}>• {guideline}</Text>
        ))}
      </View>

      <View style={styles.documentsContainer}>
        {details.documents.map((doc, index) => (
          <View key={index} style={styles.documentCard}>
            <View style={styles.documentHeader}>
              <FileText size={20} color="#666" />
              <View style={styles.documentInfo}>
                <Text style={styles.documentName}>
                  {doc.name}
                  {doc.required && <Text style={styles.requiredBadge}> Required</Text>}
                </Text>
                <Text style={styles.documentDescription}>{doc.description}</Text>
                {doc.note && <Text style={styles.documentNote}>{doc.note}</Text>}
              </View>
            </View>
            <View style={styles.prepareSection}>
              <Checkbox
                value={preparedStates[index]}
                onValueChange={() => togglePrepared(index)}
                color={preparedStates[index] ? '#000' : undefined}
              />
              <Text style={styles.prepareText}>Mark as prepared</Text>
            </View>
          </View>
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
  },
  header: {
    padding: 20,
    paddingTop: 0,
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
  guidelinesCard: {
    margin: 20,
    padding: 16,
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
  },
  guidelinesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  guidelinesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2563eb',
  },
  guidelineText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
    marginBottom: 8,
  },
  documentsContainer: {
    padding: 20,
    gap: 16,
  },
  documentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  documentHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  requiredBadge: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '500',
  },
  documentDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  documentNote: {
    fontSize: 12,
    color: '#2563eb',
    marginTop: 4,
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 40,
  },
  prepareSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  prepareText: {
    fontSize: 14,
    color: '#0f172a',
  },
});