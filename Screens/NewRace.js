import React, { Component } from 'react'
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'

class NewRace extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      codex: 'TestCodex',
      phase: 'Heat 1',
      gender: 'TestGender',
      temperature: 'TestTemp',
      precipitation: 'TestPrecip',
      course: 'TestCourse',
      racers: Array.apply(null, Array(4)),
      position: 'Start Gate',
      colors: [
        { value: 'Red',    },
        { value: 'Green',  },
        { value: 'Blue',   },
        { value: 'Yellow', },
      ]
    }

    this.colors = [
      { value: 'Red',    },
      { value: 'Green',   },
      { value: 'Blue', },
      { value: 'Yellow', },
      { value: 'Black',  },
      { value: 'White', },
    ]
  }

  static navigationOptions = {
    title: 'New Race'
  }

  componentDidMount() {
    this.updateRacerCount(4)
  }

  updateRacerCount(text) {
    count = parseInt(text)
    racers = Array.apply(null, Array(count))

    for (i in racers) {
      racers[i] = {
         bibColor: this.state.colors[i].value,
        startLane: -1,
          holePos: -1,
         splitPos: -1,
        finishPos: -1
      }
    }

    this.setState({racers: racers})
    this.setState({colors: this.colors.slice(0, count)})
  }

  _handleBtnPress() {
    const { navigate } = this.props.navigation
    state = Object.values(this.state)
    if (state.indexOf('') > -1) Alert.alert('Error: enter a value for all fields.')
    else navigate('LineupForm', { title: this.state.position, props: this.state })
  }

  render() {
    const genders = [
      { value: 'Female', },
      { value: 'Male',   },
    ]
    const precipitation = [
      { value: 'Rain', },
      { value: 'Snow', }, 
      { value: 'None', },
    ]
    const numRacers = [
      { value: 4, },
      { value: 6, },
    ]
    const positions = [
      { value: 'Start Gate', },
      { value: 'Split',      },
      { value: 'Hole',       },
      { value: 'Finish',     },
    ]
    const phaseOpt = [
      { value: 'Heat 1', },
      { value: 'Heat 2', },
      { value: 'Heat 3', },
      { value: 'Heat 4', },
      { value: 'Heat 5', },
      { value: 'Heat 6', },
      { value: 'Quarterfinal 1', },
      { value: 'Quarterfinal 2', },
      { value: 'Quarterfinal 3', },
      { value: 'Quarterfinal 4', },
      { value: 'Semifinal 1', },
      { value: 'Semifinal 2', },
      { value: 'Final', },
    ]

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            value={this.state.codex}
            placeholder={'Race Codex'}
            onChangeText={(text) => this.setState({ codex: text })}
          />
        </View>
        <View style={styles.row}>
          <Dropdown
            label='Race Phase'
            data={phaseOpt}
            baseColor={'rgba(0, 0, 0, .5)'}
            containerStyle={styles.input}
            onChangeText={(text) => this.setState({ phase: text})}
          />
        </View>
        <View style={styles.row}>
          <Dropdown
            label='Gender'
            data={genders}
            baseColor={'rgba(0, 0, 0, .5)'}
            containerStyle={styles.input}
            onChangeText={(text) => this.setState({gender: text})}
          />
        </View>
        <View style={styles.row}>
          <Dropdown
            label='Number of Racers'
            data={numRacers}
            baseColor={'rgba(0, 0, 0, .5)'}
            containerStyle={styles.input}
            onChangeText={(text) => this.updateRacerCount(text)}
          />
        </View>
        <View style={styles.row}>
          <Dropdown
            label='Precipitation'
            data={precipitation}
            baseColor={'rgba(0, 0, 0, .5)'}
            containerStyle={styles.input}
            onChangeText={(text) => this.setState({precipitation: text})}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            value={this.state.temperature}
            placeholder={'Temperature'}
            onChangeText={(text) => this.setState({temperature: text})}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            value={this.state.course}
            placeholder={'Course name'}
            onChangeText={(text) => this.setState({course: text})}
          />
        </View>

        <Button
          onPress={() => this._handleBtnPress()}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  text: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
    padding: 5,
  },
  input: {
    flex: 1,
    paddingBottom: 10,
  },
  textInput: {
    flex: 1,
    paddingBottom: 7,
    fontSize: 16,
    borderBottomColor: 'rgba(0, 0, 0, .5)',
    borderBottomWidth: .5,
  },
  button: {
    flex: 1,
  },
})

export default NewRace
