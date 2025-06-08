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
        
        // Search in infoboxes
        const infoboxes = document.querySelectorAll('.infobox');
        
        infoboxes.forEach(infobox => {
            const symbolElement = infobox.querySelector('.IPA');
            const titleElement = infobox.querySelector('.infobox-above');
            
            let matches = false;
            
            // Check symbol text
            if (symbolElement) {
                const symbolText = symbolElement.textContent;
                
                if (symbolText.toLowerCase().includes(searchTerm)) {
                    if (!symbolElement.hasAttribute('data-original-html')) {
                        symbolElement.setAttribute('data-original-html', symbolElement.innerHTML);
                    }
                    highlightTextInElement(symbolElement, searchTerm);
                    matches = true;
                    foundAny = true;
                }
            }
            
            // Check title/description
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
    
    // Reset all infobox elements
    document.querySelectorAll('.infobox').forEach(infobox => {
        infobox.style.boxShadow = '';
        
        // Reset IPA span
        const symbolElement = infobox.querySelector('.IPA');
        if (symbolElement) {
            const originalHTML = symbolElement.getAttribute('data-original-html');
            if (originalHTML) {
                symbolElement.innerHTML = originalHTML;
                symbolElement.removeAttribute('data-original-html');
            }
        }
        
        // Reset title element
        const titleElement = infobox.querySelector('.infobox-above');
        if (titleElement) {
            const originalHTML = titleElement.getAttribute('data-original-html');
            if (originalHTML) {
                titleElement.innerHTML = originalHTML;
                titleElement.removeAttribute('data-original-html');
            }
        }
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
        searchButton.addEventListener('click', performSearch);
        clearButton.addEventListener('click', clearSearch);
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});
