#!/usr/bin/env python3
"""
Script to download audio files of ejective fricatives from Wikimedia Commons.
Downloads dental, alveolar, retroflex, velar, and uvular ejective fricatives.
"""

import requests
import os
from urllib.parse import urlparse
import time

# Dictionary mapping ejective fricatives to their actual Wikimedia Commons filenames
EJECTIVE_FRICATIVES = {
    'dental': {
        'symbol': 'θʼ',
        'filename': 'Dental ejective fricative.ogg',
        'description': 'Voiceless dental ejective fricative [θʼ]'
    },
    'alveolar': {
        'symbol': 'sʼ',
        'filename': 'Alveolar ejective fricative.ogg',
        'description': 'Voiceless alveolar ejective fricative [sʼ]'
    },
    'alveolo_palatal': {
        'symbol': 'ɕʼ',
        'filename': 'Alveolo-palatal ejective fricative.ogg',
        'description': 'Voiceless alveolo-palatal ejective fricative [ɕʼ]'
    },
    'palato_alveolar': {
        'symbol': 'ʃʼ',
        'filename': 'Palato-alveolar ejective fricative.ogg',
        'description': 'Voiceless palato-alveolar ejective fricative [ʃʼ]'
    },
    'retroflex': {
        'symbol': 'ʂʼ',
        'filename': 'Retroflex ejective fricative.ogg',
        'description': 'Voiceless retroflex ejective fricative [ʂʼ]'
    },

    'velar': {
        'symbol': 'xʼ',
        'filename': 'Velar ejective fricative.ogg',
        'description': 'Voiceless velar ejective fricative [xʼ]'
    },
    'uvular': {
        'symbol': 'χʼ',
        'filename': 'Uvular ejective fricative.ogg',
        'description': 'Voiceless uvular ejective fricative [χʼ]'
    },
    'labiodental': {
        'symbol': 'fʼ',
        'filename': 'Labiodental ejective fricative.ogg',
        'description': 'Voiceless labiodental ejective fricative [fʼ]'
    }
}

def get_wikimedia_file_url(filename):
    """
    Get the direct download URL for a Wikimedia Commons file.
    Uses the Wikimedia API to resolve the actual file URL.
    """
    api_url = "https://commons.wikimedia.org/w/api.php"
    params = {
        'action': 'query',
        'format': 'json',
        'titles': f'File:{filename}',
        'prop': 'imageinfo',
        'iiprop': 'url'
    }
    
    # Add proper User-Agent header as required by Wikimedia policy
    headers = {
        'User-Agent': 'EjectiveFricativesDownloader/1.0 (https://github.com/example/ejective-downloader; contact@example.com) Python/requests'
    }
    
    try:
        response = requests.get(api_url, params=params, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        pages = data.get('query', {}).get('pages', {})
        for page_id, page_data in pages.items():
            if 'imageinfo' in page_data:
                return page_data['imageinfo'][0]['url']
        
        return None
    except Exception as e:
        print(f"Error getting URL for {filename}: {e}")
        return None

def download_file(url, local_filename):
    """Download a file from URL to local filesystem."""
    # Add proper User-Agent header as required by Wikimedia policy
    headers = {
        'User-Agent': 'EjectiveFricativesDownloader/1.0 (https://github.com/example/ejective-downloader; contact@example.com) Python/requests'
    }
    
    try:
        response = requests.get(url, stream=True, headers=headers)
        response.raise_for_status()
        
        with open(local_filename, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return True
    except Exception as e:
        print(f"Error downloading {local_filename}: {e}")
        return False

def main():
    """Main function to download all ejective fricative audio files."""
    # Create output directory
    output_dir = "ejective_fricatives_audio"
    os.makedirs(output_dir, exist_ok=True)
    
    print("Downloading ejective fricative audio files from Wikimedia Commons...")
    print(f"Files will be saved to: {output_dir}/")
    print("-" * 60)
    
    successful_downloads = 0
    total_files = len(EJECTIVE_FRICATIVES)
    
    for place, info in EJECTIVE_FRICATIVES.items():
        print(f"Processing {info['description']}...")
        
        # Get the direct download URL
        file_url = get_wikimedia_file_url(info['filename'])
        
        if not file_url:
            print(f"  ❌ Could not find URL for {info['filename']}")
            print(f"     Trying alternative filename patterns...")
            
            # Try alternative filename patterns
            alt_filenames = [
                info['filename'].replace('_', '-'),
                info['filename'].replace(' ejective fricative', ' ejective'),
                info['filename'].replace('Voiceless ', ''),
                f"{place.title()} ejective.ogg",
                f"Ejective {place} fricative.ogg"
            ]
            
            for alt_filename in alt_filenames:
                file_url = get_wikimedia_file_url(alt_filename)
                if file_url:
                    print(f"  ✓ Found alternative: {alt_filename}")
                    info['filename'] = alt_filename  # Update for saving
                    break
        
        if file_url:
            # Use original filename
            local_filename = os.path.join(output_dir, info['filename'])
            
            print(f"  📥 Downloading: {file_url}")
            
            if download_file(file_url, local_filename):
                print(f"  ✅ Saved as: {local_filename}")
                successful_downloads += 1
            else:
                print(f"  ❌ Failed to download")
        else:
            print(f"  ❌ File not found on Wikimedia Commons")
        
        print()
        time.sleep(1)  # Be respectful to the server
    
    print("-" * 60)
    print(f"Download complete: {successful_downloads}/{total_files} files downloaded successfully")
    
    if successful_downloads < total_files:
        print("\nNote: Some files may not be available on Wikimedia Commons.")
        print("You can manually search for them at: https://commons.wikimedia.org/")
        print("Look for IPA-related categories or phonetics sound files.")
        print("Available categories include:")
        print("- https://commons.wikimedia.org/wiki/Category:Ejective_consonants")
        print("- https://commons.wikimedia.org/wiki/Category:Fricatives")

if __name__ == "__main__":
    main()
