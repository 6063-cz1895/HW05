// Define global variables
let dataObject;
let data;
let priceMin = 0;
let priceMax = 200;
let pointsMin = 80;
let pointsMax = 100;
let Shift = 0;  

function preload() {
  dataObject = loadJSON("./Winemag.json"); // Load JSON file
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Following tutorial for this part
  data = Object.values(dataObject);

  background(255);

  for (let i = 0; i < data.length; i++) {
    let yPos = (data[i].points - pointsMin) / (pointsMax - pointsMin); // This part was causing me a great headache at first because the axises are reversed and I add borders later...
    let xPos = (data[i].price - priceMin) / (priceMax - priceMin);

    let yTure = height - 20 - yPos * (height - 40); 
    let xTure = 20 + xPos * (width - 40);

    // I want the min and max points not to be on the edges
    let countryShift = {
      "Argentina": -15,
      "Australia": -10,
      "France": -5,
      "Italy": 0.1,//I don't know why if I set this value to 0, there would be error
      "Spain": 5,
      "US": 10
    };

    // I realize there are several data that's not in these major countries (I didn't know at first, but the code kept giving me error input messages so I added this if/else code)
    if (countryShift[data[i].country]) {
      yTure += countryShift[data[i].country];
    } else {
      yTure += 15;
    }

    // Here I define Variables for what the color for each country should be
    let countryColors = {
      "Argentina": color(0, 0, 139, 100),
      "Australia": color(148,0,211, 100),
      "France": color(139,0,0, 100),
      "Italy": color(	0,139,0, 100),
      "Spain": color(255,140,0, 100),
      "US": color(0,0,128, 100)
    };

    // Same thing with the shifting, there are some wine that is not produced by the major countries that I picked out
    if (countryColors[data[i].country]) {
      fill(countryColors[data[i].country]);
    } else {
      fill(100, 100, 100, 127);
    }

    noStroke();
    ellipse(xTure, yTure, 10, 10);
  }

  fill(0); //here I want to add some annotations on x and y axis to let the audience know about how much the original data is...
  text(pointsMin + " points", 10, height - 20);
  text(priceMin + " dollars", 20, height - 10);
  text(pointsMin/2+pointsMax/2, 10, height/2);
  text(priceMin/2+priceMax/2, width/2, height-10);
  text(priceMax, width - 60, height - 10);
  text(pointsMax, 10, 20);
}