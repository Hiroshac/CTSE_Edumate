import { StyleSheet, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { InnerContainer } from '../../constants/styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../../core/config'
import { getAuth } from '@firebase/auth'

export default function ProfileUpper() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [stream, setStream] = useState('')

  const [userId, setUserId] = useState(null)
  const auth = getAuth()
  const user = auth.currentUser

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
        setRole(res.type)
        setStream(res.stream)
      })
    } catch (e) {
      console.log('Fail to get user')
    }
  }

  return (
    <>
      <StatusBar style='dark' />
      <InnerContainer>
        <Text style={{ fontSize: 28, marginBottom: 8 }}>
          {name != '' ? name : ''}
        </Text>
        <Image
          source={require('../../../assets/Teacher.png')}
          style={styles.buttonImageIconStyle}
        />
        <Text style={styles.label}>{role != '' ? role : ''}</Text>
        <Text style={styles.label}>{stream != '' ? stream : ''}</Text>
      </InnerContainer>
    </>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 120,
    width: 120,
    resizeMode: 'stretch',
  },
})
