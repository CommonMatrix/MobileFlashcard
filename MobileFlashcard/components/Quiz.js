import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'
import {orange, purple, white, red, green} from '../utils/color'

const Indicator = (props) => {
  return(
    <View style={styles.indicatorContainer}>
      <Text style={styles.indicatorText}> Card number: {props.count + 1} of {props.length} Total Cards</Text>
    </View>
  )
}

class Quiz extends Component {
  state = {
    count: 0,
    answer: false,
    finished: false,
    correct: 0,
    opacity: new Animated.Value(0)
  }

  componentDidMount() {
    const { opacity } = this.state
    Animated.timing(opacity, { toValue: 1, duration: 1000 }).start()
  }

  onShowAnswer = () => {
    this.setState({ answer: this.state.answer })
  }

  onClick = (value) => {
    const { decks } = this.props
    const { count, answer } = this.state
    const { name } = this.props.navigation.state.params
    const length = decks[name].questions.length

    this.setState({answer: false})

    if (value) {
      this.setState({ correct: this.state.correct + 1 })
    }

    if (count >= length - 1) {
      this.setState({ finished: true })

      // Set Local Notification
      clearLocalNotification()
        .then(setLocalNotification())

    } else {
      this.setState({ count: this.state.count + 1 })
    }
  }


  onShowAnswer = () => {
      this.setState({ answer: !this.state.answer })
    }

  onRestart = () => {
    this.setState({ count: 0, answer: false, finished: false, correct: 0 })
  }

  onBackToDeck = () => {
    this.props.navigation.goBack()
  }

  render() {
    const { count, answer, opacity, finished, correct } = this.state
    const { decks } = this.props
    const { name } = this.props.navigation.state.params
    const length = decks[name].questions.length
    const percent = correct/length*100


    //When all answers completed, show 2 button for restart or back to deck

    if(finished) {
      return(
        <View style={styles.finalContainer}>


          <Text style={{fontSize: 30}}>Score: {correct} / {length}</Text>
          <Text>Achieved Percentage: {percent.toFixed(2)} % </Text>
          <View>

            <TouchableOpacity
              onPress={this.onRestart}
              style={[styles.button, {marginTop: 50},{backgroundColor: green}]}>
                <Text style={styles.buttonText}>Restart Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.onBackToDeck}
              style={[styles.button, {marginTop: 10}, {backgroundColor: orange}]}>
                <Text style={styles.buttonText}>Back to Deck</Text>
            </TouchableOpacity>

          </View>
        </View>
      )
    }

    return(
      <Animated.View style={[{flex: 1}, { opacity }]}>
        <Indicator count={count} length={length} />
        <View style={styles.titleContainer}>

          {answer && (

            <Animated.Text
              style={[styles.title, { opacity }]}>
              {decks[name].questions[count].answer}

            </Animated.Text>
          )}

          {!answer && (
            <Animated.Text
              style={[styles.title, { opacity }]}>
              {decks[name].questions[count].question}
            </Animated.Text>
          )}

          <TouchableOpacity
            onPress={this.onShowAnswer}>
            {answer && (
              <Animated.Text
                style={[{fontSize: 20, marginTop: 30}, { opacity }]}>
                Show Question
              </Animated.Text>
            )}

            {!answer && (
              <Animated.Text
                style={[{fontSize: 20, marginTop: 30}, { opacity }]}>
                Show Answer
              </Animated.Text>
            )}
          </TouchableOpacity>

        </View>



        <View style={styles.buttonContainer}>

          <Text style={styles.clickTitle}>Was your answer correct?</Text>

          <TouchableOpacity
            onPress={() => this.onClick(true)}
            style={styles.button}>
              <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => this.onClick(false)}
            style={[styles.button, {backgroundColor: red}]}>
              <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>

        </View>
      </Animated.View>
    )
  }
}

function mapStateToProps(state) {
  return {
    decks: state
  }
}

const styles = StyleSheet.create({
  indicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: orange,
    height: 30
  },
  indicatorText: {
    fontSize: 20,
    color: 'white'
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  finalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    padding: 10,
    borderRadius: 7,
    height: 50,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    backgroundColor: green
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  },
  clickTitle: {
    flex:0.5,
    fontSize: 30,
    textAlign: 'center',
    justifyContent: 'center'
  },

})
export default connect(mapStateToProps)(Quiz)
