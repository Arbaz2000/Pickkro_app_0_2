import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock chat messages
const MOCK_CHAT = [
  { id: 1, text: "Hello! How can I help you today?", isAgent: true, time: "10:00 AM" },
  { id: 2, text: "I need help with my delivery", isAgent: false, time: "10:01 AM" },
  { id: 3, text: "I'll be happy to help you with that. Could you please provide your order number?", isAgent: true, time: "10:02 AM" },
];

interface LiveChatProps {
  visible: boolean;
  onClose: () => void;
}

export default function LiveChat({ visible, onClose }: LiveChatProps) {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(MOCK_CHAT);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        text: chatMessage,
        isAgent: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');

      // Mock agent response after 1 second
      setTimeout(() => {
        const agentResponse = {
          id: chatMessages.length + 2,
          text: "Thank you for your message. Our agent will respond shortly.",
          isAgent: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages(prev => [...prev, agentResponse]);
      }, 1000);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Customer Support</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.messages}>
          {chatMessages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.isAgent ? styles.agentMessage : styles.userMessage,
              ]}>
              <Text style={[
                styles.messageText,
                message.isAgent ? styles.agentMessageText : styles.userMessageText,
              ]}>
                {message.text}
              </Text>
              <Text style={[
                styles.messageTime,
                message.isAgent ? styles.agentMessageTime : styles.userMessageTime,
              ]}>
                {message.time}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={chatMessage}
            onChangeText={setChatMessage}
            placeholder="Type your message..."
            placeholderTextColor="#666"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}>
            <Ionicons name="send" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  messages: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  agentMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  agentMessageText: {
    color: '#000',
  },
  userMessageText: {
    color: '#fff',
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
  },
  agentMessageTime: {
    color: '#666',
  },
  userMessageTime: {
    color: '#fff',
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 