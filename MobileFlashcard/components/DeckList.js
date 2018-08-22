import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
 } from 'react-native'

import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import {orange, purple, white, red, green, gold} from '../utils/color'


class Deck extends Component {
  state = {
    opacity: new Animated.Value(0)
  }

  componentDidMount() {
    const { opacity } = this.state
    Animated.timing(opacity, { toValue: 1, duration: 1000 }).start()
  }

  componentWillUnmount() {
    this.state.opacity.removeAllListeners()
  }

  render() {
    const { name, count, onDeckPress } = this.props
    const { opacity } = this.state
    return(
      <View style={styles.boxContainer}>
        <Animated.View style={[styles.box, { opacity }]}>
          <TouchableOpacity onPress={() => onDeckPress({ name })}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.count}>{count} cards</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}

class DeckList extends Component {

  componentDidMount() {
    getDecks()
    .then(decks => this.props.receiveDecks(decks))
  }

  onDeckPress = ({ name }) => {
    this.props.navigation.navigate('DeckDetails', { name })
  }

  render() {
    const { decks } = this.props
    if(Object.keys(decks).length === 0) {
      return(
        <View>
          <Text>
            Loading...
          </Text>
        </View>
      )
    } else {
      return(
        <ScrollView style={styles.deckContainer}>
          {Object.keys(decks).map(deck => <Deck
            key={decks[deck].title}
            name={decks[deck].title}
            count={decks[deck].questions.length}
            onDeckPress={this.onDeckPress} />)}
        </ScrollView>
      )
    }

    }
}

const styles = StyleSheet.create({
  deckContainer: {
    flex: 1,
  },
  boxContainer: {
    height: 100,
    borderWidth: 1,
    borderColor: orange
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: gold
  },
  title: {
    fontSize: 25,
    textAlign: 'center'
  },
  count: {
    fontSize: 16,
    textAlign: 'center'
  }
})

const mapStateToProps = decks => ( { decks })
const mapDispatchToProps = (dispatch) => {
  return {
    receiveDecks: (decks) => dispatch(receiveDecks(decks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
