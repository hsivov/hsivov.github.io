const quizData = [
    {
        question: 'Which one is operating system?',
        a: 'IntelliJ IDEA',
        b: 'Linux',
        c: 'Python',
        d: 'Eclipse',
        correct: 'b'
    }, {
        question: "Visual Studio Code is:",
        a: "Operating system",
        b: "Programming language",
        c: "Integrated development environment, IDE",
        d: "Graphics editor",
        correct: 'c'
    }, {
        question: 'Which of these is not a programming language?',
        a: "Ruby",
        b: "Python",
        c: "Java",
        d: "Banana",
        correct: "d"
    }, {
        question: 'Inside which HTML element do we put the JavaScript?',
        a: '<js>',
        b: '<javascript>',
        c: '<script>',
        d: '<scripting>',
        correct: 'c'
    }, {
        question: "How to write an IF statement in JavaScript?",
        a: 'if (i == 5)',
        b: 'if i = 5',
        c: 'if i = 5 then',
        d: 'if == 5 then',
        correct: 'a'
    }, {
        question: 'Who is making the Web standards?',
        a: 'Google',
        b: 'The World Wide Web Consortium',
        c: 'Microsoft',
        d: 'Mozilla',
        correct: 'b'
    }
];
const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const answerElements = document.querySelectorAll(".answer");

let currentQuestion = 0;
let score = 0;

loadQuiz();

function loadQuiz() {

    unselectAnswer();
    const currentQuizData = quizData[currentQuestion];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;


}

function getSelected() {

    let answer = undefined;

    answerElements.forEach((answerElement) => {
        if (answerElement.checked) {
            answer = answerElement.id;
        }
    });

    return answer;
}

function unselectAnswer(){
    answerElements.forEach((answerElement) => {
        answerElement.checked = false;
    });
}

submitBtn.addEventListener('click', () => {

    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuestion].correct){
            score++;
        }
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2>You have answered correctly at ${score}
             of ${quizData.length} questions!</h2>
             <button onclick ='location.reload()'>Reload</button>`
        }
    }
});
