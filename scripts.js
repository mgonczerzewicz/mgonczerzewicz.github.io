// --- GeoGuess Game Variables ---
let panorama, map, actualLocation, guessMarker, actualMarker, polyline;
let totalScore = 0;
let roundNumber = 0;

// Geoapify API Key for Leaflet tiles (replace with your key if needed)
// This key is used within the initMap function.
const geoapifyApiKey = '3c38ccdfb92f40f3ba2fa52501a575cb'; // Use your actual Geoapify key

// --- Map Marker Icons ---
const guessIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [20, 33], iconAnchor: [10, 33], popupAnchor: [1, -30], shadowSize: [33, 33]
});
const actualIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

// --- Game Functions ---
function getRandomLocation() {
    // Generate random coordinates within a valid range
    const lat = (Math.random() * 170 - 85).toFixed(6); // -85 to +85
    const lng = (Math.random() * 360 - 180).toFixed(6); // -180 to +180
    return { lat: parseFloat(lat), lng: parseFloat(lng) };
}

function initStreetView(location) {
     // Check if Google Maps API is loaded before initializing
     if (typeof google === 'undefined' || typeof google.maps === 'undefined' || typeof google.maps.StreetViewPanorama === 'undefined') {
         console.error("Google Maps StreetView API not fully loaded yet. Cannot initialize Street View.");
         return;
     }
    const panoramaOptions = {
        position: new google.maps.LatLng(location.lat, location.lng), // Use google.maps.LatLng object
        pov: { heading: Math.random() * 360, pitch: 0 },
        zoom: 1,
        visible: true,
        addressControl: false,
        linksControl: true,
        panControl: true,
        motionTracking: false,
        motionTrackingControl: false,
        enableCloseButton: false,
        fullscreenControl: false
    };

    if (panorama) {
        // If panorama already exists, just update its options
        panorama.setOptions(panoramaOptions);
        panorama.setVisible(true);
    } else {
        // Otherwise, create a new panorama instance
        panorama = new google.maps.StreetViewPanorama(
            document.getElementById('street-view'), panoramaOptions
        );
    }
}

function initMap() {
    // Check if Leaflet is loaded before initializing map
     if (typeof L === 'undefined' || typeof L.map === 'undefined') {
         console.error("Leaflet library not loaded yet. Cannot initialize Map.");
         return;
     }
    // Initialize the Leaflet map centered globally
    map = L.map('map', {
        zoomControl: false, // Disable default zoom control
        attributionControl: true // Enable attribution control
    }).setView([20, 0], 2); // Set initial view to a global perspective

    const isRetina = L.Browser.retina;
    const tileUrl = isRetina
        ? `https://maps.geoapify.com/v1/tile/klokantech-basic/{z}/{x}/{y}@2x.png?apiKey=${geoapifyApiKey}`
        : `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?&apiKey=${geoapifyApiKey}`;

    // Add tile layer using Geoapify
    L.tileLayer(tileUrl, {
        attribution: 'Powered by Geoapify',
        maxZoom: 20,
        id: 'terrain-classic'
    }).addTo(map);

    // Add click listener to the map to place a guess marker
    map.on('click', function (e) {
         const guessButton = document.getElementById('guess-button');
         const infoElement = document.getElementById('info');

         // Only allow placing markers if the guess button is visible (i.e., not in results mode)
        if (guessButton && guessButton.style.display !== 'none') {
            if (guessMarker) map.removeLayer(guessMarker); // Remove previous guess marker if exists
            guessMarker = L.marker(e.latlng, { icon: guessIcon }).addTo(map); // Add new guess marker

            // --- NOWY KOD: Wyczyść komunikat po kliknięciu na mapę ---
            if (infoElement) {
                infoElement.textContent = ''; // Wyczyść panel informacyjny
                // Możesz tu też usunąć ewentualną klasę stylizującą powiadomienie
            }
            // --- KONIEC NOWEGO KODU ---
        }
    });
}

// Calculate distance between two lat/lng points using Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
    function toRad(x) { return x * Math.PI / 180; }
    const R = 6371; // Radius of Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Calculate score based on distance
function calculateScore(distance) {
    const maxDistance = 15000; // Adjust based on desired scaling
    // Simple exponential decay scoring
    const score = Math.max(0, Math.round(5000 * Math.exp(-distance / (maxDistance / 5))));
    return score;
}

// Update the score and round display
function updateScoreDisplay() {
    const roundInfo = document.getElementById('round-info');
    const scoreDisplay = document.getElementById('score-display');
     if(roundInfo) roundInfo.textContent = `Runda ${roundNumber}`;
     if(scoreDisplay) scoreDisplay.textContent = `Suma: ${totalScore} pkt`;
}

// Handles the user making a guess
function makeGuess() {
     const infoElement = document.getElementById('info'); // Pobierz element info

    // --- NOWY KOD: Zastąp alerty komunikatami w panelu info ---
    // Check if a guess marker is placed
    if (!guessMarker) {
        if (infoElement) {
            infoElement.textContent = 'Kliknij na mapie, aby wybrać miejsce!'; // Wyświetl komunikat w panelu info
            // Opcjonalnie: Możesz dodać tu klasę CSS do stylizacji tego konkretnego komunikatu (np. na czerwono)
            // infoElement.classList.add('notification-error');
             // Możesz ustawić timer na usunięcie komunikatu po kilku sekundach
            setTimeout(() => { if(infoElement.textContent === 'Kliknij na mapie, aby wybrać miejsce!') infoElement.textContent = ''; }, 3000);

        } else {
             // Na wypadek braku elementu info, wróć do alert (jako fallback)
             alert('Kliknij na mapie, aby wybrać miejsce!');
        }
        return; // Exit the function
    }
    // Check if the actual location is loaded
    if (!actualLocation) {
         if (infoElement) {
              infoElement.textContent = 'Poczekaj na załadowanie lokalizacji Street View...'; // Komunikat w panelu info
              // infoElement.classList.add('notification-info'); // Opcjonalna klasa
         } else {
              alert('Poczekaj na załadowanie lokalizacji!'); // Fallback alert
         }
         // Keep the return;
         return;
    }
    // --- KONIEC NOWEGO KODU ---

    if (!map) { // Sprawdzenie czy mapa jest zainicjalizowana
         console.error("Map not initialized, cannot make guess.");
         if (infoElement) infoElement.textContent = 'Błąd: Mapa nie została załadowana.';
         return;
    }

    const nextRoundButton = document.getElementById('next-round');
    const guessButton = document.getElementById('guess-button');

    if(!infoElement || !nextRoundButton || !guessButton) {
         console.error("Game control elements not found during makeGuess.");
         return;
    }

    // --- Jeśli wszystko jest gotowe, przejdź do obliczeń (oryginalny kod) ---
    const guessed = guessMarker.getLatLng();
    const distance = getDistance(actualLocation.lat, actualLocation.lng, guessed.lat, guessed.lng);
    const roundScore = calculateScore(distance);

    totalScore += roundScore; // Add round score to total
    updateScoreDisplay(); // Update score display

    // Remove old markers and polyline before showing results
    if (guessMarker) map.removeLayer(guessMarker);
    if (actualMarker) map.removeLayer(actualMarker);
    if (polyline) map.removeLayer(polyline);

    // Add actual location marker (using the gold icon)
    actualMarker = L.marker([actualLocation.lat, actualLocation.lng], { icon: actualIcon }).addTo(map);

    // Optional: Add popups to markers (commented out for cleaner look)
    // const guessPopup = `Twoje miejsce (Odległość: ${distance.toFixed(0)} km)`;
    // const actualPopup = `Prawdziwa lokalizacja (Runda: +${roundScore} pkt)`;
    // guessMarker.bindPopup(guessPopup).openPopup();
    // actualMarker.bindPopup(actualPopup);

    // Draw a line between the guess and the actual location
    const latlngs = [guessed, [actualLocation.lat, actualLocation.lng]];
    polyline = L.polyline(latlngs, { color: 'cyan', weight: 3 }).addTo(map);

    // Fly the map view to the actual location
    const zoomLevel = Math.max(2, Math.min(10, 14 - Math.log(distance + 1) * 2)); // Dynamic zoom based on distance
    map.flyTo(actualMarker.getLatLng(), zoomLevel, {
        animate: true,
        duration: 1.5
    });

    // Display round results (Ten kod nadpisze wcześniejsze komunikaty z panelu info)
    infoElement.textContent = `Wynik rundy: ${roundScore} pkt (Odległość: ${distance.toFixed(0)} km)`;

    // Show the "Next Round" button and hide the "Guess" button
    nextRoundButton.style.display = 'inline-block';
    guessButton.style.display = 'none';
}

// Starts a new game round
function newRound() {
    roundNumber++;
    console.log(`Starting round ${roundNumber}...`);

    updateScoreDisplay(); // Update round number display
    const infoElement = document.getElementById('info');
    const nextRoundButton = document.getElementById('next-round');
    const guessButton = document.getElementById('guess-button');

    if(!infoElement || !nextRoundButton || !guessButton) {
         console.error("Game control elements not found during newRound setup.");
         // Attempt to proceed but log error
    } else {
         infoElement.textContent = ''; // Clear previous round info and messages
         nextRoundButton.style.display = 'none'; // Hide next round button
         guessButton.style.display = 'inline-block'; // Show guess button
         guessButton.disabled = true; // Disable guess button until location loads
         // Opcjonalnie: Wyczyść ewentualne klasy stylizujące poprzednie komunikaty
         // infoElement.classList.remove('notification-error', 'notification-info');
    }


    // Clean up markers and lines from previous round
    if (map) { // Ensure map exists before attempting to remove layers
        if (guessMarker) { map.removeLayer(guessMarker); guessMarker = null; }
        if (actualMarker) { map.removeLayer(actualMarker); actualMarker = null; }
        if (polyline) { map.removeLayer(polyline); polyline = null; }

        // Reset map view to a global view before loading new location
        map.flyTo([20, 0], 2, { animate: false }); // Use flyTo for smooth transition, no animation
    } else {
        console.error("Leaflet map is not initialized. Cannot start new round properly.");
        // W przypadku braku mapy, wyświetlamy błąd krytyczny
        if(infoElement) infoElement.textContent = 'BŁĄD KRYTYCZNY: Mapa nie została załadowana. Odśwież stronę.';
        if(guessButton) guessButton.style.display = 'none';
        if(nextRoundButton) nextRoundButton.style.display = 'none'; // Brak sensu przejścia dalej
        if(guessButton) guessButton.disabled = true; // Zablokowany
        return;
    }


    let tryCount = 0;
    const autoRetryLimit = 10; // Limit prób dla automatycznego przejścia do następnej rundy

    function tryRandomLocation() {
         // Ensure Google Street View Service is available
        if (!google || !google.maps || typeof google.maps.StreetViewService === 'undefined') {
            console.error("Google Maps StreetView Service not fully loaded yet. Retrying...");
             // Tylko jeśli nie osiągnięto max prób ogólnych (np. 20 jak wcześniej)
            if (tryCount < autoRetryLimit + 10) { // Możemy dać nieco większy ogólny limit, np. 20-30 prób, zanim wyświetlimy błąd krytyczny
                 setTimeout(tryRandomLocation, 150);
            } else {
                 // Jeśli API nie załadowało się po wielu próbach, wyświetl błąd krytyczny
                 const infoElement = document.getElementById('info');
                 const guessButton = document.getElementById('guess-button');
                 const nextRoundButton = document.getElementById('next-round');
                 if(infoElement) infoElement.textContent = 'BŁĄD KRYTYCZNY: Nie można załadować usług Google Maps. Odśwież stronę.';
                 if(guessButton) guessButton.style.display = 'none';
                 if(nextRoundButton) nextRoundButton.style.display = 'none'; // Brak sensu przejścia dalej
                 if(guessButton) guessButton.disabled = true;
                 console.error("Failed to load Google Maps API services after max attempts.");
            }
            return;
        }

        tryCount++;
        console.log(`Attempt ${tryCount} to find Street View...`);
        const randomLoc = getRandomLocation();
        const svService = new google.maps.StreetViewService();

        // Search for Street View panoramas near the random location
        svService.getPanorama(
            {
                location: new google.maps.LatLng(randomLoc.lat, randomLoc.lng), // Search location
                radius: 100000, // Search radius in meters (100km)
                source: google.maps.StreetViewSource.OUTDOOR, // Prefer outdoor panoramas
                preference: google.maps.StreetViewPreference.NEAREST // Get the nearest panorama
            },
            (data, status) => {
                console.log(`Street View Status for attempt ${tryCount}:`, status);
                const infoElement = document.getElementById('info');
                const guessButton = document.getElementById('guess-button');
                const nextRoundButton = document.getElementById('next-round');

                // Check if a valid panorama was found
                if (status === google.maps.StreetViewStatus.OK && data && data.location && data.location.latLng) {
                    // --- SUKCES ---
                    actualLocation = data.location.latLng.toJSON(); // Store the actual panorama location
                    initStreetView(actualLocation); // Initialize Street View with the found location
                    if(guessButton) {
                        guessButton.disabled = false; // Enable guess button
                        guessButton.style.display = 'inline-block'; // Upewnij się, że jest widoczny
                    }
                    if(nextRoundButton) nextRoundButton.style.display = 'none'; // Ukryj przycisk następnej rundy
                    if(infoElement) infoElement.textContent = ''; // Wyczyść komunikat o błędzie
                     // Opcjonalnie: Wyczyść ewentualne klasy stylizujące komunikaty
                    // if(infoElement) infoElement.classList.remove('notification-error', 'notification-info');

                    console.log("Street View location loaded successfully.");

                } else { // --- BRAK LOKALIZACJI dla tej próby ---
                    console.log(`Street View not found, status: ${status}. Attempt ${tryCount}.`);

                    if (tryCount < autoRetryLimit) {
                        // Nie osiągnięto limitu automatycznych prób, spróbuj ponownie
                        if(infoElement) infoElement.textContent = `Szukam lokalizacji... (${tryCount}/${autoRetryLimit} próba nieudana)`; // Komunikat postępu
                        setTimeout(tryRandomLocation, 100);

                    } else {
                        // Osiągnięto limit automatycznych prób (to jest próba #10)
                        console.warn(`Street View search failed after ${autoRetryLimit} attempts in this newRound call. Starting a new round automatically.`);
                        if(infoElement) {
                             infoElement.textContent = `Nie znaleziono Street View po ${autoRetryLimit} próbach. Automatyczne przejście do następnej rundy...`;
                             // Opcjonalnie: Dodaj klasę stylizującą automatyczne przejście
                            // infoElement.classList.add('notification-info');
                        }
                         // Ukryj przyciski od razu
                         if(guessButton) {
                             guessButton.style.display = 'none';
                             guessButton.disabled = true;
                         }
                         if(nextRoundButton) {
                             nextRoundButton.style.display = 'none';
                         }

                        // Rozpocznij nową rundę automatycznie po krótkiej pauzie (np. 1.5 sekundy)
                        setTimeout(newRound, 1500);


                    } // end else (>= autoRetryLimit)

                } // end else (status not OK)
            } // end svService.getPanorama callback
        ); // end svService.getPanorama call
    } // end tryRandomLocation function

    // Start the initial attempt for this round
    tryRandomLocation();
} // end newRound function

// --- Login Logic ---
let isLoggedIn = false; // Flag to track login status

// Function to check entered credentials
function checkLoginCredentials() {
    const loginInput = document.getElementById('login-input');
    const passwordInput = document.getElementById('password-input');
    const loginButton = document.getElementById('login-button'); // Get button by its ID
    const loginOverlay = document.getElementById('login-overlay');
    const pageContent = document.getElementById('page-content'); // The div wrapping game content
    const loginMessage = document.getElementById('login-message');

    // Ensure elements exist before trying to access properties
    if (!loginInput || !passwordInput || !loginButton || !loginOverlay || !pageContent || !loginMessage) {
        console.error("Login elements not found in the DOM. Critical error.");
        if(loginMessage) loginMessage.textContent = "Błąd: Nie znaleziono elementów logowania."; // Show error on page
        return; // Stop execution
    }


    const enteredLogin = loginInput.value;
    const enteredPassword = passwordInput.value;

    // *** DEFINE YOUR CORRECT LOGIN AND PASSWORD HERE ***
    // Change these values to your desired credentials
    const correctLogin = "admin";
    const correctPassword = "Legenda997";
    // **********************************************

    if (enteredLogin === correctLogin && enteredPassword === correctPassword) {
        console.log("Login successful.");
        isLoggedIn = true; // Set the login flag to true

        // --- Post-Login Actions ---
        // 1. Hide the login overlay
        if(loginOverlay) loginOverlay.style.display = 'none';

        // 2. Show the main game content
        if(pageContent) {
            pageContent.style.display = 'block';
            console.log("Page content shown.");
        }


        // 3. Add a class to the body to activate game-specific CSS
        document.body.classList.add('game-active');
        console.log("Added 'game-active' class to body.");

        // 4. Initialize the game AFTER successful login and showing content
        // Check if Google Maps API is already loaded.
        // If it is, call onGoogleMapsReady immediately to start the game.
        // If not, the automatic call from the API script when it loads
        // will find isLoggedIn is true and proceed with initialization.
        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined' && typeof google.maps.StreetViewService !== 'undefined') {
             console.log("Google Maps API already loaded. Initializing game from login success.");
             onGoogleMapsReady(); // Call the callback function
        } else {
             console.log("Google Maps API not yet loaded. Game will initialize when API loads and calls onGoogleMapsReady.");
             // The onGoogleMapsReady function is already defined and will be called
             // automatically by the Google Maps script when it finishes loading.
             // Since isLoggedIn is now true, that automatic call will proceed.
        }


        // Optional: Call other initialization functions for the main page content if needed
        // (e.g., initializing scroll effects, hamburger menus, etc.)
        // Ensure these functions are defined elsewhere or included in this script.
        // if (typeof initScrollHeader === 'function') {
        //      initScrollHeader();
        // }
        // if (typeof initHamburgerMenu === 'function') {
        //      initHamburgerMenu();
        // }


    } else {
        console.log("Login failed.");
        // Display error message and block inputs/button
        if(loginMessage) loginMessage.textContent = 'Nieprawidłowy login lub hasło. Dostęp zablokowany!';
        if(loginInput) loginInput.value = ''; // Clear input fields
        if(passwordInput) passwordInput.value = '';

        // !!! BLOCK FIELDS AND BUTTON AFTER FIRST FAILED ATTEMPT !!!
        if(loginInput) loginInput.disabled = true;
        if(passwordInput) passwordInput.disabled = true;
        if(loginButton) loginButton.disabled = true;


        // Optional: Add a timer here to re-enable fields after a delay (e.g., 5 minutes)
        // setTimeout(function() {
        //      if (loginInput) loginInput.disabled = false;
        //      if (passwordInput) passwordInput.disabled = false;
        //      if (loginButton) loginButton.disabled = false;
        //      if (loginMessage) loginMessage.textContent = 'Możesz spróbować ponownie.';
        // }, 300000); // 300000 milliseconds = 5 minutes
    }
}

// --- Google Maps API Callback Function ---
// This function is called automatically by the Google Maps script
// when the API has finished loading. It MUST be a global function
// because the Google Maps API script calls it by name.
function onGoogleMapsReady() {
    console.log("Google Maps API is ready.");
    // Only initialize the game if the user has successfully logged in
    if (isLoggedIn) {
        console.log("User logged in. Initializing game (called by Google API).");
        // Initialize the Leaflet map and start the first round
        initMap();
        newRound();
    } else {
        console.log("User not logged in. Game initialization deferred.");
        // Game initialization will happen via checkLoginCredentials
        // if login occurs after the API loads.
    }
}


// --- Event Listeners ---

// Wait for the DOM to be fully loaded before attaching listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed. Attaching event listeners.");

    // Get references to login elements
    const loginInput = document.getElementById('login-input');
    const passwordInput = document.getElementById('password-input');
    const loginButton = document.getElementById('login-button'); // Get button by ID
    const pageContent = document.getElementById('page-content');

    // Check if core elements exist before attaching listeners
    if (!loginInput || !passwordInput || !loginButton || !pageContent) {
        console.error("Critical DOM elements for login or game content not found. Script cannot fully initialize event listeners.");
        // Potentially display a user-friendly error message on the page
        return; // Stop execution if essential elements are missing
    }


    // Attach click listener to the login button
    loginButton.addEventListener('click', checkLoginCredentials);


    // Allow login by pressing Enter in the login input field
    loginInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) { // Check for Enter key
            event.preventDefault(); // Prevent default form submission behavior
            checkLoginCredentials(); // Call the login function
        }
    });


    // Allow login by pressing Enter in the password input field
    passwordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) { // Check for Enter key
            event.preventDefault(); // Prevent default form submission behavior
            checkLoginCredentials(); // Call the login function
        }
    });

    // Attach event listeners for the game buttons
    const guessButton = document.getElementById('guess-button');
    const nextRoundButton = document.getElementById('next-round');

    // Check if game buttons exist before attaching listeners
    if (!guessButton || !nextRoundButton) {
         console.error("Game button elements not found. Game functionality related to buttons may be limited.");
         // Continue, but game buttons won't work
    } else {
        guessButton.onclick = makeGuess; // Attach click handler
         // Add keypress listener for the spacebar to trigger guess
         document.addEventListener('keydown', function (event) {
            if (event.code === 'Space' &&
                guessButton.style.display !== 'none' && // Only if guess button is visible
                !guessButton.disabled) { // And not disabled
                event.preventDefault(); // Prevent default spacebar action (scrolling)
                makeGuess(); // Trigger the guess
            }
        });
        nextRoundButton.onclick = newRound; // Attach click handler
    }


    // Ensure page content is hidden initially in case CSS is slow or overridden
    // This is also handled by CSS, but redundant check can be a safeguard.
    pageContent.style.display = 'none';
});

