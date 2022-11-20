//Select Elements
let countSpan = document.querySelector(".count span");
let bulletsSpancontainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea =  document.querySelector(".answer-area");
let submitButton = document.querySelector(".submit-button"); 
let bullets = document.querySelector(".bullets");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");
//Set option
let cuurentIndex = 0;
let rightAnswers = 0;
let countdownInterval ;


function getQuestion(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange=function(){
        if(this.readyState === 4 && this.status===200) {
let questionsObject = JSON.parse(this.responseText)
let qCount = questionsObject.length;
//Creat Bullets + Set Question count
creatBullets(qCount);
//Add Question Datas
addQuestionData(questionsObject[cuurentIndex],qCount);
//Start countDown
countdown(3,qCount);
//Click On Submite
submitButton.onclick = () =>{
    //Get The Right Answer
    let theRightAnswer = questionsObject[cuurentIndex].right_answer;

    //Icreas Index
    cuurentIndex++;

    //Check The Answer
    checkAnswer(theRightAnswer,qCount);

    //Removr Previos Question
    quizArea.innerHTML="";
    answersArea.innerHTML="";
    //Add Question Datas
addQuestionData(questionsObject[cuurentIndex],qCount);

//Handel Bullets Class
handelBullets();
//Start countDown
clearInterval(countdownInterval);
countdown(3,qCount)
//Show Result
showResult(qCount);
};
        }
    };
    myRequest.open("GET", "html_questions.json",true);
    myRequest.send();
}
getQuestion();
function creatBullets(num){
countSpan.innerHTML = num;
//Creat Spans
for(let i = 0;i< num ; i++){
    let theBullet = document.createElement("span");
    //check if its the first span
    if(i===0){
        theBullet.className = "active"
    }
    //Appand bullet To Main Bullet Container
    bulletsSpancontainer.appendChild(theBullet);
}
}

function addQuestionData(obj, count){
        if(cuurentIndex < count){
            //Creat H2  QuestionTitle
        let questionTitle = document.createElement("h2");
        //Creat Question Text
        let questionText= document.createTextNode(obj.title);
        //Appand Text To Heading
        questionTitle.appendChild(questionText);
        //Appand The H2 In The Quiz Area
        quizArea.appendChild(questionTitle);
        //Creat The Answers
        for(i= 1 ; i<= 4;i++){
            //Creat Main Answer Div
            let mainDiv = document.createElement("div");
            //Add Class To Main div
            mainDiv.className= 'answer';
            //Creat Radio input
            let radioInput = document.createElement("input");
            //Add Type + Name +Id +Data-Attribute
            radioInput.name= 'question';
            radioInput.type= 'radio';
            radioInput.id= `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];
            //Make First Option Selected
            if(i === 1){
                radioInput.checked=true
            }
            //Creat Label
            let theLabel= document.createElement("label");
            //Add or Attributw
            theLabel.htmlFor =  `answer_${i}`;
            //Creat Label Text
            let thelabelText= document.createTextNode(obj[`answer_${i}`]);
            //Add The Text The to Label
            theLabel.appendChild(thelabelText);
            //Appand input +Input To Main Div
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(theLabel);
            //Appand All Diavs To answers Area
            answersArea.appendChild(mainDiv);
        }
        }
}
function checkAnswer(rAnswer,count){
    let answers = document.getElementsByName("question");
    let theChoosenAnswer;
    for(let i=0;i<answers.length; i++){
        if(answers[i].checked){
theChoosenAnswer = answers[i].dataset.answer;
        }
    }
    console.log(`Right Answeer Is : ${rAnswer}`);
    console.log(`Chossen  Answeer Is : ${theChoosenAnswer}`);
    if(rAnswer === theChoosenAnswer){
        rightAnswers++;
        console.log("Good Answer");
    }
}

function handelBullets(){
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arraySapns = Array.from(bulletsSpans);
arraySapns.forEach((span,index) => {
if(cuurentIndex === index ){
span.className = "active";
}
});
}

function showResult(count){
    let theResults;
    if(cuurentIndex === count){
quizArea.remove();
answersArea.remove();
submitButton.remove();
bullets.remove();
if(rightAnswers > (count / 2) && rightAnswers < count){
theResults = `<span class="good">Good</span>,${rightAnswers} From ${count} IS Right Answer`;
}else if(rightAnswers === count){
    theResults = `<span class="perfect">Perfect</span>,All Answer Is Good`;
}else{
    theResults = `<span class="bad">Bad</span>,${rightAnswers} From ${count},IS Not Good`;
}
resultsContainer.innerHTML = theResults;
    }
}

function countdown(duration,count){
    if(cuurentIndex < count){
let minutes , seconds ;
countdownInterval = setInterval( function(){
minutes = parseInt(duration / 60);
seconds = parseInt(duration % 60);
minutes = minutes < 10 ? `0${minutes}` : minutes;
seconds = seconds < 10 ? `0${seconds}` : seconds;

countdownElement.innerHTML=`${minutes}:${seconds}`;
if(--duration < 0){
clearInterval(countdownInterval);
submitButton.click();
}
},1000);
    }
}