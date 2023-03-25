import React, { useEffect, useRef, useState } from "react";
import { Octicons, Ionicons, Fontisto, Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  ButtonText,
  DrawerBtn,
  DrawerIcon,
  LogoutBtn,
  SBox,
  StyledContainer,
  colors,
  RowButton,
} from "../../constants/styles";
import {
  Text,
  DrawerLayoutAndroid,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getAuth, signOut } from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../core/config";

const { brand, darkLight, primary } = colors;

var id = "MdaHUyN5DV2gCB8E3rgB";
AsyncStorage.getItem("user").then((value) => {
  userId = value;
});



export const StudentDash = ({ navigation }) => {
  const drawer = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [stream, setStream] = useState("");
  const [uid, setUid] = useState("");

  const user = auth.currentUser
  setUid(user.uid);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const q = doc(db,'user',id);
    const docref = await getDoc(q);
    console.log(docref.data());
    setName(docref.data().firstName);
    setEmail(docref.data().email);
    setStream(docref.data().stream);
  };

  const Logout = () => {
    AsyncStorage.removeItem("user");
    navigation.navigate("Login");
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <View style={styles.row}>
        <View>
          <Image
            source={require("../../../assets/Picture1.png")}
            style={styles.drawerImage}
          />
        </View>
        <View style={styles.rowInside}>
          <Text style={styles.paragraph}>Edumate</Text>
        </View>
      </View>
      <DrawerBtn
        onPress={() => {
          navigation.navigate("StudentDash");
        }}
      >
        <Text>User Profile</Text>
      </DrawerBtn>
      <LogoutBtn onPress={Logout}>
        <ButtonText>Logout</ButtonText>
      </LogoutBtn>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"right"}
      renderNavigationView={navigationView}
    >
        <View>
          <DrawerIcon>
            <TouchableOpacity
              title="Open drawer"
              onPress={() => drawer.current.openDrawer()}
            >
              <View>
                <Octicons size={20} color={darkLight} name="three-bars" />
              </View>
            </TouchableOpacity>
          </DrawerIcon>
        </View>
      <StyledContainer>
        <SBox>
          <Text style={styles.userl}>Name</Text>
          <Text  style={styles.userd}>{name}</Text>
          <Text  style={styles.userl}>Email</Text>
          <Text  style={styles.userd}>{email}</Text>
          <Text  style={styles.userl}>Stream</Text>
          <Text  style={styles.userd}>{stream}</Text>
        </SBox>
        <RowButton
          onPress={() => {
            navigation.navigate("SSubject",{ stream: stream, id:id });
          }}
        >
          <Entypo name="book" size={24} color="black" />
          <Text style={{marginLeft:25,fontSize:20}}>SUBJECT</Text>
        </RowButton>
        <RowButton
          onPress={() => {
            navigation.navigate("StudentExamTimeTable",{ stream: "Maths" });
          }}
        >
          <AntDesign name="calendar" size={24} color="black" />
          <Text style={{marginLeft:25,fontSize:20}}>EXAMS</Text>
        </RowButton>
        <RowButton
          onPress={() => {
            navigation.navigate("feedbackdisplay",{id:id});
          }}
        >
          <MaterialIcons name="feedback" size={24} color="black" />
          <Text style={{marginLeft:25,fontSize:20}}>FEEDBACK</Text>
        </RowButton>
        
      </StyledContainer>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 15,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    paddingLeft: 10,
    fontSize: 40,
    marginTop: 0,
    paddingTop: 0,
  },
  row: {
    flexDirection: "row",
    paddingTop: 20,
  },
  rowInside: {
    marginBottom: 10,
  },
  drawerImage: {
    height: 45,
    width: 60,
    resizeMode: "stretch",
  },
  btnLogout: {
    backgroundColor: "#E14545",
  },
  userl:{
    marginTop:10,
    fontWeight:"bold",
    marginLeft:10,
    fontSize:17
  },
  userd:{
    fontSize:17,
    marginLeft:40,
  }
});
