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

class LineupForm extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  })

  constructor(props) {
    super(props)

    propState = props.navigation.state.params.props
    
    this.state = {
              codex: propState.codex,
              phase: propState.phase,
             gender: propState.gender,
        temperature: propState.temperature,
      precipitation: propState.precipitation,
             course: propState.course,
             racers: propState.racers,
           position: propState.position,
             colors: propState.colors,
             images: [],
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

  setStartLane(n, color) {
    racers = this.state.racers
    racers[n].bibColor  = color
    racers[n].startLane = n + 1
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
        break
      case 'Split':
        racers[this.findBibColor(color)].splitPos = n + 1
        break
      case 'Finish':
        racers[this.findBibColor(color)].finishPos = n + 1
        break
    }
    this.setState({racers: racers})
    console.log(this.state)
  }

  validateInput() {
    racers = this.state.racers
    switch (this.state.position) {
      case 'Start Gate':
        for(i = 0; i < racers.length; i++) {
          if (racers[i] == null) {
            Alert.alert('Error: select a color for lane ' + (i+1) + '.')
            return false
          }
        }
        break
      case 'Hole':
        break
      case 'Split':
        break
      case 'Finish':
        break
    }
  }

  composeUrl() {
    // baseurl = 'http://localhost:3978'
    baseurl = 'https://sportstrackinglogger.azurewebsites.net/'

    state = this.state
    url = baseurl + '?'
    url += 'raceCodex=' + state.codex
    url +=  '&phaseID=' + state.phase.replace(/\s/g,'')
    url +=    '&sport=' + 'null'
    url +=    '&event=' + 'null'
    url +=  '&indexed=' + 'null'
    url +=     '&temp=' + state.temperature
    url +=   '&precip=' + state.precipitation
    url +=   '&gender=' + state.gender

    racers = this.state.racers
    for (var r in racers) {
      bc = racers[r].bibColor
      url += '&bib' + bc +      'StartLane=' + racers[r].startLane
      url += '&bib' + bc +   'HolePosition=' + racers[r].holePos
      url += '&bib' + bc +  'SplitPosition=' + racers[r].splitPos
      url += '&bib' + bc + 'FinishPosition=' + racers[r].finishPos
    }

    console.log(url)
    
    return fetch(url)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        Alert.alert(error.message)
      })
  }

  nextScreenBtnPress(position) {
    const { navigate } = this.props.navigation
    
    switch (this.state.position) {
      case 'Start Gate':
        state = this.state
        state.position = 'Hole'
        navigate('LineupForm', { title: state.position, props: state })
        break
      case 'Hole':
        state = this.state
        state.position = 'Split'
        navigate('LineupForm', { title: state.position, props: state })
        break
      case 'Split':
        state = this.state
        state.position = 'Finish'
        navigate('LineupForm', { title: state.position, props: state })
        break
      case 'Finish':
        console.log(this.state)
        this.composeUrl()
        Alert.alert('Done')
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
        this.state.racers.map((r, i) => {
          return (
            <View
              key={i}
              style={styles.row}
            >
              <Text style={styles.text}>
                Lane {i+1}:
              </Text>
              <Dropdown
                label={'Color ' + (i+1)}
                data={this.state.colors}
                baseColor={'rgba(0, 0, 0, .5)'}
                containerStyle={styles.input}
                onChangeText={(color) => this.setStartLane(i, color)}
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
        this.state.racers.map((r, i) => {
          return (
            <View
              key={i+1}
              style={styles.row}
            >
              <Text style={styles.text}>
                Position {i+1}:
              </Text>
              <Dropdown
                label={'Color ' + (i+1)}
                data={this.state.colors}
                baseColor={'rgba(0, 0, 0, .5)'}
                containerStyle={styles.input}
                onChangeText={(color) => this.updateRacerPos(this.state.position, color, i)}
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
