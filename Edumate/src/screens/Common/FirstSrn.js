import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  AppLogo,
  ButtonTextWhite,
  ButtonText,
  colors,
  LoadingContainer,
  StyledButton,
  StyledButtoWhite,
} from '../../constants/styles'
const { primary } = colors

export default function FirstSrn({ navigation }) {
  return (
    <>
      <StatusBar />
      <LoadingContainer source={require('../../../assets/wallpaper.jpg')}>
        <AppLogo source={require('../../../assets/Picture1.png')}></AppLogo>
        <Text style={styles.nameTag}> Edumate </Text>

        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <StyledButtoWhite
              onPress={() => {
                navigation.navigate('Login')
              }}
            >
              <ButtonTextWhite> Login</ButtonTextWhite>
            </StyledButtoWhite>
          </View>
          <View style={styles.buttonContainer}>
            <StyledButton
              onPress={() => {
                navigation.navigate('SingUp')
              }}
            >
              <ButtonText>Register</ButtonText>
            </StyledButton>
          </View>
        </View>
      </LoadingContainer>
    </>
  )
}

const styles = StyleSheet.create({
  nameTag: {
    marginTop: 10,
    fontSize: 50,
    fontWeight: '10px',
    color: primary,
  },
  container: {
    marginTop: 200,
    margin: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
})
