let count
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  const recognition = new SpeechRecognition()
  const micBtn  = document.getElementById('js-mic-btn');

  recognition.interimResults = false;
  recognition.lang = 'th-TH';
  
  const words = document.querySelector('.words');
  

  recognition.addEventListener('result', e => {
    console.log('Speech has result.');
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

      let row = document.createElement("div");

      row.className = "row";
      //let span = document.createElement('span');
      let p = document.createElement('p');
      let img = document.createElement('img');
      let speech = document.createElement('div');
      let avatar = document.createElement('div');
      avatar.className = "avatar-cnt";
      speech.className = "speech-cnt speech-user";
      p.textContent = "Nadech";

      
      img.src = "./img/me.jpg";
      img.className = "avatar"

      const word = transcript.replace(/poop|poo|shit|dump/gi, '💩');
      

      if (e.results[0].isFinal) {
        speech.innerHTML = `
        <span class="word">${word}</span>
        <div class="dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `
    //removeThinking();
        avatar.appendChild(img);
        avatar.appendChild(p);
        row.appendChild(speech);
        row.appendChild(avatar);
        
        words.appendChild(row);
       
       
        

        reply(transcript);
      }
  });
  const reply = (word) => {
    let replyWord = "";
    micBtn.classList.toggle("active");
    switch(true){
      case word.includes("ไฮเนเก้น") || word.includes("Heineken") ||  word.includes("สวัสดี"):
          replyWord = "คุณเมาหรือยังคะ มาทดสอบหน่อยไหม พูดว่าพร้อมได้เลยค่ะ ถ้าคุณอยากให้เริ่ม"; break;
      case word.includes("พร้อม") || word.includes("ready") :
          replyWord = "ลองพูดคำนี้สิคะ กล้วยอบเนย โรยเกลือ"; break; 
      case word.includes("กล้วยอบเนยโรยเกลือ"):
          replyWord = "เก่งมากค่ะ พูดชัดแบบนี้ไปสนุกกันต่อได้เลยค่ะ"; break; 
      default: replyWord = word; break;   
    }

    
    const synth = window.speechSynthesis
    synth.pitch = 8;
    //synth.rate = 10;
    
    const utter = new SpeechSynthesisUtterance(replyWord)
    const voices = speechSynthesis.getVoices()
    if(voices[16] != undefined){
      utter.voice = voices[16];
    }
    utter.lang = 'th-TH';
    utter.pitch = 15;
  
    synth.speak(utter);

    let p = document.createElement('p');
    let span = document.createElement('span');
    let img = document.createElement('img');
    let row = document.createElement('div');
    let avatar = document.createElement('div');
    let speech = document.createElement('div');
    row.className = "row";

    img.src = "./img/bot.jpg";
    img.className = "avatar"
    p.textContent = "Jessica";
    span.textContent = replyWord;
    
    avatar.className = "avatar-cnt";
    speech.className = "speech-cnt speech-bot";
    avatar.appendChild(img);
    avatar.appendChild(p);
    speech.innerHTML = `
        <span class="word">${replyWord}</span>
        <div class="dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `
    //div.appendChild(span)
    
    row.appendChild(avatar)
    row.appendChild(speech)
    words.appendChild(row);
    
    //removeThinking();
    
    
    let el = document.getElementById("words");
    el.scrollTop = el.scrollHeight;
    
  }
  //recognition.addEventListener('end', recognition.start);
  //recognition.start();
  
  
  // const removeThinking = () => {
    
  //   let dotsElm = document.querySelector(".dots");
  //   setTimeout(()=>{
  //     dotsElm.classList.remove("active");
  //   },100)
    
  // }
  
  micBtn.addEventListener('click', () => {
    recognition.start();
    micBtn.classList.toggle("active")
    document.getElementById("js-howto").classList.add("active");
  });
  
  recognition.addEventListener('speechstart', () => {
    console.log('Speech has been detected.');
  });

  recognition.addEventListener('speechend', () => {
    recognition.stop();
    console.log('Speech has been stop.');
  });