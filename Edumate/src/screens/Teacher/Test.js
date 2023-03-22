import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import * as DocumentPicker from 'expo-document-picker'
import { useState, useEffect } from 'react'
import { UploadFile } from '../../../core/fileUpload'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['Setting a timer'])

export const Test = () => {
  //STATES
  const [blobFile, setBlobFile] = useState(null)
  const [fileName, setFileName] = useState('No Files')
  const [isChoosed, setIsChoosed] = useState(false)
  const [uploadCompleted, isUploadCompleted] = useState(false)
  const [uploadStart, setUploadStart] = useState(false)

  //HOOKS
  useEffect(() => {
    if (uploadCompleted) {
      showToastWithGravityAndOffset('Document Saved SuccessFully')
      clearFiles()
    }
  }, [uploadCompleted])
  //FUNCTIONS

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({})

    if (result != null) {
      const r = await fetch(result.uri)

      const b = await r.blob()
      setFileName(result.name)
      setBlobFile(b)
      setIsChoosed(true)
    }
  }

  const clearFiles = () => {
    setFileName('No Files')
    setBlobFile(null)
    setIsChoosed(false)
  }

  const uploadFile = () => {
    if (blobFile) {
      showToastWithGravityAndOffset('Uploading File....')
      setUploadStart(true)
      UploadFile(blobFile, fileName, isUploadCompleted)
      clearFiles()
    }
  }

  const showToastWithGravityAndOffset = (msg = '') => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    )
  }

  return (
    <View style={styles.container}>
      {uploadStart ? (
        <></>
      ) : (
        <>
          <Text style={styles.textStyle}>{fileName}</Text>
          <View style={styles.btnContainer}>
            {isChoosed ? (
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={() => uploadFile()}
              >
                <Text style={styles.btnTextStyle}>Upload</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.textStyle}>Choose a File -- </Text>
            )}

            <TouchableOpacity onPress={() => pickDocument()}>
              <FontAwesome5 name='file-upload' size={60} color='black' />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    padding: 10,
    fontSize: 18,
  },
  btnStyle: {
    height: 50,
    width: 150,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextStyle: {
    color: 'white',
    fontSize: 20,
  },
  btnContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
