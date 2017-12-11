import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { StackNavigator }   from 'react-navigation'
import FormNavigator        from './FormNavigator'
import ImageCapture         from '../Screens/ImageCapture'
import LineupForm           from '../Screens/LineupForm'
import NewRace              from '../Screens/NewRace'

const AppNavigator = StackNavigator({
  FormNavigator: {
    screen: FormNavigator
  },
  // NewRace: {
  //   screen: NewRace
  // },
  // LineupForm: {
  //   screen: LineupForm
  // },
  ImageCapture: {
    screen: ImageCapture,
    navigationOptions: (props) => ({
      title: "Image Capture",
    })
  }
}, {
  headerMode: 'none'
})

export default AppNavigator