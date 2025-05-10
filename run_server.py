#!/usr/bin/env python3
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
