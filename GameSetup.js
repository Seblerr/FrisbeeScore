import React from 'react'
import { Button, TextInput, StyleSheet, Text, View } from 'react-native'

export default class GameSetup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      score: 0,
      rounds: 3,
      players: [],
      test: ''
    }
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Start New Game</Text>
        </View>
        <View style={{flex: 3}}>
          <TextInput
            ref={component => this._textInput = component}
            style={{height: 40, width: 150}}
            placeholder='Enter players'
            placeholderTextColor='darkgray'
            textAlign='center'
            autoCapitalize='words'
            onChangeText={(text) => this.setState({name: text})}
        />
          <Button
            title='Add Player'
            onPress={() => this.addPlayer(this.state.name)} />
          <View style={styles.playerList}>
            {this.state.players.map((player) => <Text style={{fontSize: 15, fontWeight: 'bold'}} key={player.name}>{player.name}</Text>)}
          </View>
        </View>
        <View style={{flex: 2}}>
          <TextInput
            style={{height: 40, width: 150}}
            keyboardType='numeric'
            placeholder='Enter rounds'
            placeholderTextColor='darkgray'
            textAlign='center'
            onChangeText={(rounds) => this.setState({rounds})}
          />
          <Button
            title='Start Game'
            onPress={() =>
              this.startGame()
            }
        />
        </View>
      </View>
    )
  }

  addPlayer (name) {
    if (name.length > 0) {
      this.state.players.push({
        name: this.state.name,
        score: this.state.score
      })
    }
    this.setState({
      players: this.state.players,
      name: ''
    })
    this.clearText()
  }

  startGame () {
    var players = this.state.players
    this.props.navigation.navigate('GameScreen', { players: this.state.players, rounds: this.state.rounds, reset: this.resetGame.bind(this) })
  }

  resetGame () {
    this.setState({
      players: []
    })
  }

  clearText () {
    this._textInput.setNativeProps({text: ''})
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    flex: 2,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  red: {
    color: 'red'
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  playerList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
