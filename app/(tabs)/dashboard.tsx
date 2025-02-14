import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
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
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="What would you like to send today?"
          placeholderTextColor="#666"
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsGrid}>
        {QUICK_ACTIONS.map((action) => (
          <Link href="/book" key={action.id} asChild>
            <TouchableOpacity style={styles.quickActionCard}>
              <View
                style={[styles.iconContainer, { backgroundColor: action.color }]}>
                <Ionicons name={action.icon} size={24} color="#fff" />
              </View>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Services</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryCard}>
            <View style={styles.categoryIcon}>
              <Ionicons name={category.icon} size={24} color="#007AFF" />
            </View>
            <Text style={styles.categoryTitle}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Promotional Banner */}
      <View style={styles.promotionalBanner}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>50% Off First Delivery</Text>
          <Text style={styles.bannerSubtitle}>Use code: FIRST50</Text>
        </View>
      </View>

      {/* Active Orders */}
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
    borderRadius: 16,
    overflow: 'hidden',
    height: 160,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerContent: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#fff',
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
});