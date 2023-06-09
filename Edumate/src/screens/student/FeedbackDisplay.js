import { async } from '@firebase/util';
import { StatusBar } from 'expo-status-bar'
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native';
import { db } from '../../../core/config';
import { ButtonEx, Col, Comments, Feedback, PageTitle, Row, SAStyledButton, StyledContainer } from '../../constants/styles'

export const FeedbackDisplay = ({navigation,route}) => {

  const [item, setItem] = useState([]);
  const get = route.params;
  const sid = get.id;
    useEffect(() => {
        loadData();
      }, []);
    
      //fetch data according to the user
      const loadData = async () => {
        const q = query(
          collection(db,'feedback'),
          where("sid","==",sid)
        );
        onSnapshot(q,(snapshot)=>{
          setItem(snapshot.docs.map(doc=>({
            id:doc.id,
            data:doc.data()
          })))
        })
      };

      //delete data according to the feedback id
      const DeleteFeedback = async(fid) => {
        const ref = doc(db, 'feedback', fid)
        await deleteDoc(ref)
        .then(() => {
            alert("Delete Feedback");
        }).catch((error) => {
            alert(error.message)
        })
      }

  return (
    <StyledContainer>
        <StatusBar style='dark'/>
        <PageTitle>FeedBack</PageTitle>

        <ScrollView>

        {item.map((r) => {
        return (
          <Feedback
          >
            <View style={{marginLeft:2}}>
              <Text style={{fontWeight: 'bold'}}>Comment :</Text>
              <Text style={{height:30,marginLeft:20,marginTop:5}}>{r.data.Comment}</Text>
              <Text style={{fontWeight: 'bold'}}>Subject :</Text>
              <Text style={{height:20,marginLeft:20,marginTop:2}}>{r.data.subject}</Text>
            </View>
            <Row>
                <ButtonEx
                    onPress={() => {
                      navigation.navigate("feedbackupdate", { fid: r.id, id:sid });
                    }}
                >
                    <Text>Update</Text>
                </ButtonEx>
                <ButtonEx
                    onPress={() => {
                      DeleteFeedback(r.id)
                    }}
                >
                    <Text>Delete</Text>
                </ButtonEx>
            </Row>
          </Feedback>
        );
      })}
        </ScrollView>
    </StyledContainer>
  )
}
