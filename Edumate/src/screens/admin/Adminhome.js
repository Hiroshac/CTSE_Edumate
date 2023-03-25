import React from 'react';
import { StyleSheet, View, SafeAreaView, Text, Button, DrawerLayoutAndroid} from 'react-native';
import {
  DashButton,
  ButtonText,
  StyledButton,
  AdminHomebutton,
} from '../../constants/styles.js'
import { MaterialIcons, Entypo, Ionicons   } from '@expo/vector-icons';

const Separator = () => (
  <View style={styles.separator} />
);
export const Adminhome = ({navigation}) => {

  return (
  
    <SafeAreaView style={styles.container}>
          <AdminHomebutton
           onPress={() => {
            navigation.navigate('getstreams')
          }}
          >
          <MaterialIcons name="subject" size={24} color="black" />
          <Text style={{marginLeft:20, fontSize:20}}>Stream Management</Text>
         </AdminHomebutton> 
         <AdminHomebutton
           onPress={() => {
            navigation.navigate('getsubjects')
          }}
          >
          <Entypo name="book" size={24} color="black" />
          <Text style={{marginLeft:20, fontSize:20}}>Subject Management</Text>
         </AdminHomebutton>  
         <AdminHomebutton
           onPress={() => {
            navigation.navigate('getexams')
          }}
          >
            <Ionicons name="ios-newspaper-outline" size={24} color="black" />
          <Text style={{marginLeft:20, fontSize:20}}>Exam Management</Text>
         </AdminHomebutton>          
    </SafeAreaView>
  );
  }


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: 'center',
    marginTop: 200,
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

