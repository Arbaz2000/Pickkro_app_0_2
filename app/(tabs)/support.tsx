import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LiveChat from '../../components/LiveChat';


const FAQ_ITEMS = [
  {
    question: 'How do I track my package?',
    answer: 'You can track your package by going to the Orders tab and selecting your order. You\'ll see real-time updates on your package\'s location and status.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept credit/debit cards, digital wallets (Apple Pay, Google Pay), and UPI payments.',
  },
  {
    question: 'How do I cancel my order?',
    answer: 'To cancel an order, go to the Orders tab, select your order, and tap the "Cancel Order" button. Note that orders already in transit cannot be cancelled.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'Refunds are processed within 5-7 business days after cancellation. The amount will be credited back to your original payment method.',
  },
];

export default function Support() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmitQuery = () => {
    if (query.trim()) {
      Alert.alert(
        'Query Submitted',
        'We\'ve received your query and will get back to you shortly.',
        [{ text: 'OK', onPress: () => setQuery('') }]
      );
    }
  };

  const handleCall = () => {
    Linking.openURL('tel:1234567890');
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Here you could add logic to filter help articles/FAQs
    // or make an API call to search through support content
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for help"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactOptions}>
          <TouchableOpacity style={styles.contactCard} onPress={handleCall}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F2FF' }]}>
              <Ionicons name="call" size={24} color="#007AFF" />
            </View>
            <Text style={styles.contactLabel}>Call Us</Text>
            <Text style={styles.contactDetail}>1234567890</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={() => setShowChat(true)}>
            <View style={[styles.iconContainer, { backgroundColor: '#E6FFE8' }]}>
              <Ionicons name="chatbubble" size={24} color="#34C759" />
            </View>
            <Text style={styles.contactLabel}>Live Chat</Text>
            <Text style={styles.contactDetail}>Online Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {FAQ_ITEMS.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.faqItem}
            onPress={() => setExpandedFaq(expandedFaq === index ? null : index)}>
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Ionicons
                name={expandedFaq === index ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#666"
              />
            </View>
            {expandedFaq === index && (
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.querySection}>
        <Text style={styles.sectionTitle}>Still need help?</Text>
        <TextInput
          style={styles.queryInput}
          placeholder="Type your question here"
          placeholderTextColor="#666"
          multiline
          numberOfLines={4}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitQuery}>
          <Text style={styles.submitButtonText}>Submit Query</Text>
        </TouchableOpacity>
      </View>

      <LiveChat visible={showChat} onClose={() => setShowChat(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 16,
    padding: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  contactSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  contactOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 14,
    color: '#666',
  },
  faqSection: {
    padding: 16,
  },
  faqItem: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
  querySection: {
    padding: 16,
    marginBottom: 32,
  },
  queryInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 