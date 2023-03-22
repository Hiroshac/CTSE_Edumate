import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, StyleSheet, Text, Button, Pressable } from 'react-native'
import {
  ButtonText,
  PageTitle,
  StyledButton,
  StyledContainer,
} from '../../constants/styles.js'

export const Home = () => (
  <StyledContainer>
    <StatusBar style='dark' />
    <PageTitle>Stream</PageTitle>
    <StyledButton style={style.btn}>
      <ButtonText>Subject</ButtonText>
    </StyledButton>
    <StyledButton style={style.btn}>
      <ButtonText>Subject</ButtonText>
    </StyledButton>
    <StyledButton style={style.btn}>
      <ButtonText>Subject</ButtonText>
    </StyledButton>
  </StyledContainer>
)

const style = StyleSheet.create({
  btn: {
    marginTop: 20,
  },
})
