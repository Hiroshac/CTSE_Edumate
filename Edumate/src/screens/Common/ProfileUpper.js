import { StyleSheet, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { InnerContainer } from '../../constants/styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../../core/config'

var userId = 'x1jVSFpohBPXClIfMyoD'
// AsyncStorage.getItem('user').then((value) => {
//   userId = value
// })

export default function ProfileUpper() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [stream, setStream] = useState('')
  // const [id, setId] = useState('631790c1cd120dcba06fbf90')

  useEffect(() => {
    loadData()
  }, [])
  const loadData = async () => {
    const q = doc(db, 'user', userId)
    const docSnap = await getDoc(q)
    const res = docSnap.data()
    const name = res.data.firstName + ' ' + res.data.lastName
    setName(name)
    setRole(res.data.type)
    setStream(res.data.stream)
  }
  return (
    <>
      <StatusBar style='dark' />
      <InnerContainer>
        <Text style={{ fontSize: 28, marginBottom: 8 }}>
          {name != '' ? name : 'John Smith'}
        </Text>
        <Image
          source={require('../../../assets/Teacher.png')}
          style={styles.buttonImageIconStyle}
        />
        <Text style={styles.label}>{role != '' ? role : 'Student'}</Text>
        <Text style={styles.label}>
          {stream != '' ? stream : 'Combined Maths'}
        </Text>
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
