import axios from 'axios';
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { ButtonText, PageTitle, StyledButton, StyledContainer, StyledInputLabel, StyledTextInput } from '../../constants/styles'

export const StudentFeedback = ({navigation,route}) => {

  const getname = route.params
  const subjectname = getname.name

  const [subject, setSubject] = useState();
  const [Comment, setComment] = useState();

  const data = { subjectname, Comment };

  const onChangeHandler = () => {
    const url = `https://edumate-backend.herokuapp.com/subjectfeedback/add`;
    axios.post(url, data).then((res) => {
      alert("comment added");
      navigation.navigate("SSubject")
    });
  };

  return (
    <StyledContainer>
        <StatusBar style="dark" />
        <PageTitle>Feed Back</PageTitle>
        <StyledInputLabel>Subject</StyledInputLabel>
        <StyledTextInput
        value={subjectname}
        // onChangeText={(subject) => setSubject(subject)}
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
