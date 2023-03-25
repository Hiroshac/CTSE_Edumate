import React, { useEffect, useState } from "react";
import { View, Platform, ToastAndroid, Alert } from "react-native";
import { Input } from "../../constants/InputField";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  RightIcon,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  StyledTextInput,
  colors,
  ButtonTextWhite,
  UploadButton,
  UploadingButton,
} from "../../constants/styles.js";
import { StatusBar } from "expo-status-bar";
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
import { UploadFile } from "../../../core/fileUpload";
import { LogBox } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../core/config";

LogBox.ignoreLogs(["Setting a timer"]);

const { brand, darkLight, primary } = colors;

export const StduentAnswerSheetUpload = ({ navigation, route }) => {
  const getname = route.params;
  const subjectname = getname.name;
  const id = getname.id;
  console.log(id);
  const [subject, setSubject] = useState([]);
  const [stream,setStream] = useState('');
  const [username,setUsername] = useState('');
  const [lname, setLesson] = useState("");
  const [grade, setGrade] = useState("");
  const [image, setNote] = useState();
  const [url, setUrl] = useState("");
  const [student_id, setTeacher] = useState();

  const [blobFile, setBlobFile] = useState(null);
  const [fileName, setFileName] = useState("No Files");
  const [isChoosed, setIsChoosed] = useState(false);
  const [uploadCompleted, isUploadCompleted] = useState(false);
  const [uploadStart, setUploadStart] = useState(false);

  var userId = "636fa108822e88b4ac2ef253";
  AsyncStorage.getItem("user").then((value) => {
    userId = value;
  });

  var file = "";
  AsyncStorage.getItem("file").then((value) => {
    file = value;
  });

  useEffect(() => {
    if (uploadCompleted) {
      clearFiles();
    }
  }, [uploadCompleted]);
  
  const loadSubject = async() => {
    const q = doc(db,'user',id);
    const docref = await getDoc(q);
    console.log(docref.data());
    setStream(docref.data().stream);
    setUsername(docref.data().firstName);
  };
  console.log(username);

  useEffect(() => {
    loadSubject();
  }, []);

  //pick document and fetch document details
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result != null) {
      const r = await fetch(result.uri);
      setUrl(result.uri);
      const b = await r.blob();
      setFileName(result.name);
      setBlobFile(b);
      setIsChoosed(true);
    }
  };

  const clearFiles = () => {
    setFileName("No Files");
    setBlobFile(null);
    setIsChoosed(false);
  };

  const uploadFile = () => {
    if (blobFile) {
      setUploadStart(true);
      UploadFile(blobFile, fileName, isUploadCompleted);
      clearFiles();
    }
  };

  //add answer sheet
  const onChangeHandler = async() =>{
    await addDoc(collection(db,"answer"),{
      subjectname:subjectname,
      username:username,
      lname:lname,
      grade:grade,
      url:url,
      sid:id,
      status:"notdone"
    });

    console.log("Add");
    navigation.navigate("Studentsubject",{ name: subjectname,id:id });
  }
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <PageTitle>Upload Answer Sheet</PageTitle>
      <InnerContainer>
        <View>
          <View>
            <InputCd
              placeholderTextColor={darkLight}
              // name="lesson_name"
              disabled
              value={subjectname}
            />
            <InputCd
              placeholderTextColor={darkLight}
              // name="lesson_name"
              disabled
              value={stream}
            />
            <InputCd
              placeholder="Lesson name"
              placeholderTextColor={darkLight}
              name="lesson_name"
              onChangeText={(lname) => setLesson(lname)}
              value={lname}
            />
            <Picker
              selectedValue={grade}
              onValueChange={(itemValue, itemIndex) => setGrade(itemValue)}
            >
              <Picker.Item label="12 Grade" value={12} />
              <Picker.Item label="13 Grade" value={13} />
            </Picker>

            <UploadButton>
              <UploadingButton onPress={() => pickDocument()}>
                <Octicons size={30} color={brand} name="upload" />
                <ButtonTextWhite>Upload File Here {fileName}</ButtonTextWhite>
              </UploadingButton>
            </UploadButton>
            <StyledButton onPress={onChangeHandler}>
              <ButtonText>Upload</ButtonText>
            </StyledButton>
          </View>
        </View>
      </InnerContainer>
    </StyledContainer>
  );
};

export const InputCd = ({ label, icon, ...props }) => {
  return (
    <View>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      <RightIcon>
        <Octicons name={icon} size={30} color={brand} />
      </RightIcon>
    </View>
  );
};
