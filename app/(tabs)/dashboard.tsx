import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import PriceCalculator from '@/components/PriceCalculator';

const QUICK_ACTIONS = [
  { id: 1, title: 'Send Package', icon: 'cube', color: '#007AFF' },
  { id: 2, title: 'Track Orders', icon: 'radio', color: '#34C759' },
  { id: 3, title: 'Saved Addresses', icon: 'bookmark', color: '#FF9500' },
  { id: 4, title: 'Recent Deliveries', icon: 'time', color: '#5856D6' },
];

const CATEGORIES = [
  { id: 1, title: 'Documents', icon: 'document-text' },
  { id: 2, title: 'Parcels', icon: 'cube' },
  { id: 3, title: 'Groceries', icon: 'basket' },
  { id: 4, title: 'Medicine', icon: 'medical' },
];

const ACTIVE_ORDERS = [
  {
    id: 1,
    type: 'Document',
    status: 'In Transit',
    from: 'New York',
    to: 'Los Angeles',
    eta: '2 hours',
  },
];

export default function Dashboard() {
  const [location, setLocation] = useState('New York, NY');
  const [menuVisible, setMenuVisible] = useState(false);
  const [showPriceCalculator, setShowPriceCalculator] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);
  const togglePriceCalculator = () => setShowPriceCalculator(!showPriceCalculator);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.logo}
        />
        <TouchableOpacity style={styles.locationSelector}>
          <Ionicons name="location" size={20} color="#007AFF" />
          <Text style={styles.locationText}>{location}</Text>
          <Ionicons name="chevron-down" size={20} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleMenu}>
        <TouchableOpacity style={styles.menuOverlay} onPress={toggleMenu}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Terms & Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Language</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="What would you like to send today?"
          placeholderTextColor="#666"
        />
      </View>
      <View style={styles.promotionalBanner}>
        
        <Text style={styles.bannerTitle}>Same Day Delivery</Text>
        <Text style={styles.bannerSubtitle}>When You Need It Most</Text>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpTitle}>Quick Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#666"
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>signup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.guestButton}>
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.servicesContainer}>
          <Text style={styles.servicesTitle}>Our Services</Text>
          <View style={styles.serviceCards}>
            <View style={styles.serviceCard}>
              <Image
                source={require('../../assets/images/delivery.png')}
                style={styles.serviceImage}
              />
              <Text style={styles.serviceTitle}>Same Day Delivery</Text>
              <Text style={styles.serviceDescription}>Delivery within 90 mins</Text>
            </View>
            <View style={styles.serviceCard}>
              <Image
                source={require('../../assets/images/express.png')}
                style={styles.serviceImage}
              />
              <Text style={styles.serviceTitle}>Express Hour</Text>
              <Text style={styles.serviceDescription}>Ultra-fast delivery service</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.calculatorSection}>
        <TouchableOpacity style={styles.calculatorCard} onPress={togglePriceCalculator}>
          <Text style={styles.calculatorText}>Price calculator</Text>
          <View style={styles.calculatorIconContainer}>
            <Ionicons name="calculator" size={24} color="#007AFF" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.calculatorCard}
          onPress={() => router.push('/book')}
        >
          <Text style={styles.calculatorText}>2 Wheeler</Text>
          <View style={styles.calculatorIconContainer}>
            <Ionicons name="bicycle" size={24} color="#007AFF" />
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showPriceCalculator}
        transparent={true}
        animationType="slide"
        onRequestClose={togglePriceCalculator}>
        <TouchableOpacity 
          style={styles.calculatorOverlay} 
          onPress={togglePriceCalculator}
          activeOpacity={1}>
          <View style={styles.calculatorModal}>
            <View style={styles.calculatorHeader}>
              <Text style={styles.calculatorTitle}>Price Calculator</Text>
              <TouchableOpacity onPress={togglePriceCalculator}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <PriceCalculator />
          </View>
        </TouchableOpacity>
      </Modal>
      {showPriceCalculator && (
        <View style={styles.priceCalculatorContainer}>
          <PriceCalculator />
        </View>
      )}
      <View style={styles.bannerContent}>
        <Text style={styles.bannerHeading}>Need Delivery?</Text>
        <Text style={styles.bannerSubHeading}>We'll Make It Happen!</Text>
      </View>
        <View style={styles.updatesContainer}>
          <View style={styles.updateHeader}>
            <View style={styles.updateTitleContainer}>
              <Image 
                source={require('../../assets/icon/update.png')}
                style={styles.updateIcon}
              />
              <Text style={styles.updateTitle}>Latest Updates</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.updateItem}>
            <Text style={styles.updateText}>New express delivery service available!</Text>
          </View>
        </View>
      {/* <View style={styles.quickActionsGrid}>
        {QUICK_ACTIONS.map((action) => (
          <Link href="/book" key={action.id} asChild>
            <TouchableOpacity style={styles.quickActionCard}>
              <View
                style={[styles.iconContainer, { backgroundColor: action.color }]} >
                <Ionicons
                  name={action.icon as keyof typeof Ionicons.glyphMap}
                  size={24}
                  color="#fff"
                />
              </View>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Services</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryCard}>
            <View style={styles.categoryIcon}>
              <Ionicons
                name={category.icon as keyof typeof Ionicons.glyphMap}
                size={24}
                color="#007AFF"
              />
            </View>
            <Text style={styles.categoryTitle}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.sectionTitle}>Active Orders</Text>
      {ACTIVE_ORDERS.map((order) => (
        <Link href="/orders" key={order.id} asChild>
          <TouchableOpacity style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderType}>{order.type}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
            </View>
            <View style={styles.orderDetails}>
              <View style={styles.orderLocation}>
                <Ionicons name="location" size={16} color="#666" />
                <Text style={styles.locationDetail}>{order.from}</Text>
              </View>
              <View style={styles.orderDivider} />
              <View style={styles.orderLocation}>
                <Ionicons name="location" size={16} color="#666" />
                <Text style={styles.locationDetail}>{order.to}</Text>
              </View>
            </View>
            <View style={styles.orderFooter}>
              <Text style={styles.etaText}>ETA: {order.eta}</Text>
              <TouchableOpacity style={styles.trackButton}>
                <Text style={styles.trackButtonText}>Track</Text>
                <Ionicons name="arrow-forward" size={16} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Link>
      ))} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  locationText: {
    marginHorizontal: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  quickActionCard: {
    width: '50%',
    padding: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 24,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  promotionalBanner: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  signUpContainer: {
    marginBottom: 20,
  },
  signUpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  loginButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  guestButton: {
    padding: 12,
    alignItems: 'center',
  },
  guestButtonText: {
    color: '#666',
    fontSize: 14,
  },
  servicesContainer: {
    marginTop: 20,
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  serviceCards: {
    flexDirection: 'row',
    gap: 12,
  },
  serviceCard: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  serviceImage: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    backgroundColor: '#E8F2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '500',
  },
  orderDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderLocation: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDetail: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  orderDivider: {
    width: 40,
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  etaText: {
    fontSize: 14,
    color: '#666',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },

  // Menu Modal Styles
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: '#fff',
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 50,
    right: 100,
    padding: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  menuItem: {
    paddingVertical: 5,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  menuButton: {
    position: 'absolute',
    left: 16,
    top: 60,
  },
  priceCalculatorContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bannerContent: {
    marginBottom: 20,
    alignItems: 'center',
  },
  bannerHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DF7016',
    marginBottom: 8,
  },
  bannerSubHeading: {
    fontSize: 16,
    color: '#4B5563',
  },
  updatesContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
  },
  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#007AFF',
  },
  updateItem: {
    paddingVertical: 1,
  },
  updateText: {
    fontSize: 14,
    color: '#666',
  },
  calculatorSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  calculatorCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  calculatorIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  calculatorText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom:20
  },
  calculatorOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  calculatorModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  calculatorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  calculatorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  updateTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});
