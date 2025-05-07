import { Stack } from 'expo-router';

export default function TrendsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ 
          headerShown: true,
          headerTitle: 'Article',
          headerBackTitle: 'Trends'
        }} 
      />
    </Stack>
  );
}