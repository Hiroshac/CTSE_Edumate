import { StatusBar } from 'expo-status-bar'
import { addDoc, collection, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../../core/config';
import { ButtonText, PageTitle, StyledButton, StyledContainer, StyledInputLabel, StyledTextInput } from '../../constants/styles'

export const StudentFeedback = ({navigation,route}) => {

  const getname = route.params
  const subjectname = getname.name
  const sid = getname.id

  // const [subject, setSubject] = useState();
  const [Comment, setComment] = useState();

  // const data = { subject, Comment };

   const onChangeHandler = async() => {
    await addDoc(collection(db,"feedback"),{
      Comment:Comment,
      subject:subjectname,
      sid:sid
    });
    console.log("Add");
    navigation.navigate("Studentsubject",{ name: subjectname,id:id });
  };

  // const onChangeHandler = async() => {
  //   await addDoc((collection(db,'feedback'),{
  //     comment:Comment,
  //     subject:subject
  //   }).then(()=>{
  //     navigation.navigate("StudentDash");
  //   }))
  // };

  return (
    <StyledContainer>
        <StatusBar style="dark" />
        <PageTitle>Feed Back</PageTitle>
        <StyledInputLabel>Subject</StyledInputLabel>
        <StyledTextInput
        value={subjectname}
        // onChangeText={(subjectname) => setSubject(subjectname)}
        />
        <StyledInputLabel>FeedBack</StyledInputLabel>
        <StyledTextInput
        value={Comment}
        onChangeText={(Comment) => setComment(Comment)}
        />
        <StyledButton onPress={onChangeHandler}>
          <ButtonText>UPLOAD</ButtonText>
        </StyledButton>
    </StyledContainer>
  )
}
