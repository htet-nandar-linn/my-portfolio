import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  MapPin,
  Phone,
  Code2,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Section from "../Section";
import SectionHeading from "../SectionHeading";
import { contact, profile, socialLinks } from "../../data/portfolioData";

const iconMap = { mail: Mail, phone: Phone, github: Code2 };

// Credentials come from the root .env file (never hard-coded in source).
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const IS_CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Field names must match the EmailJS template variables exactly.
const EMPTY_FORM = { from_name: "", from_email: "", subject: "", message: "" };

const validate = (values) => {
  const errors = {};

  if (values.from_name.trim().length < 2) {
    errors.from_name = "Please enter your name (at least 2 characters).";
  }
  if (!EMAIL_PATTERN.test(values.from_email.trim())) {
    errors.from_email = "Please enter a valid email address.";
  }
  if (values.subject.trim().length < 3) {
    errors.subject = "Please enter a subject (at least 3 characters).";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Please write a message (at least 10 characters).";
  }

  return errors;
};

/**
 * Contact
 * Real, working contact methods plus an EmailJS-powered contact form.
 * Includes inline success/error notifications (no browser alert() popups).
 */
const Contact = () => {
  const formRef = useRef(null);
  // Guards against double submits (e.g. rapid clicks or Enter key spam).
  const submittingRef = useRef(false);

  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  // Inline notification state
  const [notification, setNotification] = useState(null); // { type: "success" | "error", message: string }

  // Auto-hide success/error notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [notification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear a field error as soon as the visitor starts fixing it.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));

    // Hide stale success/error notifications once the form changes again.
    setNotification(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ loading: false, success: false, error: null });
      const firstInvalid = Object.keys(nextErrors)[0];
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (!IS_CONFIGURED) {
      setNotification({
        type: "error",
        message:
          "The contact form is not configured yet. Please email me directly at " + profile.email + ".",
      });
      setStatus({ loading: false, success: false, error: null });
      return;
    }

    submittingRef.current = true;
    setStatus({ loading: true, success: false, error: null });

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });

      // Submission successful: show inline notification, reset form
      setNotification({
        type: "success",
        message:
          "Message Sent Successfully! Thank you for reaching out.",
      });
      setValues(EMPTY_FORM);
      setErrors({});
      setStatus({ loading: false, success: true, error: null });
      formRef.current?.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      const detail = err?.text || err?.message;
      setNotification({
        type: "error",
        message:
          detail ||
          "Something went wrong. Please try again later. " +
          "You can also email me directly at " + profile.email + ".",
      });
      setStatus({ loading: false, success: false, error: null });
    } finally {
      submittingRef.current = false;
    }
  };

  // Helper to close a notification manually
  const closeNotification = () => {
    setNotification(null);
    if (hideTimeoutId) clearTimeout(hideTimeoutId);
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
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="from_name" className="block text-xs uppercase tracking-wider text-muted-gray mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    autoComplete="name"
                    required
                    value={values.from_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    aria-invalid={Boolean(errors.from_name)}
                    aria-describedby={errors.from_name ? "from_name-error" : undefined}
                    className={`w-full rounded-xl bg-charcoal/50 border px-4 py-3 text-sm text-off-white placeholder:text-muted-gray/50 focus:outline-none focus:ring-1 transition-colors ${
                      errors.from_name
                        ? "border-red-500/60 focus:border-red-400 focus:ring-red-400"
                        : "border-white/10 focus:border-mint focus:ring-mint"
                    }`}
                  />
                  {errors.from_name && (
                    <p id="from_name-error" className="mt-1.5 text-xs text-red-400">
                      {errors.from_name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="from_email" className="block text-xs uppercase tracking-wider text-muted-gray mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    autoComplete="email"
                    required
                    value={values.from_email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    aria-invalid={Boolean(errors.from_email)}
                    aria-describedby={errors.from_email ? "from_email-error" : undefined}
                    className={`w-full rounded-xl bg-charcoal/50 border px-4 py-3 text-sm text-off-white placeholder:text-muted-gray/50 focus:outline-none focus:ring-1 transition-colors ${
                      errors.from_email
                        ? "border-red-500/60 focus:border-red-400 focus:ring-red-400"
                        : "border-white/10 focus:border-mint focus:ring-mint"
                    }`}
                  />
                  {errors.from_email && (
                    <p id="from_email-error" className="mt-1.5 text-xs text-red-400">
                      {errors.from_email}
                    </p>
                  )}
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
                  value={values.subject}
                  onChange={handleChange}
                  placeholder="Junior Developer Opportunity"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className={`w-full rounded-xl bg-charcoal/50 border px-4 py-3 text-sm text-off-white placeholder:text-muted-gray/50 focus:outline-none focus:ring-1 transition-colors ${
                    errors.subject
                      ? "border-red-500/60 focus:border-red-400 focus:ring-red-400"
                      : "border-white/10 focus:border-mint focus:ring-mint"
                  }`}
                />
                {errors.subject && (
                  <p id="subject-error" className="mt-1.5 text-xs text-red-400">
                    {errors.subject}
                  </p>
                )}
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
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Hi Htet Nandar, I'd like to talk about..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`w-full rounded-xl bg-charcoal/50 border px-4 py-3 text-sm text-off-white placeholder:text-muted-gray/50 focus:outline-none focus:ring-1 transition-colors resize-none ${
                    errors.message
                      ? "border-red-500/60 focus:border-red-400 focus:ring-red-400"
                      : "border-white/10 focus:border-mint focus:ring-mint"
                  }`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Inline Success Notification */}
              {notification?.type === "success" && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-4 flex items-center gap-3 rounded-xl bg-charcoal/50 border border-green-500/20 p-4 text-sm font-medium text-green-400 transition-opacity ease-in-out duration-300"
                >
                  <CheckCircle2 size={20} className="shrink-0" />
                  <div>
                    <strong className="font-medium">Message Sent Successfully!</strong>
                    <span className="block text-muted-gray/80">Thank you for reaching out. I'll get back to you as soon as possible.</span>
                  </div>
                  <button
                    onClick={() => setNotification(null)}
                    className="ml-auto opacity-70 hover:text-charcoal transition-colors"
                    aria-label="Close notification"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Inline Error Notification */}
              {notification?.type === "error" && (
                <div
                  role="alert"
                  className="mt-4 flex items-center gap-3 rounded-xl bg-charcoal/50 border border-red-500/20 p-4 text-sm font-medium text-red-400 transition-opacity ease-in-out duration-300"
                >
                  <AlertCircle size={20} className="shrink-0" />
                  <div>
                    <strong className="font-medium">Message Failed!</strong>
                    <span className="block text-muted-gray/80">Something went wrong. Please try again later.</span>
                  </div>
                  <button
                    onClick={() => setNotification(null)}
                    className="ml-auto opacity-70 hover:text-charcoal transition-colors"
                    aria-label="Close notification"
                  >
                    ×
                  </button>
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