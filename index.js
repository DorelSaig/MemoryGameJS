var icons_array = [
  "/assets/STK-20211117-WA0011.webp",
  "/assets/STK-20211117-WA0011.webp",
  "/assets/STK-20210823-WA0078.webp",
  "/assets/STK-20210823-WA0078.webp",
  "/assets/MSTK-20210822-WA0075.webp",
  "/assets/MSTK-20210822-WA0075.webp",
  "/assets/STK-20211027-WA0033.webp",
  "/assets/STK-20211027-WA0033.webp",
  "/assets/STK-20210823-WA0069.webp",
  "/assets/STK-20210823-WA0069.webp",
  "/assets/STK-20211109-WA0005.webp",
  "/assets/STK-20211109-WA0005.webp",
  "/assets/STK-20210811-WA0037.webp",
  "/assets/STK-20210811-WA0037.webp",
  "/assets/STK-20211007-WA0015.webp",
  "/assets/STK-20211007-WA0015.webp",
  "/assets/STK-20211122-WA0017.webp",
  "/assets/STK-20211122-WA0017.webp",
  "/assets/STK-20211009-WA0047.webp",
  "/assets/STK-20211009-WA0047.webp",
  "/assets/STK-20211110-WA0002.webp",
  "/assets/STK-20211110-WA0002.webp",
  "/assets/STK-20211105-WA0012.webp",
  "/assets/STK-20211105-WA0012.webp",
  "/assets/STK-20211126-WA0017.webp",
];
var vals = [];
var cards_ids = [];
var cards_flipped = 0;
Array.prototype.memory_tile_shuffle = function () {
  var i = this.length,
    j,
    temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
};

newBoard();

function newBoard() {
  cards_flipped = 0;
  var output = "";
  icons_array.memory_tile_shuffle();
  for (let i = 0; i < icons_array.length; i++) {
    output +=
      '<div id="tile_' +
      i +
      '" class="flip-card" onclick=" memoryFlipTile(this,\'' +
      icons_array[i] +
      "');\">" +
      '<div class = "flip-card-inner">' +
      '<div class = "flip-card-back">' +
      "<img src = " +
      icons_array[i] +
      ' alt = "Avatar"' +
      ' style = "width:110px;height:110px;">' +
      "</div>" +
      '<div class = "flip-card-front" >' +
      "</div>" +
      "</div>" +
      "</div>";
  }
  document.getElementById("memory_board").innerHTML = output;
}

function flipCard(tile) {
  tile.classList.toggle("flipCard");
}

function memoryFlipTile(tile, val) {
  flipCard(tile);
  if (vals.length < 2) {
    if (vals.length == 0) {
      //No Card Was Flipped Yet
      vals.push(val);
      cards_ids.push(tile.id);
    } else if (vals.length == 1) {
      vals.push(val);
      cards_ids.push(tile.id);
      if (vals[0] == vals[1]) {
        cards_flipped += 2; //Cards flipped counter

        //Disable the click function for the matched cards
        var tile_1 = document.getElementById(cards_ids[0]);
        var tile_2 = document.getElementById(cards_ids[1]);
        tile_1.onclick = null;
        tile_2.onclick = null;

        // Clear both arrays
        vals = [];
        cards_ids = [];

        // Check to see if the whole board is cleared
        if (cards_flipped == icons_array.length) {
          alert("Board cleared... generating new board");
          document.getElementById("memory_board").innerHTML = "";
          newBoard();
        }
      } else {
        function flip2Back() {
          // Flip the 2 tiles back over
          var tile_1 = document.getElementById(cards_ids[0]);
          var tile_2 = document.getElementById(cards_ids[1]);
          // tile_1.style.backgroundColor = "darkblue";
          // tile_2.style.background = "darkblue";
          //tile_2.innerHTML = "";
          // Clear both arrays
          vals = [];
          cards_ids = [];
          flipCard(tile_1);
          flipCard(tile_2);
          // tile_1.classList.remove("flip-card-front");
          // tile_2.classList.remove("flip-card-front");
        }
        setTimeout(flip2Back, 700);
      }
    }
  }
}
