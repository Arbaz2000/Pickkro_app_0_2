import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fetchUserOrders } from '../../services/api';
import { useUserStore } from '../../store/userStore';

// Sample orders for fallback/loading state
const SAMPLE_ORDERS = [
  {
    id: 'FX8Z749US',
    from: 'London, UK',
    status: 'Pickup',
    date: 'Dec 8, 2023',
    steps: ['Order Placed', 'Pickup', 'Delivered']
  },
  {
    id: 'FX123456780',
    from: 'London, UK',
    status: 'Progress',
    date: 'Dec 8, 2023',
    steps: ['Order Placed', 'Pickup', 'Delivered']
  }
];

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  
  // Get user phone from Zustand store
  const userPhone = useUserStore((state) => state.phoneNumber);
  
  // Fetch orders from API
  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!userPhone) {
        setError('User phone not found. Please log in again.');
        setOrders([]);
        return;
      }
      
      console.log('Fetching orders for user:', userPhone);
      const fetchedOrders = await fetchUserOrders();
      
      if (fetchedOrders && fetchedOrders.length > 0) {
        console.log('Orders fetched successfully:', fetchedOrders);
        setOrders(fetchedOrders);
      } else {
        console.log('No orders found or empty response');
        setOrders([]);
      }
    } catch (err) {
      console.error('Error loading orders:', err);
      setError('Failed to load orders. Please try again later.');
      setOrders([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  // Load orders on component mount
  useEffect(() => {
    loadOrders();
  }, [userPhone]);
  
  // Handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    loadOrders();
  };
  
  // Filter orders based on status
  const filteredOrders = orders.filter(order => {
    switch (filter) {
      case 'all':
        return true;
      case 'accepted':
        // Show orders that are accepted but not canceled or completed
        return order.accepted === true && order.canceled !== true && order.completed !== true;
      case 'canceled':
        return order.canceled === true;
      case 'completed':
        return order.completed === true;
      default:
        return true;
    }
  });
  
  const getOrderStatus = (order: any) => {
    if (order.canceled) return 'Canceled';
    if (order.completed) return 'Completed';
    if (order.accepted === true) return 'Accepted';
    return 'Pending';
  };

  const getStatusIcon = (order: any) => {
    if (order.canceled) return 'close-circle';
    if (order.completed) return 'checkmark-circle';
    if (order.accepted === true) return 'checkmark-circle';
    return 'alert-circle';
  };

  const getStatusColor = (order: any) => {
    if (order.canceled) return '#FF3B30';
    if (order.completed) return '#34C759';
    if (order.accepted === true) return '#007AFF';
    return '#FF9500';
  };
  
  // Format date from API response
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return dateString || 'N/A';
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#1E88E5']}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track & Status</Text>
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'accepted' && styles.activeFilter]}
            onPress={() => setFilter('accepted')}
          >
            <Text style={[styles.filterText, filter === 'accepted' && styles.activeFilterText]}>Accepted</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'canceled' && styles.activeFilter]}
            onPress={() => setFilter('canceled')}
          >
            <Text style={[styles.filterText, filter === 'canceled' && styles.activeFilterText]}>Canceled</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
            onPress={() => setFilter('completed')}
          >
            <Text style={[styles.filterText, filter === 'completed' && styles.activeFilterText]}>Completed</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E88E5" />
          <Text style={styles.loadingText}>Loading your orders...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={40} color="#FF3B30" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadOrders}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : filteredOrders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={60} color="#CCCCCC" />
          <Text style={styles.emptyText}>No orders found</Text>
          <TouchableOpacity 
            style={styles.createOrderButton}
            onPress={() => router.push('/book')}
          >
            <Text style={styles.createOrderButtonText}>Create New Order</Text>
          </TouchableOpacity>
        </View>
      ) : (
        filteredOrders.map((order, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.orderCard}
            onPress={() => {
              const status = getOrderStatus(order);
              const orderData = encodeURIComponent(JSON.stringify(order));
              
              if (status === 'Accepted') {
                router.push({
                  pathname: '/rider-details',
                  params: { 
                    status: status,
                    orderId: order._id,
                    order: orderData
                  }
                });
              } else if (status === 'Completed') {
                router.push({
                  pathname: '/completed-order-details',
                  params: { 
                    orderId: order._id,
                    order: orderData
                  }
                });
              } else if (status === 'Canceled') {
                router.push({
                  pathname: '/cancel-order-details',
                  params: {
                    orderId: order._id,
                    order: orderData
                  }
                });
              }
            }}
          >
            <View style={styles.orderHeader}>
              <View style={styles.orderIdContainer}>
                <Text style={styles.packageId}>Package #{order._id.slice(-8)}</Text>
                <Text style={styles.orderDate}>{formatDate(order.Date)}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order) }]}>
                <Ionicons name={getStatusIcon(order)} size={16} color="#fff" />
                <Text style={styles.statusText}>{getOrderStatus(order)}</Text>
              </View>
            </View>

            <View style={styles.orderDetails}>
              <View style={styles.locationContainer}>
                <View style={styles.locationItem}>
                  <Ionicons name="location-outline" size={20} color="#666" />
                  <View style={styles.locationText}>
                    <Text style={styles.locationLabel}>Pickup</Text>
                    <Text style={styles.locationAddress} numberOfLines={2}>
                      {order.PickupDetails?.address || 'N/A'}
                    </Text>
                  </View>
                </View>
                <View style={styles.locationDivider} />
                <View style={styles.locationItem}>
                  <Ionicons name="location" size={20} color="#666" />
                  <View style={styles.locationText}>
                    <Text style={styles.locationLabel}>Delivery</Text>
                    <Text style={styles.locationAddress} numberOfLines={2}>
                      {order.DeliveryDetails?.address || 'N/A'}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.orderInfo}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Item:</Text>
                  <Text style={styles.infoValue}>{order.Item}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Weight:</Text>
                  <Text style={styles.infoValue}>{order.weight}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Price:</Text>
                  <Text style={styles.infoValue}>₹{order.price || 'N/A'}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E88E5',
  },
  orderCard: {
    margin: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderIdContainer: {
    flex: 1,
  },
  packageId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E88E5',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  orderDetails: {
    gap: 16,
  },
  locationContainer: {
    gap: 12,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  locationText: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  locationDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginLeft: 28,
  },
  orderInfo: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 100,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 100,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },
  retryButton: {
    backgroundColor: '#1E88E5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 100,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
    fontWeight: '500',
  },
  createOrderButton: {
    backgroundColor: '#1E88E5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createOrderButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
  },
  activeFilter: {
    backgroundColor: '#1E88E5',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
});
