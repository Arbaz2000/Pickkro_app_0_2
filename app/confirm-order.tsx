import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
// Remove MapView import since we won't use it anymore

export default function ConfirmOrder() {
  const [selectedPayment, setSelectedPayment] = React.useState('cash');
  const [showModal, setShowModal] = React.useState(false);

  const handleConfirmOrder = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/map.png')}
        style={styles.map}
        resizeMode="cover"
      />
      
      <View style={styles.orderCard}>
        <Text style={styles.orderNumber}>Order No. #A8392</Text>
        
        <View style={styles.locationContainer}>
          <View style={styles.locationItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="radio-button-on" size={24} color="#007AFF" />
            </View>
            <View style={styles.locationDetails}>
              <Text style={styles.locationTitle}>Pickup: Rahul Kumar</Text>
              <Text style={styles.locationAddress}>123 Connaught Place, New Delhi</Text>
              <Text style={styles.phoneNumber}>+91 98765 43210</Text>
            </View>
          </View>
          
          <View style={styles.locationItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={24} color="#007AFF" />
            </View>
            <View style={styles.locationDetails}>
              <Text style={styles.locationTitle}>Drop: Priya Singh</Text>
              <Text style={styles.locationAddress}>456 Greater Kailash, New Delhi</Text>
              <Text style={styles.phoneNumber}>+91 98765 12345</Text>
            </View>
          </View>
        </View>

        <View style={styles.parcelDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Parcel Type:</Text>
            <Text style={styles.detailValue}>Documents</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Weight:</Text>
            <Text style={styles.detailValue}>0.5 kg</Text>
          </View>
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.paymentLabel}>Payment</Text>
          <View style={styles.paymentOptions}>
            <TouchableOpacity 
              style={[
                styles.paymentButton, 
                selectedPayment === 'cash' && styles.activePayment
              ]}
              onPress={() => setSelectedPayment('cash')}
            >
              <Text style={[
                styles.paymentButtonText,
                selectedPayment === 'cash' && styles.activePaymentText
              ]}>Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.paymentButton, 
                selectedPayment === 'online' && styles.activePayment
              ]}
              onPress={() => setSelectedPayment('online')}
            >
              <Text style={[
                styles.paymentButtonText,
                selectedPayment === 'online' && styles.activePaymentText
              ]}>Online</Text>
            </TouchableOpacity>
            <Text style={styles.amount}>$15.00</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => router.push('/book')}
          >
            <Text style={styles.editButtonText}>Edit Order</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => router.push('/cancel-order')}
          >
            <Text style={styles.cancelButtonText}>Cancel Order</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={handleConfirmOrder}
        >
          <Text style={styles.confirmButtonText}>Confirm Order</Text>
        </TouchableOpacity>

      </View>

      <Modal
        transparent={true}
        visible={showModal}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={50} color="#007AFF" />
            <Text style={styles.modalText}>Order Confirmed Successfully!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  orderCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  locationContainer: {
    marginBottom: 20,
  },
  locationItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    width: 24,
    marginRight: 12,
  },
  locationDetails: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#666',
  },
  parcelDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  paymentSection: {
    marginBottom: 20,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  paymentOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activePayment: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  paymentButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activePaymentText: {
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  cancelButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFA500',
    flex: 1,
  },
  cancelButtonText: {
    color: '#FFA500',
    fontSize: 16,
    fontWeight: '500',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 'auto',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#FFA500',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 15,
    textAlign: 'center',
  },
});