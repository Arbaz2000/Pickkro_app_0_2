import { useUserStore } from '../store/userStore';

// API base URL
const API_BASE_URL = 'https://15.207.211.78.nip.io/api';

// Headers for API requests
const getHeaders = () => {
  const headers = new Headers();
  headers.append("accept", "application/json, text/plain, */*");
  headers.append("accept-language", "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6");
  headers.append("content-type", "application/json");
  headers.append("origin", "https://www.pikkro.com");
  headers.append("priority", "u=1, i");
  headers.append("referer", "https://www.pikkro.com/");
  headers.append("sec-ch-ua", "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"");
  headers.append("sec-ch-ua-mobile", "?0");
  headers.append("sec-ch-ua-platform", "\"macOS\"");
  headers.append("sec-fetch-dest", "empty");
  headers.append("sec-fetch-mode", "cors");
  headers.append("sec-fetch-site", "cross-site");
  headers.append("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36");
  
  return headers;
};

// Create a new order
export const createOrder = async (orderData: any) => {
  try {
    // Get user phone from Zustand store
    const userPhone = useUserStore.getState().phoneNumber;
    console.log('User phone from Zustand store:', userPhone);
    
    // Add user phone to order data
    const orderPayload = {
      ...orderData,
      userPhone: userPhone || ''
    };
    
    console.log('Submitting order with data:', orderPayload);
    
    const response = await fetch(`${API_BASE_URL}/orders/create`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderPayload),
      redirect: 'follow'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`API call failed with status ${response.status}`);
    }
    
    // First get the response as text
    const responseText = await response.text();
    console.log('Raw API response:', responseText);
    
    // Try to parse as JSON, but return text if parsing fails
    try {
      return JSON.parse(responseText);
    } catch (e) {
      console.log('Response is not JSON, returning as text');
      return responseText;
    }
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Fetch user orders
export const fetchUserOrders = async () => {
  try {
    // Get user phone from Zustand store
    const userPhone = useUserStore.getState().phoneNumber;
    console.log('Fetching orders for user phone:', userPhone);
    
    if (!userPhone) {
      console.error('No user phone found in store');
      return [];
    }
    
    const response = await fetch(`${API_BASE_URL}/orders/myorder`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ userPhone }),
      redirect: 'follow'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching orders:', errorText);
      throw new Error(`API call failed with status ${response.status}`);
    }
    
    // First get the response as text
    const responseText = await response.text();
    console.log('Raw orders response:', responseText);
    
    // Try to parse as JSON, but return empty array if parsing fails
    try {
      const orders = JSON.parse(responseText);
      return Array.isArray(orders) ? orders : [];
    } catch (e) {
      console.log('Response is not JSON, returning empty array');
      return [];
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}; 