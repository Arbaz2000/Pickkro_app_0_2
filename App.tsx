import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        {/* Your app content */}
      </AuthProvider>
    </PaperProvider>
  );
} 