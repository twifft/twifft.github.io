// === Demo-only script: no real TikTok integration, no keys needed ===

// DOM elements
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const accountStatus = document.getElementById("accountStatus");
const userInfoBox = document.getElementById("userInfo");
const userNameSpan = document.getElementById("userName");
const userIdSpan = document.getElementById("userId");
const videoInput = document.getElementById("videoInput");
const uploadBtn = document.getElementById("uploadBtn");
const logBox = document.getElementById("logBox");

// Simple logger
function log(message) {
    const ts = new Date().toLocaleTimeString();
    logBox.textContent += `[${ts}] ${message}\n`;
    logBox.scrollTop = logBox.scrollHeight;
}

// Simulate user session in browser storage
function setDemoUserSession() {
    const fakeUser = {
        open_id: "demo-open-id-" + Math.floor(Math.random() * 999999),
        display_name: "Demo Creator"
    };
    sessionStorage.setItem("demo_open_id", fakeUser.open_id);
    sessionStorage.setItem("demo_display_name", fakeUser.display_name);
}

function clearDemoUserSession() {
    sessionStorage.removeItem("demo_open_id");
    sessionStorage.removeItem("demo_display_name");
}

function getDemoUserSession() {
    const open_id = sessionStorage.getItem("demo_open_id");
    const display_name = sessionStorage.getItem("demo_display_name");
    if (!open_id || !display_name) return null;
    return { open_id, display_name };
}

function updateUIFromSession() {
    const user = getDemoUserSession();

    if (user) {
        accountStatus.textContent = "Connected to TikTok (simulated demo session).";
        userNameSpan.textContent = user.display_name;
        userIdSpan.textContent = user.open_id;
        userInfoBox.hidden = false;

        loginBtn.hidden = true;
        logoutBtn.hidden = false;
    } else {
        accountStatus.textContent = "Not connected to TikTok yet. (Demo)";
        userInfoBox.hidden = true;

        loginBtn.hidden = false;
        logoutBtn.hidden = true;
    }
}

// Handle "Login" (simulated)
loginBtn.addEventListener("click", () => {
    log("Simulating TikTok login flow…");
    log("In the real app, this button would redirect to TikTok's OAuth page and request permissions.");

    // Simulate slight delay
    loginBtn.disabled = true;
    loginBtn.textContent = "Connecting (demo)…";

    setTimeout(() => {
        setDemoUserSession();
        updateUIFromSession();
        loginBtn.disabled = false;
        loginBtn.textContent = "Continue with TikTok (Demo)";
        log("Demo login completed. A simulated TikTok user profile is now shown.");
    }, 1200);
});

// Handle "Logout" (simulated)
logoutBtn.addEventListener("click", () => {
    log("Clearing demo session and disconnecting simulated TikTok account.");
    clearDemoUserSession();
    updateUIFromSession();
});

// Handle "Upload" (simulated)
uploadBtn.addEventListener("click", () => {
    const file = videoInput.files && videoInput.files[0];

    if (!file) {
        log("No video selected. Please choose a file first.");
        alert("Bitte zuerst eine Videodatei auswählen.");
        return;
    }

    const user = getDemoUserSession();
    if (!user) {
        log("No demo TikTok user connected. Upload is blocked.");
        alert("Bitte zuerst mit dem Demo-TikTok-Login verbinden.");
        return;
    }

    log(`Selected file: ${file.name} (${Math.round(file.size / 1024)} kB)`);
    log("In the real implementation, this file would now be sent to a backend service.");
    log("The backend would call TikTok's Content Posting API (video.upload) with the user's access token.");

    uploadBtn.disabled = true;
    uploadBtn.textContent = "Uploading (demo)…";

    // Fake upload time
    setTimeout(() => {
        uploadBtn.disabled = false;
        uploadBtn.textContent = "Upload to TikTok (Demo)";

        const fakeVideoId = "demo-video-" + Math.floor(Math.random() * 999999);
        log(`Demo upload finished. Simulated TikTok draft video_id: ${fakeVideoId}`);
        log("For the TikTok review video, you can point out this log as the 'API response' example.");
    }, 2000);
});

// Initialize UI on page load
updateUIFromSession();
log("Demo page loaded. No real TikTok API keys or network calls are used here.");
