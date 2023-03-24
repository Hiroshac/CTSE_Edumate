import React, { useEffect, useState } from 'react'
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
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
  SafeAreaView,
  colors,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  StyledButtoWhite,
  ButtonTextWhite,
} from '../../constants/styles.js'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { collection, doc, getDoc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { db } from '../../../core/config'
const { brand, darkLight, primary } = colors

const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'

export const UpdateExam = ({  navigation, route }) => {

    const [begin, setBegin] = useState('');
    const [begint, setBegint] = useState('');
    const [endtime, setEndtime] = useState('');
    const [stream, setStream] = useState('');
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [streams, setStreams] = useState([]);
    
  const cid = route.params
  const id = cid.id

    
   const loadData = async () => {
        const q = doc(db,'exam',id);
        const docref = await getDoc(q);
        console.log(docref.data());
        setBegin(docref.data().begin);
        setBegint(docref.data().begint); 
        setEndtime(docref.data().endtime);  
        setGrade(docref.data().grade);  
        setStream(docref.data().stream);  
        setSubject(docref.data().subject);  
 
    };

    const onChangeHandler = async() =>{
            const ref = doc(db,'exam',id);
            await updateDoc(ref,{
              begin:begin,
              begint:begint,
              endtime: endtime,
              stream:stream,
              subject:subject,
              grade:grade
          });
        navigation.navigate("getexams")
      
      }

      const loadStreams = async () => {
        const q = query(
        collection(db,'stream'),
    );
          onSnapshot(q,(snapshot)=>{
            setStreams(snapshot.docs.map(doc=>({
      
        id:doc.id,
        data:doc.data()
      })))
    })
    };
  
    const loadSubjects = async () => {
      const q = query(
      collection(db,'subject'),
  );
        onSnapshot(q,(snapshot)=>{
          setSubjects(snapshot.docs.map(doc=>({
    
      id:doc.id,
      data:doc.data()
    })))
  })
  };
  
    useEffect(() => {
      loadStreams()
      loadSubjects()
      loadData();
    },[])

  return (
        <StyledContainer >
        <Text style={styles.text}> Update Exam </Text>
          <InputCd
              placeholder='Date'
              icon='calendar'
              placeholderTextColor={darkLight}
              onChangeText={(begin) => setBegin(begin)}
              value={begin}
            />
           <InputCd
              placeholder='Start time'
              icon='clock'
              placeholderTextColor={darkLight}
              onChangeText={(begint) => setBegint(begint)}
              value={begint}
            />
           <InputCd
              placeholder='End time'
              icon='clock'
              placeholderTextColor={darkLight}
              onChangeText={(endtime) => setEndtime(endtime)}
              value={endtime}
            />
            <View style={styles.Picker}>
              <Picker
                    selectedValue={stream}
                    onValueChange={(itemValue, itemIndex) =>
                    setStream(itemValue)
                    }
                    >
                    {streams.map((sub) => {
                    return (
                          <Picker.Item
                            id={sub.id}
                            label={sub.data.streamname}
                            value={sub.data.streamname}
                            />
                          )
                          })}
                  </Picker>
            </View>
            <View style={styles.Picker}>
            <Picker
                    selectedValue={subject}
                    onValueChange={(itemValue, itemIndex) =>
                    setSubject(itemValue)
                    }
                    >
                    <Picker.Item label={subject}/>
                    {subjects.map((sub) => {
                    return (
                          <Picker.Item
                            id={sub.id}
                            label={sub.data.subjectname}
                            value={sub.data.subjectname}
                            />
                          )
                          })}
                  </Picker>
            </View>
     
            <Picker
              placeholder='Grade'
              selectedValue={grade}
              value={grade}
              onValueChange={(itemValue, itemIndex) => setGrade(itemValue)}
            >
              <Picker.Item label='12 Grade' value={12} />
              <Picker.Item label='13 Grade' value={13} />
            </Picker>

            <StyledButton  onPress={onChangeHandler}>
                <ButtonText>Update</ButtonText>
           </StyledButton>
        </StyledContainer>
  )
}

export const InputCd = ({ label, icon,command, ...props }) => {
  return (
    <View>
    <StyledInputLabel>{label}</StyledInputLabel>
    <StyledTextInput {...props} />
    <RightIcon onPress={command}>
      <Octicons name={icon} size={30} color={brand} />
    </RightIcon>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: 'center',
     marginHorizontal: 16,
   },
   input: {
     height: 40,
     margin: 12,
     borderWidth: 1,
     padding: 10,
   },
   text: {
     textAlign: 'center',
     fontSize:30,
   },
 });