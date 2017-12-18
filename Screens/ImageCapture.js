import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Camera from 'react-native-camera'

class ImageCapture extends Component {
  static navigationOptions = {
    title: 'Camera'
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log('image captured')
        console.log('data: ', data)
        this.props.navigation.state.params.setImages(data)
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <TouchableOpacity
            style={styles.capture}
            onPress={this.takePicture.bind(this)}
            >
            <Image source={require('../assets/ic_photo_camera_36pt.png')} />
          </TouchableOpacity>
          {/* <Text style={styles.capture} onPress={
            this.takePicture.bind(this)}
            >
            Capture
          </Text> */}
        </Camera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    margin: 40
  }
})

export default ImageCapture
