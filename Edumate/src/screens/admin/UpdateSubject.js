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
  SafeAreaView,
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
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../core/config'

const { brand, darkLight, primary } = colors

const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'

export const UpdateSubject = ({ route, navigation }) => {
  const [streamname, setStreamname] = useState('')
  const [subjectname, setSubjectname] = useState('')

  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')
  const  id  = route.params.id

    
    const loadData = async () => {
      const q = doc(db,'subject',id);
      const docref = await getDoc(q);
      console.log(docref.data());
      setStreamname(docref.data().streamname);
      setSubjectname(docref.data().subjectname); 
  };

  const onChangeHandler = async() =>{
          const ref = doc(db,'subject',id);
          await updateDoc(ref,{
           streamname:streamname,
           subjectname:subjectname
        });
      navigation.navigate("getsubjects")
    
    }

  useEffect(() => {
    loadData();
  }, []);


  return (
    <StyledContainer>
    <Text style={styles.text}> Update Subject </Text>
    <InputCd
              placeholder='Stream Name'
              placeholderTextColor={darkLight}
              onChangeText={(streamname) => setStreamname(streamname)}
              value={streamname}
            />
              <InputCd
              placeholder='Subject Name'
              placeholderTextColor={darkLight}
              onChangeText={(subjectname) => setSubjectname(subjectname)}
              value={subjectname}
            />
    
      <StyledButton onPress={onChangeHandler}>
             <ButtonText>Update</ButtonText>
    </StyledButton>
  </StyledContainer>
  )
}

export const InputCd = ({ label, icon, ...props }) => {
  return (
    <View>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      <RightIcon>
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