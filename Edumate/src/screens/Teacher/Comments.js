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
  SubTitle1,
  SubTitle2,
  Comments,
} from '../../constants/styles.js'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'

const { brand, darkLight, primary } = colors

const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'

export const Comment = ({ route, navigation }) => {
  const [comment, setComment] = useState([])
  const [note, setNote] = useState()
  const [teacher_id, setTeacher] = useState('')

  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')

  const { id } = route.params

  const getLink = () => {
    axios
      .get(`https://edumate-backend.herokuapp.com/comment/get/${id}`)
      .then((res) => {
        setComment(res.data)
      })
  }

  const getNote = () => {
    axios
      .get(`https://edumate-backend.herokuapp.com/teacherNote/${id}`)
      .then((res) => {
        setNote(res.data.note)
      })
  }
  useEffect(() => {
    getLink()
    getNote()
  }, [])

  return (
    <StyledContainer>
      <StatusBar style='dark' />
      <PageTitle>Comments</PageTitle>
      <InnerContainer>
        <View>
          <ScrollView>
            {comment.map((data) => {
              return (
                <>
                  <TeacherCard key={data._id}>
                    <SubTitle>Student : {data.studentName}</SubTitle>
                    <SubTitle1></SubTitle1>
                    <Comments>
                      <SubTitle>Comment</SubTitle>
                      <SubTitle1>{data.comment}</SubTitle1>
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
