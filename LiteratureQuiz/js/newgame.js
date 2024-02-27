const DATA = [
    {
        question:'Chronicles of Narnia',
        answer: [
            {
                id:'1',
                value:'C.S. Lewis',
                correct: true,
            },
            {
                id:'2',
                value:'A. Conan Doyle',
                correct: false,
            },
            {
                id:'3',
                value:'J. Austen',
                correct: false,
            },
         
        ]
    },
    {
        question:'The Hobbit',
        answer: [
            {
                id:'4',
                value:'J.K. Rowling',
                correct: false,
            },
            {
                id:'5',
                value:'J.R.R. Tolkien',
                correct: true,
            },
            {
                id:'6',
                value:'V. Hugo',
                correct: false,
            },
         
        ]
    },
    {
        question:'War and Peace',
        answer: [
            {
                id:'7',
                value:'A. Tolstoy',
                correct: false,
            },
            {
                id:'8',
                value:'M. Lermontov',
                correct: false,
            },
            {
                id:'9',
                value:'L. Tolstoy',
                correct: true,
            },
       
        ]
    },
    {
        question:'Les Misérables',
        answer: [
            {
                id:'10',
                value:'G.E. Lessing',
                correct: false,
            },
            {
                id:'11',
                value:'V. Hugo',
                correct: true,
            },
            {
                id:'12',
                value:'E. Hemingway',
                correct: false,
            },
           
        ]
    },
    {
        question:'Oliver Twist',
        answer: [
            {
                id:'13',
                value:'E. Sole',
                correct: false,
            },
            {
                id:'14',
                value:'C. Dickens',
                correct: true,
            },
            {
                id:'15',
                value:'Ch. Bronte',
                correct: false,
            },
        
        ]
    },
    {
        question:'Othello',
        answer: [
            {
                id:'16',
                value:'J.W. von Goethe',
                correct: false,
            },
            {
                id:'17',
                value:'T. Fontane',
                correct: false,
            },
            {
                id:'18',
                value:'W. Shakespeare',
                correct: true,
            },
          
        ]
    },
    {
        question:'Da Vinci Code',
        answer: [
            {
                id:'19',
                value:'Suzanne Collins',
                correct: false,
            },
            {
                id:'20',
                value:'Dan Brown',
                correct: true,
            },
            {
                id:'21',
                value:'J.R.R. Tolkien',
                correct: false,
            },
          
        ]
    },
    {
        question:'Eugene Onegin',
        answer: [
            {
                id:'22',
                value:'A.S. Pushkin',
                correct: true,
            },
            {
                id:'23',
                value:'F. Dostoevsky',
                correct: false,
            },
            {
                id:'24',
                value:'A.S Griboedov',
                correct: false,
            },
           
        ]
    },
    {
        question:'Pride and Prejudice',
        answer: [
            {
                id:'25',
                value:'A. Christie',
                correct: false,
            },
            {
                id:'26',
                value:'J. Austen',
                correct: true,
            },
            {
                id:'27',
                value:'E. Bronte',
                correct: false,
            },
         
        ]
    },
    {
        question:'Sherlock Holmes',
        answer: [
            {
                id:'28',
                value:'A. Conan Doyle',
                correct: true,
            },
            {
                id:'29',
                value:'J. London',
                correct: false,
            },
            {
                id:'30',
                value:'A. Dumas',
                correct: false,
            },
          
        ]
    },
];


let res = {};


const quiz = document.getElementById('quiz');
const buttonNext = document.getElementById('next');
const buttonBack = document.getElementById('back');
const secondButtonBack = document.getElementById('back-res');
const questions  = document.getElementById('questions');  
const indicator = document.getElementById('indicator');  
const solution = document.getElementById('solution'); 
const results = document.getElementById('results'); 
const picture = document.getElementById('picture');



const renderQuestions = (index) => {
    renderIndicator(index + 1);

    questions.dataset.currentStep = index;

    const renderAnswers = () => {
        return DATA[index].answer.map((ans) => {
            return `
                <li>
                <label>
                    <input class="answer-input" type="radio" name="${index}" value=${ans.id}>
                    ${ans.value}
                </label>
                </li>
            `;
        })
    }

    questions.innerHTML = `
        <div class="items">
            <div class="question">${DATA[index].question}</div>
            <ul class="answer">
                ${renderAnswers()}
            </ul>
        </div>
    `;
};

const renderResults = () => {
    let content = '';


    const getClassname = (ans, questInd) => {
        let classname = '';

        if (!ans.correct && ans.id === res[questInd]) {
            classname = 'answer--invalid';
        } else if (ans.correct) {
            classname = 'answer--valid';
        }

        return classname;
    }

    const getAnsw = (questInd) => {
        return DATA[questInd].answer.map((ans) => {
            return `<li class=${getClassname(ans, questInd)}>${ans.value}</li>`;
        })
        .join('');
    }

    DATA.forEach((question, index) => {
        content += `
        <div class="res_items">
            <div class="res_question"><strong>${question.question}</strong></div>
            <ul class="res_answer">${getAnsw(index)}</ul>
        </div>
        `;
    })
    results.innerHTML = content;
};

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`;
};

// const renderSolution = () => {
//     const crct = (ans) => {
//         let rightAns = 0;
//         if(ans.correct === true) {
//             rightAns += 1;
//         }
//         return rightAns;
//     };
//     solution.innerHTML = `Your score is ${crct()}/${DATA.length}`;
// }

quiz.addEventListener('change', (event) => {
    //answer logic
    if (event.target.classList.contains('answer-input')) {
        res[event.target.name] = event.target.value;
        buttonNext.disabled = false;
    }
});

quiz.addEventListener('click', (event) => {
    //next or back buttons
    if (event.target.classList.contains('next')) {
        const nextQueInd = Number(questions.dataset.currentStep) + 1;

        if (DATA.length === nextQueInd) {
            //to results 
            buttonNext.classList.add('buttonNext--hidden');
            buttonBack.classList.add('buttonBack--hidden');
            secondButtonBack.classList.add('secondButtonBack--visible');
            indicator.classList.add('indicator--hidden');
            results.classList.add('results--visible');
            questions.classList.add('questions--hidden');
            picture.classList.add('picture--visible');
            renderResults();
        } else {
            //to next question
            renderQuestions(Number(nextQueInd));
        }

        buttonNext.disabled = false;
    }

    if (event.target.classList.contains('back_res')) {
        res = {};
        results.innerHTML = '';
        
        buttonNext.classList.remove('buttonNext--hidden');
        buttonBack.classList.remove('buttonBack--hidden');
        secondButtonBack.classList.add('secondButtonBack--visible');
        indicator.classList.remove('indicator--hidden');
        results.classList.remove('results--visible');
        questions.classList.remove('questions--hidden');
        picture.classList.add('picture--visible');
        renderQuestions(0);
    }
});

renderQuestions(0);
