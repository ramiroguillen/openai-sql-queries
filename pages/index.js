import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
export default function Home() {
  const [promptInput, setPromptInput] = useState("");
  const [result, setResult] = useState();
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ PROMPT: promptInput }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setResult(data.result);
      setPromptInput("");
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div>
      <Head>
        <title>OpenAI SQL queries</title>
      </Head>
      <main className={styles.main}>
        <h3>OpenAI SQL queries</h3>
        <p className={styles.p}>
          Introducing our latest web app, powered by OpenAI API, that makes
          generating SQL queries quick and easy! With our user-friendly
          interface, you can generate complex SQL queries in just a few clicks.<br/><br/>
          Our web app harnesses the power of OpenAI's cutting-edge language
          model to understand your data and create SQL queries that are
          optimized for your specific needs. Whether you're a data analyst, data
          scientist, or a developer, our app is designed to help you streamline
          your data retrieval process. <br/><br/>Using our app is simple. Just input your
          data source and the specific criteria you want to query, and let
          OpenAI do the rest. Our app will analyze your data and generate the
          most efficient SQL query to retrieve the data you need. With our app,
          you can save time and increase efficiency by automating the SQL query
          generation process. Plus, our intuitive interface ensures that even
          those with little to no SQL experience can use our app to generate the
          queries they need. <br/><br/>Say goodbye to tedious manual query writing and
          hello to our web app powered by OpenAI API. Try it out today and see
          how easy it is to generate complex SQL queries in no time!
        </p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="i.e: find all users who have more than 1000 credits..."
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <input type="submit" value="Generate" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
