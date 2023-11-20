const questions = [{question:"1+3=?",answers:[
    {text:"10",correct:false},{text:"4",correct:true},
    {text:"2",correct:false},{text:"5",correct:false}]}
,
{question:"2+3=?",answers:[
    {text:"3",correct:false},{text:"7",correct:false},
    {text:"6",correct:false},{text:"5",correct:true}]}
,
{question:"1+2=?",answers:[
    {text:"3",correct:true},{text:"4",correct:false},
    {text:"1",correct:false},{text:"5",correct:false}]}
];
const questionelement = document.getElementById("question");
const  answerbutton= document.getElementById("answer-options");
const nextbutton = document.getElementById("next-btn");

let currentquestionindex = 0;
let score = 0;
 
function startQuiz()
{
    currentquestionindex=0;
    score=0;
    nextbutton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetstate();
    let currentquestion = questions[currentquestionindex];
    let questionNo = currentquestionindex+1;
    questionelement.innerHTML = questionNo+". "+currentquestion.question;
    
    currentquestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectanswer);
    });
}
function resetstate()
{
    nextbutton.style.display="none";
    while(answerbutton.firstChild)
    {
        answerbutton.removeChild(answerbutton.firstChild);
    }
}
function selectanswer(e)
{
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if(iscorrect)
    {
        selectedbtn.classList.add("correct");
        score+=1;
    }
    else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button=>{
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display="block";

}

function showScore(){
    resetstate();
    questionelement.innerHTML=`Your scored ${score} out of ${questions.length} questions`;
    nextbutton.innerHTML = "Wanna try again !  ";
    nextbutton.style.display="block";
}
function handlenextbutton(){
    currentquestionindex++;
    if(currentquestionindex<questions.length){
        showQuestion();
    }
    else{
        showScore();
     }
}
nextbutton.addEventListener("click",()=>
{
    if(currentquestionindex<questions.length){
        handlenextbutton();
    }
    else{
        startQuiz();
    }
})

startQuiz();