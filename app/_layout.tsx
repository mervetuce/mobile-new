import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { UserProvider } from '@/context/UserContext';
import { ApplicationProvider } from '@/context/ApplicationContext';
import { ReviewProvider } from '@/context/ReviewContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { PackageProvider } from '@/context/PackageContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <UserProvider>
        <ApplicationProvider>
          <ReviewProvider>
            <PackageProvider>
              <>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
              </>
            </PackageProvider>
          </ReviewProvider>
        </ApplicationProvider>
      </UserProvider>
    </ThemeProvider>
  );
}