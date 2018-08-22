import { AsyncStorage } from 'react-native'

const UDACICARDS_STORAGE_KEY = 'UdaciCards:flashcards'

const initialData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'Does React work with Android?',
        answer: 'Yes'
      },
      {
        question: 'React is a Framework developed by Google?',
        answer: 'No'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'Closure is a combination of function?',
        answer: 'Yes'
      }
    ]
  }
}

export function getDecks() {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
    .then(results => {
      if(results === null) {
        AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(initialData))
        return initialData
      } else {
        return JSON.parse(results)
      }
    })
}

export function saveDeckTitle(title) {
 return AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
    .then(results => JSON.parse(results))
    .then(results => {
      results[title].questions.push(card)
      AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(results))
      return results
    })
}
