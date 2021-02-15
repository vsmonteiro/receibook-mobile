import React, { useState } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, TextInput, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [eyeIcon, setEyeIcon] = useState("visibility-off");
  const [isPassword, setIsPassword] = useState(true);

  const changePwdType = () => {
    setEyeIcon(isPassword ? "visibility" : "visibility-off");
    setIsPassword((prevState: boolean) => !prevState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
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

        <RectButton style={styles.loginButton}>
          <Text style={styles.loginText}> Login </Text>
        </RectButton>
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Novo aqui? Cadastre-se
        </Text>
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

  loginButton: {
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

  registerContainer: {
    marginTop: 32,
    alignSelf: 'center'
  },

  registerText: {
    color: 'blue',
    fontSize: 18
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