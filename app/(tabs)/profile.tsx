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
import { Switch } from 'react-native';

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
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [emailEnabled, setEmailEnabled] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile Settings</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Michael Anderson</Text>
            <Text style={styles.profileEmail}>michael.a@example.com</Text>
          </View>
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.sectionLabel}>Contact Details</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactLabel}>+1 (555) 123-4567</Text>
            <TouchableOpacity>
              <Text style={styles.changeButton}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactRow}>
            <Text style={styles.contactLabel}>123 Market Street, San Francisco, CA-123</Text>
            <TouchableOpacity>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.notificationSection}>
          <Text style={styles.sectionLabel}>Notifications</Text>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Push Notifications</Text>
            <Switch 
              value={pushEnabled} 
              onValueChange={setPushEnabled}
              trackColor={{ false: '#767577', true: '#007AFF' }}
            />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Email Notifications</Text>
            <Switch 
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              trackColor={{ false: '#767577', true: '#007AFF' }}
            />
          </View>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="help-circle-outline" size={24} color="#666" />
              <Text style={styles.menuText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="person-outline" size={24} color="#666" />
              <Text style={styles.menuText}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="document-text-outline" size={24} color="#666" />
              <Text style={styles.menuText}>Terms & Conditions</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="information-circle-outline" size={24} color="#666" />
              <Text style={styles.menuText}>About Us</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.recentOrdersSection}>
          <Text style={styles.sectionLabel}>Recent Orders</Text>
          <TouchableOpacity style={styles.orderItem}>
            <Text style={styles.orderNumber}>Order #8556</Text>
            <Text style={styles.orderDate}>Delivered on May 15, 2024</Text>
            <Text style={styles.orderAmount}>$45.00</Text>
            <Text style={styles.orderStatus}>Delivered</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.orderItem}>
            <Text style={styles.orderNumber}>Order #8557</Text>
            <Text style={styles.orderDate}>Expected by May 18, 2024</Text>
            <Text style={styles.orderAmount}>$85.00</Text>
            <Text style={[styles.orderStatus, { color: '#FF6B00' }]}>In Progress</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={signOut}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Add these new styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileSection: {
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  contactSection: {
    marginBottom: 24,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactLabel: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  changeButton: {
    fontSize: 14,
    color: '#007AFF',
  },
  editButton: {
    fontSize: 14,
    color: '#007AFF',
  },
  notificationSection: {
    marginBottom: 24,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleLabel: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 14,
    marginLeft: 12,
    color: '#333',
  },
  recentOrdersSection: {
    marginBottom: 24,
  },
  orderItem: {
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  orderAmount: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  orderStatus: {
    fontSize: 12,
    color: '#34C759',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 32,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});