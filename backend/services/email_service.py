import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging
from pathlib import Path
from dotenv import load_dotenv

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):
        self._load_config()

    def _load_config(self):
        """Load SMTP config from backend .env and process environment."""
        env_path = Path(__file__).parent.parent / ".env"
        load_dotenv(env_path)

        self.smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.environ.get('SMTP_PORT', 587))
        self.smtp_user = os.environ.get('SMTP_USER', '').strip()
        self.smtp_password = os.environ.get('SMTP_PASSWORD', '').strip()
        self.recipient_email = os.environ.get('RECIPIENT_EMAIL', 'gunvanth752004@gmail.com').strip()

    def send_contact_email(self, name: str, email: str, subject: str, message: str) -> bool:
        """
        Send contact form submission via email
        """
        try:
            # Refresh config each call so runtime .env changes are applied.
            self._load_config()

            # Create message
            msg = MIMEMultipart('alternative')
            msg['From'] = self.smtp_user
            msg['To'] = self.recipient_email
            msg['Subject'] = f"Portfolio Contact: {subject}"

            # Create HTML content
            html_content = f"""
            <html>
                <head>
                    <style>
                        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
                        .content {{ background: #f8f9fa; padding: 20px; border: 1px solid #e0e0e0; }}
                        .field {{ margin-bottom: 15px; }}
                        .label {{ font-weight: bold; color: #f59e0b; }}
                        .value {{ margin-top: 5px; padding: 10px; background: white; border-left: 4px solid #f59e0b; }}
                        .footer {{ background: #0f172a; color: #94a3b8; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2 style="margin: 0;">New Contact Form Submission</h2>
                        </div>
                        <div class="content">
                            <div class="field">
                                <div class="label">From:</div>
                                <div class="value">{name}</div>
                            </div>
                            <div class="field">
                                <div class="label">Email:</div>
                                <div class="value">{email}</div>
                            </div>
                            <div class="field">
                                <div class="label">Subject:</div>
                                <div class="value">{subject}</div>
                            </div>
                            <div class="field">
                                <div class="label">Message:</div>
                                <div class="value" style="white-space: pre-wrap;">{message}</div>
                            </div>
                        </div>
                        <div class="footer">
                            <p>This email was sent from your portfolio contact form</p>
                        </div>
                    </div>
                </body>
            </html>
            """

            # Attach HTML content
            html_part = MIMEText(html_content, 'html')
            msg.attach(html_part)

            # Check if SMTP credentials are configured
            if not self.smtp_user or not self.smtp_password:
                logger.warning("SMTP credentials not configured. Email not sent.")
                return False

            # Send email
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)

            logger.info(f"Contact email sent successfully from {email}")
            return True

        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False


email_service = EmailService()
