const DATA = [
    {
        question:'<br/><br/><br/>A girl volunteers as tribute in place of her younger sister, who is also named for a plant',
        answer: [
            {
                id:'1',
                value:'The Lord of the Rings',
                correct: false,
            },
            {
                id:'2',
                value:'The Hunger Games',
                correct: true,
            },
            {
                id:'3',
                value:'Harry Potter',
                correct: false,
            },
         
        ]
    },
    {
        question:'<br/><br/>The book is about a country in crisis, undergoing a dramatic shift between an old, traditional way of life and a whole new system',
        answer: [
            {
                id:'4',
                value:'The Cherry Orchard',
                correct: true,
            },
            {
                id:'5',
                value:'The Hobbit',
                correct: false,
            },
            {
                id:'6',
                value:'Woe from Wit',
                correct: false,
            },
         
        ]
    },
    {
        question:'<br/><br/><br/>An elderly miser who is visited by the spirits of Christmas Past, Present and Yet to Come',
        answer: [
            {
                id:'7',
                value:'A Christmas Memory',
                correct: false,
            },
            {
                id:'8',
                value:'A Christmas Carol',
                correct: true,
            },
            {
                id:'9',
                value:'Polar Express',
                correct: false,
            },
       
        ]
    },
    {
        question:'<br/>The main Character is described as having his fathers perpetually untidy black hair, his mothers bright green eyes, and a lightning bolt-shaped scar on his forehead',
        answer: [
            {
                id:'10',
                value:'Phantastic Beasts',
                correct: false,
            },
            {
                id:'11',
                value:'The Hunger Games',
                correct: false,
            },
            {
                id:'12',
                value:'Harry Potter',
                correct: true,
            },
           
        ]
    },
    {
        question:'<br/><br/><br/><br/>It is a French Gothic novel, published in 1831',
        answer: [
            {
                id:'13',
                value:'The Hunchback of Notre-Dame',
                correct: true,
            },
            {
                id:'14',
                value:'A Christmas in Paris',
                correct: false,
            },
            {
                id:'15',
                value:'Les Miserables',
                correct: false,
            },
        
        ]
    },
    {
        question:'<br/>A reflective and thoughtful young man who has studied at the University of Wittenberg and is full of hatred for his uncles scheming and disgust for his mothers sexuality',
        answer: [
            {
                id:'16',
                value:'Hamlet',
                correct: true,
            },
            {
                id:'17',
                value:'Faust',
                correct: false,
            },
            {
                id:'18',
                value:'Othello',
                correct: false,
            },
          
        ]
    },
    {
        question:'<br/><br/><br/>In this book some animals talk, mythical beasts abound, and magic is common.',
        answer: [
            {
                id:'19',
                value:'Phantastic Beasts',
                correct: false,
            },
            {
                id:'20',
                value:'The Hunger Games',
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
        question:'<br/>The novel opens with one of the most famous lines in English literature: “It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.” ',
        answer: [
            {
                id:'22',
                value:'The Great Gatsby',
                correct: false,
            },
            {
                id:'23',
                value:'Pride and Prejudice',
                correct: true,
            },
            {
                id:'24',
                value:'Emma',
                correct: false,
            },
           
        ]
    },
    {
        question:'<br/><br/>The story tells of how the sisters grow up, find love, and find their place in the world. Their father is fighting in the war.',
        answer: [
            {
                id:'25',
                value:'Jo´s Boys',
                correct: false,
            },
            {
                id:'26',
                value:'The Secret Garden',
                correct: false,
            },
            {
                id:'27',
                value:'Little Women',
                correct: true,
            },
         
        ]
    },
    {
        question:'When a young graduate returns home he is accompanied, much to his father and uncles discomfort, by a strange friend "who doesnt acknowledge any authorities, who doesnt accept a single principle on faith."',
        answer: [
            {
                id:'28',
                value:'Fathers and Sons',
                correct: true,
            },
            {
                id:'29',
                value:'Humiliated and Insulted',
                correct: false,
            },
            {
                id:'30',
                value:'Oblomov',
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
// const questionsRes  = document.getElementById('res_questions');  
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
            <div class="res_question"><strong style="display:none;">${question.question}</strong></div>
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
