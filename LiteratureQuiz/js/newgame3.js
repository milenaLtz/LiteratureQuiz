const DATA = [
    {
        question:'John Watson',
        answer: [
            {
                id:'1',
                value:'Inferno',
                correct: false,
            },
            {
                id:'2',
                value:'Sherlock Holmes',
                correct: true,
            },
            {
                id:'3',
                value:'The Hunger Games',
                correct: false,
            },
         
        ]
    },
    {
        question:'G.A. Pechorin',
        answer: [
            {
                id:'4',
                value:'A Hero of Our Time',
                correct: true,
            },
            {
                id:'5',
                value:'Demon',
                correct: false,
            },
            {
                id:'6',
                value:'Eugene Onegin',
                correct: false,
            },
         
        ]
    },
    {
        question:'L. Ranevskaya',
        answer: [
            {
                id:'7',
                value:'Woe from Wit',
                correct: false,
            },
            {
                id:'8',
                value:'Three Sisters',
                correct: false,
            },
            {
                id:'9',
                value:'The Cherry Orchard',
                correct: true,
            },
       
        ]
    },
    {
        question:'Natasha Rostova',
        answer: [
            {
                id:'10',
                value:'Crime and Punishment',
                correct: false,
            },
            {
                id:'11',
                value:'War and Peace',
                correct: true,
            },
            {
                id:'12',
                value:'The Idiot',
                correct: false,
            },
           
        ]
    },
    {
        question:'Gollum',
        answer: [
            {
                id:'13',
                value:'The Hobbit',
                correct: false,
            },
            {
                id:'14',
                value:'The Fall of Numenor',
                correct: false,
            },
            {
                id:'15',
                value:'The Lord of the Rings',
                correct: true,
            },
        
        ]
    },
    {
        question:'Bellartix Lestrange',
        answer: [
            {
                id:'16',
                value:'Harry Potter',
                correct: true,
            },
            {
                id:'17',
                value:'Phantastic Beasts',
                correct: false,
            },
            {
                id:'18',
                value:'The Da Vinci Code',
                correct: false,
            },
          
        ]
    },
    {
        question:'Aslan',
        answer: [
            {
                id:'19',
                value:'The Hunger Games',
                correct: false,
            },
            {
                id:'20',
                value:'Angels and Demons',
                correct: false,
            },
            {
                id:'21',
                value:'Chronicles of Narnia',
                correct: true,
            },
          
        ]
    },
    {
        question:'Alexander Chatsky',
        answer: [
            {
                id:'22',
                value:'Woe from Wit',
                correct: true,
            },
            {
                id:'23',
                value:'Three Sisters',
                correct: false,
            },
            {
                id:'24',
                value:'Humiliated and Insulted',
                correct: false,
            },
           
        ]
    },
    {
        question:'Katniss Everdeen',
        answer: [
            {
                id:'25',
                value:'The 100',
                correct: false,
            },
            {
                id:'26',
                value:'The Hunger Games',
                correct: true,
            },
            {
                id:'27',
                value:'Harry Potter',
                correct: false,
            },
         
        ]
    },
    {
        question:'Sonya Marmeladova',
        answer: [
            {
                id:'28',
                value:'The Cherry Orchard',
                correct: false,
            },
            {
                id:'29',
                value:'Humiliated and Insulted',
                correct: false,
            },
            {
                id:'30',
                value:'Crime and Punishment',
                correct: true,
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
