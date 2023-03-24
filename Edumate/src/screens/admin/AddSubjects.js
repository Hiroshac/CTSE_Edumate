import React, { useEffect, useState } from 'react'
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native'
import { Input } from '../../constants/InputField'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  RightIcon,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  StyledTextInput,
  colors,
  StyledContainer,
} from '../../constants/styles.js'
import { Picker } from '@react-native-picker/picker'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { addDoc, collection, doc, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../../core/config'

const { brand, darkLight, primary } = colors


export const AddSubjects = ({navigation}) => {

  const [streamname, setStreamname] = useState('')
  const [subjectname, setSubjectname] = useState('')
  const [streams, setStreams] = useState([])

  const onChangeHandler = async() => {
      await addDoc(collection(db,"subject"),{
      streamname:streamname,
      subjectname:subjectname
    }
    );

    navigation.navigate("getsubjects")

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

  useEffect(() => {
    loadStreams()
  },[])

    const getMessage = () => {
      const status = isError ? `Error: ` : `Success: `
      return status + message
    }
  
    return (
      <StyledContainer>
      <Text style={styles.text}> Add Subject </Text>
             <View style={styles.Picker}>
                <Picker
                      selectedValue={streamname}
                      onValueChange={(itemValue, itemIndex) =>
                      setStreamname(itemValue)
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

