import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { z } from 'zod';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/auth';
import { styles } from './styles/auth.styles';

const loginSchema = z.object({
  mobile: z.string()
    .min(10, 'Mobile number must be at least 10 digits')
    .max(10, 'Mobile number must be exactly 10 digits')
    .regex(/^[6-9]\d{9}$/, 'Mobile number must start with 6-9 and contain exactly 10 digits'),
  password: z.string().min(1, 'Password must be at least 6 characters'),
});

const registerSchema = loginSchema.extend({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
  email: z.string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type Mode = 'login' | 'register';

export default function Auth() {
  const [mode, setMode] = useState<Mode>('login');
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signIn, signUp, signInAsGuest, loading, showSnackbar } = useAuth();

  const handleSubmit = async () => {
    try {
      setErrors({});
      
      if (mode === 'login') {
        const validated = loginSchema.parse(formData);
        await signIn(validated.mobile, validated.password);
      } else {
        const validated = registerSchema.parse(formData);
        await signUp(validated);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
        
        // Show validation error in snackbar instead of Alert
        showSnackbar('Please check your input and try again.', 'error');
      }
    }
  };
  
  const renderLoginForm = () => (
    <View style={styles.container}>
      <Input
        label="Mobile Number"
        placeholder="Enter 10 digit mobile number"
        value={formData.mobile}
        onChangeText={(text) => {
          // Only allow numbers
          const numericText = text.replace(/[^0-9]/g, '');
          // Limit to 10 digits
          const truncatedText = numericText.slice(0, 10);
          setFormData({ ...formData, mobile: truncatedText });
          
          // Real-time validation
          try {
            loginSchema.shape.mobile.parse(truncatedText);
            setErrors(prev => ({ ...prev, mobile: undefined }));
          } catch (error) {
            if (error instanceof z.ZodError) {
              setErrors(prev => ({ ...prev, mobile: error.errors[0].message }));
            }
          }
        }}
        keyboardType="phone-pad"
        maxLength={10}
        error={errors.mobile}
      />
  
      <Input
        label="Password"
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
        error={errors.password}
      />
  
      <View style={styles.rememberContainer}>
        <TouchableOpacity 
          style={styles.rememberMeStyle} 
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={styles.checkbox}>
            {rememberMe && <View style={styles.checkboxInner} />}
          </View>
          <Text style={styles.rememberText}>Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
  
      <Button
        title="Login"
        onPress={handleSubmit}
        loading={loading}
        style={styles.submitButton}
      />
  
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity 
          onPress={() => {
            setMode('register');
            setFormData({
              name: '',
              email: '',
              mobile: '',
              password: '',
              confirmPassword: '',
            });
            setErrors({});
          }}
        >
          <Text style={styles.signupLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderSignupForm = () => (
    <View style={styles.container}>
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        error={errors.name}
      />
  
      <Input
        label="Email Address"
        placeholder="Enter your email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />
  
      <Input
        label="Mobile Number"
        placeholder="Enter 10 digit mobile number"
        value={formData.mobile}
        onChangeText={(text) => {
          // Only allow numbers
          const numericText = text.replace(/[^0-9]/g, '');
          // Limit to 10 digits
          const truncatedText = numericText.slice(0, 10);
          setFormData({ ...formData, mobile: truncatedText });
          
          // Real-time validation
          try {
            registerSchema.shape.mobile.parse(truncatedText);
            setErrors(prev => ({ ...prev, mobile: undefined }));
          } catch (error) {
            if (error instanceof z.ZodError) {
              setErrors(prev => ({ ...prev, mobile: error.errors[0].message }));
            }
          }
        }}
        keyboardType="phone-pad"
        maxLength={10}
        error={errors.mobile}
      />
  
      <Input
        label="Password"
        placeholder="Create password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
        error={errors.password}
      />
  
      <Input
        label="Confirm Password"
        placeholder="Confirm password"
        value={formData.confirmPassword}
        onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
        secureTextEntry
        error={errors.confirmPassword}
      />
  
      <Button
        title="Sign Up"
        onPress={handleSubmit}
        loading={loading}
        style={styles.submitButton}
      />
  
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => setMode('login')}>
          <Text style={styles.signupLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</Text>
        <Text style={styles.subtitle}>
          Experience lightning-fast same-day delivery service
        </Text>
      </View>
      
      {mode === 'login' ? renderLoginForm() : renderSignupForm()}
  
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>
  
      {mode === 'login' && (
        <>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>
  
          <Button
            title="Continue as Guest"
            onPress={signInAsGuest}
            loading={loading}
            style={styles.guestButton}
            textStyle={styles.guestButtonText}
          />
        </>
      )}
    </ScrollView>
  );
}