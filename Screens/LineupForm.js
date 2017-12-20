import React, { Component } from 'react'
import {
  Alert,
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
const colors = [
  { value: 'Red',    },
  { value: 'Blue',   },
  { value: 'Yellow', },
  { value: 'Orange', },
  { value: 'Green',  },
  { value: 'Purple', },
]

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
    }

  }

  setStartLane(n, color) {
    racers = this.state.racers
    racers[n] = {
      bibColor: color,
      startLane: n+1,
      splitPos: '',
      holePos: '',
      finishPos: '',
    }
    this.setState({racers: racers})
  }
  
  findBibColor(color) {
    racers = this.state.racers
    for (racer in racers) {
      if (racers[racer].bibColor === color) 
        return racer
    }
  }
  
  updateRacerPos(userPosition, color, n) {
    racers = this.state.racers
    switch(userPosition) {
      case 'Hole':
        racers[this.findBibColor(color)].holePos = n + 1
        break;
      case 'Split':
        racers[this.findBibColor(color)].splitPos = n + 1
        break;
      case 'Finish':
        racers[this.findBibColor(color)].finishPos = n + 1
        break;
    }
    this.setState({racers: racers})
    console.log(this.state)
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

  nextScreenBtnPress(position) {
    const { navigate } = this.props.navigation
    switch (this.state.position) {
      case 'Start Gate':
        this.state.position = 'Hole'
        navigate('LineupForm', { title: this.state.position, props: this.state })
        break
      case 'Hole':
        this.state.position = 'Split'
        navigate('LineupForm', { title: this.state.position, props: this.state })
        break
      case 'Split':
        this.state.position = 'Finish'
        navigate('LineupForm', { title: this.state.position, props: this.state })
        break
      case 'Finish':
        console.log(this.state)
        break
    }
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

  renderForm(n) {
    if (this.state.position === 'Start Gate') {
      return (
        [...Array(n).keys()].map((n) => {
          return (
            <View
              key={n+1}
              style={styles.row}
            >
              <Text style={styles.text}>
                Lane {n+1}:
              </Text>
              <Dropdown
                label={'Color ' + (n+1)}
                data={colors}
                baseColor={'rgba(0, 0, 0, .5)'}
                containerStyle={styles.input}
                onChangeText={(color) => this.setStartLane(n, color)}
              />
            </View>
          )
        })
      )
    }
    else if (this.state.position === 'Hole'  ||
             this.state.position === 'Split' ||
             this.state.position === 'Finish') {
      return (
        [...Array(n).keys()].map((n) => {
          return (
            <View
              key={n+1}
              style={styles.row}
            >
              <Text style={styles.text}>
                Position {n+1}:
              </Text>
              <Dropdown
                label={'Color ' + (n+1)}
                data={colors}
                baseColor={'rgba(0, 0, 0, .5)'}
                containerStyle={styles.input}
                onChangeText={(color) => this.updateRacerPos(this.state.position, color, n)}
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
          onPress={() => navigate('ImageCapture', { setImages: this.setImages })}
          style={styles.button}
        />
        <View style={styles.rowView}>
          {this.renderForm(this.state.racers.length)}
        </View>
        <Button
          title='Next >'
          onPress={() => this.nextScreenBtnPress()}
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
