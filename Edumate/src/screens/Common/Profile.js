import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  colors,
  StyledButtoWhite,
  ButtonTextWhite,
  ProfileInnerContainer,
  StyledButton,
  ButtonText,
} from '../../constants/styles'
import { StatusBar } from 'expo-status-bar'
import { getDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../../core/config'
import { getAuth } from '@firebase/auth'
const { primary } = colors

// var userId = 'MdaHUyN5DV2gCB8E3rgB'
// AsyncStorage.getItem('user').then((value) => {
//   userId = value
// })

export default function Profile({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [role, setRole] = useState('')
  const [stream, setStream] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const [userId, setUserId] = useState(null)
  const auth = getAuth
  const user = auth.currentUser
  // console.log(user.uid)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('@user').then(async (value) => {
        setUserId(value)
        const q = doc(db, 'user', value)
        const docSnap = await getDoc(q)
        const res = docSnap.data()
        const name = res.firstName + ' ' + res.lastName
        setName(name)
        setEmail(res.email)
        setDob(res.dateOfBirth)
        setRole(res.type)
        setStream(res.stream)
        setRefreshing(false)
      })
    } catch (e) {
      console.log('Fail to get user')
    }
  }

  // useEffect(() => {
  //     loadData()
  // }, [])
  const loadData = async () => {
    const q = doc(db, 'user', userId)
    const docSnap = await getDoc(q)
    const res = docSnap.data()
    const name = res.firstName + ' ' + res.lastName
    setName(name)
    setEmail(res.email)
    setDob(res.dateOfBirth)
    setRole(res.type)
    setStream(res.stream)
    setRefreshing(false)
  }

  const deleteProfile = async () => {
    const userDocRef = doc(db, 'user', userId)
    await deleteDoc(userDocRef)
      .then(() => {
        alert('Profile Successfully deleted')
        navigation.navigate('Login')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadData} />
      }
    >
      <View style={styles.page}>
        <StatusBar style='dark' />
        <ProfileInnerContainer>
          <Image
            source={require('../../../assets/Teacher.png')}
            style={styles.buttonImageIconStyle}
          />
          <Text style={{ fontSize: 28, marginTop: 20 }}>
            {name == '' ? 'John Smith' : name}
          </Text>
        </ProfileInnerContainer>
        <View style={styles.outterView}>
          <View style={{ margin: 5, marginBottom: 40 }}>
            <View style={styles.tagOuterView}>
              <View style={styles.tagInnerView}>
                <Text style={styles.label}>Email : </Text>
              </View>
              <View>
                <Text style={styles.details}>
                  {email == '' ? 'smdnipun@gmail.com' : email}
                </Text>
              </View>
            </View>
            <View style={styles.tagOuterView}>
              <View style={styles.tagInnerView}>
                <Text style={styles.label}>Date of Birth : </Text>
              </View>
              <View style={styles.tagInnerView}>
                <Text style={styles.label}>{dob == '' ? '-' : dob}</Text>
              </View>
            </View>
            <View style={styles.tagOuterView}>
              <View style={styles.tagInnerView}>
                <Text style={styles.label}>Role : </Text>
              </View>
              <View style={styles.tagInnerView}>
                <Text style={styles.label}>
                  {role == '' ? 'Student' : role}
                </Text>
              </View>
            </View>
            <View style={styles.tagOuterView}>
              <View style={styles.tagInnerView}>
                <Text style={styles.label}>Stream : </Text>
              </View>
              <View style={styles.tagInnerView}>
                <Text style={styles.label}>
                  {stream == '' ? 'Combined Maths' : stream}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.tagOuterView}>
            <View style={styles.tagInnerView}>
              <StyledButtoWhite
                onPress={() => {
                  navigation.navigate('UpdateDetails')
                }}
              >
                <ButtonTextWhite>Update Details</ButtonTextWhite>
              </StyledButtoWhite>
            </View>
            {/* <View style={styles.tagInnerView}>
              <StyledButtoWhite
                onPress={() => {
                  navigation.navigate('UpdatePassword')
                }}
              >
                <ButtonTextWhite>Reset Password</ButtonTextWhite>
              </StyledButtoWhite>
            </View> */}
          </View>
          <StyledButton onPress={deleteProfile}>
            <ButtonText>Delete Profile</ButtonText>
          </StyledButton>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: 'center',
  },
  page: {
    flex: 1,
    padding: 15,
    paddingTop: 80,
    backgroundColor: primary,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 150,
    width: 150,
    resizeMode: 'stretch',
  },
  outterView: {
    flex: 1,
    marginTop: 10,
    margin: 10,
  },
  label: {
    fontSize: 18,
  },
  details: {
    fontSize: 18,
    textAlign: 'center',
  },
  tagOuterView: {
    marginTop: 30,
    flexDirection: 'row',
  },
  tagInnerView: {
    flex: 1,
  },
})
