import React, { useEffect, useRef, useState } from 'react'
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  Image,
  SafeAreaView,
  RefreshControl
} from 'react-native'
import axios from 'axios'
import { Input } from '../../constants/InputField'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  ButtonText,
  drawer,
  colors,
  DrawerBtn,
  TeacherCardColumn,
  TeacherDashContentButton,
  TeacherCardRow,
  AdminContainer,
  StreamCard,
  AdminContent,
  LogoutBtn,
  DrawerIcon,
  AdminCard,
  TeacherCard,
} from '../../constants/styles.js'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { DrawerLayoutAndroid, StyleSheet } from 'react-native'

const { brand, darkLight, primary } = colors

const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

export const Exams = (
  {navigation}) => {
    const drawer = useRef(null)

  const [exams, setExams] = useState([])
  const [refreshing, setRefreshing] = useState(true)
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')

  const deleteExam = (id) => {
    axios.delete(`https://edumate-backend.herokuapp.com/examtime/${id}`)
    alert('Successfully deleted');
  }

  const loadExams = async () => {
    const url = `https://edumate-backend.herokuapp.com/examtime/`
    await axios.get(url).then((res) => {
      setRefreshing(false)
      setExams(res.data)
    })
  }

  useEffect(() => {
    loadExams()
  })

  const getMessage = () => {
    const status = isError ? `Error: ` : `Success: `
    return status + message
  }

  const Logout = () => {
    AsyncStorage.removeItem('user')
    navigation.navigate('Login')
  }

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <View style={styles.row}>
        <View>
          <Image
            source={require('../../../assets/Picture1.png')}
            style={styles.drawerImage}
          />
        </View>
        <View style={styles.rowInside}>
          <Text style={styles.paragraph}>Edumate</Text>
        </View>
      </View>
      <DrawerBtn
        onPress={() => {
          navigation.navigate('addexam')
        }}
      >
        <Text>Add Exam</Text>
      </DrawerBtn>
      <DrawerBtn
        onPress={() => {
          navigation.navigate('getexams')
        }}
      >
        <Text>View Exams</Text>
      </DrawerBtn>
      <DrawerBtn
        onPress={() => {
          navigation.navigate('User')
        }}
      >
        <Text>User Profile</Text>
      </DrawerBtn>
      <LogoutBtn onPress={Logout}>
        <ButtonText>Logout</ButtonText>
      </LogoutBtn>
    </View>
  )

  return (
    <DrawerLayoutAndroid
    ref={drawer}
    drawerWidth={300}
    drawerPosition={'right'}
    renderNavigationView={navigationView}
    >
    <StyledContainer>
    <View>
      <PageTitle>Exams</PageTitle>
          <DrawerIcon>
            <TouchableOpacity
              title='Open drawer'
              onPress={() => drawer.current.openDrawer()}
            >
              <View>
                <Octicons size={20} color={darkLight} name='three-bars' />
              </View>
            </TouchableOpacity>
          </DrawerIcon>
    </View>
      <StatusBar style='dark' />
      <InnerContainer>
        <View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={loadExams} />
            }
          >
            {exams.map((e) => {
              return (
                <>
                  <TeacherCard id={e._id}>
                    <TeacherCardRow>
                      <TeacherCardColumn>
                        <AdminContent>
                          Date :    {e.day}
                        </AdminContent>
                        <AdminContent>
                          Start Time :    {e.start}
                        </AdminContent>
                        <AdminContent>
                          End Time :    {e.end}
                        </AdminContent>
                        <AdminContent>
                          Stream :    {e.stream}
                        </AdminContent>
                        <AdminContent>
                          Subject :   {e.subject}
                        </AdminContent>
                        <AdminContent>
                          Grade :   {e.grade}
                        </AdminContent>
                      </TeacherCardColumn>
                      <TeacherCardColumn>
                        <TeacherDashContentButton
                          onPress={() => {
                            navigation.navigate('UpdateExam',{id:e._id})
                          }}
                        >
                          <Octicons size={20} color={darkLight} name='pencil' />
                        </TeacherDashContentButton>
                        <TeacherDashContentButton
                          onPress={() => {
                            deleteExam(e._id)
                          }}
                        >
                          <Octicons size={20} color={darkLight} name='trash' />
                        </TeacherDashContentButton>                
                      </TeacherCardColumn>
                    </TeacherCardRow>
                  </TeacherCard>
                </>
              )
            })}
          </ScrollView>

          <View></View>
        </View>
      </InnerContainer>
    </StyledContainer>
    </DrawerLayoutAndroid>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 15,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    paddingLeft: 10,
    fontSize: 40,
    marginTop: 0,
    paddingTop: 0,
  },
  row: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  rowInside: {
    marginBottom: 10,
  },
  drawerImage: {
    height: 45,
    width: 60,
    resizeMode: 'stretch',
  },
  btnLogout: {
    backgroundColor: '#E14545',
  },
})
   

   

