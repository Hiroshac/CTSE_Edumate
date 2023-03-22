import React, { useEffect, useState } from 'react'
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Platform,
  Picker
} from 'react-native'
import axios from 'axios'
import { Input } from '../../constants/InputField'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  RightIcon,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  StyledTextInput,
  colors,
} from '../../constants/styles.js'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'

const { brand, darkLight, primary } = colors


export const AddSubjects = ({navigation}) => {

  const [streamname, setStreamname] = useState('')
  const [subjectname, setSubjectname] = useState('')
  const [streams, setStreams] = useState([])

  const formData = {streamname, subjectname}

  const onChangeHandler = () => {
    const url = `https://edumate-backend.herokuapp.com/subject/add`
    axios.post(url, formData).then((res) => {
      alert('Subject added')
      navigation.navigate("getsubjects")
    })
  }

  const loadStreams = async () => {
    const url = `https://edumate-backend.herokuapp.com/stream/`
    await axios.get(url).then((res) => {
        setStreams(res.data)
    })
  }

  useEffect(() => {
    loadStreams()
  })

    const getMessage = () => {
      const status = isError ? `Error: ` : `Success: `
      return status + message
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}> Add Subject </Text>
          {/* <Picker
              selectedValue={streamname}
              onValueChange={(itemValue, itemIndex) => setStreamname(itemValue)}
            >
              {streams.map((s)=>{
                return(
                  <Picker.Item  value={s.streamname} />
                )
              })}
            
            </Picker> */}
            <InputCd
              placeholder='Stream Name'
              placeholderTextColor={darkLight}
              value={streamname}
              onChangeText={(streamname) => setStreamname(streamname)}
            />
              <InputCd
              placeholder='Subject Name'
              placeholderTextColor={darkLight}
              value={subjectname}
              onChangeText={(subjectname) => setSubjectname(subjectname)}
            />
          <StyledButton onPress={onChangeHandler}>
                 <ButtonText>Add</ButtonText>
        </StyledButton>
      </SafeAreaView>
    );
    
}


export const InputCd = ({ label, icon, ...props }) => {
  return (
    <View>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      <RightIcon>
        <Octicons name={icon} size={30}  />
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

