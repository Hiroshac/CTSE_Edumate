import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, Text, Button, Pressable } from "react-native";
import Feedback from "../student/StudentFeedback.js";
import { Octicons, Ionicons, Fontisto, Entypo, AntDesign, MaterialIcons,FontAwesome5 } from "@expo/vector-icons";

import {
  ButtonText,
  PageTitle,
  RowButton,
  StyledButton,
  StyledContainer,
} from "../../constants/styles.js";

export const StudentSubject = ({ navigation, route }) => {
  const getname = route.params;
  const name = getname.name;
  const sid = getname.id;
  console.log(name);
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <PageTitle style={style.h}>{name}</PageTitle>
      <RowButton
        style={style.btn}
        onPress={() => {
          navigation.navigate("StudentNotes",{name:name});
        }}
      >
          <Entypo name="book" size={24} color="black" />
        <Text style={{marginLeft:25,fontSize:25}}>Metarial</Text>
      </RowButton>
      <RowButton
        onPress={() => {
          navigation.navigate("StudentFeedback",{name:name,id:sid});
        }}
        style={style.btn}
      >
        <AntDesign name="calendar" size={24} color="black" />
        <Text style={{marginLeft:25,fontSize:25}}>FeedBack</Text>
      </RowButton>
      <RowButton
        onPress={() => {
          navigation.navigate("AnswerUpload",{name:name,id:sid});
        }}
        style={style.btn}
      >
        <FontAwesome5 name="bookmark" size={24} color="black" />
        <Text style={{marginLeft:25,fontSize:25}}>Answers</Text>
      </RowButton>
    </StyledContainer>
  );
};

const style = StyleSheet.create({
  btn: {
    marginTop: 50,
  },
  h:{
    marginBottom:70,
  }
});
