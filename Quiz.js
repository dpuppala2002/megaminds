// Sample quiz data (you can replace this with your own data)
const quizData = [{
        question: "What is the capital of France?",
        options: ["Paris", "Madrid", "London", "Berlin"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Neptune"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    }
];

// Function to display quiz questions
function displayQuizQuestions() {
    const quizContainer = document.getElementById("quiz-container");

    quizData.forEach((questionData, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("mb-4");

        const questionText = document.createElement("p");
        questionText.textContent = `Question ${index + 1}: ${questionData.question}`;
        questionDiv.appendChild(questionText);

        questionData.options.forEach((option, optionIndex) => {
            const optionLabel = document.createElement("label");
            optionLabel.classList.add("mr-2");

            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.name = `question${index}`;
            radioInput.value = option;
            optionLabel.appendChild(radioInput);

            const optionText = document.createTextNode(option);
            optionLabel.appendChild(optionText);

            questionDiv.appendChild(optionLabel);
        });

        quizContainer.appendChild(questionDiv);
    });
}

// Function to show the quiz page and hide other pages
function startQuiz() {
    const homePage = document.getElementById("home-page");
    const quizPage = document.getElementById("quiz-page");

    homePage.style.display = "none";
    quizPage.style.display = "block";

    // Call the function to display quiz questions
    displayQuizQuestions();
}

// Event listener for the "Start Quiz" button
const startQuizBtn = document.getElementById("start-quiz-btn");
startQuizBtn.addEventListener("click", startQuiz);

// Function to calculate and display quiz results
function showResults() {
    const quizPage = document.getElementById("quiz-page");
    const resultsPage = document.getElementById("results-page");

    // Calculate the score (replace with your scoring logic)
    let score = 0;
    const answers = [];
    quizData.forEach((questionData, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            const userAnswer = selectedOption.value;
            answers.push({
                question: questionData.question,
                userAnswer: userAnswer,
                correctAnswer: questionData.correctAnswer
            });
            if (userAnswer === questionData.correctAnswer) {
                score++;
            }
        }
    });

    // Display the score and answers
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `Your Score: ${score}/${quizData.length}`;

    const answersElement = document.getElementById("answers");
    answers.forEach((answerData, index) => {
        const answerItem = document.createElement("p");
        answerItem.textContent = `Question ${index + 1}: ${answerData.question} - Your Answer: ${answerData.userAnswer} - Correct Answer: ${answerData.correctAnswer}`;
        answersElement.appendChild(answerItem);
    });

    // Show the results page and hide the quiz page
    quizPage.style.display = "none";
    resultsPage.style.display = "block";
}

// Event listener for the "Submit Quiz" button
const submitQuizBtn = document.getElementById("submit-quiz-btn");
submitQuizBtn.addEventListener("click", showResults);