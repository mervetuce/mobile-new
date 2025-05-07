import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { FileText, Clock, Download, MessageCircle, Check, ArrowLeft } from 'lucide-react-native';

const visaDetails = {
  'us-b1': {
    title: 'Business Visa (B-1)',
    subtitle: 'For professionals traveling for business meetings, conferences, or corporate events',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    overview: 'The business visa is designed for professionals traveling for business meetings, conferences, or corporate events. Our comprehensive package provides all the necessary guidance and support to ensure a smooth application process and maximize your chances of approval.',
    benefits: [
      'Business invitation letter templates',
      'Business travel history optimization',
      'Company documentation guidance',
      'Interview preparation for business visas',
    ],
    requirements: [
      'Valid passport with at least 6 months validity',
      'Completed visa application form',
      'Proof of financial means',
      'Travel itinerary and accommodation details',
      'Travel insurance covering the entire stay',
      'Recent passport-sized photographs',
    ],
    processingTimes: [
      { type: 'Standard Processing', duration: '15-20 business days', price: '$160' },
      { type: 'Express Processing', duration: '5-10 business days', price: '$250' },
      { type: 'Rush Processing', duration: '2-3 business days', price: '$350' },
    ],
    resources: [
      { name: 'Visa Application Form', type: 'PDF', size: '245 KB' },
      { name: 'Document Checklist', type: 'PDF', size: '180 KB' },
      { name: 'Sample Business Letter', type: 'DOC', size: '125 KB' },
      { name: 'Financial Requirements Guide', type: 'PDF', size: '210 KB' },
    ],
    relatedVisas: [
      { id: 'us-b2', title: 'Tourist Visa (B-2)', description: 'For tourism, vacation, and visiting family' },
      { id: 'us-h1b', title: 'Work Visa (H-1B)', description: 'For specialized occupation employment' },
    ],
  },
  'us-b2': {
    title: 'Tourist Visa (B-2)',
    subtitle: 'For leisure travelers planning holidays, sightseeing, or visiting friends abroad',
    image: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg',
    overview: 'The tourist visa is designed for leisure travelers planning holidays, sightseeing, or visiting friends abroad. Our comprehensive package provides all the necessary guidance and support to ensure a smooth application process and maximize your chances of approval.',
    benefits: [
      'Maximum stay of up to 6 months',
      'Multiple entry options available',
      'Spouse and children can be included',
      'Extendable while in the US',
      'Allows recreational study',
    ],
    requirements: [
      'Valid passport with at least 6 months validity',
      'Completed visa application form DS-160',
      'Proof of sufficient funds for entire stay',
      'Round-trip travel itinerary',
      'Hotel reservations or host\'s invitation letter',
      'Recent passport-sized photographs',
      'Proof of ties to home country',
    ],
    processingTimes: [
      { type: 'Standard Processing', duration: '10-15 business days', price: '$160' },
      { type: 'Express Processing', duration: '5-7 business days', price: '$250' },
      { type: 'Rush Processing', duration: '2-3 business days', price: '$350' },
    ],
    resources: [
      { name: 'Tourist Visa Checklist', type: 'PDF', size: '180 KB' },
      { name: 'DS-160 Guide', type: 'PDF', size: '245 KB' },
      { name: 'Sample Invitation Letter', type: 'DOC', size: '125 KB' },
      { name: 'Travel Itinerary Template', type: 'PDF', size: '150 KB' },
    ],
    relatedVisas: [
      { id: 'us-b1', title: 'Business Visa (B-1)', description: 'For business meetings and conferences' },
      { id: 'us-f1', title: 'Student Visa (F-1)', description: 'For academic studies in the US' },
    ],
  },
  'us-f1': {
    title: 'Student Visa (F-1)',
    subtitle: 'For students pursuing education at US academic institutions or language training programs',
    image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
    overview: 'The F-1 student visa is designed for international students pursuing full-time academic studies at accredited US educational institutions. This visa allows you to focus on your education while experiencing American campus life and culture.',
    benefits: [
      'Duration covers entire length of study',
      'Optional Practical Training (OPT) eligible',
      'Part-time on-campus work permitted',
      'Dependents can join on F-2 visas',
      'Summer break travel flexibility',
    ],
    requirements: [
      'Valid passport with at least 6 months validity',
      'Form I-20 from accepted institution',
      'Proof of financial resources for first year',
      'Evidence of English proficiency (TOEFL/IELTS)',
      'Academic transcripts and certificates',
      'Statement of purpose',
      'Recent passport-sized photographs',
    ],
    processingTimes: [
      { type: 'Standard Processing', duration: '15-20 business days', price: '$160' },
      { type: 'Express Processing', duration: '7-10 business days', price: '$250' },
      { type: 'Rush Processing', duration: '3-5 business days', price: '$350' },
    ],
    resources: [
      { name: 'F-1 Visa Application Guide', type: 'PDF', size: '280 KB' },
      { name: 'Financial Documents Checklist', type: 'PDF', size: '190 KB' },
      { name: 'Sample Statement of Purpose', type: 'DOC', size: '150 KB' },
      { name: 'SEVIS Fee Guide', type: 'PDF', size: '175 KB' },
    ],
    relatedVisas: [
      { id: 'us-b2', title: 'Tourist Visa (B-2)', description: 'For campus visits and short courses' },
      { id: 'us-h1b', title: 'Work Visa (H-1B)', description: 'For post-graduation employment' },
    ],
  },
  'us-h1b': {
    title: 'Work Visa (H-1B)',
    subtitle: 'For professionals in specialized occupations requiring theoretical and practical application of highly specialized knowledge',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    overview: 'The H-1B visa is designed for professionals working in specialized occupations that require theoretical and practical application of highly specialized knowledge. This visa category is ideal for qualified professionals seeking employment opportunities with US companies.',
    benefits: [
      'Initial stay of up to 3 years',
      'Extendable up to 6 years total',
      'Dual intent visa category',
      'Dependents eligible for H-4 visas',
      'Spouse may be eligible to work',
    ],
    requirements: [
      'Valid passport with at least 6 months validity',
      'Job offer from US employer',
      'Bachelor\'s degree or equivalent',
      'Labor Condition Application (LCA)',
      'Detailed job description and credentials',
      'Proof of specialized knowledge',
      'Recent passport-sized photographs',
    ],
    processingTimes: [
      { type: 'Standard Processing', duration: '4-6 months', price: '$460' },
      { type: 'Premium Processing', duration: '15 calendar days', price: '$2,500' },
    ],
    resources: [
      { name: 'H-1B Petition Guide', type: 'PDF', size: '310 KB' },
      { name: 'Required Documents Checklist', type: 'PDF', size: '225 KB' },
      { name: 'Sample Support Letter', type: 'DOC', size: '180 KB' },
      { name: 'Qualification Evaluation Guide', type: 'PDF', size: '250 KB' },
    ],
    relatedVisas: [
      { id: 'us-f1', title: 'Student Visa (F-1)', description: 'For academic studies leading to employment' },
      { id: 'us-b1', title: 'Business Visa (B-1)', description: 'For business meetings and conferences' },
    ],
  },
};

export default function VisaDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const visa = visaDetails[id];

  if (!visa) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Visa details not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: visa.image }} style={styles.headerImage} />
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft color="#fff" size={24} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{visa.title}</Text>
          <Text style={styles.subtitle}>{visa.subtitle}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overview}>{visa.overview}</Text>
          
          <View style={styles.benefitsList}>
            {visa.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Check size={20} color="#22c55e" />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <View style={styles.requirementsList}>
            {visa.requirements.map((requirement, index) => (
              <View key={index} style={styles.requirementItem}>
                <View style={styles.bullet} />
                <Text style={styles.requirementText}>{requirement}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Processing Times</Text>
          <View style={styles.processingTimes}>
            {visa.processingTimes.map((option, index) => (
              <View key={index} style={styles.processingOption}>
                <View style={styles.processingHeader}>
                  <Clock size={16} color="#666" />
                  <Text style={styles.processingType}>{option.type}</Text>
                </View>
                <Text style={styles.processingDuration}>{option.duration}</Text>
                <Text style={styles.processingPrice}>{option.price}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>Ready to Apply?</Text>
          <Text style={styles.actionText}>
            Get started with your visa application today and receive expert guidance throughout the process.
          </Text>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => router.push({
              pathname: '/services/apply',
              params: { serviceId: id }
            })}
          >
            <Text style={styles.applyButtonText}>Start Application</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Downloadable Resources</Text>
          <View style={styles.resourcesList}>
            {visa.resources.map((resource, index) => (
              <TouchableOpacity key={index} style={styles.resourceItem}>
                <FileText size={20} color="#2563eb" />
                <View style={styles.resourceInfo}>
                  <Text style={styles.resourceName}>{resource.name}</Text>
                  <Text style={styles.resourceMeta}>{resource.type} • {resource.size}</Text>
                </View>
                <Download size={20} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.supportCard}>
          <Text style={styles.supportTitle}>Need Assistance?</Text>
          <Text style={styles.supportText}>
            Our visa experts are here to help you with your application
          </Text>
          <TouchableOpacity
            style={styles.supportButton}
            onPress={() => router.push('/support')}
          >
            <MessageCircle size={20} color="#fff" />
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Related Visa Packages</Text>
          <View style={styles.relatedVisas}>
            {visa.relatedVisas.map((relatedVisa, index) => (
              <TouchableOpacity
                key={index}
                style={styles.relatedVisaCard}
                onPress={() => router.push(`/services/details/${relatedVisa.id}`)}
              >
                <View>
                  <Text style={styles.relatedVisaTitle}>{relatedVisa.title}</Text>
                  <Text style={styles.relatedVisaDescription}>{relatedVisa.description}</Text>
                </View>
                <Text style={styles.relatedVisaLink}>Learn More</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  headerImage: {
    width: '100%',
    height: 240,
  },
  backButton: {
    position: 'absolute',
    top: 44,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginTop: -40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  overview: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  requirementsList: {
    gap: 12,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563eb',
    marginRight: 12,
  },
  requirementText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  processingTimes: {
    gap: 16,
  },
  processingOption: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  processingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  processingType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  processingDuration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  processingPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2563eb',
  },
  actionCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  actionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  applyButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  resourcesList: {
    gap: 12,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  resourceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  resourceName: {
    fontSize: 16,
    color: '#2563eb',
    marginBottom: 4,
  },
  resourceMeta: {
    fontSize: 14,
    color: '#666',
  },
  supportCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    alignItems: 'center',
  },
  supportTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  supportText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  supportButton: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  relatedVisas: {
    gap: 12,
  },
  relatedVisaCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  relatedVisaTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  relatedVisaDescription: {
    fontSize: 14,
    color: '#666',
  },
  relatedVisaLink: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 40,
  },
});