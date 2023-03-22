import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, Text, Button, Pressable } from "react-native";
import Feedback from "../student/StudentFeedback.js";
import {
  ButtonText,
  PageTitle,
  StyledButton,
  StyledContainer,
} from "../../constants/styles.js";

export const StudentSubject = ({ navigation, route }) => {
  const getname = route.params;
  const name = getname.name;

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <PageTitle style={style.h}>{name}</PageTitle>
      <StyledButton
        style={style.btn}
        onPress={() => {
          navigation.navigate("StudentNotes",{name:name});
        }}
      >
        <ButtonText>Metarial</ButtonText>
      </StyledButton>
      <StyledButton
        onPress={() => {
          navigation.navigate("StudentFeedback",{name:name});
        }}
        style={style.btn}
      >
        <ButtonText>FeedBack</ButtonText>
      </StyledButton>
      <StyledButton
        onPress={() => {
          navigation.navigate("AnswerUpload",{name:name});
        }}
        style={style.btn}
      >
        <ButtonText>Answers</ButtonText>
      </StyledButton>
    </StyledContainer>
  );
};

const style = StyleSheet.create({
  btn: {
    marginTop: 20,
  },
  h:{
    marginBottom:70,
  }
});
