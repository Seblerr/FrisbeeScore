import React from 'react'
import { ListView, Button, TextInput, StyleSheet, Text, View } from 'react-native'

export default class GameSetup extends React.Component {
  // static navigationOptions = {
  //   title: 'Welcome',
  // }
  constructor (props) {
    super(props)
    // this._renderRow = this._renderRow.bind(this)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      name: '',
      score: 0,
      rounds: 18,
      players: [{name: 'Sebbe', score: 60}, {name: 'Ante', score: 70}, {name: 'Jacob', score: 71}, {name: 'Andreén', score: 96}],
      dataSource: ds.cloneWithRows([])
    }
  }

  render () {
    // console.log(this.props)
    const { navigate } = this.props.navigation
    return (
      // <App />
      <View style={styles.container}>
        <Text style={{fontSize: 30, bottom: 40}}>Start New Game</Text>
        <TextInput
          ref={component => this._textInput = component}
          style={{height: 50, width: 150}}
          placeholder='Enter players'
          autoCapitalize='words'
          onChangeText={(text) => this.setState({name: text})}
        />
        <Button
          title='Add Player'
          onPress={() => this.addPlayer(this.state.name)} />
        {/* <View style={{height: 100}}>
          <ListView
            enableEmptySections
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData.name}</Text>}
            />
        </View> */}
        {this.state.players.map((player) => <Text>{player.name}</Text>)}
        <TextInput
          style={{height: 50, width: 150}}
          keyboardType='numeric'
          placeholder='Enter rounds'
          // value='18'
          onChangeText={(rounds) => this.setState({rounds}, () => { console.log(this.state.rounds) })}
            // onSubmitEditing={console.log(this.state.rounds)}
            // onFocus={this.inputFocused.bind(this, 'username')}
          />
        <Button
          title='Start Game'
          onPress={() =>
              navigate('GameScreen', { players: this.state.players, rounds: this.state.rounds })
            }
        />
      </View>
    )
  }

  addPlayer (name) {
    this.state.players.push({
      name: this.state.name,
      score: this.state.score
    })
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.players)
    })
    console.log(this.state.players)
    this.clearText()
    // this.state.dataSource = this.state.dataSource.cloneWithRows(this.state.players)
  }
  //
  clearText () {
    this._textInput.setNativeProps({text: ''})
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
