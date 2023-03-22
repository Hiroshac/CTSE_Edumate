import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  DrawerLayoutAndroid,
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
import axios from 'axios'
const { primary } = colors

var userId = ''
AsyncStorage.getItem('user').then((value) => {
  userId = value
})

export default function Profile({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [role, setRole] = useState('')
  const [stream, setStream] = useState('')
  const [refreshing, setRefreshing] = useState(true)

  useEffect(() => {
    loadData()
  }, [])
  const loadData = async () => {
    await axios
      .get(`https://edumate-backend.herokuapp.com/api/users/${userId}`)
      .then((res) => {
        const name = res.data.firstName + ' ' + res.data.lastName
        setName(name)
        setEmail(res.data.email)
        setDob(res.data.dateOfBirth)
        setRole(res.data.type)
        setStream(res.data.stream)
        setRefreshing(false)
      })
  }

  const deleteProfile = async () => {
    await axios
      .delete(`https://edumate-backend.herokuapp.com/api/users/${userId}`)
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
            <View style={styles.tagInnerView}>
              <StyledButtoWhite
                onPress={() => {
                  navigation.navigate('UpdatePassword')
                }}
              >
                <ButtonTextWhite>Reset Password</ButtonTextWhite>
              </StyledButtoWhite>
            </View>
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
