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

class NewRace extends Component {
  constructor(props) {
    super(props)
    this.state = {
      codex: '',
      gender: 'Female',
      temperature: '',
      precipitation: 'None',
      course: '',
      racers: 6,
      position: 'Start Gate',
    }
  }

  static navigationOptions = {
    title: 'New Race'
  }

  _handleBtnPress() {
    const { navigate } = this.props.navigation
    if (this.state.codex       === '' ||
        this.state.temperature === '' ||
        this.state.course      === ''
       ) {
      Alert.alert('Error: please enter a value for all text fields.')
    }
    else {
      navigate('LineupForm', { title: this.state.position, props: this.state })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}>
            Race Codex:
          </Text>
          <TextInput
            style={styles.input}
            value={this.state.codex}
            placeholder={'Enter a codex'}
            onChangeText={(text) => this.setState({codex: text})}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Gender:
          </Text>
          <Picker
            style={styles.input}
            selectedValue={this.state.gender}
            onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}
            >
            <Picker.Item label='Female' value='female' />
            <Picker.Item label='Male'   value='male'   />
          </Picker>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Temp:
          </Text>
          <TextInput
            style={styles.input}
            value={this.state.temperature}
            placeholder={'Enter a temperature'}
            onChangeText={(text) => this.setState({temperature: text})}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Precipitation:
          </Text>
          <Picker
            style={styles.input}
            selectedValue={this.state.precipitation}
            onValueChange={(itemValue, itemIndex) => this.setState({precipitation: itemValue})}
            >
            <Picker.Item label='None' value='none' />
            <Picker.Item label='Rain' value='rain' />
            <Picker.Item label='Snow' value='snow' />
          </Picker>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Course:
          </Text>
          <TextInput
            style={styles.input}
            value={this.state.course}
            placeholder={'Enter a course name'}
            onChangeText={(text) => this.setState({course: text})}
          />
        </View>
        <View style={styles.row} enabled={false}>
          <Text style={styles.text}>
            Racers:
          </Text>
          <Picker
            style={styles.input}
            selectedValue={this.state.racers}
            onValueChange={(itemValue, itemIndex) => this.setState({racers: itemValue})}
            >
            <Picker.Item label='6' value='6' />
          </Picker>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Your position:
          </Text>
          <Picker
            style={styles.input}
            selectedValue={this.state.position}
            onValueChange={(itemValue, itemIndex) => this.setState({position: itemValue})}
            >
            <Picker.Item label='Start Gate' value='Start Gate' />
            <Picker.Item label='Split'      value='Split'      />
            <Picker.Item label='Hole'       value='Hole'       />
            <Picker.Item label='Finish'     value='Finish'     />
          </Picker>
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
  },
  text: {
    flex: 1,
    fontSize: 20,
    textAlign: 'left',
    padding: 30,
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
  },
})

export default NewRace
