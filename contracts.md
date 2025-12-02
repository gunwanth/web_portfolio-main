# Portfolio Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan for Gunvanth's portfolio website.

## Current Mock Data (in /app/frontend/src/data/mock.js)
- Personal information (name, contact, social links)
- Experience/Internships data
- Projects data
- Skills data
- Certifications data
- Education data

## Backend Implementation Plan

### 1. Resume File Management

**Endpoint:** `GET /api/resume/download`
- **Purpose:** Serve the resume PDF file for download
- **Response:** PDF file stream
- **Storage:** Store resume in `/app/backend/static/resume/` directory
- **Frontend Integration:** Update resume download handler in `Header.jsx`

**Implementation:**
- Create static file serving endpoint
- Add resume PDF to backend static folder
- Update frontend download button to use backend URL

---

### 2. Contact Form Submission

**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Database Schema - MongoDB Collection: `contact_submissions`:**
```python
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string",
  "created_at": "datetime",
  "read": "boolean"
}
```

**Email Integration:**
- Use nodemailer or Python SMTP to send emails to gunvanth752004@gmail.com
- Email should contain: sender name, email, subject, and message
- Store submission in database as backup

**Frontend Integration:**
- Update `Contact.jsx` handleSubmit function
- Replace mock toast with actual API call
- Add error handling and success feedback

---

### 3. Portfolio Data API (Optional - for future CMS)

**Endpoint:** `GET /api/portfolio/data`

**Response:**
```json
{
  "personalInfo": {...},
  "experiences": [...],
  "projects": [...],
  "skills": {...},
  "certifications": [...],
  "education": [...]
}
```

**Purpose:** Allow future updates to portfolio content without code changes
**Note:** This is optional for MVP. Can keep data in mock.js for now.

---

## Backend File Structure

```
/app/backend/
├── server.py (main FastAPI server)
├── models/
│   └── contact.py (Contact form model)
├── routes/
│   ├── resume.py (Resume download endpoint)
│   └── contact.py (Contact form endpoint)
├── services/
│   └── email_service.py (Email sending logic)
├── static/
│   └── resume/
│       └── gunvanth_resume.pdf
└── utils/
    └── helpers.py
```

---

## Frontend Changes Required

### 1. Header.jsx
```javascript
// Change from:
const handleDownloadResume = () => {
  alert('Resume download will be implemented with backend!');
};

// To:
const handleDownloadResume = async () => {
  try {
    const response = await fetch(`${API}/resume/download`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Gunvanth_Madabattula_Resume.pdf';
    a.click();
  } catch (error) {
    console.error('Error downloading resume:', error);
  }
};
```

### 2. Contact.jsx
```javascript
// Change from mock to:
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const response = await axios.post(`${API}/contact`, formData);
    if (response.data.success) {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to send message. Please try again.",
      variant: "destructive"
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Environment Variables Needed

### Backend (.env)
```
MONGO_URL=<already configured>
DB_NAME=<already configured>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<gmail address>
SMTP_PASSWORD=<app password>
RECIPIENT_EMAIL=gunvanth752004@gmail.com
```

**Note:** 
- SMTP credentials are optional. If not configured, contact submissions will still be stored in MongoDB
- Will need Gmail App Password for SMTP (not regular password) if you want email notifications

---

## Testing Checklist

### Backend
- [ ] Resume download endpoint returns PDF correctly
- [ ] Contact form validates input data
- [ ] Email is sent successfully
- [ ] Contact submission is stored in MongoDB
- [ ] Error handling works for invalid requests

### Frontend
- [ ] Resume downloads with correct filename
- [ ] Contact form shows loading state while submitting
- [ ] Success toast appears after successful submission
- [ ] Error toast appears if submission fails
- [ ] Form clears after successful submission
- [ ] All form fields are validated

---

## Security Considerations
- Add rate limiting on contact form endpoint (max 5 submissions per hour per IP)
- Validate and sanitize all user inputs
- Use CORS properly configured for frontend domain
- Store email credentials securely in environment variables
- Add CAPTCHA if spam becomes an issue (future enhancement)

---

## Next Steps
1. Create backend endpoints for resume download and contact form
2. Set up email service (SMTP configuration)
3. Test resume download functionality
4. Test contact form submission and email delivery
5. Update frontend to use real API endpoints
6. Run full integration testing
