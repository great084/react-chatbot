// import logo from "./logo.svg";
import React from "react";
import defaultDataset from "./dataset";
import "./assets/styles/style.css";
import { AnswersList, Chats } from "./components/index"; //エントリーファイルから読み取り

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false,
    };
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;
    // console.log(this.state.dataset[nextQuestionId]);
    // const chat_text = ;
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: "question",
    });
    // chats.push(chat);

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId,
    });
  };

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    // console.log(nextQuestionId);
    //   switch (true) {
    //     case nextQuestionId === "init":
    //       {
    //         this.displayNextQuestion(nextQuestionId);
    //         break;
    //       }
    //       //{
    //       dafault: {
    //         console.log(nextQuestionId);
    //         const chats = this.state.chats;
    //         chats.push({
    //           text: selectedAnswer,
    //           type: "answer",
    //         });

    //         this.setState({
    //           chats: chats,
    //         });
    //         this.displayNextQuestion(nextQuestionId);
    //         break;
    //       }
    //   }
    if (/^https:*/.test(nextQuestionId)) {
      const a = document.createElement("a");
      a.href = nextQuestionId;
      a.target = "_blank";
      a.click();
    } else if (nextQuestionId === "init") {
      setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
    } else {
      const chats = this.state.chats;
      chats.push({
        text: selectedAnswer,
        type: "answer",
      });
      this.setState({
        chats: chats,
      });
      setTimeout(() => this.displayNextQuestion(nextQuestionId), 1000);
    }
  };

  componentDidMount() {
    const initAnswer = "";
    this.selectAnswer(initAnswer, this.state.currentId);
  }

  componentDidUpdate() {
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList answers={this.state.answers} select={this.selectAnswer} />
        </div>
      </section>
    );
  }
}

export default App;
