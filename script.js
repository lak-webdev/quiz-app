let startbtn = document.getElementById("starter");
let qline = document.querySelector(".toChange");
let textToDisappear = document.querySelector(".toRemove");
let opt = document.querySelector(".options");
let unselect = document.querySelector(".options");
let navBtn = document.querySelector(".options");
const quesArr = [
    {
        id: 1,
        questionText: "Q1: What is the colour of an orange?",
        options: ["Orange", "Yellow", "Green", "None of the above"],
        correctIndex: 0,
        pts: 1
    },
    {
        id: 2,
        questionText: "Q2: Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctIndex: 1,
        pts: 1
    },
    {
        id: 3,
        questionText: "Q3: Which one is not a social media platform",
        options: ["Instagram", "Youtube", "Notepad", "TikTok"],
        correctIndex: 2,
        pts: 1
    },
    {
        id: 4,
        questionText: "Q4: What is the capital of India?",
        options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
        correctIndex: 1,
        pts: 1
    },
    {
        id: 5,
        questionText: "Q5: How many days are there in a leap year?",
        options: ["364", "365", "366", "367"],
        correctIndex: 2,
        pts: 1
    },
    {
        id: 6,
        questionText: "Q6: Which language is used to style web pages?",
        options: ["HTML", "CSS", "Python", "SQL"],
        correctIndex: 1,
        pts: 1
    },
    {
        id: 7,
        questionText: "Q7: What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctIndex: 3,
        pts: 1
    },
    {
        id: 8,
        questionText: "Q8: Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        correctIndex: 1,
        pts: 1
    },
    {
        id: 9,
        questionText: "Q9: Which of these is a JavaScript framework/library?",
        options: ["React", "Django", "Laravel", "Flask"],
        correctIndex: 0,
        pts: 1
    },
    {
        id: 10,
        questionText: "Q10: How many continents are there on Earth?",
        options: ["5", "6", "7", "8"],
        correctIndex: 2,
        pts: 1
    }
];
let userAns = [];

const messages = [
    "Zero. Unacceptable.",
    "Very poor.",
    "Poor.",
    "Weak.",
    "Below average.",
    "Average.",
    "Mediocre pass.",
    "Acceptable.",
    "Good.",
    "Very good.",
    "Perfect."
];

function removePreviousButton() {
    document.getElementById("prev").classList.add("hidePrevious");
}
function showPreviousButton() {
    document.getElementById("prev").classList.remove("hidePrevious");
}
let i = 0;
startbtn.addEventListener("click", () => {
    textToDisappear.style.display = "none";
    qline.innerHTML = quesArr[i].questionText;
    opt.innerHTML = '<label class="optbox"><input type="radio" name="ansToQ" id="0">Orange</label><label class="optbox"><input type="radio" name="ansToQ" id="1">Yellow</label><label class="optbox"><input type="radio" name="ansToQ" id="2">Green</label><label class="optbox"><input type="radio" name="ansToQ" id="3">None of the above</label><label><button id="prev" class="hidePrevious">Previous</button></label><label><button id="next">Next</button></label><label><button id="remover" class="toUnselect">Remove selection</button></label>';
});

opt.addEventListener("change", (e) => {
    if (e.target.matches('input[name="ansToQ"]'))
        document.getElementById("remover").classList.remove("toUnselect");

    let selected = Number(e.target.id);
    let entry = {
        id: quesArr[i].id,
        questionText: quesArr[i].questionText,
        options: quesArr[i].options,
        selectedIndex: selected,
        isCorrect: selected === quesArr[i].correctIndex
    }

    let existing = userAns.findIndex(a => a.id === entry.id);
    if (existing === -1) userAns.push(entry);
    else userAns[existing] = entry;
});

function UnselectOptionButton(e) {
    if (e.target.matches("#remover")) {
        document.querySelector('input[name="ansToQ"]:checked').checked = false;
        document.getElementById("remover").classList.add("toUnselect");
        userAns = userAns.filter(a => a.id !== quesArr[i].id);
    }
}

unselect.addEventListener("click", (e) => {
    UnselectOptionButton(e);
});

function renderQuestion() {
    if (i == 1) {
        showPreviousButton();
    }
    else if (i == 0) {
        removePreviousButton();
    }
    else if (i == quesArr.length - 1) {
        document.getElementById("next").innerHTML = "End";
    }
    if (i < quesArr.length - 1) {
        document.getElementById("next").innerHTML = "Next";
    }
    qline.innerHTML = quesArr[i].questionText;
}

function renderOptions() {
    let ops = document.querySelectorAll(".optbox");
    let saved = userAns.find(a => a.id === quesArr[i].id);
    for (let j = 0; j < 4; j++) {
        ops[j].lastChild.textContent = quesArr[i].options[j];
        ops[j].querySelector("input").checked = saved ? saved.selectedIndex === j : false;
    }

    if (saved) {
        document.getElementById("remover").classList.remove("toUnselect");
    }
    else {
        document.getElementById("remover").classList.add("toUnselect");
    }
}

function navigate(e) {
    if (!e.target.matches("#next,#prev")) return;
    if (e.target.matches('#next') && i <= quesArr.length - 1) {
        if (i < quesArr.length - 1) {
            i++;
            renderQuestion();
            renderOptions();
        }
        else if (i == quesArr.length - 1) {
            let ask = confirm("Do you want to submit the quiz?");
            if (ask) {
                let correctAnswers=0;
                for(let j = 0 ; j < userAns.length ; j++) {
                    if (userAns[j].isCorrect) {
                        correctAnswers++;
                    }
                }
                let msg=messages[correctAnswers];
                document.getElementsByClassName("card")[0].innerHTML = `<h1>Your performance</h1><h2>You scored ${correctAnswers}/10</h2><h2>Your total percentage is ${correctAnswers*10}%</h2><h2>${msg}</h2>`;
            }
        }
        UnselectOptionButton(e);
    }
    else if (e.target.matches('#prev') && i > 0) {
        if (i > 0) {
            i--;
        }
        renderQuestion();
        renderOptions();
    }
}

navBtn.addEventListener("click", (e) => {
    navigate(e);
});