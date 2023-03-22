import React from 'react';
import { StyleSheet, View, SafeAreaView, Text, Button, DrawerLayoutAndroid} from 'react-native';
import {
  DashButton,
  ButtonText,
  StyledButton,
} from '../../constants/styles.js'

const Separator = () => (
  <View style={styles.separator} />
);
export const Adminhome = ({navigation}) => {

  return (
  
    <SafeAreaView style={styles.container}>
          <View style={styles.btnview}>
          <StyledButton
           onPress={() => {
            navigation.navigate('getstreams')
          }}
          >
          <ButtonText>Stream Management</ButtonText>
         </StyledButton>         
          </View>
      <Separator />
           <View style={styles.btnview}>
           <StyledButton
           onPress={() => {
            navigation.navigate('getsubjects')
          }}
           >
              <ButtonText>Subject Management</ButtonText>
           </StyledButton>   
          </View>
      <Separator />
          <View style={styles.btnview}>
          <StyledButton
          onPress={() => {
            navigation.navigate('getexams')
          }}
          >
          <ButtonText>Exam Management</ButtonText>
         </StyledButton>  
          </View>
      <Separator />
    </SafeAreaView>
  );
  }


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: 'center',
    marginTop: 250,
    marginHorizontal: 40,
    height: 300,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textst: {
    fontSize: 20,
    fontWeight: "bold",
    color: "purple"
  },
  btnview:{ 
     flex: 500,
     justifyContent: 'center', 
     alignItems: 'center',  
     backgroundColor:"#000000" 
    }
});

