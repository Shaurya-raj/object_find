function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet",modalLoaded);

}
function modalLoaded(){
  console.log("modal loaded");

}

function draw(){
  image(video,0,0,300,300);
  classifier.classify(video,getResult);

}
previousResult="";

function getResult(error,results){
  if(error){
    console.log("error");

  }
  else{
    if((results[0].confidence>0.5)&&(previousResult!=results[0].label)){
      previousResult=results[0].label;
      console.log(results);
    
      synth=window.speechSynthesis;
      speakData="object detected is"+results[0].label;
      utter=new SpeechSynthesisUtterance(speakData);
      synth.speak(utter);

      document.getElementById("obj_name").innerHTML=results[0].label;
      document.getElementById("Accuracy").innerHTML=(results[0].confidence*100).toFixed(2)+"%";

    }

  }
}

