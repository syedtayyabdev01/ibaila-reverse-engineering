const audio=document.getElementById("audio");
const $=id=>document.getElementById(id);
const state={tracks:[],index:-1,playing:false,context:null,analyser:null,source:null,data:null};
function fmt(s){return !Number.isFinite(s)? "0:00":Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0")}
function setAccent(value){document.documentElement.style.setProperty("--accent",value);localStorage.setItem("verdant-accent",value);const label=$("color-name");if(label)label.textContent=value.toUpperCase()}
const saved=localStorage.getItem("verdant-accent")||"#55f39a";setAccent(saved);$("accent-color").value=saved;
$("accent-color").addEventListener("input",e=>setAccent(e.target.value));
function updateClock(){const now=new Date();$("clock").textContent=now.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",hour12:false});$("date-label").textContent=now.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}).toUpperCase().replace(","," ·")}
updateClock();setInterval(updateClock,1000);
function updatePlayer(){const t=state.tracks[state.index];$("track-title").textContent=t?.name||"Nothing playing yet";$("track-artist").textContent=t?"LOCAL AUDIO FILE":"Add a song to begin";$("hero-track-title").textContent=t?.name||"Choose your soundtrack";$("hero-track-artist").textContent=t?"NOW PLAYING · LOCAL AUDIO":"YOUR MUSIC · YOUR SPACE";$("play-btn").textContent=state.playing?"Ⅱ":"▶";$("cover-art").style.boxShadow=state.playing?"0 0 32px color-mix(in srgb,var(--accent) 30%,transparent)":"none"}
function renderTracks(){const target=$("track-list");target.innerHTML="";if(!state.tracks.length){target.innerHTML='<div class="playlist-empty">Your tracks will appear here.<br>Bring your own sound into the room.</div>'}else state.tracks.forEach((t,i)=>{const row=document.createElement("div");row.className="track-row"+(i===state.index?" playing":"");row.innerHTML='<span class="track-index">'+String(i+1).padStart(2,"0")+'</span><span class="track-row-title"></span><span class="track-row-play">'+(i===state.index&&state.playing?"♫":"▶")+'</span>';row.querySelector(".track-row-title").textContent=t.name;row.addEventListener("click",()=>playTrack(i));target.appendChild(row)});$("collection-count").textContent=state.tracks.length+" TRACK"+(state.tracks.length===1?"":"S")}
async function addFiles(){if(!window.verdant?.pickAudio)return;const files=await window.verdant.pickAudio();const known=new Set(state.tracks.map(t=>t.url));for(const f of files)if(!known.has(f.url))state.tracks.push(f);renderTracks();if(state.index<0&&state.tracks.length)playTrack(0)}
function setupAudio(){if(state.context)return;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;state.context=new AC();state.analyser=state.context.createAnalyser();state.analyser.fftSize=128;state.data=new Uint8Array(state.analyser.frequencyBinCount);state.source=state.context.createMediaElementSource(audio);state.source.connect(state.analyser);state.analyser.connect(state.context.destination)}
async function playTrack(i){if(i<0||i>=state.tracks.length)return;state.index=i;audio.src=state.tracks[i].url;audio.load();setupAudio();if(state.context?.state==="suspended")await state.context.resume();try{await audio.play();state.playing=true}catch(e){state.playing=false;console.error(e)}updatePlayer();renderTracks()}
$("play-btn").addEventListener("click",async()=>{if(state.index<0){await addFiles();return}if(audio.paused){setupAudio();if(state.context?.state==="suspended")await state.context.resume();await audio.play()}else audio.pause()});
$("prev-btn").addEventListener("click",()=>{if(state.tracks.length)playTrack((state.index-1+state.tracks.length)%state.tracks.length)});
$("next-btn").addEventListener("click",()=>{if(state.tracks.length)playTrack((state.index+1)%state.tracks.length)});
$("add-music").addEventListener("click",addFiles);
$("volume").addEventListener("input",e=>audio.volume=Number(e.target.value));audio.volume=.8;
$("progress").addEventListener("input",e=>{if(audio.duration)audio.currentTime=audio.duration*Number(e.target.value)/1000});
audio.addEventListener("timeupdate",()=>{$("current-time").textContent=fmt(audio.currentTime);$("duration").textContent=fmt(audio.duration);if(audio.duration)$("progress").value=audio.currentTime/audio.duration*1000});
audio.addEventListener("play",()=>{state.playing=true;updatePlayer();renderTracks()});audio.addEventListener("pause",()=>{state.playing=false;updatePlayer();renderTracks()});
audio.addEventListener("ended",()=>{if(state.tracks.length)playTrack((state.index+1)%state.tracks.length)});
document.querySelectorAll(".album-card").forEach(card=>card.addEventListener("click",()=>{const offset=Number(card.dataset.slot);if(state.tracks.length){const i=state.index<0?0:(state.index+offset+state.tracks.length)%state.tracks.length;playTrack(i)}else addFiles()}));
$("settings-btn").addEventListener("click",()=>$("accent-color").click());
renderTracks();updatePlayer();
const servicesPanel=$("services-panel");
function showServices(open){servicesPanel.classList.toggle("visible",open);servicesPanel.setAttribute("aria-hidden",String(!open))}
$("services-btn").addEventListener("click",()=>showServices(true));
$("close-services").addEventListener("click",()=>showServices(false));
servicesPanel.addEventListener("click",e=>{if(e.target===servicesPanel)showServices(false)});
document.querySelectorAll("[data-service]").forEach(button=>button.addEventListener("click",async()=>{try{await window.verdant.openService(button.dataset.service)}catch(error){console.error("Could not open provider",error)}}));
