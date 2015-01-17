//TODO
    //salvare anche un timestamp per l'ultima volta che e' stata azzeccata e fallita la parola
    //calcolare prossima parola in base ai risultati precedenti ed al tempo
    //permettere di scegliere tra diversi set di parole e caricarli da una select all'inizio
    //fare pulsanti a schermo per facilitare uso su mobile
    //esportare come app
    //salvataggio risultati su remoto
    //mettere le parole su file esterni
    //problema caratteri speciali nell'alert
    //https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=overraskelse&tl=da&total=1&idx=0&textlen=12

if (localStorage['parole']) {
      console.log('trovate parole');
}

    var parole = null;
    var numberOfWords = null;
    var confirmButton = null;
    var inputWord = null;
    var saveButton = null;
    var currentWord = null;
    
    function pickNextWord() {
      var nextIndex = Math.random() * parole.length;
      nextIndex = Math.floor(nextIndex);
      console.log(nextIndex);
      currentWord = parole[nextIndex];
      
      return currentWord;
    }
    
    function setWord() {
      do {
        pickNextWord()
      } while (!currentWord.it || currentWord.it.length < 2 || !currentWord.dk || currentWord.dk.length < 2);
      
      document.getElementById('label').innerHTML = currentWord.it;
      playSound(currentWord.dk)
    }
    
document.onload = function (){
  alert('caricato');
  load();
}

function playSound(word) {
              var snd = new Audio('http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=' + word + '&tl=da&total=1&idx=0'); // buffers automatically when created
              snd.play();
}

function load() {
    parole = localStorage['parole'] ? 
    JSON.parse(localStorage['parole']) : paroleFromFile;
      
    numberOfWords = 5;
    confirmButton = document.getElementById('confirm');
    inputWord = document.getElementById('input-word');
    saveButton = document.getElementById('save');
    currentWord = null;
    setWord();

      
    confirmButton.addEventListener('click', function (){
      if (inputWord.value != currentWord.dk) {
        alert('wrong! it should be ' + currentWord.dk);
        currentWord.wrongGuess = currentWord.wrongGuess || 0;
        currentWord.wrongGuess++;
      }
      else {
        currentWord.rightGuess = currentWord.rightGuess || 0;
        currentWord.rightGuess++;
      }
      setWord();
      inputWord.value = '';
    });
    
    saveButton.addEventListener('click', function (){
      localStorage['parole'] = JSON.stringify(parole);
      console.log('parole salvate');
    });
}
    
    