import { Stack } from 'expo-router';

export default function ServicesLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Select Your Destination',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="[country]" 
        options={{ 
          headerShown: true,
          headerBackTitle: 'Countries',
        }} 
      />
      <Stack.Screen 
        name="details/[id]" 
        options={{ 
          headerShown: true,
          headerTitle: 'Visa Details',
          headerBackTitle: 'Back',
        }} 
      />
      <Stack.Screen 
        name="apply" 
        options={{ 
          headerShown: true,
          headerTitle: 'Apply for Visa',
          presentation: 'modal',
        }} 
      />
    </Stack>
  );
}