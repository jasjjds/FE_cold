import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MyInput from './src/components/CustomTextInput'; // Import component vừa tạo

const TextInputExample = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
        <Text style={styles.label}>Tên đăng ký:</Text>
        <MyInput
          value={text}
          onChangeText={onChangeText}
          placeholder="Nhập tên đăng nhập..."
        />

        <Text style={styles.label}>Mật khẩu:</Text>
        <MyInput
          value={number}
          onChangeText={onChangeNumber}
          placeholder="Nhập mật khẩu..."
          secureTextEntry={true}
          style={{ borderColor: 'blue' }} 
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  label: {
    marginLeft: 12,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 14,
  }
});

export default TextInputExample;