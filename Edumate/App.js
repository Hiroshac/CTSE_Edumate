import React from 'react'
import { RootStack } from './src/components/RootStack'
import { TeacherDash } from './src/screens/Teacher/TeacherDash'
import { UploadLink } from './src/screens/Teacher/UploadLink'
import { UploadNote } from './src/screens/Teacher/UploadNote'
// import { StudentSubject } from './src/screens/student/StudentSubject'
// import { StudentNotes } from './src/screens/student/StudentNotes'
// import { StudentFeedback } from './src/screens/student/StudentFeedback'
// import { StudentComment } from './src/screens/student/StudentComment'
// import { StduentAnswerSheetUpload } from './src/screens/student/StduentAnswerSheetUpload'
// import { AdminStack } from './src/components/AdminStack'
// // import { AddSubjects } from './src/screens/admin/AddSubjects'
// import { StudentExamTimeTable } from './src/screens/student/StudentExamTimeTable'
// import { StudentStack } from './src/components/StudentStack'

export default function App() {
  return (
    // <Title/>
    // <Home/>
    // <StudentStack/>
    // <StudentSubject/>
    // <StudentNotes/>
    // <StudentFeedback/>
    // <StudentComment/>
    // <StudentExamTimeTable/>
    // <RootStack /> 
    // <StduentAnswerSheetUpload/> 
    // <UploadLink/>
    // <UploadNote/>
    <TeacherDash/>
    // <Upload/>
  )
  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
      <Text>Edumate Application Join for develop the new world</Text>
      <Text>Wellcome to new world</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
