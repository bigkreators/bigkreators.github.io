import os
import re
from bs4 import BeautifulSoup
import sys

def create_article_pages(html_file_path):
    try:
        # Read the HTML file
        with open(html_file_path, 'r', encoding='utf-8') as file:
            html_content = file.read()
        
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Create wiki directory for articles if it doesn't exist
        wiki_dir = os.path.join(os.path.dirname(html_file_path), 'wiki')
        os.makedirs(wiki_dir, exist_ok=True)
        
        # Find all links
        links = soup.select('a[href^="/wiki/"]')
        article_links = set()
        
        # Collect all unique article links
        for link in links:
            href = link.get('href')
            if href and href.startswith('/wiki/'):
                # Extract the article name from the wiki link
                article_name = href[6:]
                article_links.add(article_name)
                
                # Update the link to point to our local wiki folder
                link['href'] = f"wiki/{article_name}/index.html"
        
        print(f"Found {len(article_links)} unique article links.")
        
        # Create placeholder page for each article
        for article_name in article_links:
            # Create directory for each article
            article_dir = os.path.join(wiki_dir, article_name)
            os.makedirs(article_dir, exist_ok=True)
            
            # Clean the article title for display
            article_title = article_name.replace('_', ' ')
            article_title = re.sub(r'\b(\w)', lambda m: m.group(1).upper(), article_title)  # Capitalize first letter of each word
            article_title = article_title.replace('IPA', 'IPA')  # Fix capitalization for IPA
            
            # Create the HTML content for the article page
            article_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{article_title}</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }}
        .article {{
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 20px;
            margin-bottom: 20px;
        }}
        h1 {{
            color: #0645ad;
            border-bottom: 1px solid #a2a9b1;
            padding-bottom: 0.2em;
        }}
        h2 {{
            color: #0645ad;
            border-bottom: 1px solid #a2a9b1;
            padding-bottom: 0.2em;
            font-size: 1.5em;
        }}
        .infobox {{
            float: right;
            margin: 0 0 1em 1em;
            padding: 0.2em;
            border: 1px solid #a2a9b1;
            background-color: #f8f9fa;
            font-size: 88%;
            line-height: 1.5em;
            width: 22em;
        }}
        .infobox-header {{
            text-align: center;
            background-color: #e6e6e6;
            font-weight: bold;
            padding: 0.2em;
        }}
        .infobox-content {{
            padding: 0.4em 0.2em;
        }}
        .infobox-image {{
            text-align: center;
            padding: 0.4em;
        }}
        .hatnote {{
            padding: 0.1em 1.2em;
            margin-bottom: 0.5em;
            font-style: italic;
            color: #777;
        }}
        .back-link {{
            display: inline-block;
            margin-top: 20px;
            padding: 8px 15px;
            background-color: #0645ad;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }}
        .back-link:hover {{
            background-color: #0b0080;
        }}
        .footer {{
            margin-top: 2em;
            padding-top: 1em;
            border-top: 1px solid #ddd;
            color: #777;
            font-size: 0.9em;
        }}
    </style>
</head>
<body>
    <div class="hatnote">
        This is a placeholder article page for "{article_title}". In a complete implementation, this would contain detailed information about this phonetic concept.
    </div>
    
    <div class="article">
        <h1>{article_title}</h1>
        
        <div class="infobox">
            <div class="infobox-header">{article_title}</div>
            <div class="infobox-image">
                [Placeholder for diagram or illustration]
            </div>
            <div class="infobox-content">
                <p><strong>IPA Symbol:</strong> [Relevant symbol]</p>
                <p><strong>Place of articulation:</strong> [Description]</p>
                <p><strong>Manner of articulation:</strong> [Description]</p>
                <p><strong>Voice:</strong> [Voiced/Voiceless]</p>
                <p><strong>Used in languages:</strong> [Example languages]</p>
            </div>
        </div>
        
        <p>This article contains information about the phonetic concept "{article_title}" as used in the International Phonetic Alphabet (IPA).</p>
        
        <h2>Description</h2>
        <p>The {article_title} is characterized by [placeholder description]. It is produced by [description of how the sound is physically created].</p>
        
        <h2>Occurrence in Languages</h2>
        <p>This sound occurs in languages such as [examples of languages]. It can be found in words like [example words].</p>
        
        <h2>Features</h2>
        <p>Its distinguishing features include [placeholder features].</p>
        
        <a href="../../index.html" class="back-link">Back to IPA Chart</a>
    </div>
    
    <div class="footer">
        <p>This is a placeholder article generated for educational purposes as part of a local IPA consonant chart with audio.</p>
    </div>
</body>
</html>
            """
            
            # Write the article file
            article_file_path = os.path.join(article_dir, 'index.html')
            with open(article_file_path, 'w', encoding='utf-8') as file:
                file.write(article_content)
            print(f"Created placeholder page for: {article_name}")
        
        # Create a new HTML file with updated links
        updated_html_path = html_file_path.replace('.html', '_updated.html')
        with open(updated_html_path, 'w', encoding='utf-8') as file:
            file.write(str(soup))
        print(f"Updated HTML saved to: {updated_html_path}")
        
        return {'success': True, 'message': 'Successfully created article pages and updated HTML.'}
    except Exception as e:
        print(f"Error: {e}")
        return {'success': False, 'error': str(e)}

if __name__ == "__main__":
    # Get the HTML file path from the command line argument or use default
    html_file_path = sys.argv[1] if len(sys.argv) > 1 else "index.html"
    result = create_article_pages(html_file_path)
    
    if result['success']:
        print(f"Success: {result['message']}")
    else:
        print(f"Failed: {result['error']}")
