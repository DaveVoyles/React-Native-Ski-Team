import { StackNavigator }   from 'react-navigation'
import ImageCapture         from '../Screens/ImageCapture'
import LineupForm           from '../Screens/LineupForm'
import NewRace              from '../Screens/NewRace'

const AppNavigator = StackNavigator({
  NewRace: {
    screen: NewRace
  },
  LineupForm: {
    screen: LineupForm
  },
  ImageCapture: {
    screen: ImageCapture,
  }
})

export default AppNavigator
