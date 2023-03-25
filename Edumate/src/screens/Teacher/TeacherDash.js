import React, { useEffect, useRef, useState } from 'react'
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  DrawerLayoutAndroid,
  Button,
  Image,
  Linking,
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
  SubTitle,
  StyledFormArea,
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  StyledTextInput,
  colors,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  StyledButtoWhite,
  ButtonTextWhite,
  UploadButton,
  UploadingButton,
  DiscoverTitle,
  DiscoverText,
  DashButton,
  TeacherCardColumn,
  TeacherDashContent,
  TeacherDashContentButton,
  TeacherCardRow,
  TeacherCard,
  StyledContainerDash,
  LogoutBtn,
  DrawerIcon,
  DrawerBtn,
} from '../../constants/styles.js'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { deleteDoc, doc, waitForPendingWrites, where } from 'firebase/firestore'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../../../core/config'
import { getAuth, signOut } from 'firebase/auth'
const { brand, darkLight, primary } = colors

export const TeacherDash = ({ navigation }) => {
  const drawer = useRef(null)
  const [link, setlink] = useState([])
  const [note, setNote] = useState([])
  const [refreshing, setRefreshing] = useState(true)
  const [userId, setUserId] = useState(null)
  const auth = getAuth()
  const [userDetails, setUserDetails] = useState()

  const user = auth.currentUser

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('@user').then((value) => {
        setUserId(value)
      })
    } catch (e) {
      console.log('Fail to get user')
    }
    // try {
    //   const user = await AsyncStorage.getItem('@user').then((value) => {
    //     console.log(value)
    //     setUserId(value)
    //   })
    //   console.log(user)
    // } catch (e) {
    //   console.log('Fail to get user')
    // }
    const userRef = query(collection(db, 'user'))
    const qm = query(userRef, where('uid', '==', id))
    onSnapshot(qm, (querySnapshot) => {
      setUserDetails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }

  const loadNotes = async () => {
    const q = query(
      collection(db, 'notes'),
      where('teacher_id', '==', user.uid)
    )
    onSnapshot(q, (querySnapshot) => {
      setRefreshing(false)
      setNote(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }
  const loadLinks = async () => {
    const q = query(
      collection(db, 'links'),
      where('teacher_id', '==', user.uid)
    )
    onSnapshot(q, (querySnapshot) => {
      setRefreshing(false)
      setlink(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }
  useEffect(() => {
    loadLinks()
  }, [])

  useEffect(() => {
    loadNotes()
  }, [])

  const deleteNote = (id) => {
    const linkDocRef = doc(db, 'notes', id)
    try {
      deleteDoc(linkDocRef)
      alert('deleted')
    } catch (err) {
      alert(err)
    }
  }

  const deleteLink = (id) => {
    const linkDocRef = doc(db, 'links', id)
    try {
      deleteDoc(linkDocRef)
      alert('deleted')
    } catch (err) {
      alert(err)
    }
  }

  const Logout = async () => {
    await AsyncStorage.setItem('@user', '')
    await AsyncStorage.removeItem('@user')
    await AsyncStorage.removeItem('file')
    await AsyncStorage.clear()
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.navigate('Login')
      })
      .catch((error) => {
        // An error happened.
        console.log(error)
      })
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
          navigation.navigate('UploadNote')
        }}
      >
        <Text>Upload Note</Text>
      </DrawerBtn>
      <DrawerBtn
        onPress={() => {
          navigation.navigate('UploadLink')
        }}
      >
        <Text>Upload Link</Text>
      </DrawerBtn>
      <DrawerBtn
        onPress={() => {
          navigation.navigate('Answer')
        }}
      >
        <Text>Paper Marking</Text>
      </DrawerBtn>
      <DrawerBtn
        onPress={() => {
          navigation.navigate('Feedbacks')
        }}
      >
        <Text>Feedback</Text>
      </DrawerBtn>
      <DrawerBtn
        onPress={() => {
          navigation.navigate('Marks')
        }}
      >
        <Text>Marked papers</Text>
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
  // const wait = (timeout) => {
  //   return new Promise((resolve) => setTimeout(resolve, timeout))
  // }

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true)
  //   wait(2000).then(() => setRefreshing(false))
  // }, [])

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'right'}
      renderNavigationView={navigationView}
    >
      <StyledContainerDash>
        <StatusBar style='dark' />
        <View>
          <PageTitle>Discover</PageTitle>
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
            <DiscoverTitle>
              <DiscoverText> Notes</DiscoverText>
              <DashButton>
                <Octicons size={30} color={primary} name='chevron-down' />
              </DashButton>
            </DiscoverTitle>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={loadNotes} />
              }
            >
              {note.map((notes) => {
                return (
                  <TeacherCard key={notes.id}>
                    <TeacherCardRow>
                      <TeacherCardColumn>
                        <TeacherDashContent>
                          subect : {notes.data.subject}
                        </TeacherDashContent>
                        <TeacherDashContent>
                          Lesson : {notes.data.lesson_name}
                        </TeacherDashContent>
                        <TeacherDashContent>
                          grade : {notes.data.grade}
                        </TeacherDashContent>
                        <TeacherDashContent>
                          <Text
                            style={{ color: 'blue' }}
                            onPress={() => Linking.openURL(notes.data.note)}
                          >
                            Note
                          </Text>
                        </TeacherDashContent>
                      </TeacherCardColumn>
                      <TeacherCardColumn>
                        <TeacherDashContentButton
                          onPress={() => {
                            navigation.navigate('UpdateNote', {
                              id: notes.id,
                            })
                          }}
                        >
                          <Octicons size={20} color={darkLight} name='pencil' />
                        </TeacherDashContentButton>
                        <TeacherDashContentButton
                          onPress={() => {
                            deleteNote(notes.id)
                          }}
                        >
                          <Octicons size={20} color={darkLight} name='trash' />
                        </TeacherDashContentButton>
                      </TeacherCardColumn>
                    </TeacherCardRow>
                  </TeacherCard>
                )
              })}
            </ScrollView>

            <DiscoverTitle>
              <DiscoverText> Links</DiscoverText>
              <DashButton>
                <Octicons size={30} color={primary} name='chevron-down' />
              </DashButton>
            </DiscoverTitle>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={loadLinks} />
              }
            >
              {link.map((links) => {
                return (
                  <>
                    <TeacherCard key={links.data.id}>
                      <TeacherCardRow>
                        <TeacherCardColumn>
                          <TeacherDashContent>
                            subject : {links.data.subject}
                          </TeacherDashContent>
                          <TeacherDashContent>
                            lesson : {links.data.lesson_name}
                          </TeacherDashContent>
                          <TeacherDashContent>
                            grade : {links.data.grade}
                          </TeacherDashContent>
                          <TeacherDashContent>
                            date :{links.data.date}
                          </TeacherDashContent>
                          <TeacherDashContent>
                            time : {links.data.time}
                          </TeacherDashContent>
                          <TeacherDashContent>
                            link :{links.data.link}
                          </TeacherDashContent>
                        </TeacherCardColumn>
                        <TeacherCardColumn>
                          <TeacherDashContentButton
                            onPress={() => {
                              navigation.navigate('UpdateLink', {
                                id: links.id,
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
                              deleteLink(links.id)
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
                    </TeacherCard>
                  </>
                )
              })}
            </ScrollView>

            <View></View>
          </View>
        </InnerContainer>
      </StyledContainerDash>
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
