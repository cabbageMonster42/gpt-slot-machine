const reel1Symbols = ["Cherry", "Lemon", "Orange", "Plum", "Bell", "Bar", "Seven"];
const reel2Symbols = ["Cherry", "Lemon", "Orange", "Plum", "Bell", "Bar", "Seven"];
const reel3Symbols = ["Cherry", "Lemon", "Orange", "Plum", "Bell", "Bar", "Seven"];
const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");
const spinMachine = document.querySelector(".slot-machine");
const spinBtn = document.getElementById("spinBtn");
const creditsEl = document.getElementById("credits");
const winningsEl = document.getElementById("winnings");

let credits = 100;
let winnings = 0;

function spinReels() {
    if (credits <= 0) {
      alert("Out of credits!");
      return;
    }
  
    spinMachine.classList.remove("winner");
    spinBtn.disabled = true; // disable spin button while spinning
  
    let spinDuration = 1500; // duration of the spin in ms
    const reel1Values = [];
    const reel2Values = [];
    const reel3Values = [];
  
    for (let i = 0; i < 3; i++) {
      reel1Values.push(reel1Symbols[Math.floor(Math.random() * reel1Symbols.length)]);
      reel2Values.push(reel2Symbols[Math.floor(Math.random() * reel2Symbols.length)]);
      reel3Values.push(reel3Symbols[Math.floor(Math.random() * reel3Symbols.length)]);
    }
  
    let spinInterval = setInterval(() => {
      let reel1Value = reel1Values.shift();
      let reel2Value = reel2Values.shift();
      let reel3Value = reel3Values.shift();
  
      reel1Values.push(reel1Symbols[Math.floor(Math.random() * reel1Symbols.length)]);
      reel2Values.push(reel2Symbols[Math.floor(Math.random() * reel2Symbols.length)]);
      reel3Values.push(reel3Symbols[Math.floor(Math.random() * reel3Symbols.length)]);
  
      reel1.innerHTML = `${reel1Values[0]}<br>${reel1Values[1]}<br>${reel1Values[2]}`;
      reel2.innerHTML = `${reel2Values[0]}<br>${reel2Values[1]}<br>${reel2Values[2]}`;
      reel3.innerHTML = `${reel3Values[0]}<br>${reel3Values[1]}<br>${reel3Values[2]}`;
  
      if (spinDuration <= 0) {
        clearInterval(spinInterval);
        spinBtn.disabled = false; // enable spin button after spinning
        if (reel1Value === reel2Value && reel1Value === reel3Value) {
          credits += 20;
          winnings += 20;
          winningsEl.textContent = winnings;
          spinMachine.classList.add("winner");
        } else if (reel1Value === reel2Value || reel1Value === reel3Value || reel2Value === reel3Value) {
          credits += 5;
          winnings += 5;
          winningsEl.textContent = winnings;
        } else {
          credits--;
        }
        creditsEl.textContent = credits;
      } else {
        spinDuration -= 100; // reduce spin duration by 100ms each iteration
      }
    }, 100); // spin interval set to 100ms
  }
  
// TODO:
// To replace the text placeholders with PNG images, you will need to create an image element and set the source attribute to the path of the PNG file. Here's an example of how you could modify the reel1Symbols array:

// arduino
// Copy code
// const reel1Symbols = [
//   {
//     name: "Cherry",
//     imageSrc: "path/to/cherry.png"
//   },
//   {
//     name: "Lemon",
//     imageSrc: "path/to/lemon.png"
//   },
//   {
//     name: "Orange",
//     imageSrc: "path/to/orange.png"
//   },
//   {
//     name: "Plum",
//     imageSrc: "path/to/plum.png"
//   },
//   {
//     name: "Bell",
//     imageSrc: "path/to/bell.png"
//   },
//   {
//     name: "Bar",
//     imageSrc: "path/to/bar.png"
//   },
//   {
//     name: "Seven",
//     imageSrc: "path/to/seven.png"
//   }
// ];
// Then, you can modify the spinReels function to create an image element instead of a text element:

// typescript
// Copy code
// function spinReels() {
//   // ...
//   let reel1Values = [];
//   for (let i = 0; i < 3; i++) {
//     let symbol = reel1Symbols[Math.floor(Math.random() * reel1Symbols.length)];
//     reel1Values.push(symbol);
//     let image = document.createElement("img");
//     image.src = symbol.imageSrc;
//     reel1.appendChild(image);
//   }
//   // ...
// }
// Note that you will also need to modify the CSS to adjust the size and position of the images.
spinBtn.addEventListener("click", spinReels);
