import React from "react";
import { Button } from "react-native";
import DocumentPicker from "react-native-document-picker";
import { StyledButton, StyledContainer } from "../../constants/styles";

export const Upload = () => {
  const onDocumentPress = async () => {
    const formData=new FormData()
    var imageJSON = {
      imageName:new Date().getTime()+"_profile",
      avatar:selectedImage,
      name:name,
      email:email,
      SocietyCode:sCOde,
      password:Password
    }
  
    formData.append('image', JSON.stringify(imageJSON))
  
    axios.post('https://edumate-backend.herokuapp.com/StudentAnswers/add',formData,{
      headers:{
        Accept: 'application/json',
        'Content-Type':'multipart/form-data'
      }
    }).then((responseData) => {
      console.log("before",responseData.data)
        
      })
      .catch((error) => {
        alert(error)
        console.log("ERROR " + error.message)
      });
  };
  return (
    <StyledContainer>
      {/* <Button/> */}
      <StyledButton></StyledButton>
      <Button title="Select Document" onPress={onDocumentPress} />
      {/* onPress={pickDocument} */}
    </StyledContainer>
  );
};
