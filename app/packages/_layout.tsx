import { Stack } from 'expo-router';

export default function PackagesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="recommended"
        options={{
          title: 'Recommended Packages',
          headerShown: true,
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