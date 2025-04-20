// DOM Elements
const welcomePage = document.getElementById("welcome-page");
const diaryPage = document.getElementById("diary-page");
const analysisPage = document.getElementById("analysis-page");
const diaryBtn = document.getElementById("diary-btn");
const analysisBtn = document.getElementById("analysis-btn");
const backToWelcomeBtn = document.getElementById("back-to-welcome");
const backFromAnalysisBtn = document.getElementById("back-from-analysis");
const calendarDays = document.getElementById("calendar-days");
const monthYearDisplay = document.getElementById("month-year");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const modalOverlay = document.getElementById("modal-overlay");
const emojiModal = document.getElementById("emoji-modal");
const sliderModal = document.getElementById("slider-modal");
const textModal = document.getElementById("text-modal");
const moodSlider = document.getElementById("mood-slider");
const sliderValueDisplay = document.getElementById("slider-value");
const sliderContinueBtn = document.getElementById("slider-continue");
const diaryText = document.getElementById("diary-text");
const saveEntryBtn = document.getElementById("save-entry");
const tenDaysBtn = document.getElementById("ten-days");
const thirtyDaysBtn = document.getElementById("thirty-days");
const startDateInput = document.getElementById("start-date");
const noDataMessage = document.getElementById("no-data-message");
const sentimentChart = document.getElementById("sentiment-chart");

// Global Variables
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedDate = null;
let analysisChart = null;
let analysisPeriod = 10;
let emojiValue = 3; // Default to neutral
let sliderValue = 3; // Default to neutral

// Positive and negative keywords for sentiment analysis
const positiveKeywords = [
  "happy",
  "joyful",
  "excited",
  "cheerful",
  "content",
  "pleased",
  "grateful",
  "optimistic",
  "loved",
  "safe",
  "relaxed",
  "calm",
  "serene",
  "blissful",
  "satisfied",
  "proud",
  "confident",
  "radiant",
  "inspired",
  "smiling",
  "upbeat",
  "delighted",
  "fulfilled",
  "admired",
  "fun",
  "bubbly",
  "energetic",
  "peaceful",
  "encouraged",
  "warm",
  "affectionate",
  "cherished",
  "secure",
  "free",
  "lively",
  "vibrant",
  "elated",
  "spirited",
  "pleasant",
  "jolly",
  "perky",
  "nice",
  "sweet",
  "mellow",
  "strong",
  "comfortable",
  "friendly",
  "amused",
  "interested",
  "trusting",
  "loving",
  "forgiving",
  "gracious",
  "cheery",
  "fulfilling",
  "thankful",
  "motivated",
  "accomplished",
  "easygoing",
  "tender",
  "playful",
  "positive",
  "harmonious",
  "connected",
  "sincere",
  "genuine",
  "respectful",
  "appreciated",
  "kindhearted",
  "uplifted",
  "blessed",
  "enamored",
  "sparkling",
  "merry",
  "glad",
  "excellent",
  "gladdened",
  "joyous",
  "bright",
  "laughing",
  "hopeful",
  "empowered",
  "sunny",
  "refreshed",
  "tranquil",
  "buoyant",
  "caring",
  "embracing",
  "resilient",
  "contented",
  "ecstatic",
  "exhilarated",
  "vivacious",
  "dynamic",
  "zestful",
  "rewarded",
  "engaged",
  "stable",
  "gratified",
  "vivified",
];

const negativeKeywords = [
  "sad",
  "angry",
  "upset",
  "mad",
  "hurt",
  "lonely",
  "anxious",
  "scared",
  "worried",
  "tired",
  "stressed",
  "disappointed",
  "gloomy",
  "depressed",
  "frustrated",
  "overwhelmed",
  "irritated",
  "offended",
  "fearful",
  "confused",
  "bitter",
  "resentful",
  "troubled",
  "dejected",
  "hopeless",
  "isolated",
  "down",
  "miserable",
  "blue",
  "broken",
  "cranky",
  "annoyed",
  "fed up",
  "exasperated",
  "distressed",
  "disheartened",
  "discouraged",
  "uneasy",
  "panicked",
  "nervous",
  "jittery",
  "terrified",
  "restless",
  "sorrowful",
  "tearful",
  "weepy",
  "downhearted",
  "somber",
  "bleak",
  "pessimistic",
  "regretful",
  "remorseful",
  "ashamed",
  "guilty",
  "embarrassed",
  "self-conscious",
  "inadequate",
  "worthless",
  "self-doubting",
  "inferiority",
  "desolate",
  "empty",
  "resigned",
  "dismayed",
  "anguished",
  "suffering",
  "pained",
  "sorrowing",
  "agonized",
  "irate",
  "enraged",
  "furious",
  "seething",
  "livid",
  "vindictive",
  "malicious",
  "suspicious",
  "distrustful",
  "paranoid",
  "cowering",
  "apprehensive",
  "burdened",
  "drained",
  "exhausted",
  "worn out",
  "fatigued",
  "burned-out",
  "defeated",
  "crestfallen",
  "dismal",
  "grim",
  "despondent",
  "forlorn",
  "alienated",
  "withdrawn",
  "estranged",
  "angsty",
  "moody",
  "sulky",
  "sullen",
];

// Navigation Functions
function showPage(page) {
  welcomePage.classList.remove("active-page");
  diaryPage.classList.remove("active-page");
  analysisPage.classList.remove("active-page");
  page.classList.add("active-page");
}

// Calendar Functions
function renderCalendar() {
  calendarDays.innerHTML = "";

  // Set the month/year display
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  monthYearDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  // Get first day of month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get days from previous month
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Add days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar-day", "other-month");
    const dayNum = daysInPrevMonth - i;
    dayElement.textContent = dayNum;

    // Set date for previous month days
    const prevMonthDate = new Date(currentYear, currentMonth - 1, dayNum);
    dayElement.dataset.date = formatDateForStorage(prevMonthDate);

    if (hasEntry(prevMonthDate)) {
      dayElement.classList.add("has-entry");
    }

    dayElement.addEventListener("click", () => selectDate(prevMonthDate));
    calendarDays.appendChild(dayElement);
  }

  // Add days for current month
  for (let i = 1; i <= daysInMonth; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar-day");
    dayElement.textContent = i;

    // Check if this is today
    const thisDate = new Date(currentYear, currentMonth, i);
    dayElement.dataset.date = formatDateForStorage(thisDate);

    if (isToday(thisDate)) {
      dayElement.classList.add("today");
    }

    if (hasEntry(thisDate)) {
      dayElement.classList.add("has-entry");
    }

    dayElement.addEventListener("click", () => selectDate(thisDate));
    calendarDays.appendChild(dayElement);
  }

  // Add days for next month
  const totalDaysDisplayed = calendarDays.children.length;
  const daysNeeded = 42 - totalDaysDisplayed; // 6 rows of 7 days

  for (let i = 1; i <= daysNeeded; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar-day", "other-month");
    dayElement.textContent = i;

    // Set date for next month days
    const nextMonthDate = new Date(currentYear, currentMonth + 1, i);
    dayElement.dataset.date = formatDateForStorage(nextMonthDate);

    if (hasEntry(nextMonthDate)) {
      dayElement.classList.add("has-entry");
    }

    dayElement.addEventListener("click", () => selectDate(nextMonthDate));
    calendarDays.appendChild(dayElement);
  }
}

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function formatDateForStorage(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function hasEntry(date) {
  const dateStr = formatDateForStorage(date);
  return localStorage.getItem(dateStr) !== null;
}

// Modal and Entry Functions
function selectDate(date) {
  selectedDate = date;
  const dateStr = formatDateForStorage(date);

  // Check if there's an existing entry for this date
  const existingEntry = localStorage.getItem(dateStr);

  if (existingEntry) {
    // Load existing entry data into modals
    const entryData = JSON.parse(existingEntry);
    emojiValue = entryData.emoji;
    sliderValue = entryData.slider;
    diaryText.value = entryData.text || "";
  } else {
    // Reset to defaults for new entry
    emojiValue = 3;
    sliderValue = 3;
    diaryText.value = "";
  }

  // Update slider display
  moodSlider.value = sliderValue;
  sliderValueDisplay.textContent = sliderValue;

  // Show first modal
  modalOverlay.classList.remove("hidden");
  emojiModal.classList.remove("hidden");
}

function hideAllModals() {
  modalOverlay.classList.add("hidden");
  emojiModal.classList.add("hidden");
  sliderModal.classList.add("hidden");
  textModal.classList.add("hidden");
}

function saveEntry() {
  const dateStr = formatDateForStorage(selectedDate);

  // Analyze text for sentiment if provided
  let textSentiment = 0;
  const text = diaryText.value.toLowerCase();

  if (text) {
    // Check for positive keywords
    positiveKeywords.forEach((keyword) => {
      if (text.includes(keyword)) {
        textSentiment += 1;
        return; // Only count each keyword once
      }
    });

    // Check for negative keywords
    negativeKeywords.forEach((keyword) => {
      if (text.includes(keyword)) {
        textSentiment -= 1;
        return; // Only count each keyword once
      }
    });
  }

  // Create entry object
  const entryData = {
    date: dateStr,
    emoji: emojiValue,
    slider: sliderValue,
    text: diaryText.value,
    textSentiment: textSentiment,
  };

  // Save to local storage
  localStorage.setItem(dateStr, JSON.stringify(entryData));

  // Close modal and refresh calendar to show entry indicator
  hideAllModals();
  renderCalendar();
}

// Sentiment Analysis Functions
function updateSentimentChart() {
  const startDate = startDateInput.value
    ? new Date(startDateInput.value)
    : new Date();
  startDate.setHours(0, 0, 0, 0);

  const dates = [];
  const sentimentScores = [];
  let hasData = false;

  // Generate dates for the selected period
  for (let i = 0; i < analysisPeriod; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateStr = formatDateForStorage(currentDate);
    dates.push(i + 1); // Just show day numbers on x-axis

    const entryData = localStorage.getItem(dateStr);
    if (entryData) {
      const parsedData = JSON.parse(entryData);
      // Calculate sentiment score with emoji as highest priority
      let sentimentScore = parsedData.emoji;
      // Add text sentiment as supplementary
      if (parsedData.text) {
        sentimentScore += parsedData.textSentiment;
        // Clamp the final value between 1 and 5
        sentimentScore = Math.max(1, Math.min(5, sentimentScore));
      }
      sentimentScores.push(sentimentScore);
      hasData = true;
    } else {
      // Default to neutral (3) if no entry
      sentimentScores.push(3);
    }
  }

  // Show message if no data
  if (!hasData) {
    noDataMessage.classList.remove("hidden");
    if (analysisChart) {
      analysisChart.destroy();
      analysisChart = null;
    }
    return;
  }

  // Hide no data message
  noDataMessage.classList.add("hidden");

  // Create or update chart
  if (analysisChart) {
    analysisChart.data.labels = dates;
    analysisChart.data.datasets[0].data = sentimentScores;
    analysisChart.update();
  } else {
    analysisChart = new Chart(sentimentChart, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Mood Level",
            data: sentimentScores,
            fill: false,
            borderColor: "#4f46e5",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            min: 1,
            max: 5,
            ticks: {
              stepSize: 1,
            },
            title: {
              display: true,
              text: "Emotion Level",
            },
          },
          x: {
            title: {
              display: true,
              text: "Day",
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}

// Event Listeners
diaryBtn.addEventListener("click", () => {
  showPage(diaryPage);
  renderCalendar();
});

analysisBtn.addEventListener("click", () => {
  showPage(analysisPage);
  // Set default start date to today
  const today = new Date();
  startDateInput.value = formatDateForStorage(today);
  updateSentimentChart();
});

backToWelcomeBtn.addEventListener("click", () => {
  showPage(welcomePage);
});

backFromAnalysisBtn.addEventListener("click", () => {
  showPage(welcomePage);
});

prevMonthBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

// Emoji selection
document.querySelectorAll(".emoji").forEach((emoji) => {
  emoji.addEventListener("click", () => {
    emojiValue = parseInt(emoji.dataset.value);
    emojiModal.classList.add("hidden");
    sliderModal.classList.remove("hidden");
  });
});

// Slider value update
moodSlider.addEventListener("input", () => {
  sliderValue = parseInt(moodSlider.value);
  sliderValueDisplay.textContent = sliderValue;
});

sliderContinueBtn.addEventListener("click", () => {
  sliderModal.classList.add("hidden");
  textModal.classList.remove("hidden");
});

saveEntryBtn.addEventListener("click", saveEntry);

// Analysis period selection
tenDaysBtn.addEventListener("click", () => {
  analysisPeriod = 10;
  tenDaysBtn.classList.add("active");
  thirtyDaysBtn.classList.remove("active");
  updateSentimentChart();
});

thirtyDaysBtn.addEventListener("click", () => {
  analysisPeriod = 30;
  thirtyDaysBtn.classList.add("active");
  tenDaysBtn.classList.remove("active");
  updateSentimentChart();
});

startDateInput.addEventListener("change", updateSentimentChart);

// Modal overlay click to cancel
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    hideAllModals();
  }
});

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  // Set today's date for start date input
  const today = formatDateForStorage(new Date());
  startDateInput.value = today;

  // Initialize with current month calendar
  renderCalendar();
});
