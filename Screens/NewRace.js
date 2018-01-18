import React, { Component } from 'react'
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { Picker } from 'react-native-picker-dropdown'

class NewRace extends Component {
  constructor(props) {
    super(props)
    
    var d = new Date();

    this.state = {
      codex: 'R' + d.getHours() + d.getDay() + d.getMonth() + d.getFullYear(),
      phase: 'Heat1',
      gender: 'F',
      temperature: '0',
      precipitation: 'None',
      course: 'DEBUG-CLIENTDEFAULT',
      racers: [],
      racercount: '4',
      position: 'Start Gate',
      colors: [
        'Red',
        'Green',
        'Blue',
        'Yellow',
      ]
    }

    this.colors = [
      'Red',
      'Green',
      'Blue',
      'Yellow',
      'Black',
      'White',
    ]
  }

  static navigationOptions = {
    title: 'SBX App v0.3.4' // Release #
  }

  componentDidMount() {
    this.updateRacerCount('4')
  }

  updateRacerCount(text) {
    count = parseInt(text)
    racers = Array.apply(null, Array(count))

    for (i in racers) {
      racers[i] = {
         bibColor: this.colors[i],
        startLane: -1,
          holePos: -1,
         splitPos: -1,
        finishPos: -1
      }
    }

    this.setState({racers: racers})
    this.setState({racercount: text})
    this.setState({colors: this.colors.slice(0, count)})
  }

  onButtonPress() {
    const { navigate } = this.props.navigation
    state = Object.values(this.state)
    if (state.indexOf('') > -1) Alert.alert('Error: enter a value for all fields.')
    else navigate('LineupForm', { title: this.state.position, props: this.state })
  }

  render() {
    return (
      <View style={styles.container}>
      {/* Race Codex */}
        <View style={styles.row}>
          <Text style={styles.text}>Race Codex</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.codex}
            placeholder={'Race Codex'}
            onChangeText={(text)=>this.setState({codex: text})}
          />
        </View>
      {/* Race Phase */}
        <View style={styles.row}>
          <Text style={styles.text}>Race Phase</Text>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={this.state.phase}
              onValueChange={(v,i)=>this.setState({phase: v})}
              mode='dialog'
              textStyle={styles.pickerText}
            >
              <Picker.Item label='Heat 1'         value='Heat1'    />
              <Picker.Item label='Heat 2'         value='Heat2'    />
              <Picker.Item label='Heat 3'         value='Heat3'    />
              <Picker.Item label='Heat 4'         value='Heat4'    />
              <Picker.Item label='Heat 5'         value='Heat5'    />
              <Picker.Item label='Heat 6'         value='Heat6'    />
              <Picker.Item label='Quarterfinal 1' value='Quarter1' />
              <Picker.Item label='Quarterfinal 2' value='Quarter2' />
              <Picker.Item label='Quarterfinal 3' value='Quarter3' />
              <Picker.Item label='Quarterfinal 4' value='Quarter4' />
              <Picker.Item label='Semifinal 1'    value='Semi1'    />
              <Picker.Item label='Semifinal 2'    value='Semi2'    />
              <Picker.Item label='Final'          value='Final'    />
            </Picker>
          </View>
        </View>
      {/* Gender */}
        <View style={styles.row}>
          <Text style={styles.text}>Gender</Text>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={this.state.gender}
              onValueChange={(v,i)=>this.setState({gender: v})}
              mode='dialog'
              textStyle={styles.pickerText}
            >
              <Picker.Item label='Female' value='F' />
              <Picker.Item label='Male'   value='M' />
            </Picker>
          </View>
        </View>
      {/* Number of Racers */}
        <View style={styles.row}>
          <Text style={styles.text}>Racer Count</Text>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={this.state.racercount}
              onValueChange={(v,i)=>this.updateRacerCount(v)}
              mode='dialog'
              textStyle={styles.pickerText}
            >
              <Picker.Item label='4' value='4' />
              <Picker.Item label='6' value='6' />
            </Picker>
          </View>
        </View>
      {/* Precipitation */}
        <View style={styles.row}>
          <Text style={styles.text}>Precipitation</Text>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={this.state.precipitation}
              onValueChange={(v,i)=>this.setState({precipitation: v})}
              mode='dialog'
              textStyle={styles.pickerText}
            >
              <Picker.Item label='Rain' value='Rain' />
              <Picker.Item label='Snow' value='Snow' />
              <Picker.Item label='None' value='None' />
            </Picker>
          </View>
        </View>
      {/* Temperature */}
        <View style={styles.row}>
          <Text style={styles.text}>Temperature</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.temperature}
            keyboardType='numeric'
            onChangeText={(text)=>this.setState({temperature: text})}
          />
        </View>
      {/* Course Name */}
        <View style={styles.row}>
          <Text style={styles.text}>Course Name</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.course}
            placeholder={'Course name'}
            onChangeText={(text)=>this.setState({course: text})}
          />
        </View>
      {/* Next Page */}
        <Button
          onPress={() => this.onButtonPress()}
          style={styles.button}
          title='Next >'
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
    alignItems: 'center',
    padding: 15,
  },
  text: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
    padding: 5,
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
  textInput: {
    flex: 2,
    fontSize: 16,
    textAlign: 'right',
    borderBottomColor: 'rgba(0, 0, 0, .5)',
    borderBottomWidth: .5,
  },
  button: {
    flex: 1,
  },
})

export default NewRace
