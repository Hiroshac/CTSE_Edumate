import { StatusBar } from 'expo-status-bar'
import { addDoc, collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../core/config';
import { ButtonText, PageTitle, StyledButton, StyledContainer, StyledInputLabel, StyledTextInput } from '../../constants/styles'

export const FeedbackFeedback = ({navigation,route}) => {

  const getid = route.params;
  const fid = getid.fid;
  const sid = getid.id;

  const [itemsub, setItemsub] = useState('');
  const [itemcom, setItemcom] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const q = doc(db,'feedback',fid);
    const docref = await getDoc(q);
    console.log(docref.data());
    setItemcom(docref.data().Comment);
    setItemsub(docref.data().subject);
};

const onChangeHandler = async() =>{
    const ref = doc(db,'feedback',fid);
    await updateDoc(ref,{
        Comment:itemcom,
    });
  navigation.navigate("feedbackdisplay",{id:sid});

}

  return (
    <StyledContainer>
        <StatusBar style="dark" />
        <PageTitle>Update FeedBack</PageTitle>
        <StyledInputLabel>Subject</StyledInputLabel>
        <StyledTextInput
        value={itemsub}
        // onChangeText={(itemsub) => setItemsub(itemsub)}
        disabled
        />
        <StyledInputLabel>FeedBack</StyledInputLabel>
        <StyledTextInput
        value={itemcom}
        onChangeText={(itemcom) => setItemcom(itemcom)}
        />
        <StyledButton onPress={onChangeHandler}>
          <ButtonText>UPLOAD</ButtonText>
        </StyledButton>
    </StyledContainer>
  )
}

