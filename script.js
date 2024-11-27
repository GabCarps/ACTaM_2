// Imposta il BPM

Tone.Transport.bpm.value = 128

function updateBPM(value) {
    const bpm_val = Number(value);
    Tone.Transport.bpm.value = bpm_val;
    document.getElementById('bpm_text').innerHTML = bpm_val; 
    //console.log("BPM aggiornato a:", bpm_val);
  }
 

const synth = new Tone.Synth({
    oscillator : {type: "triangle"}}).toDestination();

melody = ["C4", "D4", "F4", "C4", "D4", "F4", "C4", "D4", "G4",
          "C4", "D4", "F4", "C4", "D4", "F4", "C4", "D4", "F4",
          "C4", "D4", "F4", "C4", "D4", "G4",
         "C4", "D4", "F4", "C4", "D4", "F4",  "C4", "D4", "F4", "C4", "D4", "F4",
         "C4", "D4", "G4", "C4", "D4", "F4",  "C4", "D4", "F4", "C4", "D4", "G4",
         "C4", "D4", "Bb4", "C5", "C4", "D4", "G4", "C4", "D4", "Bb4", "C4", "D4", "F4"]
let index = 0;

Tone.Transport.scheduleRepeat((time) => {
    synth.triggerAttackRelease(melody[index], "16n", time);
    index = (index + 1) % melody.length ;
}, "16n")

//------------------------------------------------------
// chords definition
const c1 = [["G4", "Bb4"], ["G4", "Bb4"], ["F4", "A4"], ["F4", "A4"], ["D4", "G4"], ["D4", "G4"], ["D4", "G4"]]

const synth_chord = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: "triangle" },
}).toDestination();

Tone.Transport.scheduleOnce((time) => {
  let index_ = 0
  Tone.Transport.scheduleRepeat((ctime) => {
      synth_chord.triggerAttackRelease(c1[index_], "8n", ctime);
      index_ = (index_ + 1) % c1.length;
  }, "8n", time);}, melody.length*0.25);

/*
Tone.Transport.scheduleOnce((time) => {
  let index_ = 0
  let isPaused = false;
  Tone.Transport.scheduleRepeat((chordtime) => {
      // Se siamo in pausa, non suonare nulla
      if (isPaused) return;

      // Suona l'accordo corrente
      synth_chord.triggerAttackRelease(c1[index_], "8n", chordtime);

      // Se siamo all'ultimo accordo prima della pausa
      if (index_ === c1.length - 3) {
          isPaused = true; // Attiva la pausa
          Tone.Transport.scheduleOnce(() => {
              isPaused = false; // Disattiva la pausa dopo un secondo
              index_ = (index_ + 1) % c1.length; // Passa al prossimo accordo
          }, chordtime + 0.25); // Pianifica un secondo di pausa
      } else {
          // Incrementa l'indice normalmente
          index_ = (index_ + 1) % c1.length;
      }
}, "8n", time);}, melody.length*0.25);
*/

document.getElementById("start").addEventListener("click", () => {
  Tone.start().then(() => {
    Tone.Transport.start(); // Avvia il trasporto
    
  });
});

document.getElementById("stop").addEventListener("click", () => {
  Tone.start().then(() => {
    
    Tone.Transport.stop(); // Ferma il trasporto in caso sia attivo
    Tone.Transport.position = 0; // Resetta la posizione
    index_ = 0
    index = 0
  });
});