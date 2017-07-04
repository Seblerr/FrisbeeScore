import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class GameScreen extends Component {
  render () {
    const { params } = this.props.navigation.state
    return (
      <View style={styles.container}>
        <Text>Number of rounds: {params.rounds}</Text>
        {params.players.map((player) => <Text>{player.name} {player.score}</Text>)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  red: {
    color: 'red'
  }
})
