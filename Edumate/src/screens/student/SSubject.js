import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  ButtonText,
  DrawerBtn,
  PageTitle,
  StyledButton,
  StyledContainer,
} from "../../constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshControl, ScrollView,StyleSheet } from "react-native";
import { collection, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from "../../../core/config";

export const SSubject = ({ navigation,route }) => {

  const getstream = route.params.stream;
  const getid = route.params.id;
  // console.log(getstream);
  // const id = getid.fid
  const [refreshing, setRefreshing] = useState(true)
  const [item, setItem] = useState([]);
  const drawer = useRef(null);
  const [stream, setStream] = useState("");


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const q = query(
      collection(db,'subject'),
      where("streamname","==",getstream)
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
      <ScrollView
    // refreshControl={
    //   <RefreshControl refreshing={refreshing} onRefresh={loadData} />
    // }
      >
      <StatusBar style="dark" />
      <PageTitle style={styles.h}>Subject</PageTitle>
      {item.map((r) => {
        return (
          <StyledButton
          style={styles.hc}
            onPress={() => {
              navigation.navigate("Studentsubject", { name: r.data.subjectname,id:getid });
            }}
          >
            <ButtonText>{r.data.subjectname}</ButtonText>
          </StyledButton>
        );
      })}

      </ScrollView>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  scrollView: {
    // flex: 1,
    // backgroundColor: 'pink',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  h:{
    marginTop:40,
    marginBottom:70,
  },
  hc:{
    marginTop:30,
  }
});
