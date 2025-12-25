import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import TypeWriter from '../../../components/TypeWriter';

export default function SignUp() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <Image 
            source={require('../../../../assets/logoAuth.png')}
            style={styles.image}
          />
          <TypeWriter 
            prefix="Chào mừng bạn đến với "
            highlight="Dự án FM"
            speed={100}
            style={{ 
              fontSize: 34,
              textAlign: 'center',
            }}
            gradientColors={['#DBEAFE', '#1E40AF']} 
          />
        </View>
        <View style={styles.body}>
          <TextInput
            onChangeText={(value) => setUsername(value)}
            placeholder="Tên đăng nhập"
            style={styles.usernameInput}
          />

          <View style={styles.passwordInput}>
            <TextInput
              onChangeText={(value) => setPassword(value)}
              placeholder="Mật khẩu"
              style={styles.inputFlex}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.icon}
            >
              <Ionicons 
                name={showPassword ? 'eye' : 'eye-off'} 
                size={24} 
                color="grey" 
              />
            </TouchableOpacity>
          </View>
           <View style={styles.passwordInput}>
            <TextInput
              onChangeText={(value) => setRepassword(value)}
              placeholder="Nhập lại mật khẩu"
              style={styles.inputFlex}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              onPress={() => setShowRePassword(!showRePassword)}
              style={styles.icon}
            >
              <Ionicons 
                name={showRePassword ? 'eye' : 'eye-off'} 
                size={24} 
                color="grey" 
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            onPress={() => alert("Đã bấm")}
            style={styles.loginButtonField}
          >
            <LinearGradient
              colors={['#3B82F6', '#1E40AF']} 
              start={{x: 0, y: 0}} end={{x: 1, y: 0}}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>
                ĐĂNG NHẬP
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Bạn đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => router.push('/sign_up')}>
                <Text style={styles.loginLink}>Đăng nhập tại đây</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={{color: '#888'}}>Design by iBME Hust</Text>
          <Text style={{color: '#888'}}>Copyright © 2025 Hệ thống quản lý tủ đông All rights reserved</Text>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },

  header: {
    alignItems: 'center', 
    paddingTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    resizeMode: 'contain', 
  },

  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  footer: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },

  usernameInput: {
    height: 70,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 12,
    width: '80%',
    borderRadius: 10,
  },
  passwordInput: {
    flexDirection: 'row', 
    alignItems: 'center', 
    height: 70, 
    borderColor: 'black', 
    borderWidth: 1, 
    paddingHorizontal: 12, 
    marginBottom: 15,
    width: '80%',
    borderRadius: 10,
  },
  loginButtonField: {
    width: '80%',
    marginTop: 20
  },
  loginButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 18
  },
  inputFlex: {
    flex: 1,
    height: '100%',
  },
  icon: {
    marginLeft: "auto",
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#555',
    fontSize: 14,
  },
  loginLink: {
    color: '#1E40AF',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});