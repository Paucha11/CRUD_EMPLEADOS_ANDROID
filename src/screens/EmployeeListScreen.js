import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import EmployeeItem from '../components/EmployeeItem';
import MessageBox from '../components/MessageBox';
import { deleteEmployee, getEmployees } from '../services/api';

export default function EmployeeListScreen({ navigation, route }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState(route.params?.message || '');

  async function loadEmployees(showRefresh = false) {
    if (showRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (route.params?.message) {
        setMessage(route.params.message);
      }

      loadEmployees();
    }, [route.params?.message])
  );

  async function handleDelete(id) {
    try {
      await deleteEmployee(id);
      setEmployees((currentEmployees) =>
        currentEmployees.filter((employee) => employee._id !== id)
      );
      setMessage('Empleado eliminado correctamente');
    } catch (error) {
      setMessage(error.message);
    }
  }

  function handleEdit(employee) {
    navigation.navigate('Editar', { employeeId: employee._id, employee });
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Cargando empleados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MessageBox
        type={message.toLowerCase().includes('error') ? 'error' : 'success'}
        message={message}
      />

      <Pressable style={styles.addButton} onPress={() => navigation.navigate('Crear')}>
        <Text style={styles.addButtonText}>Agregar empleado</Text>
      </Pressable>

      <FlatList
        data={employees}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <EmployeeItem employee={item} onEdit={handleEdit} onDelete={handleDelete} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadEmployees(true)}
            colors={['#2563EB']}
          />
        }
        ListEmptyComponent={<Text style={styles.emptyText}>No hay empleados registrados.</Text>}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#4B5563',
  },
  addButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  listContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 20,
  },
});
