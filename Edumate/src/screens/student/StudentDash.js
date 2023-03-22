import React, { useEffect, useRef, useState } from "react";
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
import {
  ButtonText,
  DrawerBtn,
  DrawerIcon,
  LogoutBtn,
  PageTitle,
  SBox,
  SStyledButton,
  StyledButton,
  StyledContainer,
  colors,
} from "../../constants/styles";
import {
  Text,
  DrawerLayoutAndroid,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { brand, darkLight, primary } = colors;

var userId = "636fa108822e88b4ac2ef253";
AsyncStorage.getItem("user").then((value) => {
  userId = value;
});

export const StudentDash = ({ navigation }) => {
  const drawer = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const [stream, setStream] = useState("");

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    await axios
      .get(`https://edumate-backend.herokuapp.com/api/users/${userId}`)
      .then((res) => {
        const name = res.data.firstName + " " + res.data.lastName;
        setName(name);
        setEmail(res.data.email);
        setDob(res.data.dateOfBirth);
        setRole(res.data.type);
        setStream(res.data.stream);
      });
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
          navigation.navigate("User");
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
          {/* <PageTitle>Edumate</PageTitle> */}
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
        <SStyledButton
          onPress={() => {
            navigation.navigate("SSubject");
          }}
        >
          <ButtonText>Subjects</ButtonText>
        </SStyledButton>
        <SStyledButton
          onPress={() => {
            navigation.navigate("StudentExamTimeTable");
          }}
        >
          <ButtonText>Exams</ButtonText>
        </SStyledButton>
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
    marginLeft:10
  },
  userd:{
    marginLeft:40
  }
});
