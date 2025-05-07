import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Calendar, ArrowLeft } from 'lucide-react-native';

const articles = {
  'digital-nomad-visas': {
    title: 'Digital Nomad Visas: The Future of Remote Work Travel',
    category: 'Digital Life',
    date: 'May 12, 2024',
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg',
    content: `The landscape of work has dramatically shifted in recent years, with remote work becoming an integral component of modern life. As this trend continues to grow, countries worldwide are creating specialized visa programs to attract digital nomads and remote workers.

Key Findings from Our Research:

Portugal - The D7 visa program (Digital Nomad Visa) offers remote workers and passive income earners the opportunity to live in Portugal while working for companies abroad.

Estonia - The pioneer of digital nomad visas continues to offer an e-Residency program alongside specific remote work visas.

Costa Rica - Their Digital Nomad Visa Program has become one of the most popular options in Latin America.

Thailand - The newly launched Long-Term Resident Visa includes provisions for digital nomads.

Digital nomad visas typically require proof of remote employment or steady income, health insurance, and sometimes background checks. Income requirements vary widely between countries.

Key Benefits of Digital Nomad Visas:
- Longer stays (usually 6-12 months)
- Ability to maintain foreign employment
- Tax benefits in many cases
- Access to local services and infrastructure
- Legal certainty for remote workers

For those considering the life of a digital lifestyle, many other opportunities than ever before. With proper planning and understanding of visa requirements, the world truly can become your office.`,
  },
  'post-pandemic-travel': {
    title: 'Navigating Post-Pandemic Travel Requirements',
    category: 'Visa Updates',
    date: 'April 28, 2024',
    image: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg',
    content: `International travel has undergone significant transformations since the pandemic, and these changes become permanent features of the global travel landscape. For travelers planning international trips in 2024, understanding these new requirements is essential.

Key Changes to Note:

Health Documentation
- Many countries still require proof of vaccination
- Digital health passes are becoming standardized
- Some destinations require travel insurance with COVID-19 coverage

Visa Processing
- Increased automation in visa processing
- More countries offering e-visas
- Extended processing times in some regions

Entry Requirements
- Enhanced screening at borders
- Digital travel declarations
- Contact tracing systems in some countries

Best Practices for Travelers:
- Book flexible travel arrangements
- Keep digital copies of all health documents
- Check requirements regularly before departure
- Consider comprehensive travel insurance
- Allow extra time for visa processing

The integration of health and travel documentation has led to more streamlined processes in many cases, but travelers should be prepared for additional requirements and potential delays.

Planning Ahead:
- Start visa applications early
- Keep vaccination records updated
- Monitor changing requirements
- Have backup plans for travel dates

While restrictions have eased in many regions, staying informed about current requirements and planning ahead will help ensure smooth international travel.`,
  },
  'sustainable-tourism': {
    title: 'Sustainable Tourism: Travel Responsibly in 2024',
    category: 'Travel Trends',
    date: 'April 15, 2024',
    image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
    content: `As environmental awareness grows, countries are increasingly implementing sustainable tourism initiatives and eco-friendly visa policies. This shift reflects a global commitment to responsible travel and environmental protection.

Key Initiatives:

Eco-Tourism Visas
- Special permits for nature reserves
- Reduced fees for eco-friendly activities
- Support for local conservation projects

Sustainable Travel Requirements
- Carbon offset programs
- Eco-friendly accommodation requirements
- Responsible tourism pledges

Country Highlights:
- Costa Rica's sustainable tourism certification
- New Zealand's tourism sustainability commitment
- Bhutan's high-value, low-impact tourism model
- Slovenia's green tourism initiatives

Best Practices for Sustainable Travel:
- Choose eco-certified accommodations
- Support local communities
- Minimize environmental impact
- Follow local conservation guidelines
- Use public transportation when possible

The Future of Sustainable Tourism:
- Integration of sustainability metrics in visa applications
- Incentives for eco-friendly travel choices
- Development of green tourism infrastructure
- Enhanced protection for natural resources

By choosing sustainable travel options, visitors can help preserve destinations for future generations while enjoying meaningful travel experiences.`,
  },
  'biometric-tech': {
    title: 'Biometric Technology Revolutionizing Visa Processing',
    category: 'Technology',
    date: 'March 27, 2024',
    image: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg',
    content: `The integration of biometric technology in visa processing is transforming how countries manage their borders and process visa applications. This technological revolution is making visa applications more efficient and secure while improving the traveler experience.

Key Developments:

Biometric Data Collection
- Fingerprint scanning
- Facial recognition
- Iris scanning
- Voice recognition

Benefits of Biometric Systems
- Reduced processing times
- Enhanced security
- Fraud prevention
- Seamless travel experience

Implementation Examples:
- EU's Entry/Exit System (EES)
- US ESTA enhancements
- UAE's Smart Gates
- Singapore's automated border control

Future Developments:
- Blockchain integration
- AI-powered risk assessment
- Mobile biometric collection
- Contactless processing systems

Impact on Travelers:
- Faster border crossings
- Reduced paperwork
- Increased security
- More reliable identification

Best Practices for Travelers:
- Keep biometric documents updated
- Follow enrollment procedures carefully
- Maintain clear biometric records
- Stay informed about requirements

The future of visa processing is increasingly digital and automated, with biometric technology leading the way in creating more secure and efficient border management systems.`,
  },
};

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const article = articles[id as keyof typeof articles];

  if (!article) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Article not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.image }} style={styles.heroImage} />
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft color="#fff" size={24} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{article.category}</Text>
          </View>
          <Text style={styles.title}>{article.title}</Text>
          <View style={styles.dateContainer}>
            <Calendar size={16} color="#666" />
            <Text style={styles.dateText}>{article.date}</Text>
          </View>
        </View>

        <Text style={styles.articleText}>{article.content}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroImage: {
    width: '100%',
    height: 300,
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
    padding: 20,
  },
  header: {
    marginBottom: 20,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  articleText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 40,
  },
});