import React, { Component } from 'react'
import {
  Alert,
  Button,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import { Dropdown } from 'react-native-material-dropdown'

class NewRace extends Component {
  constructor(props) {
    super(props)
    this.state = {
      codex: '',
      gender: '',
      temperature: '',
      precipitation: '',
      course: '',
      racers: 6,
      position: '',
    }
  }

  static navigationOptions = {
    title: 'New Race'
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
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Dropdown
            label='Position'
            data={positions}
            baseColor={'rgba(0, 0, 0, .5)'}
            containerStyle={styles.input}
            onChangeText={(text) => this.setState({position: text})}
          />
        </View>
        <View style={styles.row} enabled={false}>
          <Dropdown
            label='Racers'
            data={numRacers}
            baseColor={'rgba(0, 0, 0, .5)'}
            containerStyle={styles.input}
            onChangeText={(text) => this.setState({racers: text})}
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
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            value={this.state.codex}
            placeholder={'Codex'}
            onChangeText={(text) => this.setState({codex: text})}
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
