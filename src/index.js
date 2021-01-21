import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/style.css';
import he from 'he';
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';
// import quizService from './quizService';



class Quiz extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0
  };
  
  getQuestions = () => {
    // quizService().then(question => {
    //   this.setState({
    //     questionBank: question
    //   });
    // })

    fetch('https://opentdb.com/api.php?amount=10&category=19')
    .then(res => res.json())
    .then(result => {
      console.log(result.results)
      this.setState({
        questionBank: result.results
      });

    })

  };

  computeAnswer = (answer, correct) => {
    if(answer === correct){
      this.setState({
        score: this.state.score + 1
      })

    }
    this.setState({
      responses: this.state.responses < 10 ? this.state.responses + 1 : 10
    })
  }
playAgain = () => {
  this.getQuestions();
  this.setState({
    score: 0,
    responses: 0
  })
}

combine = (arr, ele) => {

  return  arr.splice(Math.floor(Math.random() * 4), 0, ele);

}

  componentDidMount(){
    this.getQuestions();
  }
//   render(){
//     return(
//       <div className="container">
//       <div className="title">Quiz</div>
//       {this.state.questionBank.length > 0 &&
//         this.state.responses < 5 &&
//          this.state.questionBank.map(({question, answers, correct, questionId}) => (
//           <QuestionBox
//                 question = {question}
//                 options= {answers}
//                 key = {questionId}
//                 selected= {answer => this.computeAnswer(answer, correct)}
//           />   )  
//       )}

//       {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain}/>): null }
//       </div>
//     );
//   }
// }

render(){
  return(
    <div className="container">
    <div className="title">Quiz</div>
    {this.state.questionBank.length > 0 &&
      this.state.responses < 10 &&
      this.state.questionBank.map(({category,question,correct_answer,incorrect_answers}, index) => (
        
        <QuestionBox 
              question = {he.decode(question)}
              options= {incorrect_answers}
              correct = {correct_answer}
              key={index} 
              selected = {answer => this.computeAnswer(answer,correct_answer)}
              />


      )
      
      
    )}
    {this.state.responses === 10 ? (<Result score={this.state.score} playAgain={this.playAgain}/>): null }
    </div>
  );
}
}

ReactDOM.render(<Quiz />, document.getElementById('root'));