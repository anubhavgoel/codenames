/*
Notes:
'data' is lazily imported from the html
'seedrandom' is also imported from html. it gives deterministic random #s based on a seed set in fire()
*/

var wordsSelected = [];
var cells = [];
var NUMBER_OF_WORDS = 25;
var spyMasterMode = false;
var sessionData = [];
var customData = [];

// these are the names of classes that will be applied to cells
// edit these styles in stlyes/styles.css
var RED_TEAM = "red-team";
var BLUE_TEAM = "blue-team";
var NEUTRAL = "neutral";
var BOMB = "bomb";
var GUESSED = "guessed";
var startTeam;

//init
$("#seed").keyup(function () {
  fire();
});

$("#gameMode").change(function () {
  fire();
});

$("#seed").val(Math.floor(Math.random() * 1000));
fire();

function fire() {
  //get seed and set the seed for randomizer
  var seed = document.getElementById("seed").value;
  Math.seedrandom(seed.toLowerCase());

  var option = $("#gameMode :selected").val();
  switch (option) {
    case "spanish":
      sessionData = spanishData.slice(0);
      break;
    case "2knouns":
      sessionData = data.slice(0);
      break;
    case "movies":
      sessionData = movieData.slice(0);
      break;
    case "custom":
      if (customData.length === 0) {
        var customWordList = prompt(
          "Please enter custom word list. The list will be saved until your refresh your browser. (The words MUST be delimanted by spaces). eg: cat dog mouse",
          "Enter words here"
        );
        customData = customWordList.split(" ");
      }
      sessionData = customData.slice(0);
      break;
    default:
      sessionData = defaultData.slice(0);
  }

  wordsSelected = [];
  cells = [];
  spyMasterMode = false;
  document.getElementById("board").innerHTML = "";

  //fire new board
  updateScore();
  if (seed === "happy") {
    createHappyGame();
  } else {
    createNewGame();
  }
}

//not used, but probably useful at some point
function removeItem(array, index) {
  if (index > -1) {
    // console.log("index: " + index + ", word: " + array[index] + " removed.");
    array.splice(index, 1);
  }
}

function createNewGame() {
  var trs = [];
  for (var i = 0; i < NUMBER_OF_WORDS; i++) {
    if (!trs[i % 5]) {
      trs[i % 5] = "";
    }
    var randomNumber = Math.floor(Math.random() * sessionData.length);
    var word = sessionData[randomNumber];
    removeItem(sessionData, randomNumber);
    wordsSelected.push(word);
    trs[i % 5] +=
      '<div class="word" id=\'' +
      i +
      "' onclick=\"clicked('" +
      i +
      '\')"><div><a href="#"><span class="ada"></span>' +
      word +
      "</a></div></div>";
  }
  //<a href="#"><span class="ada">Washington stimulates economic growth </span>Read me</a>
  for (var i = 0; i < trs.length; i++) {
    document.getElementById("board").innerHTML +=
      '<div class="row">' + trs[i] + "</div>";
  }

  // create array of word cells
  for (var i = 0; i < 8; i++) {
    cells.push(RED_TEAM);
    cells.push(BLUE_TEAM);
  }

  // one team gets an extra cell
  if (Math.floor(Math.random() * data.length) % 2 === 0) {
    cells.push(RED_TEAM);
    startTeam = RED_TEAM;
    $("#score-container").addClass("redStart").removeClass("blueStart");
  } else {
    cells.push(BLUE_TEAM);
    startTeam = BLUE_TEAM;
    $("#score-container").addClass("blueStart").removeClass("redStart");
  }

  // add neutrals
  for (var i = 0; i < 7; i++) {
    cells.push(NEUTRAL);
  }

  // push the bomb
  cells.push(BOMB);

  //shuffle cells
  shuffle(cells);

  updateScore();
}
function createHappyGame() {
  var trs = [];
  for (var i = 0; i < NUMBER_OF_WORDS; i++) {
    if (!trs[i % 5]) {
      trs[i % 5] = "";
    }
    var randomNumber = Math.floor(Math.random() * sessionData.length);
    var word = "Happy Birthday";
    removeItem(sessionData, randomNumber);
    wordsSelected.push(word);
    trs[i % 5] +=
      '<div class="word" id=\'' +
      i +
      "' onclick=\"clicked('" +
      i +
      '\')"><div><a href="#"><span class="ada"></span>' +
      word +
      "</a></div></div>";
  }
  //<a href="#"><span class="ada">Washington stimulates economic growth </span>Read me</a>
  for (var i = 0; i < trs.length; i++) {
    document.getElementById("board").innerHTML +=
      '<div class="row">' + trs[i] + "</div>";
  }

  // create array of word cells
  for (var i = 0; i < 8; i++) {
    cells.push(RED_TEAM);
    cells.push(BLUE_TEAM);
  }

  // one team gets an extra cell
  if (Math.floor(Math.random() * data.length) % 2 === 0) {
    cells.push(RED_TEAM);
    startTeam = RED_TEAM;
    $("#score-container").addClass("redStart").removeClass("blueStart");
  } else {
    cells.push(BLUE_TEAM);
    startTeam = BLUE_TEAM;
    $("#score-container").addClass("blueStart").removeClass("redStart");
  }

  // add neutrals
  for (var i = 0; i < 7; i++) {
    cells.push(NEUTRAL);
  }

  // push the bomb
  cells.push(BOMB);

  //shuffle cells
  shuffle(cells);

  updateScore();
  // helper functions
  const PI2 = Math.PI * 2;
  const random = (min, max) => (Math.random() * (max - min + 1) + min) | 0;
  const timestamp = (_) => new Date().getTime();

  // container
  class Birthday {
    constructor() {
      this.resize();

      // create a lovely place to store the firework
      this.fireworks = [];
      this.counter = 0;
    }

    resize() {
      this.width = canvas.width = window.innerWidth;
      let center = (this.width / 2) | 0;
      this.spawnA = (center - center / 4) | 0;
      this.spawnB = (center + center / 4) | 0;

      this.height = canvas.height = window.innerHeight;
      this.spawnC = this.height * 0.1;
      this.spawnD = this.height * 0.5;
    }

    onClick(evt) {
      let x = evt.clientX || (evt.touches && evt.touches[0].pageX);
      let y = evt.clientY || (evt.touches && evt.touches[0].pageY);

      let count = random(3, 5);
      for (let i = 0; i < count; i++)
        this.fireworks.push(
          new Firework(
            random(this.spawnA, this.spawnB),
            this.height,
            x,
            y,
            random(0, 260),
            random(30, 110)
          )
        );

      this.counter = -1;
    }

    update(delta) {
      ctx.globalCompositeOperation = "hard-light";
      ctx.fillStyle = `rgba(20,20,20,${7 * delta})`;
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.globalCompositeOperation = "lighter";
      for (let firework of this.fireworks) firework.update(delta);

      // if enough time passed... create new new firework
      this.counter += delta * 3; // each second
      if (this.counter >= 1) {
        this.fireworks.push(
          new Firework(
            random(this.spawnA, this.spawnB),
            this.height,
            random(0, this.width),
            random(this.spawnC, this.spawnD),
            random(0, 360),
            random(30, 110)
          )
        );
        this.counter = 0;
      }

      // remove the dead fireworks
      if (this.fireworks.length > 1000)
        this.fireworks = this.fireworks.filter((firework) => !firework.dead);
    }
  }

  class Firework {
    constructor(x, y, targetX, targetY, shade, offsprings) {
      this.dead = false;
      this.offsprings = offsprings;

      this.x = x;
      this.y = y;
      this.targetX = targetX;
      this.targetY = targetY;

      this.shade = shade;
      this.history = [];
    }
    update(delta) {
      if (this.dead) return;

      let xDiff = this.targetX - this.x;
      let yDiff = this.targetY - this.y;
      if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
        // is still moving
        this.x += xDiff * 2 * delta;
        this.y += yDiff * 2 * delta;

        this.history.push({
          x: this.x,
          y: this.y,
        });

        if (this.history.length > 20) this.history.shift();
      } else {
        if (this.offsprings && !this.madeChilds) {
          let babies = this.offsprings / 2;
          for (let i = 0; i < babies; i++) {
            let targetX =
              (this.x + this.offsprings * Math.cos((PI2 * i) / babies)) | 0;
            let targetY =
              (this.y + this.offsprings * Math.sin((PI2 * i) / babies)) | 0;

            birthday.fireworks.push(
              new Firework(this.x, this.y, targetX, targetY, this.shade, 0)
            );
          }
        }
        this.madeChilds = true;
        this.history.shift();
      }

      if (this.history.length === 0) this.dead = true;
      else if (this.offsprings) {
        for (let i = 0; this.history.length > i; i++) {
          let point = this.history[i];
          ctx.beginPath();
          ctx.fillStyle = "hsl(" + this.shade + ",100%," + i + "%)";
          ctx.arc(point.x, point.y, 1, 0, PI2, false);
          ctx.fill();
        }
      } else {
        ctx.beginPath();
        ctx.fillStyle = "hsl(" + this.shade + ",100%,50%)";
        ctx.arc(this.x, this.y, 1, 0, PI2, false);
        ctx.fill();
      }
    }
  }

  let canvas = document.getElementById("birthday");
  let board = document.getElementById("board");
  document.body.style.backgroundColor = "#020202";
  canvas.style.display = "block";
  document.getElementsByTagName("h1")[0].style.display = "block";

  board.style.display = "none";
  let ctx = canvas.getContext("2d");

  let then = timestamp();

  let birthday = new Birthday();
  window.onresize = () => birthday.resize();
  document.onclick = (evt) => birthday.onClick(evt);
  document.ontouchstart = (evt) => birthday.onClick(evt);

  (function loop() {
    requestAnimationFrame(loop);

    let now = timestamp();
    let delta = now - then;

    then = now;
    birthday.update(delta / 1000);
  })();
}
function clicked(value) {
  var elem = $("#" + value);

  if (spyMasterMode) {
    //spymaster mode
    if (elem.hasClass(GUESSED)) {
      elem.removeClass(GUESSED);
    } else {
      elem.addClass(GUESSED);
    }
  } else {
    //guessers mode
    var word = wordsSelected[value];

    function doStuff() {
      if (elem.data("guessed")) {
        elem.removeClass(cells[value]);
        elem.data("guessed", false);
      } else {
        elem.addClass(cells[value]);
        elem.data("guessed", true);
      }
    }

    if (document.getElementById("confirm").checked) {
      if (window.confirm("Are sure you want to select '" + word + "'?")) {
        doStuff();
      }
    } else {
      doStuff();
    }
  }

  updateScore();
}

function updateScore() {
  var blueScore = 9;
  var redScore = 9;
  if (spyMasterMode) {
    blueScore = 0;
    redScore = 0;
    $("div.word").each(function () {
      if ($(this).hasClass(BLUE_TEAM)) {
        blueScore++;
      }
      if ($(this).hasClass(RED_TEAM)) {
        redScore++;
      }
    });
  } else {
    $("div.word").each(function () {
      if ($(this).hasClass(BLUE_TEAM)) {
        blueScore--;
      }
      if ($(this).hasClass(RED_TEAM)) {
        redScore--;
      }
    });

    if (startTeam == RED_TEAM) {
      blueScore--;
    } else {
      redScore--;
    }
  }
  $("#redScore").text(redScore);
  $("#blueScore").text(blueScore);
  if (redScore === 0) {
    $("#redScore").text("Winner!");
  }
  if (blueScore === 0) {
    $("#blueScore").text("Winner!");
  }
}

function spyMaster() {
  //TODO: randomize or organize tiles for easier comparing
  var elem;
  if (!spyMasterMode) {
    spyMasterMode = true;
    for (var i = 0; i < NUMBER_OF_WORDS; i++) {
      elem = $("#" + i);
      elem.addClass(cells[i]);
      if (elem.data("guessed")) {
        elem.addClass(GUESSED);
      }
    }
  } else {
    spyMasterMode = false;

    for (var i = 0; i < NUMBER_OF_WORDS; i++) {
      elem = $("#" + i);
      var toRemove = [GUESSED];

      if (!elem.data("guessed")) {
        toRemove.push(cells[i]);
      }

      elem.removeClass(toRemove.join(" "));
    }
  }
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//enable pressing 'Enter' on seed field
document.getElementById("seed").onkeypress = function (e) {
  if (!e) e = window.event;
  var keyCode = e.keyCode || e.which;
  if (keyCode == "13") {
    // Enter pressed
    fire();
    return false;
  }
};
var timer = new Timer();

$("#chronoExample .startButton").click(function () {
  timer.start();
});
$("#chronoExample .pauseButton").click(function () {
  timer.pause();
});
$("#chronoExample .stopButton").click(function () {
  timer.stop();
});
$("#chronoExample .resetButton").click(function () {
  timer.reset();
});
timer.addEventListener("secondsUpdated", function (e) {
  $("#chronoExample .values").html(timer.getTimeValues().toString());
});
timer.addEventListener("started", function (e) {
  $("#chronoExample .values").html(timer.getTimeValues().toString());
});
timer.addEventListener("reset", function (e) {
  $("#chronoExample .values").html(timer.getTimeValues().toString());
});
