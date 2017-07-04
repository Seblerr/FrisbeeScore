import React, { Component } from 'react'
import { ScrollView, ListView, TextInput, Button, StyleSheet, Text, View } from 'react-native'

export default class GameScreen extends Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      currentRound: 1,
      score: 0,
      players: this.props.navigation.state.players,
      dataSource: ds.cloneWithRows([])
    }
  }

  render () {
    const { params } = this.props.navigation.state
    return (
      // <View style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={{fontSize: 40}}>Current Round: {this.state.currentRound}</Text>
          </View>
          {params.players.map((player) =>
            <TextInput
              ref={component => this._textInput = component}
              style={{height: 50, width: 100}}
              keyboardType='numeric'
              placeholder={player.name}
              // onChangeText={(text) => setPro}
              // value={parseInt('0')}
              onChangeText={(text) => this.setPlayerScore(player.name, text)}
            />)}

          <Text>Number of rounds: {params.rounds}</Text>
          {params.players.map((player) => <Text>{player.name} {player.score}</Text>)}
          <Button
            title='Next Round'
            onPress={() =>
                this.nextRound()
              }
          />
        </ScrollView>
      </View>
      // </View>
    )
  }

  nextRound () {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.navigation.state.params.players)
    })

    this.clearText()
    this.setState({ currentRound: parseInt(this.state.currentRound) + 1 })
  }

  setPlayerScore (player, score) {
    var players = this.props.navigation.state.params.players
    // console.log(players)
    for (let i in players) {
      if (players[i].name === player) {
        if (score > 0) {
          players[i].score = parseInt(score) + parseInt(players[i].score)
          break
        }
      }
    }
    console.log(players)
  }

  clearText () {
    this._textInput.setNativeProps({text: ''})
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  red: {
    color: 'red'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
