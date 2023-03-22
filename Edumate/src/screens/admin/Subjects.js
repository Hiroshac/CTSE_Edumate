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
  RefreshControl,
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


export const Subjects = ({ navigation }) => {
  const drawer = useRef(null)

  const [refreshing, setRefreshing] = useState(true)
  const [subjects, setSubjects] = useState([])

  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')

  const deleteSubject = (id) => {
    axios
      .delete(`https://edumate-backend.herokuapp.com/subject/${id}`)
      .then((res) => {
        alert('Successfully deleted')
        loadDate()
      })
  }

  const loadDate = () => {
    const url = `https://edumate-backend.herokuapp.com/subject/`
    axios.get(url).then((res) => {
      setRefreshing(false)
      setSubjects(res.data)
    })
  }

  const Logout = () => {
    AsyncStorage.removeItem('user')
    navigation.navigate('Login')
  }
  
  useEffect(() => {
    loadDate()
  }, [])

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
          navigation.navigate('addsubject')
        }}
      >
        <Text>Add Subject</Text>
      </DrawerBtn>
      <DrawerBtn
        onPress={() => {
          navigation.navigate('getsubjects')
        }}
      >
        <Text>View Subjects</Text>
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
      <AdminContainer>
        <StatusBar style='dark' />
        <View>
          <PageTitle>Subjects</PageTitle>
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
        <InnerContainer>
          <View>
            <ScrollView
             refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={loadDate} />
            }
            >
              {subjects.map((e) => {
                return (
                  <>
                    <AdminCard id={e._id}>
                      <TeacherCardRow>
                        <TeacherCardColumn>
                          <AdminContent>Stream : {e.streamname}</AdminContent>
                          <AdminContent>Subject : {e.subjectname}</AdminContent>
                        </TeacherCardColumn>
                        <TeacherCardColumn>
                          <TeacherDashContentButton
                            onPress={() => {
                              navigation.navigate('UpdateSubject', {
                                id: e._id,
                              })
                            }}
                          >
                            <Octicons
                              size={20}
                              color={darkLight}
                              name='pencil'
                            />
                          </TeacherDashContentButton>
                          <TeacherDashContentButton
                            onPress={() => {
                              deleteSubject(e._id)
                            }}
                          >
                            <Octicons
                              size={20}
                              color={darkLight}
                              name='trash'
                            />
                          </TeacherDashContentButton>
                        </TeacherCardColumn>
                      </TeacherCardRow>
                    </AdminCard>
                  </>
                )
              })}
            </ScrollView>

            <View></View>
          </View>
        </InnerContainer>
      </AdminContainer>
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
