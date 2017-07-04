import React from 'react'
import { StackNavigator } from 'react-navigation'
import GameScreen from './GameScreen'
import GameSetup from './GameSetup'

const App = StackNavigator({
  GameSetup: { screen: GameSetup },
  GameScreen: { screen: GameScreen }
}, {
  headerMode: 'none'
})

export default class Start extends React.Component {
  render () {
    return (
      <App />
    )
  }
}
