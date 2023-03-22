import React from 'react'
import { View } from 'react-native'
import {
  StyledInputLabel,
  StyledTextInputField,
  RightIcon,
  Ionicons,
  colors
} from './styles.js'
const { darkLight } = colors
export const Input = ({
  label,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInputField {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? 'md-eye-off' : 'md-eye'}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  )
}
