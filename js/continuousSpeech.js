window.onload = function() {
  populateInfo();
  keepListening();
};

var isListening = false;
var recordingCount = 1;

function keepListening() {

  isListening = false;
  console.log("listening " + recordingCount++);
  processMic();


  // console.log("kicking off rec 1");
  // setInterval(processMic, restartDelay * 1000);

  //requires async
  // if(!isListening){
  //     await sleep(5000);
  //     keepListening();
  // }


}

function populateInfo() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  }

  if(mm<10) {
      mm = '0'+mm
  }

  today = mm + '/' + dd + '/' + yyyy;

  document.getElementById("transcriptionTitle").style.backgroundColor='#3a3a3c';
  document.getElementById("transcriptionTitle").style.color="white";
  document.getElementById("transcriptionTitle").value += '   ' + mm + '/' + dd + ' Notes';

  document.getElementById("transcriptionDate").style.backgroundColor='#3a3a3c';
  document.getElementById("transcriptionDate").style.color="white";
  document.getElementById("transcriptionDate").value +='    ' + today;

  document.getElementById("tGuess").style.backgroundColor='#3a3a3c';
  document.getElementById("tGuess").style.color="white";
  document.getElementById("tGuess").value += '   ';

  document.getElementById("transcriptionText").style.backgroundColor='#3a3a3c';
  document.getElementById("transcriptionText").style.color="white";

}

function addText(text, confidence){

  if (text.length > 145){
    if(text.length > 290){
      document.getElementById("transcriptionText").value += '\n\t\t\t\u2022\t' + text.substring(0, 145) + '-';
      document.getElementById("transcriptionText").value += '\n\t\t\t\t' + text.substring(145, 290) + '-';
      document.getElementById("transcriptionText").value += '\n\t\t\t\t' + text.substring(291, text.length) + '  (' + confidence + ')';
    }
    else {
      document.getElementById("transcriptionText").value += '\n\t\t\t\u2022\t' + text.substring(0, 145) + '-';
      document.getElementById("transcriptionText").value += '\n\t\t\t\t' + text.substring(145, text.length) + '  (' + confidence + ')';
    }
  }
  else {
    document.getElementById("transcriptionText").value += '\n\t\t\t\u2022\t' + text + '  (' + confidence + ')';
  }


}

function processMic() {
  // document.getElementById("transcriptionText").value += 'kicking off process mic\n';
  let lang = navigator.language || 'en-US';
  let speechRec = new p5.SpeechRec(lang, speechResult);

  speechRec.onError = speechError;
  speechRec.onStart = speechStart;
  speechRec.onEnd = speechEnd;

  // first is continous (keep true), second is interim (gives lots of results)
  speechRec.start(true, true);


  var guess = "   ";

  function speechResult(){

    //constant output
    // document.getElementById("transcriptionText").value += '\n\t\t\t\u2022\t' + speechRec.resultString + '  (' + speechRec.resultConfidence.toFixed(3) + ')';
    // console.log(speechRec.resultString + '  (' + speechRec.resultConfidence.toFixed(3) + ')');

    if (speechRec.resultConfidence < .01) {
       if (guess.length < speechRec.resultString.length){
         guess = "   " + speechRec.resultString
       }
       else {
         var temp = speechRec.resultString.split(" ");
          var i;
          for (i = 0; i < temp.length; ++i)
          {
            if (!guess.includes(temp[i])){
              guess += ' ' + temp[i];
            }
            else {
              //log duplicate
              // document.getElementById("transcriptionText").value += ' DUPLICATE\n';
            }
          }


       }

         document.getElementById("tGuess").value = guess;
    }
    else {
      if (speechRec.resultValue) {
        guess = "   ";

        // correct the guess with the highest confidence result
       document.getElementById("tGuess").value = '   ' + speechRec.resultString;

       addText(speechRec.resultString, speechRec.resultConfidence.toFixed(3));

       isListening = true;
       keepListening();
      }
    }
  }

  function speechStart(){
     console.log('START RECORD\n')
   }

  function speechError(){
     console.log('ERROR\n')
     if (!isListening){
          keepListening();
     }
   }

   function speechEnd(){
      console.log('END RECORD\n')
    }
}
