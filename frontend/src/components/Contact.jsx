import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { Copy, Check } from "lucide-react";
import { personalInfo } from "../data/mock";
import { toast } from "../hooks/use-toast";
import axios from "axios";

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "").trim();
const API = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";

const Contact = ({ onDownloadResume }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (label, value) => {
    navigator.clipboard.writeText(value);
    setCopiedField(label);
    toast({
      title: `${label} Copied`,
      description: `${value} copied to clipboard`
    });
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitUrl = `${API}/contact`;
      const response = await axios.post(submitUrl, formData);

      if (response.data.success) {
        const emailSent = response.data.email_sent !== false;
        toast({
          title: emailSent ? "Message Sent!" : "Message Saved",
          description: response.data.message,
          variant: emailSent ? "default" : "destructive"
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);

      let errorMessage =
        "Failed to send message. Please try again or email directly.";
      if (error.response?.status === 429) {
        errorMessage = "Too many requests. Please try again in an hour.";
      }

      toast({
        title: "Submission Notice",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="folio-wrap contact-section">
      <ScrollReveal as="h2">Contact</ScrollReveal>
      <div className="contact-layout">
        <ScrollReveal as="address">
          {[[ "Email", personalInfo.email, "mailto:" ], [ "Phone", personalInfo.phone, "tel:" ]].map(([label, value, prefix]) =>
            <div key={label}><a href={prefix + value}>{value}</a>
              <button aria-label={`Copy ${label.toLowerCase()}`} onClick={() => handleCopy(label, value)}>
                {copiedField === label ? <Check size={14} /> : <Copy size={14} />}
              </button></div>
          )}
          <p>{personalInfo.location}</p>
          <div className="contact-social">
            <a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <button className="folio-link" onClick={onDownloadResume}>Résumé ↓</button>
          </div>
        </ScrollReveal>
        <ScrollReveal as="details"><summary>Send a message</summary>
          <form onSubmit={handleSubmit}>
            {["name", "email", "subject"].map(field => <input key={field} name={field}
              aria-label={field} placeholder={field[0].toUpperCase() + field.slice(1)}
              type={field === "email" ? "email" : "text"} required value={formData[field]} onChange={handleChange} />)}
            <textarea aria-label="Message" placeholder="Message" rows={4} name="message" required value={formData.message} onChange={handleChange} />
            <button className="folio-button" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send message"}</button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;
