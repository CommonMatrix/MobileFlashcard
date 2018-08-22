import {
  ADD_DECK,
  ADD_CARD,
  RECEIVE_DECKS } from '../actions'

function decks(state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      const newDeck = {
        [action.deck]: {
          title: action.deck,
          questions: []
        }
      }
      return {
        ...state,
        ...newDeck
      }
    case ADD_CARD:
      const { question, answer, deck } = action.card
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [...state[deck].questions, { question, answer }]
        }
      }
    default:
      return state
  }
}

export default decks
