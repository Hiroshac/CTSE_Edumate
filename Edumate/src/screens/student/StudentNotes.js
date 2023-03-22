import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Pressable,
  Linking,
} from "react-native";
import {
  ButtonText,
  PageTitle,
  StyledButton,
  StyledButtoWhite,
  StyledContainer,
  colors,
  SAStyledButton,
} from "../../constants/styles.js";
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
const { brand, darkLight, primary } = colors;

export const StudentNotes = ({ navigation, route }) => {
  const [item, setItem] = useState([]);
  const getname = route.params;
  const name = getname.name;

  // useEffect(() => {
  //   axios.post("/teacherNote/notes", { subject: name }).then(async(res) => {
  //     setItem(res.data);
  //     console.log(item);
  //   });
  // },[]);

  axios
    .post("https://edumate-backend.herokuapp.com/teacherNote/notes", {
      subject: name,
    })
    .then(async (res) => {
      setItem(res.data);
    });
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <PageTitle>{name}</PageTitle>
      {item.map((r) => {
        return (
          <SAStyledButton
            onPress={() => Linking.openURL(r.note)}
            style={style.btn}
          >
            <Octicons size={40} color={darkLight} name="download" />
            <Text>{r.lesson_name}</Text>
          </SAStyledButton>
        );
      })}
    </StyledContainer>
  );
};

const style = StyleSheet.create({
  btn: {
    marginTop: 20,
  },
});
