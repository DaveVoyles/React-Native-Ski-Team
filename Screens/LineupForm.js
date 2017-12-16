import React, { Component } from 'react'
import {
  Button,
  Dimensions,
  Image,
  Picker,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const { width, height } = Dimensions.get('window')

class LineupForm extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  })

  constructor(props) {
    super(props)

    propState = props.navigation.state.params.props
    this.state = {
      codex:         propState.codex,
      gender:        propState.gender,
      temperature:   propState.temperature,
      precipitation: propState.precipitation,
      course:        propState.course,
      racers:        propState.racers,
      position:      propState.position,
      images: [],
      lane1: '',
      lane2: '',
      lane3: '',
      lane4: '',
      lane5: '',
      lane6: '',
    }
  }

  setImages = (data) => {
    this.setState({
      images:
        [...this.state.images,
          {
            source: data.mediaUri
          }
        ]
      })
    console.log(this.state.images)
  }

  renderImages() {
    if (this.state.images.length < 1) {
      return (
        <Text style={styles.imageText}>
          Use the camera to capture images
        </Text>
      )
    } 
    else {
      return (
        <View style={styles.imageGallery}>
          <Image
            style={styles.image}
            source={{uri: this.state.images[0].source}}
          />
        </View>
      )
    }
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          {this.renderImages()}
        </View>
        <Button
          onPress={() =>
            navigate('ImageCapture', { setImages: this.setImages })
          }
          style={styles.button}
          title='Camera'
        />
        <View style={styles.row}>
          <Text style={styles.text}>
            Lane 1:
          </Text>
          <Picker style={styles.input}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Lane 2:
          </Text>
          <Picker style={styles.input}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Lane 3:
          </Text>
          <Picker style={styles.input}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Lane 4:
          </Text>
          <Picker style={styles.input}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Lane 5:
          </Text>
          <Picker style={styles.input}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Lane 6:
          </Text>
          <Picker style={styles.input}
          />
        </View>
        <Button
          onPress={() => {
              console.log(this.state)
              this.state.images = []
            }
          }
          style={styles.button}
          title='Submit'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height / 3,
  },
  imageGallery: {
    flex: 1,
    backgroundColor: 'white'
  },
  imageText: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
  },
  imageView: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    fontSize: 20,
    textAlign: 'left',
    padding: 30,
  },
  input: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
  },
})

export default LineupForm
