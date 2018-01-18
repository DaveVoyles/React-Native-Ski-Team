import React, { Component } from 'react'
import {
  Alert,
  Button,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Picker } from 'react-native-picker-dropdown'

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
           imgIndex: 0
    }
  }

  setImages = (data) => {
    this.setState({
      images:
        [...this.state.images,
          {
            source: data.path
          }
        ]
      })
  }
  
  findBibColorIndex(color) {
    racers = this.state.racers
    for (r in racers) {
      if (racers[r].bibColor === color) 
        return r
    }
  }

  getStartLaneBibColor(i) {
    racers = this.state.racers
    for (r in racers) {
      if (racers[r].startLane == i + 1)
        return racers[r].bibColor
    }
  }

  getHolePosBibColor(i) {
    racers = this.state.racers
    for (r in racers) {
      if (racers[r].holePos == i + 1)
        return racers[r].bibColor
    }
  }

  getSplitPosBibColor(i) {
    racers = this.state.racers
    for (r in racers) {
      if (racers[r].splitPos == i + 1)
        return racers[r].bibColor
    }
  }

  getFinishPosBibColor(i) {
    racers = this.state.racers
    for (r in racers) {
      if (racers[r].finishPos == i + 1)
        return racers[r].bibColor
    }
  }
  
  setStartLane(i, color) {
    racers = this.state.racers
    for (r in racers) {
      if (racers[r].startLane != -1 && racers[r].bibColor === color) {
        Alert.alert("This color has already been selected.")
        return
      }
    }
    racers[i].bibColor  = color
    racers[i].startLane = i + 1
    this.setState({racers: racers})
  }

  updateRacerPos(i, color, userPosition) {
    racers = this.state.racers
    switch(userPosition) {
      case 'Hole':
        for (r in racers) {
          if (racers[r].holePos != -1 && racers[r].bibColor === color) {
            Alert.alert("This color has already been selected.")
            return
          }
        }
        racers[this.findBibColorIndex(color)].holePos = i + 1
        break
      case 'Split':
        for (r in racers) {
          if (racers[r].splitPos != -1 && racers[r].bibColor === color) {
            Alert.alert("This color has already been selected.")
            return
          }
        }
        racers[this.findBibColorIndex(color)].splitPos = i + 1
        break
      case 'Finish':
        for (r in racers) {
          if (racers[r].finishPos != -1 && racers[r].bibColor === color) {
            Alert.alert("This color has already been selected.")
            return
          }
        }
        racers[this.findBibColorIndex(color)].finishPos = i + 1
        break
    }
    this.setState({racers: racers})
  }

  composeUrl() {
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
    Alert.alert('Submitting data...')
    return fetch(url)
      .then((response) => {
        console.log(response)
        Alert.alert('Done')
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
          <ImageBackground
            style={styles.image}
            source={{uri: this.state.images[Math.abs(this.state.imgIndex)%this.state.images.length].source}}
          >
            <View style={styles.imageNavRow}>
              <Button
                title={'<'}
                onPress={() => this.setState({imgIndex: this.state.imgIndex - 1})}
              />
              <Button
                title={'>'}
                onPress={() => this.setState({imgIndex: this.state.imgIndex + 1})}
              />
            </View>
          </ImageBackground>
        </View>
      )
    }
  }

  renderForm(n) {
    switch (this.state.position) {
      case 'Start Gate':
        return (
          this.state.racers.map((r,i)=>{
            return (
              <View
                key={i}
                style={styles.row}
              >
                <Text style={styles.text}>
                  Lane {i+1}:
                </Text>
                <View style={styles.pickerView}>
                  <Picker
                    selectedValue={this.getStartLaneBibColor(i)}
                    onValueChange={(v,j)=>this.setStartLane(i,v)}
                    mode="dialog"
                    textStyle={styles.pickerText}
                  >
                  {
                    this.state.colors.map((c,k)=>{
                      color = this.state.colors[k]
                      return (
                        <Picker.Item key={k} label={color} value={color} />
                      )
                    })
                  }
                  </Picker>
                </View>
              </View>
            )
          })
        )
        break
      case 'Hole':
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
                <View style={styles.pickerView}>
                  <Picker
                    selectedValue={this.getHolePosBibColor(i)}
                    onValueChange={(v,j)=>this.updateRacerPos(i, v, this.state.position)}
                    mode="dialog"
                    textStyle={styles.pickerText}
                  >
                  {
                    this.state.colors.map((c,k)=>{
                      color = this.state.colors[k]
                      return (
                        <Picker.Item key={k} label={color} value={color} />
                      )
                    })
                  }
                  </Picker>
                </View>
              </View>
            )
          })
        )
        break
      case 'Split':
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
                <View style={styles.pickerView}>
                  <Picker
                    selectedValue={this.getSplitPosBibColor(i)}
                    onValueChange={(v,j)=>this.updateRacerPos(i, v, this.state.position)}
                    mode="dialog"
                    textStyle={styles.pickerText}
                  >
                  {
                    this.state.colors.map((c,k)=>{
                      color = this.state.colors[k]
                      return (
                        <Picker.Item key={k} label={color} value={color} />
                      )
                    })
                  }
                  </Picker>
                </View>
              </View>
            )
          })
        )
        break
      case 'Finish':
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
                <View style={styles.pickerView}>
                  <Picker
                    selectedValue={this.getFinishPosBibColor(i)}
                    onValueChange={(v,j)=>this.updateRacerPos(i, v, this.state.position)}
                    mode="dialog"
                    textStyle={styles.pickerText}
                  >
                  {
                    this.state.colors.map((c,k)=>{
                      color = this.state.colors[k]
                      return (
                        <Picker.Item key={k} label={color} value={color} />
                      )
                    })
                  }
                  </Picker>
                </View>
              </View>
            )
          })
        )
        break
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
    height: height / 2.25,
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
  imageNavRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowView: {
    flex: 1.25,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerView: {
    flex: 2,
  },
  pickerText: {
    color: 'black',
    padding: 10,
    fontSize: 16,
    textAlign: 'right',
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
