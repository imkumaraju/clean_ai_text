// Sample texts for demonstration
const sampleTexts = {
    chatgpt: `I have solid experience in distributed systems design and agile modeling for backend systems, focusing on normalized, scalable, and maintainable systems—defining clear entity relationships, primary and foreign keys, indexing strategies, and constraints to align closely with business workflows and API access patterns.

In addition, I have worked at large-scale data processing and pipeline-oriented models, where I design schemas to fit for batch processing and analytics tools, ensuring the data model remains robust as systems scale.`,

    llm: `## Data Processing Pipeline

I've worked with **large-scale** data processing systems… Here's what I learned:

* Design for scalability
* Optimize for performance  
* Monitor everything

The key is maintaining—flexibility while ensuring robust error handling.`,

    complex: `### Project Overview

I've worked on "cutting-edge" AI systems—using advanced techniques like:
* Machine learning algorithms  
* Deep neural networks
* Natural language processing…

The results were *impressive*: 95% accuracy, reduced latency by 40%, and improved user satisfaction significantly.

In addition… we implemented real-time monitoring & alerting systems.`
};

// DOM Elements
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const cleanBtn = document.getElementById('cleanBtn');
const copyBtn = document.getElementById('copyBtn');
const resetBtn = document.getElementById('resetBtn');
const sampleBtn = document.getElementById('sampleBtn');
const sampleModal = document.getElementById('sampleModal');
const closeModal = document.getElementById('closeModal');
const sampleOptions = document.querySelectorAll('.sample-option');
const statsContent = document.getElementById('statsContent');

// Cleaning options
const options = {
    hidden: document.getElementById('opt-hidden'),
    nbsp: document.getElementById('opt-nbsp'),
    dashes: document.getElementById('opt-dashes'),
    quotes: document.getElementById('opt-quotes'),
    ellipsis: document.getElementById('opt-ellipsis'),
    whitespace: document.getElementById('opt-whitespace'),
    asterisks: document.getElementById('opt-asterisks'),
    markdown: document.getElementById('opt-markdown')
};

// Statistics tracker
let stats = {};

// Cleaning functions
function removeHiddenCharacters(text) {
    let count = 0;
    // Remove zero-width characters, soft hyphens, and other invisible Unicode
    const cleaned = text.replace(/[\u200B-\u200D\u00AD\uFEFF]/g, () => {
        count++;
        return '';
    });
    return { text: cleaned, count };
}

function convertNonBreakingSpaces(text) {
    let count = 0;
    const cleaned = text.replace(/\u00A0/g, () => {
        count++;
        return ' ';
    });
    return { text: cleaned, count };
}

function normalizeDashes(text) {
    let count = 0;
    // Convert em-dash (—) and en-dash (–) to regular hyphen
    const cleaned = text.replace(/[—–]/g, () => {
        count++;
        return '-';
    });
    return { text: cleaned, count };
}

function normalizeQuotes(text) {
    let count = 0;
    // Convert smart quotes to straight quotes
    const cleaned = text
        .replace(/[""]/g, () => {
            count++;
            return '"';
        })
        .replace(/['']/g, () => {
            count++;
            return "'";
        });
    return { text: cleaned, count };
}

function convertEllipsis(text) {
    let count = 0;
    // Convert ellipsis character to three periods
    const cleaned = text.replace(/…/g, () => {
        count++;
        return '...';
    });
    return { text: cleaned, count };
}

function removeTrailingWhitespace(text) {
    let count = 0;
    // Remove trailing whitespace from each line
    const cleaned = text.split('\n').map(line => {
        const trimmed = line.trimEnd();
        if (trimmed !== line) count++;
        return trimmed;
    }).join('\n');
    return { text: cleaned, count };
}

function removeAsterisks(text) {
    let count = 0;
    // Remove asterisks used for markdown bold/italic
    const cleaned = text.replace(/\*/g, () => {
        count++;
        return '';
    });
    return { text: cleaned, count };
}

function removeMarkdownHeadings(text) {
    let count = 0;
    // Remove markdown heading markers (# ## ### etc.)
    const cleaned = text.replace(/^#{1,6}\s+/gm, () => {
        count++;
        return '';
    });
    return { text: cleaned, count };
}

// Main cleaning function
function cleanText() {
    let text = inputText.value;

    if (!text.trim()) {
        showNotification('Please enter some text to clean', 'warning');
        return;
    }

    stats = {};

    // Apply selected cleaning options
    if (options.hidden.checked) {
        const result = removeHiddenCharacters(text);
        text = result.text;
        if (result.count > 0) stats['Hidden characters removed'] = result.count;
    }

    if (options.nbsp.checked) {
        const result = convertNonBreakingSpaces(text);
        text = result.text;
        if (result.count > 0) stats['Non-breaking spaces converted'] = result.count;
    }

    if (options.dashes.checked) {
        const result = normalizeDashes(text);
        text = result.text;
        if (result.count > 0) stats['Dashes normalized'] = result.count;
    }

    if (options.quotes.checked) {
        const result = normalizeQuotes(text);
        text = result.text;
        if (result.count > 0) stats['Quotes normalized'] = result.count;
    }

    if (options.ellipsis.checked) {
        const result = convertEllipsis(text);
        text = result.text;
        if (result.count > 0) stats['Ellipsis converted'] = result.count;
    }

    if (options.whitespace.checked) {
        const result = removeTrailingWhitespace(text);
        text = result.text;
        if (result.count > 0) stats['Lines with trailing whitespace'] = result.count;
    }

    if (options.asterisks.checked) {
        const result = removeAsterisks(text);
        text = result.text;
        if (result.count > 0) stats['Asterisks removed'] = result.count;
    }

    if (options.markdown.checked) {
        const result = removeMarkdownHeadings(text);
        text = result.text;
        if (result.count > 0) stats['Markdown headings removed'] = result.count;
    }

    outputText.value = text;
    updateStats();

    // Success animation
    outputText.classList.add('success-animation');
    setTimeout(() => outputText.classList.remove('success-animation'), 300);

    showNotification('Text cleaned successfully!', 'success');
}

// Update statistics display
function updateStats() {
    const statKeys = Object.keys(stats);

    if (statKeys.length === 0) {
        statsContent.innerHTML = '<p class="stats-empty">No changes detected</p>';
        return;
    }

    const statsList = document.createElement('ul');
    statsList.className = 'stats-list';

    statKeys.forEach(key => {
        const li = document.createElement('li');
        li.className = 'stats-item';
        li.innerHTML = `
            <span class="stats-label">${key}:</span>
            <span class="stats-value">${stats[key]}</span>
        `;
        statsList.appendChild(li);
    });

    statsContent.innerHTML = '';
    statsContent.appendChild(statsList);
}

// Copy to clipboard
async function copyToClipboard() {
    const text = outputText.value;

    if (!text.trim()) {
        showNotification('No text to copy', 'warning');
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        showNotification('Copied to clipboard!', 'success');

        // Button animation
        copyBtn.classList.add('success-animation');
        setTimeout(() => copyBtn.classList.remove('success-animation'), 300);
    } catch (err) {
        showNotification('Failed to copy text', 'error');
    }
}

// Reset all
function resetAll() {
    inputText.value = '';
    outputText.value = '';
    stats = {};
    updateStats();

    // Reset all checkboxes to checked
    Object.values(options).forEach(checkbox => {
        checkbox.checked = true;
    });

    showNotification('Reset complete', 'success');
}

// Show notification (simple implementation)
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#ef4444'};
        color: white;
        border-radius: 8px;
        font-weight: 600;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Modal functions
function openModal() {
    sampleModal.classList.add('active');
}

function closeModalFunc() {
    sampleModal.classList.remove('active');
}

function loadSample(sampleKey) {
    inputText.value = sampleTexts[sampleKey];
    closeModalFunc();
    showNotification('Sample text loaded!', 'success');
}

// Event listeners
cleanBtn.addEventListener('click', cleanText);
copyBtn.addEventListener('click', copyToClipboard);
resetBtn.addEventListener('click', resetAll);
sampleBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFunc);

sampleOptions.forEach(option => {
    option.addEventListener('click', () => {
        const sampleKey = option.dataset.sample;
        loadSample(sampleKey);
    });
});

// Close modal on outside click
sampleModal.addEventListener('click', (e) => {
    if (e.target === sampleModal) {
        closeModalFunc();
    }
});

// Keyboard shortcut: Ctrl/Cmd + Enter to clean
inputText.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        cleanText();
    }
});

// Initialize
updateStats();
