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
  Linking,
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
} from '../../constants/styles.js'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import {
  doc,
  updateDoc,
  collection,
  query,
  getDoc,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore'
import { db } from '../../../core/config'

const { brand, darkLight, primary } = colors

export const Answers = ({ navigation }) => {
  const [answer, setAnswers] = useState([])
  const [teacher_id, setTeacher] = useState('')
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')

  const stream = 'Physics'
  const loadData = async () => {
    const answer = query(collection(db, 'answer'))
    const qm = query(
      answer,
      where('status', '==', 'none', '&&', 'subjectname', '==', stream)
    )
    onSnapshot(qm, (querySnapshot) => {
      setAnswers(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }

  useEffect(() => {
    loadData()
  }, [])
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
                <ScrollView>
                  <TeacherCard key={answer.id}>
                    <TeacherCardRow>
                      <TeacherCardColumn>
                        <TeacherDashContent>
                          Subect : {answer.data.subjectname}
                        </TeacherDashContent>
                        <TeacherDashContent>
                          {/* Grade {answer.data.grade} */}
                        </TeacherDashContent>
                        <TeacherDashContent>
                          Student Id : {answer.data.username}
                        </TeacherDashContent>
                      </TeacherCardColumn>
                      <TeacherCardColumn>
                        <TeacherDashContentButton
                          onPress={() => {
                            navigation.navigate('PaperMarking', {
                              id: answer.id,
                            })
                          }}
                        >
                          <Octicons size={20} color={darkLight} name='pencil' />
                        </TeacherDashContentButton>
                        <TeacherDashContentButton
                          onPress={() => Linking.openURL(answer.data.image)}
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
                </ScrollView>
              )
            })}
          </ScrollView>
          <View></View>
        </View>
      </InnerContainer>
    </StyledContainer>
  )
}
