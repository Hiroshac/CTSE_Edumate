import React, { useEffect, useState } from 'react'
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native'
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
  SubTitle1,
  SubTitle2,
  Comments,
} from '../../constants/styles.js'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../../core/config'
import { getAuth } from 'firebase/auth'

const { brand, darkLight, primary } = colors

export const Marks = ({ route, navigation }) => {
  const [mark, setMark] = useState([])
  const [note, setNote] = useState()
  const [teacher_id, setTeacher] = useState('')

  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')
  const auth = getAuth()
  const user = auth.currentUser
  const getMarks = () => {
     const marksRef = query(collection(db, 'marks'))
     const qm = query(marksRef, where('userId', '==', user.uid))
     onSnapshot(qm, (querySnapshot) => {
       setMark(
         querySnapshot.docs.map((doc) => ({
           id: doc.id,
           data: doc.data(),
         }))
       )
     })
  }

  useEffect(() => {
    getMarks()
  }, [])

  return (
    <StyledContainer>
      <StatusBar style='dark' />
      <PageTitle>Marked papers</PageTitle>
      <InnerContainer>
        <View>
          <ScrollView>
            {mark.map((data) => {
              return (
                <>
                  <TeacherCard key={data.id}>
                    <SubTitle>Student : {data.data.student_id}</SubTitle>
                    <SubTitle1></SubTitle1>
                    <SubTitle>Mark</SubTitle>
                    <SubTitle1>{data.data.mark}</SubTitle1>
                    <>
                      <SubTitle>Comment</SubTitle>
                      <SubTitle1>{data.data.comment}</SubTitle1>
                    </>
                  </TeacherCard>
                </>
              )
            })}
          </ScrollView>
          <View></View>
        </View>
      </InnerContainer>
    </StyledContainer>
  )
}
