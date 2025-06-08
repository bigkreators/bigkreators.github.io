// Helper function to escape special characters in regex
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
                    alert('Unable to play audio sample. The audio file may be missing or your browser may not support this feature.');
                });
            }
        });
    });
    
    // Search functionality - only add if elements exist
    if (searchInput && searchButton && clearButton) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // Search through symbols in all tabs
            document.querySelectorAll('.tab-content table td:not(.label-cell)').forEach(cell => {
                const cellText = cell.textContent.toLowerCase();
                if (cellText.includes(searchTerm)) {
                    cell.style.backgroundColor = 'yellow';
                } else {
                    cell.style.backgroundColor = '';
                }
            });
        });

        searchButton.addEventListener('click', performSearch);
        clearButton.addEventListener('click', clearSearch);
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Setup notifications
    setupNotifications();
});

// Search function
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        let foundAny = false;
        
        // Search in simple table cells
        const tableCells = document.querySelectorAll('td');
        
        tableCells.forEach(cell => {
            const originalHTML = cell.innerHTML;
            const cellText = cell.textContent;
            
            // If cell only contains a single symbol or character
            if (cellText.trim().toLowerCase().includes(searchTerm)) {
                // Wrap the matching part in a highlight span
                const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
                cell.innerHTML = cellText.replace(regex, '<span style="background-color: #ffff99;">$1</span>');
                foundAny = true;
            } else {
                // Reset to original content
                cell.innerHTML = originalHTML;
            }
        });
        
        // Search in infoboxes
        const infoboxes = document.querySelectorAll('.infobox');
        
        infoboxes.forEach(infobox => {
            const symbolElement = infobox.querySelector('.IPA');
            const titleElement = infobox.querySelector('.infobox-above');
            
            let matches = false;
            
            // Check symbol text
            if (symbolElement) {
                const originalSymbolHTML = symbolElement.innerHTML;
                const symbolText = symbolElement.textContent;
                
                if (symbolText.toLowerCase().includes(searchTerm)) {
                    const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
                    symbolElement.innerHTML = symbolText.replace(regex, '<span style="background-color: #ffff99;">$1</span>');
                    matches = true;
                    foundAny = true;
                } else {
                    symbolElement.innerHTML = originalSymbolHTML;
                }
            }
            
            // Check title/description
            if (titleElement) {
                const originalTitleHTML = titleElement.innerHTML;
                const titleText = titleElement.textContent;
                
                if (titleText.toLowerCase().includes(searchTerm)) {
                    const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
                    titleElement.innerHTML = titleText.replace(regex, '<span style="background-color: #ffff99;">$1</span>');
                    matches = true;
                    foundAny = true;
                } else {
                    titleElement.innerHTML = originalTitleHTML;
                }
            }
            
            // Add a subtle indicator to the whole infobox if any part matches
            infobox.style.boxShadow = matches ? '0 0 8px #4285f4' : '';
        });
        
        // Show a message if no results were found
        if (!foundAny) {
            alert(`No matches found for: ${searchTerm}`);
        }
    } else {
        clearSearch();
        alert('Please enter a search term');
    }
}

// Clear search function
function clearSearch() {
    // Reset all table cells to their original state
    document.querySelectorAll('td').forEach(cell => {
        // Remove highlight spans if any
        cell.innerHTML = cell.innerHTML.replace(/<span style="background-color: #ffff99;">(.*?)<\/span>/g, '$1');
    });
    
    // Reset all infobox elements
    document.querySelectorAll('.infobox').forEach(infobox => {
        infobox.style.boxShadow = '';
        
        // Reset IPA span
        const symbolElement = infobox.querySelector('.IPA');
        if (symbolElement) {
            symbolElement.innerHTML = symbolElement.innerHTML.replace(/<span style="background-color: #ffff99;">(.*?)<\/span>/g, '$1');
        }
        
        // Reset title element
        const titleElement = infobox.querySelector('.infobox-above');
        if (titleElement) {
            titleElement.innerHTML = titleElement.innerHTML.replace(/<span style="background-color: #ffff99;">(.*?)<\/span>/g, '$1');
        }
    });
    
    // Clear the search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
}

// Notification setup function
function setupNotifications() {
    // Declare ALL variables in the same scope
    const notificationBell = document.getElementById('notificationBell');
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    const notificationsList = document.getElementById('notificationsList');
    const refreshNotifications = document.getElementById('refreshNotifications');
    
    // Only proceed if notification elements exist
    if (!notificationBell || !notificationsDropdown || !notificationsList) {
        return;
    }
    
    // Function to load notifications
    function loadNotifications() {
        // First clear any existing notifications
        while (notificationsList.firstChild) {
            notificationsList.removeChild(notificationsList.firstChild);
        }
        
        // Add loading spinner
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading-spinner';
        notificationsList.appendChild(loadingSpinner);
        
        // Simulate loading delay
        setTimeout(() => {
            // Remove loading spinner
            notificationsList.removeChild(loadingSpinner);
            
            // Notifications
            const notifications = [
                {
                    title: 'New IPA Symbol Proposed',
                    message: 'A new vowel symbol has been proposed for review.',
                    time: '2 hours ago'
                },
                {
                    title: 'New Symbol Proposed',
                    message: 'A new retroflex click has been submitted',
                    time: '2 hours ago'
                },
                {
                    title: 'Proposal Approved',
                    message: 'Your lateral fricative symbol proposal has been approved!',
                    time: '4 hours ago'
                },
                {
                    title: 'Community Update',
                    message: '15 new symbols have been added to the consonants section.',
                    time: '6 hours ago'
                },
                {
                    title: 'Your feedback received',
                    message: 'Thank you for your feedback on the bilabial click symbol.',
                    time: '1 day ago'
                },
                {
                    title: 'Proposal Under Review',
                    message: 'Your pharyngealized consonant proposal is being reviewed by admins.',
                    time: '1 day ago'
                },
                {
                    title: 'New Feature Available',
                    message: 'Audio samples are now available for most IPA symbols!',
                    time: '2 days ago'
                },
                {
                    title: 'Voting Results',
                    message: 'The uvular trill symbol proposal has reached 10 upvotes.',
                    time: '2 days ago'
                },
                {
                    title: 'Database Update',
                    message: 'The symbol database has been updated with new phonetic descriptions.',
                    time: '3 days ago'
                },
                {
                    title: 'Welcome!',
                    message: 'Welcome to the Additional IPA Symbols tool.',
                    time: '3 days ago'
                }
            ];
            
            if (notifications.length === 0) {
                const emptyNote = document.createElement('div');
                emptyNote.className = 'empty-notifications';
                emptyNote.textContent = 'No notifications at this time.';
                notificationsList.appendChild(emptyNote);
            } else {
                notifications.forEach(notification => {
                    const item = document.createElement('div');
                    item.className = 'notification-item';
                    
                    item.innerHTML = `
                        <div class="notification-content">
                            <div class="notification-title">${notification.title}</div>
                            <div class="notification-message">${notification.message}</div>
                            <div class="notification-time">${notification.time}</div>
                        </div>
                    `;
                    
                    notificationsList.appendChild(item);
                });
                
                // Update the badge count
                const badge = document.getElementById('notificationBadge');
                if (badge) {
                    badge.textContent = notifications.length;
                }
            }
        }, 800);
    }
    
    // Combined click handler that does both toggle AND load
    notificationBell.addEventListener('click', function() {
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
    
    // Refresh button functionality
    if (refreshNotifications) {
        refreshNotifications.addEventListener('click', loadNotifications);
    }
    
    // Add CSS for dropdown visibility
    const style = document.createElement('style');
    style.textContent = `
        .notifications-dropdown.show {
            display: block;
        }
    `;
    document.head.appendChild(style);
    
    // Initial load of notifications
    loadNotifications();
}
