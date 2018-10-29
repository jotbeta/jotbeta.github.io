function setup() {
  noCanvas();
  let lang = navigator.language || 'en-US';
  let speechRec = new p5.SpeechRec(lang, gotSpeech);

  // first is continous (keep true), second is interim (gives lots of results)
  speechRec.start(true, false);

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


  document.getElementById("transcriptiontext").style.backgroundColor='#3a3a3c';
  document.getElementById("transcriptiontext").style.color="white";
  document.getElementById("transcriptiontext").value += '\n\n';
  document.getElementById("transcriptiontext").value += '\t\t\tNotes\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t' + today + '\n';

  function gotSpeech(){
     if (speechRec.resultValue) {
      // createP(speechRec.resultString);
      document.getElementById("transcriptiontext").value += '\n\t\t\t\u2022\t' + speechRec.resultString;
      // + '(' +       speechRec.resultConfidence + ')';

     }
  }
}
