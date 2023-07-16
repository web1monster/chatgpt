import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"

function App() {
  const [input, setInput] = useState("");
  const [completedSentence, setCompletedSentence] = useState("");
  const fetchData = async (input: string) => {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: `Complete this sentence: "${input}"`,
        model: 'gpt-3.5-turbo',
        max_tokens: 50,
        n: 1,
        stop: ".",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
      }
    );
    return response.data.choices[0].text;
  };
  async function handleClick() {
    try {
      const completedSentence = await fetchData(input);
      setCompletedSentence(completedSentence);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="App">
      <h2>Tell me something, and I'll tell you more</h2>
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        rows={5}
        placeholder="Type in some words and I'll finish the rest..."
      />
      <button className="button" onClick={handleClick}>Complete Sentence</button>
      {completedSentence && <p>Completed sentence: {completedSentence}</p>}
    </div>
  );
}

export default App;
