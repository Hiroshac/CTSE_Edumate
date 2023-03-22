import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Button, Text } from 'react-native'
import { colors } from '../constants/styles'
import { UploadLink } from '../screens/Teacher/UploadLink'
import { UploadNote } from '../screens/Teacher/UploadNote'
import { UpdateLink } from '../screens/Teacher/UpdateLink'
import { UpdateNote } from '../screens/Teacher/UpdateNote'
import { Comment } from '../screens/Teacher/Comments'
import { TeacherDash } from '../screens/Teacher/TeacherDash'
import { PaperMarking } from '../screens/Teacher/PaperMarking'
import { Answers } from '../screens/Teacher/Answers'
import UserStack from './UserStack'
import { Streams } from '../screens/admin/Streams'
import { NavigationContainer } from '@react-navigation/native'
import { Exams } from '../screens/admin/Exams'
import { Subjects } from '../screens/admin/Subjects'
import { UpdateExam } from '../screens/admin/UpdateExam'
import { UpdateStream } from '../screens/admin/UpdateStream'
import { UpdateSubject } from '../screens/admin/UpdateSubject'
import { AddStreams } from '../screens/admin/AddStreams'
import { AddSubjects } from '../screens/admin/AddSubjects'
import { AddExams } from '../screens/admin/AddExams'
import { Adminhome } from '../screens/admin/Adminhome'
const { tertiary, primary } = colors

const Stack = createNativeStackNavigator()

export const AdminStack = () => {
  return (
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
        name='Adminhome'
        component={Adminhome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='addstream' component={AddStreams} />
      <Stack.Screen name='addsubject' component={AddSubjects} />
      <Stack.Screen name='addexam' component={AddExams} />
      <Stack.Screen name='UpdateSubject' component={UpdateSubject} />
      <Stack.Screen name='UpdateStream' component={UpdateStream} />
      <Stack.Screen name='UpdateExam' component={UpdateExam} />
      <Stack.Screen name='getstreams' component={Streams} />
      <Stack.Screen name='getsubjects' component={Subjects} />
      <Stack.Screen name='getexams' component={Exams} />
    </Stack.Navigator>
  )
}

export const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
    />
  )
}
export const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>
}
