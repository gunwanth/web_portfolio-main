#!/usr/bin/env python3
"""
Local test script for resume download endpoint
Run this after starting the backend server
"""

import requests
import sys

def test_resume_download():
    """Test the resume download endpoint locally"""
    
    base_url = "http://localhost:8000"
    
    print("=" * 60)
    print("Testing Resume Download Endpoint")
    print("=" * 60)
    
    # Test debug endpoint first
    print("\n1️⃣  Testing debug endpoint...")
    try:
        response = requests.get(f"{base_url}/api/resume/debug", timeout=5)
        print(f"Status: {response.status_code}")
        debug_info = response.json()
        print(f"Debug info:")
        for key, value in debug_info.items():
            print(f"  {key}: {value}")
    except Exception as e:
        print(f"❌ Debug endpoint failed: {e}")
        return False
    
    # Test download endpoint
    print("\n2️⃣  Testing download endpoint...")
    try:
        response = requests.get(f"{base_url}/api/resume/download", timeout=5)
        
        print(f"Status Code: {response.status_code}")
        print(f"Content-Type: {response.headers.get('content-type')}")
        print(f"Content-Disposition: {response.headers.get('content-disposition')}")
        print(f"Content-Length: {len(response.content)} bytes")
        
        # Verify PDF
        is_pdf = response.content[:4] == b'%PDF'
        print(f"Valid PDF: {'✅' if is_pdf else '❌'}")
        
        if response.status_code == 200 and 'application/pdf' in response.headers.get('content-type', ''):
            print("\n✅ Resume download is working correctly!")
            
            # Save a copy
            with open('Gunvanth_Madabattula_Resume.pdf', 'wb') as f:
                f.write(response.content)
            print("📄 Saved copy to: Gunvanth_Madabattula_Resume.pdf")
            return True
        else:
            print(f"\n❌ Download failed")
            print(f"Response preview: {response.text[:200]}")
            return False
            
    except Exception as e:
        print(f"❌ Download test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_resume_download()
    sys.exit(0 if success else 1)
