import { Stack } from 'expo-router';

export default function CartLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Payment Details',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="payment-status"
        options={{
          headerTitle: 'Payment Status',
          headerBackTitle: 'Back',
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}