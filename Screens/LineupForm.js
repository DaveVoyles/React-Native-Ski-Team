import React, { Component } from 'react'
import {
  Button,
  Dimensions,
  Image,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'

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

  renderNRows(n) {
    if (this.state.position === 'Start Gate' ||
        this.state.position === 'Finish') {
      return (
        [...Array(n).keys()].map((n) => {
          return (
            <View style={styles.row}>
              <Text style={styles.text}>
                Lane {n+1}:
              </Text>
              <Dropdown
                label={'Color ' + (n+1)}
                data={[{value: 'Blue',},]}
                baseColor={'rgba(0, 0, 0, .5)'}
                containerStyle={styles.input}
              />
            </View>
          )
        })
      )
    } else if (this.state.position === 'Split') {
      return (
        [...Array(n).keys()].map((n) => {
          return (
            <View style={styles.row}>
              <Text style={styles.text}>
                Lane {n+1}:
              </Text>
              <Dropdown
                label={'First (etc)'}
                data={[{value: 'Blue',},]}
                baseColor={'rgba(0, 0, 0, .5)'}
                containerStyle={styles.input}
              />
              <Dropdown
                label={'Color ' + (n+1)}
                data={[{value: 'Blue',},]}
                baseColor={'rgba(0, 0, 0, .5)'}
                containerStyle={styles.input}
              />
            </View>
          )
        })
      )
    } else if (this.state.position === 'Hole') {
      return (
        [...Array(n).keys()].map((n) => {
          return (
            <View style={styles.row}>
              <Text style={styles.text}>
                Position {n+1}:
              </Text>
              <Dropdown
                label={'Color ' + (n+1)}
                data={[{value: 'Blue',},]}
                baseColor={'rgba(0, 0, 0, .5)'}
                containerStyle={styles.input}
              />
            </View>
          )
        })
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
          title='Camera'
          onPress={() => console.log(this.state)}
          style={styles.button}
        />
        <View style={styles.rowView}>
          {this.renderNRows(this.state.racers)}
        </View>
        <Button
          title='Submit'
          onPress={() => console.log(this.state)}
          style={styles.button}
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
    fontSize: 16,
    textAlign: 'center',
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowView: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
    padding: 5,
    paddingLeft: 20,
  },
  input: {
    flex: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  button: {
    flex: 1,
  },
})

export default LineupForm
