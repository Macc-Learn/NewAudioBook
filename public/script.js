const subtitles = [
    "Eons ago there was a planet known as Elderaad. The inhabitants of this planet had an unusual relationship with two hidden powers that linger in the cosmos.These powers were known as Tau and Nehru.",
    "In these prehistoric days there was a powerful figure known as Father. He was known to have an immense mastery in the arts of Tau and Nehru: while most Elderaades could only use one or the other, Father was able to control both. Over time Father's power grew and his character changed from a man of peace to one of malice and malevolence.",
    "Over the years, people grew weary of Father's tyranny. Those who still held mystical abilities united against his reign, and a war broke out on the planet. In this war, the powers of Tau and Nehru were used to create beasts and creatures of destruction.",
    "Due to the imbalance of powers in the cosmos, fueled by wars and misuse, the Gods decreed judgment, and the planet Elduraad was destroyed... For a time, the galaxy was at peace, but eventually, Elderaad was rebuilt, and civilization began anew.",
    "At first, no one knew about Tau and Nehru, it was as if it never existed. Nonetheless, the powers lingered beneath, awaiting the opportune moment to resurface."
];

//Audio
const audioElement = document.getElementById('myAudio');
const imageElement = document.getElementById('movie-content');
const subs = document.getElementById('subs');
var duration = 0;
var currentPage = 0;

//when sound loads
audioElement.addEventListener('loadedmetadata', function () {
    duration = audioElement.duration;
    appendSubtitles(currentPage, duration);
});

// - - - functions - - - //
function openBook() {
    const titleBlock = document.getElementsByClassName("title-block")[0];
    const contentBlock = document.getElementsByClassName("content-block")[0];
    titleBlock.classList.add("hid");
    contentBlock.classList.remove("hid");
    nextPage();
}

function nextPage() {
    currentPage += 1;
    toPage(currentPage);
}

function lastPage() {
    if (currentPage <= 1) return;
    currentPage -= 1;
    toPage(currentPage);
}

function toPage(pageNumber = 1) {
    //update image
    const imageSrc = `./images/pic${pageNumber}.jpg`;
    imageElement.src = imageSrc;
    
    //update audio
    const audioSrc = `./audio/pg${pageNumber}.mp3`;
    audioElement.src = audioSrc;
    currentPage = pageNumber;
    audioElement.play();
}

//attempting to create a synced read along with subtitles
function appendSubtitles(pageNumber, duration) {
    const subtitlesIndex = (pageNumber - 1) >= 0 ? (pageNumber - 1) : 0;
    const text = subtitles[subtitlesIndex];
    const textParted = text.split(" ");
    const _duration = Math.floor(duration);

    var wordsPerSection = textParted.length / 3;
    var sentences = textParted.length / wordsPerSection;
    var averageSentenceTime = (_duration / sentences) * 1000;
    var startFrom = 0;

    // console.log({ _duration, wordsPerSection, sentences, averageSentenceTime });
    
    for (let i = 0; i < sentences; i++){
        setTimeout(() => {
            //this should change the text in a reasonable time
            subs.innerText = "";
            subs.innerText = textParted.slice(startFrom, wordsPerSection + startFrom).join(" ");
            startFrom += wordsPerSection;

        }, averageSentenceTime * i);
    }
}