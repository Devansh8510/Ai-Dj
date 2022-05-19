Song="";

function preload() {
    Song=loadSound("music.mp3");
}
Score_left=0;
Score_right=0;
left_wristX=0;
left_wristY=0;
right_wristY=0;
right_wristX=0;

function setup() {
     canvas=createCanvas(600,400);
     canvas.center();
      video=createCapture(VIDEO);
      video.hide();
      load=ml5.poseNet(video,modelloaded);
      load.on("pose",gotposes);
}

function draw() {
    image(video,0,0,600,400)

    fill("yellow");
    stroke("aqua");
    if(Score_right>0.1){
        circle(right_wristX,right_wristY,30);
        if (right_wristY>0 && right_wristY<=100) {
            document.getElementById("speed").innerHTML="speed=0.5x";
            Song.rate(0.5);
        }
        else if(rightwristY>100 && right_wristY<=200){
            document.getElementById("speed").innerHTML="speed=1x";
            Song.rate(1);
        }

        else if(rightwristY>200 && right_wristY<=300){
            document.getElementById("speed").innerHTML="speed=1.5x";
            Song.rate(1.5);
        }
        else if(rightwristY>300 && right_wristY<=400){
            document.getElementById("speed").innerHTML="speed=2x";
            Song.rate(2);
        }
        else if(rightwristY>400){
            document.getElementById("speed").innerHTML="speed=2.5x";
            Song.rate(2.5);
        }
    }
    if(Score_left>0.1){
        circle(left_wristX,left_wristY,30);
        volume=Number(left_wristY);
        method=floor(volume);
        final_volume=method/500;
        Song.setVolume(final_volume);
        document.getElementById("Volume").innerHTML="Volume ="+final_volume;
    }
}

function modelloaded(){
    console.log("Your model has been loaded");
}

function gotposes(results){
if(results.length>0){
    console.log(results);
    Score_left=results[0].pose.keypoints[9].score;
    Score_right=results[0].pose.keypoints[10].score;
    left_wristX=results[0].pose.leftWrist.x;
    left_wristY=results[0].pose.leftWrist.y;
    right_wristX=results[0].pose.rightWrist.x;
    right_wristY=results[0].pose.rightWrist.y;
}
}

function play(){
    Song.play();
    Song.setVolume(1);
    Song.rate(1);
}
