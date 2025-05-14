// D:\Masaüstü\project-enson\app\packages\_layout.tsx

import { Stack } from 'expo-router';

export default function PackagesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="documents/[id]"
        options={{
          title: 'Required Documents',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="documents/details/[section]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="summary"
        options={{
          title: 'Package Summary',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          title: 'Payment',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="payment-status"
        options={{
          title: 'Payment Status',
          headerShown: true,
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}