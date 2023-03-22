import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Profile from '../screens/Common/Profile'
import UpdateProfile from '../screens/Common/UpdateProfile'
import ResetPassword from '../screens/Common/ResetPassword'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function UserStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          // headerTintColor: tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name='Profile'
          component={Profile}
        />
        <Stack.Screen name='UpdateDetails' component={UpdateProfile} />
        <Stack.Screen name='UpdatePassword' component={ResetPassword} />
      </Stack.Navigator>
    </>
  )
}

const styles = StyleSheet.create({})
