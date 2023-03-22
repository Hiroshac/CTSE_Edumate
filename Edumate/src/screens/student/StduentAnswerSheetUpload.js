import React, { useEffect, useState } from "react";
import { View, Platform, ToastAndroid, Alert } from "react-native";
import axios from "axios";
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

LogBox.ignoreLogs(["Setting a timer"]);

const { brand, darkLight, primary } = colors;

const API_URL =
  Platform.OS === "ios" ? "http://localhost:5000" : "http://10.0.2.2:5000";

export const StduentAnswerSheetUpload = ({ navigation, route }) => {
  const getname = route.params;
  const subjectname = getname.name;
  const [subject, setSubject] = useState([]);
  const [stream,setStream] = useState('');
  const [lname, setLesson] = useState("");
  const [grade, setGrade] = useState("");
  const [image, setNote] = useState();
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
  
  const loadSubject = () => {
    axios
    .get(`https://edumate-backend.herokuapp.com/api/users/${userId}`)
    .then(async (res) => {
      setStream(res.data.stream);
    });
  };

  useEffect(() => {
    loadSubject();
  }, []);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result != null) {
      const r = await fetch(result.uri);

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

  const onChangeHandler = async () => {
    if ( lname == "" || image == "") {
      alert("Please fill the given fields");
    } else {
      uploadFile();
      const data = {
        subject: subjectname,
        stream,
        lname: lname,
        grade,
        image: file,
        student_id: userId,
      };
      const url = `https://edumate-backend.herokuapp.com/studentanswers/add`;
      await axios.post(url, data).then((res) => {
        alert("Answer Sheets added");
        // navigation.navigate("");
      });
    }
  };
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <PageTitle>Upload Answer Sheet</PageTitle>
      <InnerContainer>
        <View>
          <View>
            <InputCd
              placeholderTextColor={darkLight}
              name="lesson_name"
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
