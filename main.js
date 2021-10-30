const option1=document.querySelector('.option1'),
      option2=document.querySelector('.option2'),
      option3=document.querySelector('.option3'),
      option4=document.querySelector('.option4');

const optionElements=document.querySelectorAll('.option'),
      question=document.getElementById('question'),
      numberOfQuestion=document.getElementById('number-of-question'),
      numberOfAllQuestion=document.getElementById('number-of-all-questions');
let indexOfQuestion,
    indexOfPage=0;
const answersTracker=document.getElementById('answers-tracker');

const btnNext=document.getElementById('btn-next');

let score=0;
const correctAnswer=document.getElementById('correct-answer'),
      numberOfAllQuestions2=document.getElementById('number-of-all-questions-2'),
      btnTryAgain=document.getElementById('btn-try-again');

const questions=[
    {
        question:'Посчитай 7 + 4 = ',
        options:[
            '11',
            '12',
            '10',
            'леньки'
        ],
        rightAnswer: 0
    },
    {
        question:'Посчитай 8 - 3 = ',
        options:[
            '4',
            '5',
            '11',
            ':)Э'
        ],
        rightAnswer: 1
    },
    {
        question:'Посчитай 9 - 6 = ',
        options:[
            '15',
            '4',
            '3',
            '12'
        ],
        rightAnswer: 2
    },
    {question:'Посчитай 6 + 8 = ',
        options:[
            '12',
            '14',
            '13',
            '15'
        ],
        rightAnswer: 1
    }
];

let completedAnswers=[];

numberOfAllQuestion.innerHTML=questions.length;

const load=()=>{
    question.innerHTML=questions[indexOfQuestion].question;

    option1.innerHTML=questions[indexOfQuestion].options[0];
    option2.innerHTML=questions[indexOfQuestion].options[1];
    option3.innerHTML=questions[indexOfQuestion].options[2];
    option4.innerHTML=questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML=indexOfPage+1;
    indexOfPage++;

};


const randomQuestion=()=>{
    let randomNumber=Math.floor(Math.random()*questions.length);

    let hitDuplicate=false;

    if(indexOfPage==questions.length){
        quizOver();
    } else{
        if(completedAnswers.length > 0){
            completedAnswers.forEach(item=>{
                if(item == randomNumber){
                    hitDuplicate=true;
                }

            });
        if(hitDuplicate){
            randomQuestion();
            }else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswers.length==0){
                indexOfQuestion = randomNumber;
                load();
        }
    }
    completedAnswers.push(indexOfQuestion);
}

const checkAnswer= el =>{
    if(el.target.dataset.id==questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
       
    }

    disabledOptions();

}

for (option of optionElements){
    option.addEventListener('click', e=>checkAnswer(e));
}

const disabledOptions=()=>{
    optionElements.forEach(item=>{
        item.classList.add('disabled');
        if(item.dataset.id==questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct');
        }
    })
}


const enableOptions=()=>{
    optionElements.forEach(item=>{
        item.classList.remove('disabled', 'correct', 'wrong');

        
    })
}


const answerTracker=()=>{
    questions.forEach(()=>{
        const diiv=document.createElement('div'); //
        answersTracker.appendChild(diiv);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage-1].classList.add(`${status}`);
}

const validate=()=>{
    if(!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выюрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }

}



const quizOver=()=>{
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML=questions.length;
}

const tryAgain=() =>{
    window.location.reload();
}
btnTryAgain.addEventListener('click', tryAgain)

btnNext.addEventListener('click', ()=>{
    validate();
})

window.addEventListener('load', ()=>{
    randomQuestion();
    answerTracker();
});

