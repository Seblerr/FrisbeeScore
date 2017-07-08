import React, { Component } from 'react'
import { TextInput, Button, StyleSheet, Text, View } from 'react-native'

export default class GameScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentRound: 0,
      totalRounds: this.props.navigation.state.params.rounds,
      score: 0,
      players: this.props.navigation.state.params.players
      // playerScores: this.props.navigation.state.params.newState
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {this.displayWinner()}
          {/* <Text style={{fontSize: 20}}>Current Round: {this.state.currentRound} of {this.state.totalRounds}</Text> */}
        </View>
        <View style={{flex: 3}}>
          {this.state.players.map((player) =>
            // let playerName = player.name
            <TextInput
              key={player.name}
              ref={player.name}
              style={{height: 35, width: 80}}
              keyboardType='numeric'
              placeholder={player.name}
              placeholderTextColor='darkgray'
              textAlign='center'
              // onChangeText={(text) => this.setState({
              //   playerScores: this.state.players.map(obj =>
              //     obj.name === player.name
              //     ? { score: text }
              //     : obj
              //   )
              // })}
              // value={parseInt('0')}
              onChangeText={(text) => this.setPlayerScore(player.name, text)}
              onSubmitEditing={(text) => console.log(text)}
            />)}
        </View>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>Scoreboard</Text>
        <View style={styles.scoreboard}>
          <View>
            {this.state.players.map((player) =>
              <Text style={{fontSize: 15, fontWeight: 'bold'}} key={player.name}>{player.name}</Text>)}
          </View>
          <View style={{width: 50, alignItems: 'flex-end'}}>
            {this.state.players.map((player) =>
              <Text style={{fontSize: 15, fontWeight: 'bold'}} key={player.name}>{player.score}</Text>)}
          </View>
        </View>
        <View style={{flex: 1}}>
          {this.displayButton()}
        </View>
      </View>
    )
  }

  nextRound () {
    console.log('test')
    this.setState({
      players: this.state.players
    })
    this.state.players.forEach((player) => {
      this.clearText(player.name)
    })
    if (this.state.currentRound < this.state.totalRounds) {
      this.setState({ currentRound: parseInt(this.state.currentRound) + 1 })
    }
    // console.log(this.state.playerScores)
    // console.log(this.state.playerScore)
  }

  setPlayerScore (player, score) {
    let realScore = score.charAt(score.length - 1)
    let newState = {}
    newState[player.name] = score
    this.setState(newState)
    console.log(newState)
    // console.log(score)
    // console.log(realScore)
    var players = this.state.players
    // console.log(players)
    for (let i in players) {
      if (players[i].name === player) {
        if (realScore > 0) {
          players[i].score = parseInt(realScore) + parseInt(players[i].score)
          break
        }
      }
    }
    console.log(players)
  }

  displayWinner () {
    var scores = []
    var winner
    if (this.state.currentRound < this.state.totalRounds) {
      return <Text style={styles.titleText}>Current Round: {this.state.currentRound + 1} of {this.state.totalRounds}</Text>
    } else {
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
        <Text style={styles.titleText}>Winner is {winner}</Text>
      )
    }
  }

  displayButton () {
    if (this.state.currentRound < this.state.totalRounds) {
      return (
        <Button
          title='Next Round'
          onPress={() =>
              this.nextRound()
            } />
      )
    } else {
      return (
        <Button
          title='Start New Game'
          onPress={() =>
                this.newGame()
            } />
      )
    }
  }

  newGame () {
    this.props.navigation.state.params.reset()
    this.props.navigation.goBack()
  }
  clearText (fieldName) {
    // console.log(this.refs[fieldName])
    this.refs[fieldName].setNativeProps({text: ''})
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: 'gainsboro',
    alignItems: 'center'
    // justifyContent: 'center'
  },
  scoreboard: {
    flex: 2,
    flexDirection: 'row',
    paddingTop: 10
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // backgroundColor: 'brown'
    // alignContent: 'space-between'
  },
  header: {
    flex: 1
    // backgroundColor: 'blue'
    // flexDirection: 'row'
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start'
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold'
  }
})
