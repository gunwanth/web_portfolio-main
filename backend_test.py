#!/usr/bin/env python3
"""
Portfolio Backend API Testing Suite
Tests all backend endpoints for Gunvanth Madabattula's portfolio
"""

import requests
import json
import time
import os
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv('/app/backend/.env')

# Configuration
BASE_URL = "https://career-profile-317.preview.emergentagent.com"
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'test_database')

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.mongo_client = None
        self.db = None
        self.test_results = []
        
    def setup_mongo(self):
        """Setup MongoDB connection for verification"""
        try:
            self.mongo_client = MongoClient(MONGO_URL)
            self.db = self.mongo_client[DB_NAME]
            print(f"✅ Connected to MongoDB: {DB_NAME}")
            return True
        except Exception as e:
            print(f"❌ Failed to connect to MongoDB: {e}")
            return False
    
    def log_test(self, test_name, success, details):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        
        self.test_results.append({
            'test': test_name,
            'success': success,
            'details': details,
            'timestamp': datetime.now().isoformat()
        })
    
    def test_health_check(self):
        """Test GET /api/ - Health check endpoint"""
        print("\n🔍 Testing Health Check Endpoint...")
        try:
            response = requests.get(f"{self.base_url}/api/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                expected_message = "Portfolio API is running"
                
                if data.get("message") == expected_message:
                    self.log_test("Health Check", True, f"Response: {data}")
                    return True
                else:
                    self.log_test("Health Check", False, f"Unexpected message: {data}")
                    return False
            else:
                self.log_test("Health Check", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Health Check", False, f"Exception: {str(e)}")
            return False
    
    def test_resume_download(self):
        """Test GET /api/resume/download - Resume download endpoint"""
        print("\n🔍 Testing Resume Download Endpoint...")
        try:
            response = requests.get(f"{self.base_url}/api/resume/download", timeout=30)
            
            if response.status_code == 200:
                # Check content type
                content_type = response.headers.get('content-type', '')
                if 'application/pdf' not in content_type:
                    self.log_test("Resume Download - Content Type", False, f"Expected PDF, got: {content_type}")
                    return False
                
                # Check filename in Content-Disposition header
                content_disposition = response.headers.get('content-disposition', '')
                expected_filename = "Gunvanth_Madabattula_Resume.pdf"
                if expected_filename not in content_disposition:
                    self.log_test("Resume Download - Filename", False, f"Expected {expected_filename} in: {content_disposition}")
                    return False
                
                # Check file size (should be around 550KB)
                content_length = len(response.content)
                if content_length < 400000 or content_length > 700000:  # 400KB to 700KB range
                    self.log_test("Resume Download - File Size", False, f"File size {content_length} bytes not in expected range")
                    return False
                
                self.log_test("Resume Download", True, f"PDF downloaded successfully, size: {content_length} bytes")
                return True
            else:
                self.log_test("Resume Download", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Resume Download", False, f"Exception: {str(e)}")
            return False
    
    def test_contact_form_valid(self):
        """Test POST /api/contact with valid data"""
        print("\n🔍 Testing Contact Form - Valid Submission...")
        
        test_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "subject": "Portfolio Inquiry",
            "message": "Hello Gunvanth, I'm interested in discussing a potential collaboration opportunity. Your portfolio looks impressive!"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/contact",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") is True and "message" in data:
                    self.log_test("Contact Form - Valid Data", True, f"Response: {data}")
                    
                    # Verify data was stored in MongoDB
                    if self.verify_contact_submission(test_data):
                        return True
                    else:
                        return False
                else:
                    self.log_test("Contact Form - Valid Data", False, f"Unexpected response format: {data}")
                    return False
            else:
                self.log_test("Contact Form - Valid Data", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Contact Form - Valid Data", False, f"Exception: {str(e)}")
            return False
    
    def test_contact_form_invalid_email(self):
        """Test POST /api/contact with invalid email"""
        print("\n🔍 Testing Contact Form - Invalid Email...")
        
        test_data = {
            "name": "Test User",
            "email": "invalid-email",
            "subject": "Test",
            "message": "Test message"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/contact",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 422:
                self.log_test("Contact Form - Invalid Email", True, "Validation error returned as expected")
                return True
            else:
                self.log_test("Contact Form - Invalid Email", False, f"Expected 422, got {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Contact Form - Invalid Email", False, f"Exception: {str(e)}")
            return False
    
    def test_contact_form_rate_limiting(self):
        """Test POST /api/contact rate limiting"""
        print("\n🔍 Testing Contact Form - Rate Limiting...")
        
        test_data = {
            "name": "Rate Test User",
            "email": "ratetest@example.com",
            "subject": "Rate Limit Test",
            "message": "Testing rate limiting functionality"
        }
        
        try:
            # Send 6 requests quickly
            responses = []
            for i in range(6):
                response = requests.post(
                    f"{self.base_url}/api/contact",
                    json={**test_data, "subject": f"Rate Limit Test {i+1}"},
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                responses.append(response)
                time.sleep(0.1)  # Small delay between requests
            
            # Check if the 6th request was rate limited
            last_response = responses[-1]
            if last_response.status_code == 429:
                self.log_test("Contact Form - Rate Limiting", True, "Rate limiting working - 6th request blocked")
                return True
            else:
                # Check if any of the later requests were rate limited
                rate_limited = any(r.status_code == 429 for r in responses[4:])
                if rate_limited:
                    self.log_test("Contact Form - Rate Limiting", True, "Rate limiting working - later requests blocked")
                    return True
                else:
                    self.log_test("Contact Form - Rate Limiting", False, f"No rate limiting detected. Last response: {last_response.status_code}")
                    return False
                
        except Exception as e:
            self.log_test("Contact Form - Rate Limiting", False, f"Exception: {str(e)}")
            return False
    
    def verify_contact_submission(self, test_data):
        """Verify contact submission was stored in MongoDB"""
        print("\n🔍 Verifying MongoDB Storage...")
        
        if self.db is None:
            self.log_test("MongoDB Verification", False, "No database connection")
            return False
        
        try:
            # Find the submission in the database
            submission = self.db.contact_submissions.find_one({
                "email": test_data["email"],
                "subject": test_data["subject"]
            })
            
            if submission:
                # Check required fields
                required_fields = ["id", "name", "email", "subject", "message", "created_at", "read"]
                missing_fields = [field for field in required_fields if field not in submission]
                
                if missing_fields:
                    self.log_test("MongoDB Verification", False, f"Missing fields: {missing_fields}")
                    return False
                
                # Verify data matches
                if (submission["name"] == test_data["name"] and 
                    submission["email"] == test_data["email"] and
                    submission["subject"] == test_data["subject"] and
                    submission["message"] == test_data["message"]):
                    
                    self.log_test("MongoDB Verification", True, f"Contact submission stored correctly with ID: {submission['id']}")
                    return True
                else:
                    self.log_test("MongoDB Verification", False, "Data mismatch in stored submission")
                    return False
            else:
                self.log_test("MongoDB Verification", False, "Submission not found in database")
                return False
                
        except Exception as e:
            self.log_test("MongoDB Verification", False, f"Exception: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all tests"""
        print("🚀 Starting Portfolio Backend API Tests...")
        print(f"📍 Base URL: {self.base_url}")
        
        # Setup MongoDB connection
        mongo_connected = self.setup_mongo()
        
        # Run tests
        tests = [
            self.test_health_check,
            self.test_resume_download,
            self.test_contact_form_valid,
            self.test_contact_form_invalid_email,
            self.test_contact_form_rate_limiting
        ]
        
        passed = 0
        total = len(tests)
        
        for test in tests:
            if test():
                passed += 1
        
        # Print summary
        print(f"\n📊 Test Summary:")
        print(f"   Total Tests: {total}")
        print(f"   Passed: {passed}")
        print(f"   Failed: {total - passed}")
        print(f"   Success Rate: {(passed/total)*100:.1f}%")
        
        if not mongo_connected:
            print("\n⚠️  Note: MongoDB connection failed - database verification tests may be incomplete")
        
        # Close MongoDB connection
        if self.mongo_client:
            self.mongo_client.close()
        
        return passed == total

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed!")
        exit(0)
    else:
        print("\n💥 Some tests failed!")
        exit(1)