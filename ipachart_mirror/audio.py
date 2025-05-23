#!/usr/bin/env python3
"""
Script to download implosive consonant audio samples from Wikimedia Commons.
Excludes bilabial implosives and voiceless implosives.
"""

import requests
import os
import re
from urllib.parse import unquote
import time

def get_wikimedia_file_url(filename):
    """Get the direct download URL for a Wikimedia Commons file."""
    # Remove 'File:' prefix if present
    if filename.startswith('File:'):
        filename = filename[5:]
    
    # API endpoint to get file info
    api_url = "https://commons.wikimedia.org/w/api.php"
    params = {
        'action': 'query',
        'format': 'json',
        'titles': f'File:{filename}',
        'prop': 'imageinfo',
        'iiprop': 'url'
    }
    
    # Set a proper User-Agent header as required by Wikimedia
    headers = {
        'User-Agent': 'ImplosiveDownloader/1.0 (https://example.com/contact; educational-use@example.com)'
    }
    
    try:
        print(f"  Making API request for: File:{filename}")
        response = requests.get(api_url, params=params, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        pages = data['query']['pages']
        
        for page_id, page_data in pages.items():
            if page_id == '-1':
                print(f"  File not found: {filename}")
                return None
            if 'imageinfo' in page_data:
                url = page_data['imageinfo'][0]['url']
                print(f"  Found URL: {url}")
                return url
            else:
                print(f"  No imageinfo for {filename}")
                
    except Exception as e:
        print(f"  Error getting URL for {filename}: {e}")
    
    return None

def download_file(url, filename, output_dir):
    """Download a file from URL to the specified directory."""
    if not url:
        print(f"No URL available for {filename}")
        return False
    
    # Set a proper User-Agent header as required by Wikimedia
    headers = {
        'User-Agent': 'ImplosiveDownloader/1.0 (https://example.com/contact; educational-use@example.com)'
    }
    
    try:
        response = requests.get(url, stream=True, headers=headers)
        response.raise_for_status()
        
        filepath = os.path.join(output_dir, filename)
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"Downloaded: {filename}")
        return True
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
        return False

def main():
    # Create output directory
    output_dir = "implosive_sounds"
    os.makedirs(output_dir, exist_ok=True)
    
    # Implosive consonant files from Wikimedia Commons
    # Excluding bilabial (ɓ) and voiceless implosives
    # Using actual filenames found on Commons (with underscores)
    implosive_files = [
        # Voiced alveolar implosive [ɗ]
        "Voiced_alveolar_implosive.ogg",
        
        # Voiced retroflex implosive [ᶑ]
        "Voiced_retroflex_implosive.ogg",
        
        # Voiced palatal implosive [ʄ]
        "Voiced_palatal_implosive.ogg",
        
        # Voiced velar implosive [ɠ]
        "Voiced_velar_implosive.ogg",
        
        # Voiced uvular implosive [ʛ]
        "Voiced_uvular_implosive.ogg"
    ]
    
    print(f"Starting download of {len(implosive_files)} implosive sound files...")
    print(f"Output directory: {os.path.abspath(output_dir)}")
    print("-" * 50)
    
    successful_downloads = 0
    
    for filename in implosive_files:
        print(f"Processing: {filename}")
        
        # Get the direct download URL
        download_url = get_wikimedia_file_url(filename)
        
        if download_url:
            # Download the file
            if download_file(download_url, filename, output_dir):
                successful_downloads += 1
        else:
            print(f"File not found: {filename}")
        
        # Small delay to be respectful to the server
        time.sleep(0.5)
        print()
    
    print("-" * 50)
    print(f"Download complete!")
    print(f"Successfully downloaded: {successful_downloads}/{len(implosive_files)} files")
    print(f"Files saved to: {os.path.abspath(output_dir)}")

if __name__ == "__main__":
    main()
