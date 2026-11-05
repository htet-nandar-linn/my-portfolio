import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Phone, Code2, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Section from "../Section";
import SectionHeading from "../SectionHeading";
import { contact, profile, socialLinks } from "../../data/portfolioData";

const iconMap = { mail: Mail, phone: Phone, github: Code2 };

/**
 * Contact
 * Includes direct contact cards & an EmailJS contact form.
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    // Replace these with your actual EmailJS credentials
    const SERVICE_ID = "service_default";
    const TEMPLATE_ID = "template_default";
    const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: profile.email,
        },
        PUBLIC_KEY
      );

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      // Fallback to mailto so it automatically opens their email app ready to send to your email
      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <Section id="contact" className="relative overflow-hidden">
      {/* Soft mint glow behind the contact section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-mint/10 blur-[120px]"
      />

      <div className="relative">
        <SectionHeading
          eyebrow="Contact"
          title={contact.heading}
          lead={contact.subheading}
        />

        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Contact Information & Social Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon] ?? Mail;
                const isExternal = link.href.startsWith("http");

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="card group flex items-center gap-4 p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint/10 text-mint transition-colors group-hover:bg-mint-gradient group-hover:text-charcoal">
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-muted-gray">
                        {link.name}
                      </span>
                      <span className="block truncate text-sm font-medium text-off-white group-hover:text-mint">
                        {link.value}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Location */}
            <address className="flex not-italic">
              <span className="panel inline-flex w-full items-center gap-3 px-4 py-3.5 text-sm text-muted-gray">
                <MapPin size={18} className="text-mint shrink-0" />
                {profile.location}
              </span>
            </address>
          </div>

          {/* EmailJS Contact Form */}
          <div className="card lg:col-span-7 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-wider text-muted-gray mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-xl bg-charcoal/50 border border-white/10 px-4 py-3 text-sm text-off-white placeholder:text-muted-gray/50 focus:border-mint focus:outline-none focus:ring-1 focus:ring-mint transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider text-muted-gray mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full rounded-xl bg-charcoal/50 border border-white/10 px-4 py-3 text-sm text-off-white placeholder:text-muted-gray/50 focus:border-mint focus:outline-none focus:ring-1 focus:ring-mint transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-muted-gray mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Junior Developer Opportunity"
                  className="w-full rounded-xl bg-charcoal/50 border border-white/10 px-4 py-3 text-sm text-off-white placeholder:text-muted-gray/50 focus:border-mint focus:outline-none focus:ring-1 focus:ring-mint transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-wider text-muted-gray mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Htet Nandar, I'd like to talk about..."
                  className="w-full rounded-xl bg-charcoal/50 border border-white/10 px-4 py-3 text-sm text-off-white placeholder:text-muted-gray/50 focus:border-mint focus:outline-none focus:ring-1 focus:ring-mint transition-colors resize-none"
                />
              </div>

              {status.success && (
                <div className="flex items-center gap-2 rounded-xl bg-mint/10 border border-mint/20 p-3 text-sm text-mint">
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span>Message sent successfully! Thank you for reaching out.</span>
                </div>
              )}

              {status.error && (
                <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{status.error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 font-medium disabled:opacity-50"
              >
                {status.loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
