# Separate CSS into external stylesheet and update HTML files
# Run with: python separate-styles.py

import os

# Create CSS directory
css_dir = 'css'
if not os.path.exists(css_dir):
    os.makedirs(css_dir)

# Create the CSS file
css_content = """body {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: 'Courier New', monospace;
}

.clock-container {
    text-align: center;
    color: #00ff88;
    padding: 40px;
    border: 2px solid #00ff88;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.2);
}

.time-labels {
    display: flex;
    font-size: 12px;
    font-weight: bold;
    color: #66ffaa;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.time-labels span {
    width: 80px;
    text-align: center;
}

.time-labels span:nth-child(2),
.time-labels span:nth-child(3) {
    margin-left: 45px;
}

.time-display {
    font-size: 64px;
    font-weight: bold;
    letter-spacing: 4px;
    color: #00ff88;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
    font-family: 'Courier New', monospace;
}

.separator {
    color: #44cc77;
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0.3; }
}"""

# Write the CSS file
css_filename = os.path.join(css_dir, 'styles.css')
with open(css_filename, 'w') as f:
    f.write(css_content)

print("✅ Created css/styles.css")

# Update all HTML files to use external CSS
clock_dir = 'numbers'
files_updated = 0

for seconds in range(1, 3601):
    filename = os.path.join(clock_dir, f"{seconds}.html")
    
    if os.path.exists(filename):
        # Calculate time display
        hours = seconds // 3600
        minutes = (seconds % 3600) // 60
        secs = seconds % 60
        time_display = f"{hours:02d}:{minutes:02d}:{secs:02d}"
        
        # Determine next file
        next_file = "1.html" if seconds == 3600 else f"{seconds + 1}.html"
        
        # Create new HTML content with external CSS
        html_content = f"""<!DOCTYPE html>
<html>
<head>
    <title>Clock - {time_display}</title>
    <meta http-equiv="refresh" content="1; url={next_file}" />
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <div class="clock-container">
        <div class="time-labels">
            <span>hours</span>
            <span>minutes</span>
            <span>seconds</span>
        </div>
        <div class="time-display">
            {time_display.replace(':', '<span class="separator">:</span>')}
        </div>
    </div>
</body>
</html>"""
        
        # Write updated file
        with open(filename, 'w') as f:
            f.write(html_content)
        
        files_updated += 1
        
        # Progress indicator
        if files_updated % 100 == 0:
            print(f"Updated {files_updated}/3600 files...")

print(f"✅ Updated all {files_updated} HTML files to use external CSS")
print("📁 CSS file saved as: css/styles.css")
print("🎨 All HTML files now reference ../css/styles.css")
