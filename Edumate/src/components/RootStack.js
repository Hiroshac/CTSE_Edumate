import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Button, Text } from 'react-native'
import Login from '../screens/Common/Login'
import FirstSrn from '../screens/Common/FirstSrn'
import { colors } from '../constants/styles'
import SignUp from '../screens/Common/SignUp'
import Profile from '../screens/Common/Profile'
import SignUpSelection from '../screens/Common/SignUpSelection'
import { UploadLink } from '../screens/Teacher/UploadLink'
import { UploadNote } from '../screens/Teacher/UploadNote'
import { UpdateLink } from '../screens/Teacher/UpdateLink'
import { UpdateNote } from '../screens/Teacher/UpdateNote'
import { Comment } from '../screens/Teacher/Comments'
import UserStack from './UserStack'
import { TeacherStack } from './TeacherStack'
import { AdminStack } from './AdminStack'
import { StudentDash } from '../screens/student/StudentDash'
import { StudentStack } from './StudentStack'

const Stack = createNativeStackNavigator()

export const RootStack = () => {
  return (
    <>
      <NavigationContainer>
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
            name='LoadingPage'
            component={FirstSrn}
            // options={{ navigationBarHidden: true }}
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='SingUp'
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='User'
            component={UserStack}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='Teacher'
            component={TeacherStack}
            options={{
              headerShown: false,
            }}
          />
           <Stack.Screen
            name='Admin'
            component={AdminStack}
            options={{
              headerShown: false,
            }}
            />
            <Stack.Screen
            name='StudentStack'
            component={StudentStack}
            options={{
              headerShown: false,
            }}
          />
          {/* <Stack.Screen
            name='UploadLink'
            component={UploadLink}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='UploadNote'
            component={UploadNote}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='UpdateLink'
            component={UpdateLink}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='UpdateNote'
            component={UpdateNote}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='Comments'
            component={Comment}
            options={{
              headerShown: false,
            }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
