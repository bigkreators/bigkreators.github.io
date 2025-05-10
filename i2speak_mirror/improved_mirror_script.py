#!/usr/bin/env python3
# Improved Website Mirror Script for i2speak.com/ipa-keyboards

import os
import re
import requests
from urllib.parse import urljoin, urlparse, urlunparse
from bs4 import BeautifulSoup
import shutil
import mimetypes

# Configuration
TARGET_URL = "https://www.i2speak.com/ipa-keyboards"
OUTPUT_DIR = "i2speak_mirror"
DOMAIN = urlparse(TARGET_URL).netloc

# Ensure output directory exists
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

# Track processed URLs to avoid duplicates
processed_urls = set()

def get_file_extension(url, content_type=None):
    """Determine file extension based on URL or content type"""
    parsed_url = urlparse(url)
    path = parsed_url.path
    
    # Try to get extension from URL
    ext = os.path.splitext(path)[1]
    if ext:
        return ext
    
    # Try to get extension from content type
    if content_type:
        ext = mimetypes.guess_extension(content_type)
        if ext:
            return ext
    
    # Default extensions based on common content types
    if content_type:
        if 'html' in content_type:
            return '.html'
        elif 'javascript' in content_type:
            return '.js'
        elif 'css' in content_type:
            return '.css'
    
    # Default to .html for URLs without extension
    if not ext and ('/' in path and '.' not in path.split('/')[-1]):
        return '.html'
        
    return ext or ''

def clean_url(url):
    """Clean URL by removing fragments and certain parameters"""
    parsed = urlparse(url)
    path = parsed.path
    
    # Remove trailing slash
    if path.endswith('/') and path != '/':
        path = path[:-1]
        
    return urlparse(url)._replace(fragment='', path=path).geturl()

def convert_url_to_local_path(url, base_url):
    """Convert a URL to a local file path"""
    parsed_url = urlparse(url)
    
    # Handle absolute URLs
    if parsed_url.netloc:
        # Skip external domains
        if parsed_url.netloc != DOMAIN:
            return None
        
        path = parsed_url.path
    # Handle relative URLs
    else:
        # Make sure it's an absolute path by joining with base URL
        abs_url = urljoin(base_url, url)
        parsed_abs = urlparse(abs_url)
        path = parsed_abs.path
    
    # Clean the path
    if not path or path == '/':
        path = '/index.html'
    
    # Get appropriate file extension
    if '.' not in os.path.basename(path):
        path = os.path.join(os.path.dirname(path), f"{os.path.basename(path)}.html")
    
    # Construct local path
    local_path = os.path.join(OUTPUT_DIR, parsed_url.netloc, path.lstrip('/'))
    
    # Create the directory if it doesn't exist
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    
    return local_path

def get_local_url(url, base_url):
    """Convert an absolute URL to a local relative URL for linking"""
    if not url or url.startswith('#'):
        return url
        
    parsed_url = urlparse(url)
    
    # Handle mailto, tel, etc.
    if parsed_url.scheme in ['mailto', 'tel', 'javascript']:
        return url
    
    # Make URL absolute if it's relative
    if not parsed_url.netloc:
        abs_url = urljoin(base_url, url)
        parsed_url = urlparse(abs_url)
    
    # Only handle URLs from our domain
    if parsed_url.netloc != DOMAIN:
        return url  # Return original URL for external links
    
    # Get the path component
    path = parsed_url.path
    if not path:
        path = "/"
    
    # Strip leading slashes for relative paths
    path = path.lstrip('/')
    
    # Add appropriate extension if needed
    if '.' not in os.path.basename(path) and not path.endswith('/'):
        path = path + ".html"
    elif path.endswith('/'):
        path = path + "index.html"
    
    # Preserve query string
    if parsed_url.query:
        path = path + '?' + parsed_url.query
    
    # Preserve fragment
    if parsed_url.fragment:
        path = path + '#' + parsed_url.fragment
    
    return path

def fix_relative_links(soup, base_url, local_file_path):
    """Fix relative links in the HTML to point to local files"""
    
    # Process <a> tags
    for a_tag in soup.find_all('a', href=True):
        href = a_tag['href']
        if href.startswith('#'):
            continue  # Skip fragment-only links
            
        local_href = get_local_url(href, base_url)
        a_tag['href'] = local_href
    
    # Process <img> tags
    for img_tag in soup.find_all('img', src=True):
        src = img_tag['src']
        local_src = get_local_url(src, base_url)
        img_tag['src'] = local_src
    
    # Process <link> tags
    for link_tag in soup.find_all('link', href=True):
        href = link_tag['href']
        local_href = get_local_url(href, base_url)
        link_tag['href'] = local_href
    
    # Process <script> tags
    for script_tag in soup.find_all('script', src=True):
        src = script_tag['src']
        local_src = get_local_url(src, base_url)
        script_tag['src'] = local_src
    
    # Fix forms
    for form in soup.find_all('form', action=True):
        action = form['action']
        local_action = get_local_url(action, base_url)
        form['action'] = local_action
    
    # Fix base href if present
    base_tag = soup.find('base', href=True)
    if base_tag:
        base_tag.extract()  # Remove base tag as it can interfere with local paths
    
    return soup

def download_asset(url, base_url):
    """Download an asset (CSS, JS, image, etc.)"""
    # Skip already processed URLs
    clean_asset_url = clean_url(url)
    if clean_asset_url in processed_urls:
        return
    
    processed_urls.add(clean_asset_url)
    
    try:
        # Make absolute URL if needed
        if not urlparse(url).netloc:
            url = urljoin(base_url, url)
        
        # Skip external domains
        if urlparse(url).netloc != DOMAIN:
            return
        
        print(f"Downloading asset: {url}")
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        content_type = response.headers.get('Content-Type', '').split(';')[0]
        extension = get_file_extension(url, content_type)
        
        # Get local path for the asset
        local_path = convert_url_to_local_path(url, base_url)
        if not local_path:
            return
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        
        # Save the asset
        with open(local_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
                
        print(f"Saved asset to: {local_path}")
        
        # If this is a CSS file, process it to fix relative URLs
        if local_path.endswith('.css'):
            process_css_file(local_path, url)
            
    except Exception as e:
        print(f"Error downloading asset {url}: {e}")

def process_css_file(css_path, base_url):
    """Process CSS file to fix relative URLs"""
    try:
        with open(css_path, 'r', encoding='utf-8', errors='ignore') as f:
            css_content = f.read()
        
        # Find and replace URLs in the CSS
        def replace_url(match):
            url = match.group(1)
            # Skip data URLs
            if url.startswith('data:'):
                return f'url({url})'
            
            # Make the URL absolute
            abs_url = urljoin(base_url, url)
            
            # Download the referenced asset
            download_asset(abs_url, base_url)
            
            # Convert to a local path
            local_url = get_local_url(abs_url, base_url)
            return f'url({local_url})'
        
        # Replace urls in CSS
        css_content = re.sub(r'url\s*\(\s*[\'"]?([^\'")]+)[\'"]?\s*\)', replace_url, css_content)
        
        # Save the modified CSS
        with open(css_path, 'w', encoding='utf-8') as f:
            f.write(css_content)
            
    except Exception as e:
        print(f"Error processing CSS file {css_path}: {e}")

def download_page(url, parent_url=None):
    """Download and process a web page"""
    # Skip already processed URLs
    clean_page_url = clean_url(url)
    if clean_page_url in processed_urls:
        return
    
    processed_urls.add(clean_page_url)
    
    try:
        print(f"Downloading page: {url}")
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        # Parse HTML content
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Get local path for the page
        local_path = convert_url_to_local_path(url, url)
        if not local_path:
            return
        
        # Fix relative links
        soup = fix_relative_links(soup, url, local_path)
        
        # Save the modified HTML
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        with open(local_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
            
        print(f"Saved page to: {local_path}")
        
        # Download CSS files
        for link in soup.find_all('link', rel='stylesheet'):
            if 'href' in link.attrs:
                download_asset(link['href'], url)
        
        # Download JavaScript files
        for script in soup.find_all('script', src=True):
            download_asset(script['src'], url)
        
        # Download images
        for img in soup.find_all('img', src=True):
            download_asset(img['src'], url)
        
        # Follow internal links
        for a_tag in soup.find_all('a', href=True):
            href = a_tag['href']
            
            # Skip fragment-only links, mailto links, etc.
            if href.startswith('#') or href.startswith('mailto:') or href.startswith('tel:'):
                continue
                
            # Make absolute URL if needed
            if not urlparse(href).netloc:
                href = urljoin(url, href)
            
            # Only follow links to the same domain
            if urlparse(href).netloc == DOMAIN:
                download_page(href, url)
                
    except Exception as e:
        print(f"Error processing page {url}: {e}")

def main():
    print(f"Starting mirror of {TARGET_URL} to {OUTPUT_DIR}")
    
    # Start the mirroring process
    download_page(TARGET_URL)
    
    print(f"Mirroring complete. Website mirrored to {OUTPUT_DIR}")
    
    # Create a simple server script
    server_script = '''#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 8000
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DIRECTORY = os.path.join(SCRIPT_DIR, "i2speak_mirror", "www.i2speak.com")

# If the directory doesn't exist, try to find it
if not os.path.exists(DIRECTORY):
    if os.path.exists(os.path.join(SCRIPT_DIR, "i2speak_mirror")):
        # Look for any subdirectories in i2speak_mirror
        potential_dirs = [d for d in os.listdir(os.path.join(SCRIPT_DIR, "i2speak_mirror")) 
                         if os.path.isdir(os.path.join(SCRIPT_DIR, "i2speak_mirror", d))]
        if potential_dirs:
            DIRECTORY = os.path.join(SCRIPT_DIR, "i2speak_mirror", potential_dirs[0])
        else:
            # Just serve from i2speak_mirror directly
            DIRECTORY = os.path.join(SCRIPT_DIR, "i2speak_mirror")
    else:
        # Just use the current directory as a fallback
        DIRECTORY = SCRIPT_DIR

print(f"Serving from directory: {DIRECTORY}")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    print(f"Press Ctrl+C to stop the server")
    httpd.serve_forever()
'''
    
    # Write the server script
    with open('run_server.py', 'w') as f:
        f.write(server_script)
    
    print(f"Created server script. Run 'python run_server.py' to serve the mirrored website.")

if __name__ == "__main__":
    main()
