import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StudentFeedback } from "../screens/student/StudentFeedback";
import { StduentAnswerSheetUpload } from "../screens/student/StduentAnswerSheetUpload";
import { NavigationContainer } from "@react-navigation/native";
import { StudentSubject } from "../screens/student/StudentSubject";
import { StudentDash } from "../screens/student/StudentDash";
import { StudentNotes } from "../screens/student/StudentNotes";
import { StudentExamTimeTable } from "../screens/student/StudentExamTimeTable";
import { SSubject } from "../screens/student/SSubject";

const Stack = createNativeStackNavigator();

export const StudentStack = () => {
  return (
    <>
      {/* <NavigationContainer> */}
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "transparent",
            },
            // headerTintColor: tertiary,
            headerTransparent: true,
            headerTitle: "",
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen
            name="StudentDash"
            component={StudentDash}
            options={{
              headerShown: false,
            }}
          />
           <Stack.Screen
            name="StudentNotes"
            component={StudentNotes}
          />
          <Stack.Screen
            name="Studentsubject"
            component={StudentSubject}
          />
          <Stack.Screen name="StudentFeedback" component={StudentFeedback} />
          <Stack.Screen
            name="AnswerUpload"
            component={StduentAnswerSheetUpload}
          />
            <Stack.Screen
            name="StudentExamTimeTable"
            component={StudentExamTimeTable}
          />
               <Stack.Screen
            name="SSubject"
            component={SSubject}
          />
          {/* <Stack.Screen name="UpdatePassword" component={ResetPassword} /> */}
        </Stack.Navigator>
      {/* </NavigationContainer> */}
    </>
  );
};
