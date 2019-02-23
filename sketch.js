// Declare a "SerialPort" object
var serial;
var font,fontsize = 40
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
var koreanSpell = "waiting for data"; 
var spell = "waiting for data";
var g,a,ga;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  font = loadFont('assets/SourceSansPro-Regular.otf');
  //fontK = loadFont('assets/THEjunggt170.otf');
  g = loadSound('sounds/g.mp3');
  a = loadSound('sounds/a.mp3');
  ga = loadSound('sounds/ga.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //colorMode(HSB, 100);
  g.stop();
  a.stop();
  ga.stop();

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1411");

  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);
}

// We are connected and ready to go
function serverConnected() {
  println("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  println("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    println(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  println("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  println(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log(currentString);             // println the string
  latestData = currentString;            // save it for the draw method
}

// We got raw from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}


function draw() {
  background(latestData,10,100);
  /*rgb(244, 66, 66)*/
  fill(0,0,0);
    // Set text characteristics
  textFont(fontK);
  textSize(100);//fontsize
  textAlign(CENTER, CENTER);

  if(latestData>=140){
    fontDraw(width * .5 );
  }
  fill(190);
  text(spell, width*.5 , 220);
  text(latestData, width*.5  , 350);
}

function fontDraw(){
  if(g.isPlaying()||a.isPlaying()||ga.isPlaying()){
    g.stop();
    a.stop();
    ga.stop();
  }
  if(!g.isPlaying()&&!a.isPlaying()&&!ga.isPlaying()){
    if (latestData<140){
      spell = "put some card on the board";
    }else if(latestData>140&&latestData<200){
      spell = "/-g-/";
      //koreanSpell = "ㄱ";
      g.playMode('sustain');
      g.play();
    }else if(latestData>=200&&latestData<240){
      spell = "/a/";
      //koreanSpell ="ㅏ";
      a.playMode('sustain');
      a.play();
    }else if(latestData>=240){
      spell = "/ga/";
      //koreanSpell ="가";
      ga.playMode('sustain');
      ga.play();
    }
  }

  

}
