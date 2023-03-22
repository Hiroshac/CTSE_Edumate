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
  Linking
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
} from '../../constants/styles.js'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'

const { brand, darkLight, primary } = colors

const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'

export const Answers = ({navigation}) => {
  const [answer, setAnswers] = useState([])
  
  const [teacher_id, setTeacher] = useState('')

  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')

  const stream = 'Science'
  const loadData=()=>{
    const url = `https://edumate-backend.herokuapp.com/StudentAnswers/getBySubject/${stream}`
  axios.get(url).then((res) => {
    setAnswers(res.data)
    
      
    })
  }

  useEffect(() => {
    loadData()
  },[])
  const getMessage = () => {
    const status = isError ? `Error: ` : `Success: `
    return status + message
  }

  return (
    <StyledContainer>
      <StatusBar style='dark' />
      <PageTitle>Answers</PageTitle>
      <InnerContainer>
        <View>
          <ScrollView>
            {answer.map((answer) => {
              return (
                <>
                  <TeacherCard key={answer._id}>
                    <TeacherCardRow>
                      <TeacherCardColumn>
                        <TeacherDashContent>
                          Subect : {answer.subject}
                        </TeacherDashContent>
                        <TeacherDashContent>
                          Grade {answer.grade}
                        </TeacherDashContent>
                        <TeacherDashContent>
                          Student Id : {answer.student_id}
                        </TeacherDashContent>
                      </TeacherCardColumn>
                      <TeacherCardColumn>
                        <TeacherDashContentButton
                          onPress={() => {
                            navigation.navigate('PaperMarking', {
                              id: answer._id,
                            })
                          }}
                        >
                          <Octicons size={20} color={darkLight} name='pencil' />
                        </TeacherDashContentButton>
                        <TeacherDashContentButton
                          onPress={() => Linking.openURL(answer.image)}
                        >
                          <Octicons
                            size={20}
                            color={darkLight}
                            name='download'
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
    </StyledContainer>
  )
}
