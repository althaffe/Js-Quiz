var allQuestions = [
	{
		question:"Which Mughal emperor in India had 1000 cheetahs in his menagerie?",
		choices:["Humayun","Akbar","Jahangir","Aurangazeb"],
		correctAnswer:1
	},
	{
		question:"Unlike most big cats, this one cannot roar. Name the cat.",
		choices:["Snow leopard","Jaguar","Amur leopard","Common leopard"],
		correctAnswer:0
	},
	{
		question:"Where was the first white tiger found in India?",
		choices:["Nagpur","Delhi","Rewa","Bhopal"],
		correctAnswer:2
	},
	{
		question:"How many species of big cats are found in India?",
		choices:[5,6,4,8],
		correctAnswer:2
	},
	{
		question:"Which is the tiger state of India?",
		choices:["Karnataka","Madhya Pradesh","West Bengal","Orissa"],
		correctAnswer:0
	}
];

var quiz = $(".quiz");
var ques=0,i,score=0,list="";

var answerArray =[];
var correct = [];
var progress ="";
var percentage = 100/allQuestions.length;


function showQuestion(){
	quiz.html("<h4><span class='num'>" + (ques+1) + " .</span> " + allQuestions[ques].question + "</h4>");
	quiz.append("<form>");

	for(i=0;i<4;i++){
		quiz.append("<label class='radio' > <input type = 'radio' name = 'choice' value = '" + allQuestions[ques].choices[i] + "' >" + allQuestions[ques].choices[i] + "</label>");
	}
	$(':radio').radio();
	$(':radio:first').radio('check');

	quiz.append("<button class='btn btn-primary btn-wide'> Submit </button>");
	quiz.append('<div class="paginate"><ul>' + list + '</ul></div>');
	
	$(".btn").on("click",function(){
		answerArray[ques]=$(':radio:checked').val();
		$(".btn").off("click");
		ques++;
		if (ques<allQuestions.length){
			showQuestion();
		}
		else {
			checkAnswer();
			quiz.html("<h3 class='text-center'>Congratulations  !!!</h3><br>")
			quiz.append("<img src=' images/icons/png/Clipboard.png'><h2 class='text-center'>You scored <br> " + score + " points.</h6><br>");
			pr();
			quiz.append("<div class='progress'>" + progress + "</div>");	
			quiz.append("<div class = 'restart text-center'> <a href ='#'>Start Over </a></div>");
			$(".restart a").on("click",function(){
				ques=0,score=0,correct = [],answerArray = [],progress="";
				showQuestion();
			})
		}
	})

	$(".paginate li a").on("click",function(){
		ques = $(this).html() - 1;
		showQuestion();
		var elemIndex = allQuestions[ques].choices.indexOf(answerArray[ques]);
		if(answerArray[ques]){
			$(':radio:first').radio('uncheck');
			$(':radio:eq('+elemIndex+')').radio('check');
		}
		
	})

}

(function ls(){
	for (var j = 1; j<=allQuestions.length;j++) {
			list+= '<li><a href="#fakelink">' + j + '</a></li>';
	}
})();
function pr(){
	for(var k=0;k<allQuestions.length;k++){

				if(correct.indexOf(k) > -1){
					progress += "<div class='progress-bar progress-bar-success'style='width:" + percentage + "%;'></div>";
				}
				else{
					progress += "<div class='progress-bar progress-bar-danger'style='width:" + percentage + "%;'></div>";
				}
			}
			
};

function checkAnswer (){
	for(var j=0;j<allQuestions.length;j++){
		var answer=allQuestions[j].correctAnswer;
		if(answerArray[j] == allQuestions[j].choices[answer]){
			score++;
			correct.push(j);
		}
		
	}
}

showQuestion();