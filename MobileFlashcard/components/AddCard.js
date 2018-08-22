import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch
 } from 'react-native'

 import { addCard } from '../actions'
 import { addCardToDeck } from '../utils/api'
 import { connect } from 'react-redux'
 import {gray , orange, white} from '../utils/color'

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  onQuestionChange = (text) => {
    this.setState({ question: text })
  }


  onAnswerChange = (text) => {
      this.setState({ answer: text })
    }


  onAddtButton = () => {
    const { question, answer } = this.state
    if(question) {
      const deck = this.props.navigation.state.params.name
      this.props.addCard({ question, answer, deck })
      addCardToDeck(deck, { question, answer })
      this.props.navigation.goBack()
    }
  }

  render() {
    const { text } = this.state
    return(

    <KeyboardAvoidingView behavior='padding' style={styles.container}>
       <View style={styles.commentContainer}>
          <Text style={styles.title}> New Card </Text>
          <Text style={styles.subtitle}>Please enter the question and answer for this new card:</Text>
      </View>

        <View style={styles.enterContainer}>

          <TextInput
            placeholder='Please enter the question for this card:'
            onChangeText={this.onQuestionChange}
            style={styles.input}/>
        </View>

        <View style={styles.enterContainer}>
            <TextInput
              placeholder='Please enter the answer for this card:'
              onChangeText={this.onAnswerChange}
              style={styles.input}/>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.onAddtButton}
            style={styles.button}>
            <Text style={styles.buttonText}>Add New Card</Text>
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
    justifyContent: 'flex-start',
  },

  enterContainer: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop:5,
    alignItems:'center',
    justifyContent:'flex-start',
  },
  title: {
    flex: 1,
    height:50,
    fontSize: 40,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 25,
    height: 30,
    textAlign: 'center'

  },

  input: {
    width: 550,
    height: 150,
    padding: 10,
    borderWidth: 2,
    borderColor: gray,
    margin: 10,
    marginTop: 5,
    fontSize: 25
  },
  commentContainer: {
    flex: 1,
    marginTop:5,
    margin:5,
    marginBottom:0
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    padding: 10,
    borderRadius: 7,
    height: 50,
    width: 250,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: orange
  },
  buttonText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
})

export default connect(null, { addCard })(AddCard)
