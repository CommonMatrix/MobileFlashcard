import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
 } from 'react-native'

import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import {gray , orange, white} from '../utils/color'

class AddDeck extends Component {
  state = {
    text: ''
  }

  onInputChange = (text) => {
    this.setState({ text })
  }

  onSubmitButton = () => {
    const { text } = this.state
    if(text) {
      this.props.addDeck(text)
      saveDeckTitle(text)
      this.props.navigation.navigate('DeckDetails', { name: text })
    }
  }

  render() {
    const { text } = this.state
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
        </View>
        <View style={styles.enterContainer}>
          <TextInput
            placeholder='Deck Title'
            onChangeText={this.onInputChange}
            style={styles.input}/>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.onSubmitButton}
            style={styles.button}>
            <Text style={styles.buttonText}>Create Deck</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
  },
  titleContainer: {
    flex: 2,
    marginTop: 50,
    marginLeft: 60,
    marginRight: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 40,
    textAlign: 'center'
  },
  enterContainer: {
    flex: 1,
  },
  input: {
    width: 250,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: gray,
    margin: 20,
    fontSize: 25
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    padding: 10,
    borderRadius: 7,
    width: 250,
    height: 50,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40,
    backgroundColor: orange
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  },
})

const mapDispatchToProps = (dispatch) => {
  return {
    addDeck: (deck) => dispatch(addDeck(deck))
  }
}

export default connect(null, mapDispatchToProps)(AddDeck)
