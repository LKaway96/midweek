/*
 * JS just handles the playground of parameters
 * and inserts the repeated markup in an optimized way.
 */
const UI = {
  bands: document.querySelector('#bands'),
  cells: document.querySelector('#cells'),
  size: document.querySelector('#size'),
  speed: document.querySelector('#speed'),
  image: document.querySelectorAll('#image input'),
  borders: document.querySelector('#with-border'),
  optimize: document.querySelector('#optimize'),
  world: document.querySelector('.world')
}

const state = {
  bands: +UI.bands.value,
  cells: +UI.cells.value,
  size: +UI.size.value,
  speed: +UI.speed.value,
  image: UI.image[0].value,
  borders: UI.borders.checked,
  optimize: UI.optimize.checked
}

UI.bands.addEventListener('input', (e) => {
  state.bands = +e.target.value
  render()
})

UI.cells.addEventListener('input', (e) => {
  state.cells = +e.target.value
  render()
})

UI.size.addEventListener('input', (e) => {
  state.size = +e.target.value
  render()
})

UI.speed.addEventListener('input', (e) => {
  state.speed = +e.target.value
  render()
})

Array.from(UI.image).forEach(input => {
  input.addEventListener('change', () => {
    state.image = input.value
    render()
  })
})

UI.borders.addEventListener('input', (e) => {
  state.borders = e.target.checked
  render()
})

UI.optimize.addEventListener('input', (e) => {
  state.optimize = e.target.checked
  render()
})

render()

function render() {
  UI.world.style.setProperty('--bands', state.bands)
  UI.world.style.setProperty('--cells', state.cells)
  UI.world.style.setProperty('--_size', state.size)
  UI.world.style.setProperty('--_speed', state.speed)
  UI.world.style.setProperty('--image', state.image)
  UI.world.classList.toggle('with-borders', state.borders)
  UI.world.classList.toggle('optimize', state.optimize)
  UI.world.innerHTML = chunk(state.bands, i => {
    let cells = state.cells
    if (state.optimize) {
      cells = optimizeCellCount(
        state.bands, i, state.cells
      )
    }
    return `
      <div class="band" style="--i: ${i}; --cells: ${cells}">
        ${chunk(cells, j => `
          <div class="cell" style="--j: ${j}"></div>
        `)}
      </div>
    `
  })
}

function chunk(howMany, mapFn) {
  return Array
    .from({ length: howMany }, (_, i) => mapFn(i))
    .join('')
}

// Performance optimization:
// As bands get nearer to the poles, they get lesser cells
function optimizeCellCount(bands, bandIndex, cells) {
  const latitude = Math.sin(Math.PI / bands * bandIndex)
  return Math.round(cells * latitude)
}

function hideAllSections() {
  const mainIframe = document.querySelector('.content-frame'); // Portfolio iframe
  const introIframe = document.getElementById('introIframe'); // Self-introduction iframe
  const videoContainer = document.getElementById('videoContainer'); // Video container
  const videoElement = document.getElementById('embeddedVideo'); // Video element
  const quizIframe = document.getElementById('quizIframe'); // Quiz iframe

  if (mainIframe) mainIframe.style.display = 'none'; // Hide portfolio iframe
  if (introIframe) introIframe.style.display = 'none'; // Hide self-introduction iframe
  if (quizIframe) quizIframe.style.display = 'none'; // Hide the quiz iframe
  if (videoContainer) {
    videoElement.pause(); // Pause the video
    videoElement.src = ''; // Clear the video source
    videoContainer.style.display = 'none'; // Hide the video container
  }
}

function showHome() {
  hideAllSections(); // Ensure all sections are hidden first
  const mainIframe = document.querySelector('.content-frame'); // Portfolio iframe
  const introIframe = document.getElementById('introIframe'); // Self-introduction iframe
  const videoContainer = document.getElementById('videoContainer'); // Video container
  const videoElement = document.getElementById('embeddedVideo'); // Video element
  const quizIframe = document.getElementById('quizIframe'); // Quiz iframe

  if (mainIframe) mainIframe.style.display = 'none'; // Hide portfolio iframe
  if (introIframe) introIframe.style.display = 'none'; // Hide self-introduction iframe
  if (quizIframe) quizIframe.style.display = 'none'; // Hide the quiz iframe
  if (videoContainer) {
    videoElement.pause(); // Pause the video
    videoElement.src = ''; // Clear the video source
    videoContainer.style.display = 'none'; // Hide the video container
  }

  // Reset quiz state
  const quizContainer = document.getElementById('quizContainer');
  if (quizContainer) {
    quizContainer.style.display = 'none'; // Hide quiz container
    quizContainer.innerHTML = ''; // Clear quiz content
  }
  currentQuestionIndex = 0; // Reset question index
}

function loadPage(url) {
  hideAllSections(); // Ensure all sections are hidden first
  const iframe = document.getElementById("mainIframe");
  iframe.src = url; // 載入新頁面
  iframe.style.display = "block"; // 顯示 iframe
}

function showVideo(videoSrc) {
  hideAllSections(); // Ensure all sections are hidden first
  const videoContainer = document.getElementById('videoContainer');
  const videoElement = document.getElementById('embeddedVideo');
  videoElement.src = videoSrc; // Set the video source
  videoElement.play(); // Start playing the video
  videoContainer.style.display = 'flex'; // Show the video container
}

function hideVideo() {
  const videoContainer = document.getElementById('videoContainer');
  const videoElement = document.getElementById('embeddedVideo');
  videoElement.pause(); // Pause the video
  videoElement.src = ''; // Clear the video source
  videoContainer.style.display = 'none'; // Hide the video container
}

function showQuizPage() {
  hideAllSections(); // Ensure all sections are hidden first
  const quizIframe = document.getElementById('quizIframe');
  quizIframe.src = '基本加減乘除_練習題.json'; // Set the quiz page URL to the JSON file
  quizIframe.style.display = 'block'; // Show the iframe
}

const quizData = [
  {"題號":1,"題目":"下列哪一個選項的答案為 7 + 5？","選項A":"10","選項B":"12","選項C":"13","選項D":"14","正確答案":"B","解析":"7 + 5 = 12"},
  {"題號":2,"題目":"如果小明有 18 顆糖，給了小美 7 顆，他還剩幾顆？","選項A":"11","選項B":"12","選項C":"10","選項D":"9","正確答案":"A","解析":"18 - 7 = 11"},
  {"題號":3,"題目":"3 × 4 的答案是多少？","選項A":"7","選項B":"10","選項C":"12","選項D":"14","正確答案":"C","解析":"3 × 4 = 12"},
  {"題號":4,"題目":"24 ÷ 6 的結果是？","選項A":"3","選項B":"4","選項C":"5","選項D":"6","正確答案":"B","解析":"24 ÷ 6 = 4"},
  {"題號":5,"題目":"哪一個選項是 15 + 6 的正確答案？","選項A":"20","選項B":"21","選項C":"22","選項D":"23","正確答案":"B","解析":"15 + 6 = 21"}
];

let currentQuestionIndex = 0;

function showQuiz() {
  hideAllSections(); // 隱藏其他區域

  // Reset quiz state
  currentQuestionIndex = 0; // 重置題目索引
  const quizContainer = document.getElementById('quizContainer');
  quizContainer.innerHTML = `
    <div id="question"></div>
    <div id="options"></div>
    <button id="nextButton" style="display: none;">下一題</button>
  `; // 重置測驗內容

  quizContainer.style.display = 'block'; // 顯示測驗區域
  loadQuestion(currentQuestionIndex); // 加載第一題
}

function loadQuestion(index) {
  const questionData = quizData[index];
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const nextButton = document.getElementById('nextButton');

  questionElement.innerHTML = `<h3>${questionData.題目}</h3>`;
  optionsElement.innerHTML = `
    <button onclick="checkAnswer('${questionData.正確答案}', 'A')">${questionData.選項A}</button>
    <button onclick="checkAnswer('${questionData.正確答案}', 'B')">${questionData.選項B}</button>
    <button onclick="checkAnswer('${questionData.正確答案}', 'C')">${questionData.選項C}</button>
    <button onclick="checkAnswer('${questionData.正確答案}', 'D')">${questionData.選項D}</button>
  `;
  nextButton.style.display = 'none'; // 隱藏下一題按鈕
}

function checkAnswer(correctAnswer, selectedAnswer) {
  const optionsElement = document.getElementById('options');
  const nextButton = document.getElementById('nextButton');

  if (correctAnswer === selectedAnswer) {
    optionsElement.innerHTML += `<p style="color: green;">答對了！</p>`;
  } else {
    optionsElement.innerHTML += `<p style="color: red;">答錯了！正確答案是 ${correctAnswer}。</p>`;
  }

  nextButton.style.display = 'block'; // 顯示下一題按鈕
}

document.getElementById('nextButton').addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion(currentQuestionIndex);
  } else {
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = '<h3>測驗結束！</h3>';
  }
});