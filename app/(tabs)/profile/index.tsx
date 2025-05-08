import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Pencil, Clock, Package, Settings, LogOut, Sparkles } from 'lucide-react-native';
import { useUser } from '@/context/UserContext';

export default function ProfileScreen() {
  const { user, logout } = useUser();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/login');
          }
        }
      ]
    );
  };

  if (!user) {
    router.replace('/login');
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeTitle}>Welcome back, {user.name.split(' ')[0]}!</Text>
        <Text style={styles.welcomeSubtitle}>Here's an overview of your account</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>My Profile</Text>
              <Text style={styles.cardSubtitle}>Your personal information</Text>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => router.push('/profile/edit')}
            >
              <Pencil size={20} color="#2563eb" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{user.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Username</Text>
              <Text style={styles.infoValue}>@{user.name.toLowerCase().replace(' ', '')}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{user.phone || '+1 (555) 123-4567'}</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => router.push('/profile/edit')}
          >
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>My Active Visas</Text>
              <Text style={styles.cardSubtitle}>Manage your visa information</Text>
            </View>
          </View>

          <Text style={styles.visaNote}>
            Visit the Visa Tracker page to add or manage your visas.
          </Text>

          <TouchableOpacity 
            style={styles.visaTrackerButton}
            onPress={() => router.push('/visa-tracker/active')}
          >
            <Text style={styles.visaTrackerButtonText}>Open Visa Tracker</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.menuTitle}>Visify</Text>
        <View style={styles.menuList}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/visa-tracker/active')}
          >
            <Clock size={24} color="#000" />
            <Text style={styles.menuText}>Visa Tracker</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/profile/packages')}
          >
            <Package size={24} color="#000" />
            <Text style={styles.menuText}>My Packages</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/packages/recommended')}
          >
            <Sparkles size={24} color="#2563eb" />
            <Text style={styles.menuText}>Recommended Visa Packages</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/profile/settings')}
          >
            <Settings size={24} color="#000" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
          >
            <LogOut size={24} color="#ef4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f9ff',
  },
  profileInfo: {
    gap: 16,
    marginBottom: 20,
  },
  infoRow: {
    gap: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  editProfileButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  editProfileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  visaNote: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  visaTrackerButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  visaTrackerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  menuList: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '500',
  },
});