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

// var id = "MdaHUyN5DV2gCB8E3rgB";
// AsyncStorage.getItem("user").then((value) => {
//  var userId = value;
//  console.log(userId);
// });



export const StudentDash = ({ navigation }) => {
  const drawer = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [stream, setStream] = useState("");
  const [uid, setUid] = useState();
  const [id, setId] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const auth = getAuth()

  const user = auth.currentUser;
  // setId(user.uid);
  // console.log(user.uid);
  const getUser = async () => {
    try {
    const user = await AsyncStorage.getItem('@user').then(async (value) => {
    setId(value)
     const q = doc(db, 'user', value)
     const docSnap = await getDoc(q)
    const res = docSnap.data()
    const name = res.firstName + ' ' + res.lastName
     setName(name)
     setEmail(res.email)
     setStream(res.stream)
      setDob(res.dateOfBirth)
     setRole(res.type)
     setStream(res.stream)
     setRefreshing(false)
    })
     } catch (e) {
    console.log('Fail to get user')
    }
     }

  useEffect(() => {
    getUser();
    // loadData();
    // userNavigation();
  }, []);
  // const loadData = async () => {
  //   const q = doc(db,'user',userId);
  //   const docref = await getDoc(q);
  //   // console.log(docref.data());
  //   setName(docref.data().firstName);
  //   setEmail(docref.data().email);
  //   setStream(docref.data().stream);
  // };

  // const userNavigation = async (id) => {
  //   const userRef = query(collection(db, 'user'))
  //   const qm = query(userRef, where('uid', '==', user.uid))
  //   onSnapshot(qm, (querySnapshot) => {
  //     setUserDetails(
  //       querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         // data: doc.data(),
  //       }))
  //     )
  //   })
  // }
  // console.log(userDetails);
  const Logout = () => {
    AsyncStorage.removeItem("user");
    signOut(auth);
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
    drawerPosition={'right'}
    renderNavigationView={navigationView}
    >
      <StyledContainer>
        <View style={{marginBottom:50}}>
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
