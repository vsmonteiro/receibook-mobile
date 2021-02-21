import React, { useState, useContext } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';
import { UserContext } from '../contexts/user';

export default function Register() {
  const { setUser } = useContext(UserContext);
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [eyeIcon, setEyeIcon] = useState("visibility-off");
  const [isPassword, setIsPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function changePwdType() {
    setEyeIcon(isPassword ? "visibility" : "visibility-off");
    setIsPassword((prevState: boolean) => !prevState);
  };

  async function register() {
    setIsLoading(true);
    try {
      const response = await api.post('/users', {
        name: userName,
        email,
        password
      })

      setIsLoading(false);
      setUser(response.data);
      Alert.alert('Usuário cadastrado com sucesso!');
    }
    catch (err) {
      setIsLoading(false);
      Alert.alert('Este usuário já possui cadastro')
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
            <>
              <TextInput placeholder='Seu nome' style={styles.input} value={userName} onChangeText={(t) => setUsername(t)} />
              <TextInput placeholder='E-mail' style={styles.input} value={email} onChangeText={(t) => setEmail(t)} />

              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder='Senha'
                  style={styles.passwordInput}
                  textContentType='password'
                  secureTextEntry={isPassword}
                  value={password}
                  onChangeText={(t) => setPassword(t)}
                />

                <MaterialIcons style={styles.icon} onPress={changePwdType} name={eyeIcon} size={28} />
              </View>

              <RectButton onPress={register} style={styles.registerButton}>
                <Text style={styles.loginText}> Cadastrar </Text>
              </RectButton>
            </>
          )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  formContainer: {
    paddingHorizontal: 10
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#D43737',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
    fontSize: 18
  },

  passwordInput: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#D43737',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
    fontSize: 18,
    flex: 1
  },

  registerButton: {
    backgroundColor: '#D43737',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  loginText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: '#FFF',
  },

  passwordContainer: {
    flexDirection: 'row',
  },

  icon: {
    position: 'absolute',
    right: 20,
    top: 15
  }
})