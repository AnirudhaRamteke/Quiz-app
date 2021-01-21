import React, {useState} from "react";
import he from 'he';

const QuestionBox = ({question, options, correct, selected}) => {
  options.splice(Math.floor(Math.random() * 4),0, correct)
  let newArray = options.filter(function(item, pos, self) {
    return self.indexOf(item) === pos;
})
  newArray.map(item => he.decode(item) )
  console.log(newArray)
  const [answer, setAnswer] = useState(newArray);
  return (
    <div className="questionBox">
      <div className="question">{question}</div>
      {answer.map((text, index) => (
        <button
          key={index}
          className="answerBtn"
          onClick={() => {
            setAnswer([text])
            selected(text)
          }}
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export default QuestionBox;
