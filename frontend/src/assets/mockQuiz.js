// src/data/mockQuiz.js

export const quizData = [
  {
    "id": 1,
    "question": "Which hook is used to manage state in a functional component?",
    "options": ["useEffect", "useState", "useContext", "useReducer"],
    "correctAnswer": "useState",
    "explanation": "useState is the primary hook for adding local state to functional components."
  },
  {
    "id": 2,
    "question": "What is the correct syntax for passing a prop named 'title' to a component?",
    "options": [
      "<MyComponent title='Hello' />",
      "<MyComponent props='title: Hello' />",
      "<MyComponent setHeader='Hello' />",
      "<MyComponent val='Hello' />"
    ],
    "correctAnswer": "<MyComponent title='Hello' />",
    "explanation": "Props are passed to components via attributes in JSX."
  },
  {
    "id": 3,
    "question": "When does the useEffect hook run by default (with no dependency array)?",
    "options": [
      "Only on the first render",
      "Only when the component unmounts",
      "After every render",
      "Only when state changes"
    ],
    "correctAnswer": "After every render",
    "explanation": "Without a dependency array, useEffect runs after every completed render of the component."
  }
];