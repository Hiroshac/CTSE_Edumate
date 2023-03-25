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

const { brand, darkLight, primary } = colors


export const Feedback = ({ route, navigation }) => {
  const [feedback, setFeedback] = useState([])
  const [note, setNote] = useState()
  const [teacher_id, setTeacher] = useState('')

  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')


  const getFeedback = () => {
    // axios
    //   .get(`https://edumate-backend.herokuapp.com/comment/get/${id}`)
    //   .then((res) => {
    //     setComment(res.data)
    //   })
    const userRef = query(collection(db, 'feedback'))
    const qm = query(userRef)
    // where('stream', '==', id)
    onSnapshot(qm, (querySnapshot) => {
      setFeedback(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }

  useEffect(() => {
    getFeedback()
  }, [])

  return (
    <StyledContainer>
      <StatusBar style='dark' />
      <PageTitle>Feedbacks</PageTitle>
      <InnerContainer>
        <View>
          <ScrollView>
            {feedback.map((data) => {
              return (
                <>
                  <TeacherCard key={data._id}>
                    <SubTitle>Student : {data.data.sid}</SubTitle>
                    <SubTitle1></SubTitle1>
                    <Comments>
                      <SubTitle>Comment</SubTitle>
                      <SubTitle1>{data.data.Comment}</SubTitle1>
                    </Comments>
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
