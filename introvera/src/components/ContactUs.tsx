"use client";

import { useRef, useState, FormEvent } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const ContactUs = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string>("");

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -100px 0px",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("Sending...");

    const formData = new FormData(formRef.current);
    const data = {
      service_id: "service_6jybba9",
      template_id: "template_yaup53k",
      user_id: "2IuW0Sj0bTx8RGlan",
      template_params: {
        from_name: formData.get("name"),
        from_email: formData.get("email"),
        message: formData.get("message"),
      },
    };

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("✅ Message sent!");
        formRef.current.reset();
      } else {
        throw new Error("Failed to send message.");
      }
    } catch (err) {
      setStatus("❌ Failed to send. Please try again.");
    }
  };

  return (
    <div ref={ref} className="max-w-5xl mx-auto py-16 px-4" id="contact">
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-5xl text-center my-8 tracking-wide">
            Contact{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-800 text-transparent bg-clip-text">
              Us
            </span>
          </h2>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Contact Details */}
            <div className="flex-1 bg-white dark:bg-neutral-900 rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:teamintrovera@gmail.com" className="text-blue-600">
                  teamintrovera@gmail.com
                </a>
              </p>
              <p className="mb-2">
                <strong>Phone:</strong>{" "}
                <a href="tel:+946782225" className="text-blue-600">
                  +94 6782 225
                </a>
              </p>
              <p className="mb-2">
                <strong>Address:</strong> Kaduwela
              </p>
              <div className="mt-4 rounded-lg overflow-hidden">
                <iframe
                  title="Introvera Location"
                  src="https://www.google.com/maps?q=6.949028,79.991667&output=embed"
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="flex-1 bg-white dark:bg-neutral-900 rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="border rounded-md px-4 py-2 bg-neutral-100 dark:bg-neutral-800"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="border rounded-md px-4 py-2 bg-neutral-100 dark:bg-neutral-800"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="border rounded-md px-4 py-2 bg-neutral-100 dark:bg-neutral-800"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-blue-800 text-white py-3 px-6 rounded-md font-semibold"
                >
                  Send Message
                </button>
                {status && <p className="text-center mt-2">{status}</p>}
              </form>
            </div>
          </div>
        </motion.div>
      ) : (
        <div style={{ minHeight: "600px" }} />
      )}
    </div>
  );
};

export default ContactUs;
