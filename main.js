let questions = [
    {
        question: "Which animal lays the most eggs?",
        answers:[
            { text: "Corals", correct: true },
            { text: "Seahorses", correct: false },
            { text: "Beavers", correct: false },
            { text: "Penguins", correct: false },
        ]
    },
    {
        question: "Which city has the tallest buildings?",
        answers:[
            { text: "New York", correct: false },
            { text: "Venice", correct: false },
            { text: "Hong Kong", correct: true },
            { text: "Dubai", correct: false },
        ]
    },
    {
        question: "What is the most expensive car brand?",
        answers:[
            { text: "Bugatti", correct: true },
            { text: "Ferrari", correct: false },
            { text: "Mecerdes", correct: false },
            { text: "Jaguar", correct: false },
        ]
    },
    {
        question: "Which is not a vegetable?",
        answers:[
            { text: "Ginger", correct: false },
            { text: "Potato", correct: false },
            { text: "Tomatoes", correct: false },
            { text: "Rice", correct: true },
        ]
    },
];


let questionElement = document.getElementById("question");
let answerButton = document.getElementById("answer-buttons");
let nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}


function selectAnswer(e){
    let selectedBtn = e.target; 
    let isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();