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
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../core/config.js";
const { brand, darkLight, primary } = colors;

export const StudentNotes = ({ navigation, route }) => {
  const [item, setItem] = useState([]);
  const getname = route.params;
  const name = getname.name;
  console.log(name);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const q = query(
      collection(db,'notes'),
      where("subject","==",name)
    );
    onSnapshot(q,(snapshot)=>{
      setItem(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data()
      })))
    })

  };
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <PageTitle>{name}</PageTitle>
      {item.map((r) => {
        return (
          <SAStyledButton
            onPress={() => Linking.openURL(r.data.note)}
            style={style.btn}
          >
            <Octicons size={40} color={darkLight} name="download" />
            <Text>{r.data.lesson_name}</Text>
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
