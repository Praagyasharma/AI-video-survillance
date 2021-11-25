video=" ";
status=" ";
object=[];
function preload()
{
    video=createVideo("video.mp4");
    video.hide()
}

function setup()
{
    canvas=createCanvas(480,400);
    canvas.center();
}

function draw()
{
    image(video,0,0,480,550);
    if(status!=" ")
    {
        objectDetector.detect(video,gotresult);

        for(i=0; i<object.length; i++)
        {
            document.getElementById("detect2").innerHTML="Status= Object detected";
            document.getElementById("detect").innerHTML=" Number of Object detected= "+ object.length;

            fill("red");
            percent=floor(object[i].confidence * 100);
            text(object[i].label +percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke("red");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("detect2").innerHTML="Status:Detecting object";
}

function modelloaded()
{
  console.log("Model loaded!")
  status=true;
  video.loop();
  video.speed(1);
  video.volume(0);
}
function gotresult(error,result)
{
  if(error)
  {
    console.error(error);
  }
  else
  {
    console.log(result)
  }
  object=result;
}