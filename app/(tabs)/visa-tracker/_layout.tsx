import { Tabs } from 'expo-router';
import { Clock, History, Plus, CreditCard as Edit } from 'lucide-react-native';

export default function VisaTrackerLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitle: 'Visa Tracker',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
        },
      }}>
      <Tabs.Screen
        name="active"
        options={{
          title: 'Active',
          tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <History size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add Visa',
          tabBarIcon: ({ color, size }) => <Plus size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="edit"
        options={{
          title: 'Edit',
          tabBarIcon: ({ color, size }) => <Edit size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}