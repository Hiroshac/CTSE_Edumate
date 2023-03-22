import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import axios from "axios";
import {
  ButtonText,
  PageTitle,
  StyledButton,
  StyledContainer,
  StyledInputLabel,
  StyledTextInput,
} from "../../constants/styles";

export const StudentComment = () => {
  const [subject, setSubject] = useState();
  const [comment, setComment] = useState();

  const data = { subject, comment };

  const onChangeHandler = () => {
app.use('/comment', commentRouter)
const url = `https://edumate-backend.herokuapp.com/comment/add`;
    axios.post(url, data).then((res) => {
      alert("comment added");
    });
  };
  return (
    <StyledContainer>
        <StatusBar style='dark'/>
        <PageTitle>Comment</PageTitle>
        <StyledInputLabel>Subject</StyledInputLabel>
        <StyledTextInput
         value={subject}
         onChangeText={(subject) => setSubject(subject)}
         />
        <StyledInputLabel>Comment</StyledInputLabel>
        <StyledTextInput
            value={comment}
            onChangeText={(comment) => setComment(comment)}
        />
        <StyledButton onPress={onChangeHandler}>
            <ButtonText>UPLOAD</ButtonText>
        </StyledButton>
    </StyledContainer>
  );
};
