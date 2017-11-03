const AnswersContainer = ({correct_answer, incorrect_answers, handleNextQuestion, handleCorrectAnswer, handleIncorrectAnswer}) => {
    const buttonsArray = [
        <button className="btn waves-effect" onClick = { () => { handleNextQuestion(); handleCorrectAnswer() } } > { correct_answer } </button>,
    ]

    incorrect_answers.map( (incorrect_answer, index) => {
        buttonsArray.push(<button className="btn waves-effect" onClick= {  () => { handleNextQuestion(); handleIncorrectAnswer() } }> { incorrect_answer } </button>)
    }) 

    const shuffledArray = shuffle(buttonsArray)

    return (
        <div className="buttonArea">
            { shuffledArray.map( (button) => {
                return button 
            } )}
        </div>
    )
}


class Question extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            data: [],
            isLoading: true
        }
    }

    componentDidMount() {   
        const URL = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'
        return fetch(URL)
               .then( response => response.json() )
               .then( responseJson => responseJson.results )
               .then( questions => this.setState({ data : questions, isLoading: false }) )
               .catch( err => err )
    }

    render(){
        const { 
            currentQuestionIndex,
            handleNextQuestion,
            handleCorrectAnswer,
            handleIncorrectAnswer
        } = this.props

        const { data, isLoading } = this.state

        if(isLoading) return <div> Loading ...</div>

        return (
            <div>
                <div>
                    <div className="question"> { data[currentQuestionIndex].question }</div>
                    <AnswersContainer correct_answer = { data[currentQuestionIndex].correct_answer }
                                    incorrect_answers = { data[currentQuestionIndex].incorrect_answers } 
                                    handleNextQuestion = { () => handleNextQuestion() } 
                                    handleCorrectAnswer = { () => handleCorrectAnswer() } 
                                    handleIncorrectAnswer = { () => handleIncorrectAnswer() } />
                </div>
            </div>
        )
    }
}

function incrementByOne( previousNumber ){
    return previousNumber + 1
}

class GenerateQuestion extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            currentQuestionIndex: 0,
            correctAnswers: 0,
            incorrectAnswers: 0
        }      

        this.handleNextQuestion = this.handleNextQuestion.bind(this)

        this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this)
        this.handleIncorrectAnswer = this.handleIncorrectAnswer.bind(this)
    }

    handleNextQuestion(){

        if(this.state.correctAnswers + this.state.incorrectAnswers > 8){
            swal({
                title: "Complete",
                text: "The game has finished. Do you want to play again ?",
                icon: "warning",
                buttons: true
              })
              .then((restart) => {
                if (restart) {
                    this.setState( (prevState, props)  => {
                        return {
                            currentQuestionIndex: 0,
                            correctAnswers: 0,
                            incorrectAnswers: 0
                        }      
                
                    })
                } 
              });
        }

        this.setState( (prevState, props) => {

            if (this.state.currentQuestionIndex < 9)
                return { currentQuestionIndex: prevState.currentQuestionIndex + 1 }

            return { currentQuestionIndex: prevState.currentQuestionIndex }
        })  

    }

    handleCorrectAnswer(){
        this.setState( (prevState, props) => {
          return { correctAnswers: incrementByOne(prevState.correctAnswers) }
        })
      }

      handleIncorrectAnswer(){
        this.setState( (prevState, props) => {
          return { incorrectAnswers: incrementByOne(prevState.incorrectAnswers) }
        })
      }

    render(){
        
        return (
            <div className="row">
                <div className="col s6">
                    <Question handleNextQuestion = { this.handleNextQuestion }
                          handleCorrectAnswer = { this.handleCorrectAnswer } 
                          handleIncorrectAnswer = { this.handleIncorrectAnswer } 
                          currentQuestionIndex = { this.state.currentQuestionIndex } />
                </div>

                <div className="col s6 center-align ">
                    <h5 id="correct">
                        Correct: {this.state.correctAnswers}
                    </h5>
                    <h5 id="incorrect">
                        Incorrect: {this.state.incorrectAnswers}
                    </h5>
                </div>
            </div>
        )
    }

}


class Game extends React.Component {
    render(){
        return (
            <div>
                <GenerateQuestion/>
            </div>
        )
    }

}

ReactDOM.render(
    <Game/>,
    document.getElementById("root")
)