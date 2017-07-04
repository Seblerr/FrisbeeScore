import React, { Component } from 'react'
import { ScrollView, ListView, TextInput, Button, StyleSheet, Text, View } from 'react-native'

export default class GameScreen extends Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      currentRound: 1,
      totalRounds: this.props.navigation.state.params.rounds,
      score: 0,
      players: this.props.navigation.state.params.players,
      dataSource: ds.cloneWithRows([])
    }
  }

  render () {
    console.log(this.props.navigation.state)
    // const { params } = this.props.navigation.state
    return (
      // <View style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={{fontSize: 40}}>Current Round: {this.state.currentRound}</Text>
          </View>
          {this.state.players.map((player) =>
            <TextInput
              ref={player.name}
              style={{height: 50, width: 100}}
              keyboardType='numeric'
              placeholder={player.name}
              // onChangeText={(text) => setPro}
              // value={parseInt('0')}
              onChangeText={(text) => this.setPlayerScore(player.name, text)}
            />)}

          <Text>Number of rounds: {this.state.totalRounds}</Text>
          {this.state.players.map((player) => <Text>{player.name} {player.score}</Text>)}
          <Button
            title='Next Round'
            onPress={() =>
                this.nextRound()
              }
          />
          {this.displayWinner()}
        </ScrollView>
      </View>
      // </View>
    )
  }

  nextRound () {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.players)
    })
    this.state.players.forEach((player) => {
      this.clearText(player.name)
    })
    if (this.state.currentRound < this.state.totalRounds) {
      this.setState({ currentRound: parseInt(this.state.currentRound) + 1 })
    }
  }

  setPlayerScore (player, score) {
    var players = this.state.players
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

  displayWinner () {
    var scores = []
    var winner
    if (this.state.currentRound === this.state.totalRounds) {
      this.state.players.forEach((player) => {
        scores.push(player.score)
      })
      var min = Math.min.apply(null, scores)
      this.state.players.forEach((player) => {
        if (player.score === min) {
          winner = player.name
        }
      })
      return (
        <View>
          <Text style={{fontSize: 45, bold: true}}>Winner is {winner}</Text>
        </View>
      )
    }
  }

  clearText (fieldName) {
    this.refs[fieldName].setNativeProps({text: ''})
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
