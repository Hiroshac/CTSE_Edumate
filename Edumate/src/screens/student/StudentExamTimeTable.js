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
  SafeAreaView
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
  AdminContent,
} from '../../constants/styles.js'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'

const { brand, darkLight, primary } = colors

const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'

export const StudentExamTimeTable = () => {

    const [exams, setExams] = useState([])

    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('')
  
    const deleteExam = (id) => {
      axios.delete(`https://edumate-backend.herokuapp.com/examtime/${id}`)
    }
  
    const loadExams = async () => {
      const url = `https://edumate-backend.herokuapp.com/examtime/`
      await axios.get(url).then((res) => {
        setExams(res.data)
      })
    }
  
    useEffect(() => {
      loadExams()
    })

  return (
     <StyledContainer>
      <StatusBar style='dark' />
      <PageTitle>Exams</PageTitle>
      <InnerContainer>
        <View>
          <ScrollView>
            {exams.map((e) => {
              return (
                <>
                  <TeacherCard id={e._id}>
                    <TeacherCardRow>
                      <TeacherCardColumn>
                        <AdminContent>
                          Date :  {e.day}
                        </AdminContent>
                        <AdminContent>
                          Start Time :  {e.start}
                        </AdminContent>
                        <AdminContent>
                          End Time :  {e.end}
                        </AdminContent>
                        <AdminContent>
                          Stream :  {e.stream}
                        </AdminContent>
                        <AdminContent>
                          Subject : {e.subject}
                        </AdminContent>
                        <AdminContent>
                          Grade : {e.grade}
                        </AdminContent>
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
  )
}
