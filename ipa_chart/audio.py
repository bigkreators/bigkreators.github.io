#!/usr/bin/env python3
"""
Download IPA audio files from Wikimedia Commons
"""

import requests
import os
from urllib.parse import urlparse
import time

def download_file(url, filename, audio_dir="audio"):
    """Download a file from URL to local directory"""
    # Create audio directory if it doesn't exist
    os.makedirs(audio_dir, exist_ok=True)
    
    filepath = os.path.join(audio_dir, filename)
    
    # Skip if file already exists
    if os.path.exists(filepath):
        print(f"File already exists: {filename}")
        return True
    
    # Wikimedia requires a proper User-Agent
    headers = {
        'User-Agent': 'IPA-Chart-Downloader/1.0 (https://example.com/contact; your-email@example.com)'
    }
    
    try:
        print(f"Downloading: {filename}")
        response = requests.get(url, stream=True, headers=headers)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"✓ Downloaded: {filename}")
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"✗ Failed to download {filename}: {e}")
        return False

def get_wikimedia_direct_url(commons_url):
    """
    Get the actual download URL from Wikimedia Commons using their API
    """
    # Extract filename from URL
    filename = commons_url.split('File:')[-1]
    filename = filename.replace('%20', '_')
    
    # Use Wikimedia API to get the actual file URL
    api_url = "https://commons.wikimedia.org/w/api.php"
    params = {
        'action': 'query',
        'format': 'json',
        'titles': f'File:{filename}',
        'prop': 'imageinfo',
        'iiprop': 'url'
    }
    
    headers = {
        'User-Agent': 'IPA-Chart-Downloader/1.0 (https://example.com/contact; your-email@example.com)'
    }
    
    try:
        response = requests.get(api_url, params=params, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        pages = data['query']['pages']
        for page_id, page_data in pages.items():
            if 'imageinfo' in page_data:
                return page_data['imageinfo'][0]['url']
        
        print(f"Could not find download URL for: {filename}")
        return None
        
    except Exception as e:
        print(f"API error for {filename}: {e}")
        return None

def main():
    # Define the files to download
    files_to_download = [
        {
            "commons_url": "https://en.wikipedia.org/wiki/File:Voiceless_labiodental_plosive.ogg",
            "filename": "Voiceless_labiodental_plosive.ogg"
        },
        {
            "commons_url": "https://en.wikipedia.org/wiki/File:Voiced_labiodental_plosive.wav", 
            "filename": "Voiced_labiodental_plosive.wav"
        },
        {
            "commons_url": "https://en.wikipedia.org/wiki/File:Voiceless_retroflex_tap.wav",
            "filename": "Voiceless_retroflex_tap.wav"
        }
    ]
    
    print("Starting download of IPA audio files...")
    print("-" * 50)
    
    success_count = 0
    total_count = len(files_to_download)
    
    for file_info in files_to_download:
        # Get direct download URL
        direct_url = get_wikimedia_direct_url(file_info["commons_url"])
        
        if direct_url:
            # Download with rate limiting
            if download_file(direct_url, file_info["filename"]):
                success_count += 1
        else:
            print(f"✗ Could not get download URL for: {file_info['filename']}")
        
        # Be nice to Wikimedia servers
        time.sleep(1)
    
    print("-" * 50)
    print(f"Download complete: {success_count}/{total_count} files downloaded successfully")
    
    if success_count < total_count:
        print("\nNote: Some files may have failed due to:")
        print("- Incorrect URL paths (Wikimedia uses hash-based directories)")
        print("- Files may need to be downloaded manually from Commons")
        print("- Try visiting the Commons page and getting the direct download link")

if __name__ == "__main__":
    main()
