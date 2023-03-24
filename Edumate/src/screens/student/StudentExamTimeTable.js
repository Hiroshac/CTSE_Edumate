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
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../../core/config'

const { brand, darkLight, primary } = colors

// const API_URL =
//   Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'

export const StudentExamTimeTable = ({navigation,route}) => {

  const getstream = route.params.stream;
  // const get = getstream.stream;
    const [exams, setExams] = useState([])

    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('')
  
  
      useEffect(() => {
        loadData();
      }, []);
    
      const loadData = async () => {
        const q = query(
          collection(db,'exam'),
          where("stream","==",getstream)
        );
        onSnapshot(q,(snapshot)=>{
          setExams(snapshot.docs.map(doc=>({
            id:doc.id,
            data:doc.data()
          })))
        })
      };
    

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
                  <TeacherCard id={e.data.id} style={{padding:15}}>
                    <TeacherCardRow>
                      <TeacherCardColumn>
                        <AdminContent>
                          Date :  {e.data.begin}
                        </AdminContent>
                        <AdminContent>
                          Start Time :  {e.data.begint}
                        </AdminContent>
                        <AdminContent>
                          End Time :  {e.data.endtime}
                        </AdminContent>
                        <AdminContent>
                          Stream :  {e.data.stream}
                        </AdminContent>
                        <AdminContent>
                          Subject : {e.data.subject}
                        </AdminContent>
                        <AdminContent>
                          Grade : {e.data.grade}
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
