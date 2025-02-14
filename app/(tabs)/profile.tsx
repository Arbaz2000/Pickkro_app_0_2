import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/auth';

const PAYMENT_METHODS = [
  { id: 1, type: 'card', last4: '4242', brand: 'visa' },
  { id: 2, type: 'wallet', name: 'Apple Pay' },
  { id: 3, type: 'upi', upiId: 'user@upi' },
];

const RECENT_ORDERS = [
  {
    id: 1,
    type: 'Document',
    date: '2024-02-20',
    status: 'Delivered',
    amount: 15.99,
  },
  {
    id: 2,
    type: 'Package',
    date: '2024-02-18',
    status: 'Delivered',
    amount: 24.99,
  },
];

export default function Profile() {
  const { user, signOut } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* User Info */}
      <View style={styles.userCard}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          }}
          style={styles.userImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <TouchableOpacity>
            <Text style={styles.addButton}>+ Add New</Text>
          </TouchableOpacity>
        </View>
        {PAYMENT_METHODS.map((method) => (
          <TouchableOpacity key={method.id} style={styles.paymentMethod}>
            <View style={styles.paymentIcon}>
              <Ionicons
                name={
                  method.type === 'card'
                    ? 'card'
                    : method.type === 'wallet'
                    ? 'wallet'
                    : 'phone-portrait'
                }
                size={24}
                color="#007AFF"
              />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>
                {method.type === 'card'
                  ? `•••• ${method.last4}`
                  : method.type === 'wallet'
                  ? method.name
                  : method.upiId}
              </Text>
              <Text style={styles.paymentSubtext}>
                {method.type === 'card'
                  ? 'Credit Card'
                  : method.type === 'wallet'
                  ? 'Digital Wallet'
                  : 'UPI'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Orders */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllButton}>View All</Text>
          </TouchableOpacity>
        </View>
        {RECENT_ORDERS.map((order) => (
          <TouchableOpacity key={order.id} style={styles.orderItem}>
            <View style={styles.orderIcon}>
              <Ionicons
                name={order.type === 'Document' ? 'document' : 'cube'}
                size={24}
                color="#007AFF"
              />
            </View>
            <View style={styles.orderInfo}>
              <Text style={styles.orderTitle}>{order.type}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
            <View style={styles.orderStatus}>
              <Text style={styles.orderStatusText}>{order.status}</Text>
              <Text style={styles.orderAmount}>${order.amount}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="notifications" size={24} color="#007AFF" />
          <Text style={styles.settingText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="location" size={24} color="#007AFF" />
          <Text style={styles.settingText}>Saved Addresses</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="help-circle" size={24} color="#007AFF" />
          <Text style={styles.settingText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: 14,
    color: '#007AFF',
  },
  section: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    fontSize: 14,
    color: '#007AFF',
  },
  viewAllButton: {
    fontSize: 14,
    color: '#007AFF',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  paymentSubtext: {
    fontSize: 14,
    color: '#666',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  orderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  orderStatus: {
    alignItems: 'flex-end',
  },
  orderStatusText: {
    fontSize: 14,
    color: '#34C759',
    marginBottom: 4,
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  signOutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ff3b30',
    borderRadius: 12,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});