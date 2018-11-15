// Daniel Shiffman
// http://codingtra.in
// Earthquake Data Viz
// Video: https://youtu.be/ZiYdOwOrGyc
var x;
var y;

var convertedLatArray = [];
var convertedLongArray = [];
var overDot = false;
var circle;
var circleArray = [];
var rememberthisdot;
var specificdot;
var circleButtonArray = [];
var SPEEDX = 0;
var SPEEDY = 0;
var soundFiles = ["ArabLeague_2012.mp3", "Brazil_2012.mp3", "Brazil_2018.mp3", "China_2012.mp3", "China_2015.mp3","Germany_2011.mp3", "India_2015.mp3", "Italy_2013.mp3", "Netherlands_2010.mp3", "SouthAfrica_2016.mp3", "Thailand_2012.mp3"];
var song;
var finalSongArray = [];
var startPlaySong;
//7nations for now
var theVoiceJsonData = [
  {
    "showName": "",
    "country": "arabLeague",
    "latitude": 33.8547,
    "longtitude": 35.8623,
    "season1": "2012",
    "winner1": "Mourad Bouriki",
    "season2": "2013–14",
    "winner2": "Sattar Saad",
    "season3": 2015,
    "winner3": "Nedaa Sharara",
    "season4": 2018,
    "winner4": "Dumooa Tahseen",
  },
  {
    "showName": "The Voice Brasil",
    "country": "Brazil",
    "latitude": -14.235,
    "longtitude": -51.9253,
    "season1": "2012",
    "winner1": "Ellen Oléria",
    "season2": "2013",
    "winner2": "Sam Alves",
    "season3": 2014,
    "winner3": "Danilo Reis & Rafael",
    "season4": 2015,
    "winner4": "Renato Vianna",
    "season5": 2016,
    "winner5": "Mylena Jardim",
    "season6": "2017",
    "winner6": "Samantha Ayara",
    "season7": "2018",
    "winner7": "Léo Pain",
  },
  {
    "showName": "The Voice Brasil",
    "country": "Brazil",
    "latitude": -12.235,
    "longtitude": -53.9253,
    "season7": "2018",
    "winner7": "Léo Pain",
  },


  {
    "showName": "The Voice of China 中国好声音",
    "country": "China",
    "latitude": 39.9042,
    "longtitude": 116.4074,
    "season1": "2012",
    "winner1": "Liang Bo",
    "season2": "2013",
    "winner2": "Li Qi",
    "season3": 2014,
    "winner3": "Zhang Bichen",
    "season4": 2015,
    "winner4": "Zhang Lei",
  },
  {
    "showName": "The Voice of China 中国好声音",
    "country": "China",
    "latitude": 37.9042,
    "longtitude": 118.4074,
    "season4": 2015,
    "winner4": "Zhang Lei",
  },
  {
    "showName": "The Voice of Germany  ",
    "country": "Germany",
    "latitude": 52.52,
    "longtitude": 13.405,
    "season1": "2011–12",
    "winner1": " Ivy Quainoo ,",
    "season2": "2012",
    "winner2": "Nick Howard ,",
    "season3": 2013,
    "winner3": " Andreas Kümmert ,",
    "season4": 2014,
    "winner4": " Charley Ann Schmutzler ,",
    "season5": 2015,
    "winner5": " Jamie-Lee Kriewitz ,",
    "season6": "2016",
    "winner6": " Tay Schmedtmann ,",
    "season7": "2017",
    "winner7": " Natia Todua ",
  },
  {
    "showName": "The Voice India",
    "country": "India",
    "latitude": 20.5937,
    "longtitude": 78.9629,
    "season1": "2015",
    "winner1": " Pawandeep Rajan ,",
    "season2": "2016–17",
    "winner2": " Farhan Sabir",
  },
  {
    "showName": "The Voice of Italy",
    "country": "Italy",
    "latitude": 41.8719,
    "longtitude": 12.5674,
    "season1": "2013",
    "winner1": " Albania Elhaida Dani",
    "season2": "2014",
    "winner2": " Suor Cristina Scuccia",
    "season3": 2015,
    "winner3": " Fabio Curto",
    "season4": 2016,
    "winner4": " Alice Paba",
    "season5": 2018,
    "winner5": " Maryam Tancredi",

  },
  {
    "showName": "The Voice of Holland",
    "country": "Netherlands",
    "latitude": 52.1326,
    "longtitude": 5.2913,
    "season1": " 2010–11",
    "winner1": "Ben Saunders",
    "season2": " 2011–12",
    "winner2": " Iris Kroes",
    "season3": 2012,
    "winner3": "Leona Philippo",
    "season4": 2013,
    "winner4": " Julia van der Toorn",
    "season5": 2014,
    "winner5": "O'G3NE",
    "season6": " 2015–16",
    "winner6": " Maan de Steenwinkel",
    "season7": "2016–17",
    "winner7": " Pleun Bierbooms",
    "season8": "2017–18",
    "winner8": " Jim van der Zee",

  },
  {
    "showName": "The Voice South Africa",
    "country": "South Africa",
    "latitude": -30.5595,
    "longtitude": 22.9375,
    "season1": " 2016",
    "winner1": "Richard Stirton",
  },
  {
    "showName": "The Voice Thailand",
    "country": "Thailand",
    "latitude": 15.8700,
    "longtitude":100.9925,
    "season1": " 2012",
    "winner1": "Thanon Chamroen",
  },

];
// var SeasonArray=[];
// for (i=0;i<theVoiceJsonData.length; i++){
// for (a=0;a<theVoiceJsonData[i]
//   Object.entries(object1)[1]
// }

var mapimg;

var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 512;

var zoom = 1;
// var earthquakes;

function preload() {
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoicXVlZW5hbGluIiwiYSI6ImNqbzU5a3dxZzA4NjIzcm53Y2JvNmR3dmYifQ.znHH8PiGSVJJ4rUWpgxu1Q');
  // song=loadSound("Brazil_2012.mp3");
  for (var i = 0; i < soundFiles.length; i++) {
    song = loadSound(soundFiles[i]);
    finalSongArray.push(song);
  }
}


function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}



function CircleButton(posX, posY, widthOrHeight, speedX, speedY, country, soundIndex) {

  this.country = country;

  this.posX = posX;
  this.posY = posY;
  this.widthOrHeight = widthOrHeight;

  this.speedX = speedX;
  this.speedY = speedY;

  this.country = country;

  this.soundIndex = soundIndex;
  this.startPlayingSong = false;

  this.amp= new p5.Amplitude();
  this.amp.setInput(finalSongArray[this.soundIndex]);

  this.rms;

  this.drawCircle = function () {
    stroke(153, 204, 0);
    strokeWeight(1);
    fill(204, 255, 153);
    ellipse(this.posX, this.posY, this.widthOrHeight + this.speedX, this.widthOrHeight + this.speedY);
  };



  this.circleIsHovered = function () {
    var theDistance = dist(mouseX - width / 2, mouseY - height / 2, this.posX, this.posY);
    // console.log(mouseX-width/2 +"\t" +this.posX);
    if (theDistance < (this.widthOrHeight+this.speedX)/2) {
      // translate(this.posX, this.posY);
      //   scale(15);
      stroke(153, 204, 0);
      strokeWeight(3);
      fill(204, 255, 153);
      ellipse(this.posX, this.posY, this.widthOrHeight + this.speedX, this.widthOrHeight + this.speedY);
      // this.posY=this.posY+SPEEDY;  

      //THIS IS THE CODE WHERE THE HEART IS ENLARGED ONCE HOVERED
      // console.log("mouse is over circle, should... ");
      // this.speedX = this.speedX + SPEEDX;
      // this.speedY = this.speedY + SPEEDY;
      //THIS IS WHERE THE ENLARGE WHILE HOVER CODE ENDS
    }
  };

  this.circleIsClickedUpon = function () {
    var theDistance = dist(mouseX - width / 2, mouseY - height / 2, this.posX, this.posY);
    // console.log(mouseX-width/2 +"\t" +this.posX);
    if (theDistance <  (this.widthOrHeight+this.speedX)/2) {
      // Patch the input to an volume analyzer
      if (this.startPlayingSong ==true){
        finalSongArray[this.soundIndex].pause();
        this.speedX=0;
        this.speedY=0;
        this.startPlayingSong = !this.startPlayingSong;
      }
      else if (this.startPlayingSong !=true){
        finalSongArray[this.soundIndex].play();
        this.startPlayingSong = !this.startPlayingSong;
      }

    }
    //change the width

  };

this.update = function () {
  if (this.startPlayingSong == true) {
    // console.log(rms);
    // SPEEDX= 10+rms*200;
    // SPEEDY= 10+rms*200;
    //make the width=speed +width
    this.rms = this.amp.getLevel();
    this.speedX = 10 +  this.rms * 200;
    this.speedY = 10 +  this.rms * 200;
  }
};
}

function mouseClicked() {
  for (i = 0; i < circleButtonArray.length; i++) {

    circleButtonArray[i].circleIsClickedUpon();
  }

}







function setup() {
  createCanvas(ww, hh);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  var cx = mercX(clon);
  var cy = mercY(clat);

  for (var i = 0; i < theVoiceJsonData.length; i++) {
    // var data = countryCode[i];
    var lat = theVoiceJsonData[i].latitude;
    var lon = theVoiceJsonData[i].longtitude;
    // var size=(theVoiceJsonData[i].length-4)/2;
    var size = 5;
    var nation = theVoiceJsonData[i].country;

    // var songRank=
    // var speedxvaraible = 0;
    // var speedyvaraible = 0;
    // console.log();
    x = mercX(lon) - cx;
    y = mercY(lat) - cy;
    // This addition fixes the case where the longitude is non-zero and
    // points can go off the screen.
    if (x < - width / 2) {
      x += width;
    } else if (x > width / 2) {
      x -= width;
    }
    circle = new CircleButton(x, y, size, 0, 0, nation, i);
    circleButtonArray.push(circle);
    circle.drawCircle();
    circle.update();
    convertedLatArray.push(y);
    convertedLongArray.push(x);

  }
  // soundFiles[1].setVolume(0.5);
  // soundFiles[1].play();
  // finalSongArray[1].play();
  //   sliderRate = createSlider(0, 1.5, 1, 0.01);
  //   sliderPan = createSlider(-1, 1, 0, 0.01);
  // }

  // firstSong = loadSound(soundFiles[0], loaded);
  // song.setVolume(0.5);
  // sliderRate = createSlider(0, 1.5, 1, 0.01);
  // sliderPan = createSlider(-1, 1, 0, 0.01);
}





//step1: if mouseover, then enlarge
//step2: if mouseclick, then change background
//step3: (check if mouse is over certain areas)




function draw() {
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
  // this.rms = this.amp.getLevel();
  // console.log(rms);
  for (i = 0; i < circleButtonArray.length; i++) {

    circleButtonArray[i].drawCircle();
    circleButtonArray[i].update();
    // console.log("the speed is" + circleButtonArray[i].speedX);
    circleButtonArray[i].circleIsHovered();
  }
}















// var song;
// var sliderRate;
// var sliderPan;

// function setup() {
//   createCanvas(200, 200);
//   song = loadSound("rainbow.mp3", loaded);
//   song.setVolume(0.5);
//   sliderRate = createSlider(0, 1.5, 1, 0.01);
//   sliderPan = createSlider(-1, 1, 0, 0.01);
// }

// function loaded() {
//   song.play();
// }

// function draw() {
//   background(random(255));
//   song.pan(sliderPan.value());
//   song.rate(sliderRate.value());
// }








