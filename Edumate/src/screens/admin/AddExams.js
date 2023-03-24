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
} from '../../constants/styles.js'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { addDoc, collection, doc, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../../core/config'

const { brand, darkLight, primary } = colors


export const AddExams = ({navigation}) => {

    const [day, setDay] = useState(new Date());
    const [day1, setDay1] = useState(new Date());
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [stream, setStream] = useState('');
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');
    
    const [subjects, setSubjects] = useState([]);
    const [streams, setStreams] = useState([]);

    const validateDate = day
    var begin = validateDate.toLocaleDateString('en-GB')
  
    var begint = validateDate.toLocaleTimeString('en-GB')

    const validateDate1 = day1
  
    var endtime = validateDate1.toLocaleTimeString('en-GB')

    const onChangeHandler = async() => {
      await addDoc(collection(db,"exam"),{
        begin:begin,
        begint:begint,
        endtime: endtime,
        stream:stream,
        subject:subject,
        grade:grade
    }
    );
    navigation.navigate("getexams")
  }
   
    const getMessage = () => {
      const status = isError ? `Error: ` : `Success: `
      return status + message
    }

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate
      setDay(currentDate)
    }
  
    const showMode = (currentMode) => {
      DateTimePickerAndroid.open({
        value: day,
        onChange,
        mode: currentMode,
      })
    }

    const onChange1 = (event, selectedDate) => {
      const currentDate = selectedDate
      setDay1(currentDate)
    }
  
    const showMode1 = (currentMode) => {
      DateTimePickerAndroid.open({
        value: day1,
        onChange1,
        mode: currentMode,
      })
    }
  
    const showDatepicker = () => {
      showMode('date')
    }
  
    const showTimepicker = () => {
      showMode('time')
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
  },[])
  
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}> Add Exam </Text>
          <InputCd
              placeholder='Date'
              placeholderTextColor={darkLight}
              icon='calendar'
              command={showDatepicker}
              value={day.toLocaleDateString()}
              // onChangeText={(date) => setDate(date)}
            />
           <InputCd
              placeholder='Start time'
              placeholderTextColor={darkLight}
              icon='clock'
              command={showTimepicker}
              value={day.toLocaleTimeString()}
            />
            <InputCd
              placeholder='End time'
              placeholderTextColor={darkLight}
              icon='clock'
              command={showTimepicker}
              value={day1.toLocaleTimeString()}
            />
            <View style={styles.Picker}>
              <Picker
                    selectedValue={stream}
                    onValueChange={(itemValue, itemIndex) =>
                    setStream(itemValue)
                    }
                    >
                    <Picker.Item label='Choose Stream' />
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
                    <Picker.Item label='Choose Subject' />
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
              onValueChange={(itemValue, itemIndex) => setGrade(itemValue)}
            >
              <Picker.Item label='12 Grade' value={12} />
              <Picker.Item label='13 Grade' value={13} />
            </Picker>

          <StyledButton  onPress={onChangeHandler}>
                 <ButtonText>Add</ButtonText>
        </StyledButton>
      </SafeAreaView>
    );   
}

export const InputCd = ({ label, icon, command,...props }) => {
  return (
    <View>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      <RightIcon onPress={command}>
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