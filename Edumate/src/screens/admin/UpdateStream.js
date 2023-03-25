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
import { collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../../core/config'

const { brand, darkLight, primary } = colors

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const UpdateStream = ({ route, navigation }) => {
  const [streamname , setStreamname ] = useState('')

  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')

  const cid = route.params
  const id = cid.id

  const getMessage = () => {
    const status = isError ? `Error: ` : `Success: `
    return status + message
  }

  const onChangeHandler = async() =>{
    const ref = doc(db,'stream',id);
    await updateDoc(ref,{
     streamname:streamname
    });
  navigation.navigate("getstreams")
}
    
  const loadData = async () => {
        const q = doc(db,'stream',id);
        const docref = await getDoc(q);
        setStreamname(docref.data().streamname);
  };

  useEffect(() => {
    loadData();
  }, []);


  return (
    <StyledContainer>
    <Text style={styles.text}> Update Stream </Text>
            <InputCd
              placeholder='Stream Name'
              placeholderTextColor={darkLight}
              onChangeText={(streamname) => setStreamname(streamname)}
              value={streamname}
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