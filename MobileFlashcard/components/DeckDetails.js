import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
 } from 'react-native'

import { connect } from 'react-redux'
import {orange, purple, white, red, green} from '../utils/color'

class DeckDetail extends Component {

  state = {
    opacity: new Animated.Value(0)
  }

  componentDidMount() {
    const { opacity } = this.state
    Animated.timing(opacity, { toValue: 1, duration: 1000 }).start()
  }

  onAddCard = () => {
    const { name, count } = this.props.navigation.state.params
    this.props.navigation.navigate('AddCard', { name })
  }

  onStartQuiz = () => {
    const { name } = this.props.navigation.state.params
    this.props.navigation.navigate('Quiz', { name })
  }

  render() {
    const { name } = this.props.navigation.state.params
    const { decks } = this.props
    const { opacity } = this.state
    const count = decks[name].questions.length
    return(
      <Animated.View style={[styles.container, { opacity }]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.card}>{decks[name].questions.length} Cards</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.onAddCard}
            style={[styles.button, {backgroundColor: green}]}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          { count > 0 && (
            <TouchableOpacity
              onPress={this.onStartQuiz}
              style={[styles.button, {backgroundColor: orange}]}>
              <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 50
  },
  card: {
    fontSize: 22
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    padding: 10,
    borderRadius: 7,
    height: 60,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 30,
  },
  buttonText: {
    color: white,
    fontSize: 25,
    textAlign: 'center',
    justifyContent: 'center'
  },
})

const mapStateToProps = (decks) => {
  return {
    decks
  }
}
export default connect(mapStateToProps)(DeckDetail)
