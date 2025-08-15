// Helper function to escape special characters in regex
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper function to highlight text while preserving HTML structure
function highlightTextInElement(element, searchTerm) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        if (node.textContent.toLowerCase().includes(searchTerm)) {
            textNodes.push(node);
        }
    }
    
    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
        
        if (regex.test(text)) {
            const highlightedHTML = text.replace(regex, '<span style="background-color: #ffff99;">$1</span>');
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = highlightedHTML;
            
            const fragment = document.createDocumentFragment();
            while (tempDiv.firstChild) {
                fragment.appendChild(tempDiv.firstChild);
            }
            
            textNode.parentNode.replaceChild(fragment, textNode);
        }
    });
}

// Function to add a notification
function addNotification(title, message, type = 'info') {
    // Check for duplicate notifications within the last 1 second
    if (window.notifications) {
        const now = Date.now();
        const recent = window.notifications.find(n => 
            n.title === title && 
            n.message === message && 
            (now - n.id) < 1000 // within 1 second (using id as timestamp)
        );
        if (recent) {
            return; // Don't add duplicate
        }
    }
    
    const notification = {
        id: Date.now(), // Unique ID
        title: title,
        message: message,
        type: type,
        time: 'Just now'
    };
    
    // Add to notifications array (create if doesn't exist)
    if (!window.notifications) {
        window.notifications = [];
    }
    window.notifications.unshift(notification); // Add to beginning
    
    // Update notification badge
    updateNotificationBadge();
    
    // If notifications dropdown is open, refresh the display
    const dropdown = document.getElementById('notificationsDropdown');
    if (dropdown && dropdown.classList.contains('show')) {
        refreshNotificationDisplay();
    }
}

// Function to remove a notification
function removeNotification(notificationId) {
    if (window.notifications) {
        window.notifications = window.notifications.filter(n => n.id !== notificationId);
        updateNotificationBadge();
        refreshNotificationDisplay();
    }
    // Prevent event bubbling to keep dropdown open
    event.stopPropagation();
}

// Function to update notification badge count
function updateNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    if (badge) {
        const count = window.notifications ? window.notifications.length : 0;
        badge.textContent = count;
    }
}

// Function to refresh notification display
function refreshNotificationDisplay() {
    const notificationsList = document.getElementById('notificationsList');
    if (!notificationsList) return;
    
    // First clear any existing notifications
    while (notificationsList.firstChild) {
        notificationsList.removeChild(notificationsList.firstChild);
    }
    
    if (!window.notifications || window.notifications.length === 0) {
        const emptyNote = document.createElement('div');
        emptyNote.className = 'empty-notifications';
        emptyNote.textContent = 'No notifications at this time.';
        notificationsList.appendChild(emptyNote);
    } else {
        window.notifications.forEach(notification => {
            const item = document.createElement('div');
            item.className = `notification-item notification-${notification.type}`;
            
            item.innerHTML = `
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${notification.time}</div>
                </div>
                <button class="notification-dismiss" onclick="removeNotification(${notification.id})" title="Dismiss">×</button>
            `;
            
            notificationsList.appendChild(item);
        });
    }
}

// Search function - moved to global scope so HTML onclick can find it
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        // Clear previous search highlights first (but don't clear the input!)
        clearSearchHighlights();
        
        let foundAny = false;
        
        // Search in simple table cells
        const tableCells = document.querySelectorAll('td');
        
        tableCells.forEach(cell => {
            const cellText = cell.textContent;
            
            // If cell contains the search term
            if (cellText.trim().toLowerCase().includes(searchTerm)) {
                // Store original HTML if not already stored
                if (!cell.hasAttribute('data-original-html')) {
                    cell.setAttribute('data-original-html', cell.innerHTML);
                }
                
                // Highlight the text while preserving HTML structure
                highlightTextInElement(cell, searchTerm);
                foundAny = true;
            }
        });
        
        // Search in template-generated tables (otherones-table)
        const otherTables = document.querySelectorAll('.otherones-table');
        
        otherTables.forEach(table => {
            const titleElement = table.querySelector('th');
            const symbolElements = table.querySelectorAll('td span');
            
            let matches = false;
            
            // Check title text
            if (titleElement) {
                const titleText = titleElement.textContent;
                
                if (titleText.toLowerCase().includes(searchTerm)) {
                    if (!titleElement.hasAttribute('data-original-html')) {
                        titleElement.setAttribute('data-original-html', titleElement.innerHTML);
                    }
                    highlightTextInElement(titleElement, searchTerm);
                    matches = true;
                    foundAny = true;
                }
            }
            
            // Check symbol text
            symbolElements.forEach(symbolElement => {
                const symbolText = symbolElement.textContent;
                
                if (symbolText.toLowerCase().includes(searchTerm)) {
                    if (!symbolElement.hasAttribute('data-original-html')) {
                        symbolElement.setAttribute('data-original-html', symbolElement.innerHTML);
                    }
                    highlightTextInElement(symbolElement, searchTerm);
                    matches = true;
                    foundAny = true;
                }
            });
            
            // Add a subtle indicator to the whole table if any part matches
            table.style.boxShadow = matches ? '0 0 8px #4285f4' : '';
        });
        
        // Show a message if no results were found
        if (!foundAny) {
            // Add notification for no search results
            addNotification('Search Alert', `No matches found for: ${searchTerm}`, 'warning');
        }
    } else {
        // Add notification for empty search - don't call clearSearch() here
        addNotification('Search Input Required', 'Please enter a search term', 'warning');
    }
}

// Helper function to clear highlights without clearing the input
function clearSearchHighlights() {
    // Reset all table cells to their original state
    document.querySelectorAll('td').forEach(cell => {
        // Restore original HTML if it was stored
        const originalHTML = cell.getAttribute('data-original-html');
        if (originalHTML) {
            cell.innerHTML = originalHTML;
            cell.removeAttribute('data-original-html');
        }
    });
    
    // Reset all template-generated table elements
    document.querySelectorAll('.otherones-table').forEach(table => {
        table.style.boxShadow = '';
        
        // Reset title elements
        const titleElement = table.querySelector('th');
        if (titleElement) {
            const originalHTML = titleElement.getAttribute('data-original-html');
            if (originalHTML) {
                titleElement.innerHTML = originalHTML;
                titleElement.removeAttribute('data-original-html');
            }
        }
        
        // Reset symbol elements
        const symbolElements = table.querySelectorAll('td span');
        symbolElements.forEach(symbolElement => {
            const originalHTML = symbolElement.getAttribute('data-original-html');
            if (originalHTML) {
                symbolElement.innerHTML = originalHTML;
                symbolElement.removeAttribute('data-original-html');
            }
        });
    });
}

// Clear search function - moved to global scope so HTML onclick can find it
function clearSearch() {
    // Clear highlights
    clearSearchHighlights();
    
    // Clear the search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Update notification badge immediately after clearing
    updateNotificationBadge();
}

document.addEventListener('DOMContentLoaded', function() {
    // Declare all elements at the top
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Tab switching functionality
    document.getElementById('consonants').classList.add('active');
    document.getElementById('consonants-tab').classList.add('active');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            // Show the corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
                                                                                         
    // Audio functionality for clickable phonetic symbols
    document.querySelectorAll('.clickable-text').forEach(element => {
        element.addEventListener('click', function() {
            const audioUrl = this.getAttribute('data-audio-url');
            if (audioUrl) {
                const audio = new Audio(audioUrl);
                audio.play().catch(e => {
                    console.error('Error playing audio:', e);
                    // Add notification for audio error with quoted audio URL
                    addNotification('Audio error', `Unable to play audio sample "${audioUrl}". The audio file may be missing or your browser may not support this feature.`, 'error');
                });
            }
        });
    });
    
    // Search functionality - only add if elements exist
    if (searchInput && searchButton && clearButton) {
        searchButton.addEventListener('click', performSearch);
        clearButton.addEventListener('click', clearSearch);
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Initialize notifications after DOM is loaded
    setupNotifications();
});

// Notification setup function
function setupNotifications() {
    // Get all notification elements
    const notificationBell = document.getElementById('notificationBell');
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    const notificationsList = document.getElementById('notificationsList');
    const refreshNotifications = document.getElementById('refreshNotifications');
    
    // Only proceed if notification elements exist
    if (!notificationBell || !notificationsDropdown || !notificationsList) {
        console.warn('Notification elements not found');
        return;
    }
    
    // Function to load notifications
    function loadNotifications() {
        // Initialize notifications array if it doesn't exist
        if (!window.notifications) {
            window.notifications = [];
        }
        
        // First clear any existing content
        while (notificationsList.firstChild) {
            notificationsList.removeChild(notificationsList.firstChild);
        }
        
        // Add loading spinner
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading-spinner';
        notificationsList.appendChild(loadingSpinner);
        
        // Simulate loading delay
        setTimeout(() => {
            // Display existing notifications
            refreshNotificationDisplay();
        }, 500);
    }
    
    // Bell click handler
    notificationBell.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const wasOpen = notificationsDropdown.classList.contains('show');
        
        // Toggle the dropdown visibility
        notificationsDropdown.classList.toggle('show');
        
        // Load notifications only when opening (not when closing)
        if (!wasOpen) {
            loadNotifications();
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!notificationBell.contains(event.target) && !notificationsDropdown.contains(event.target)) {
            notificationsDropdown.classList.remove('show');
        }
    });
    
    // Refresh button functionality - FIXED VERSION
    if (refreshNotifications) {
        refreshNotifications.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Refresh button clicked'); // Debug log
            
            // Show loading spinner briefly without clearing notifications
            notificationsList.innerHTML = '<div class="loading-spinner"></div>';
            
            // Simulate refresh delay and then update display
            setTimeout(() => {
                refreshNotificationDisplay();
            }, 500);
        });
        
        console.log('Refresh button event listener attached'); // Debug log
    } else {
        console.warn('Refresh notifications button not found');
    }
    
    // Add CSS for dropdown visibility and notification styling
    const style = document.createElement('style');
    style.textContent = `
        .notifications-dropdown.show {
            display: block;
        }
        .notification-item {
            position: relative;
            padding-right: 30px;
        }
        .notification-dismiss {
            position: absolute;
            top: 8px;
            right: 8px;
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #666;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }
        .notification-dismiss:hover {
            background-color: #f0f0f0;
            color: #333;
        }
        .notification-warning {
            border-left: 3px solid #ff9800;
        }
        .notification-error {
            border-left: 3px solid #f44336;
        }
        .notification-info {
            border-left: 3px solid #2196f3;
        }
    `;
    document.head.appendChild(style);
    
    // Initial load of notifications and badge update
    updateNotificationBadge();
    loadNotifications();
}
