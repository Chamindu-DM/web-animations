import React, { useState } from "react";
import { TextField } from "./TextField";
import { Button } from "./Button";
import { Send, CheckCircle } from "lucide-react";

export const ContactSection = () => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full bg-[#f4f4f0] py-20 px-4 border-t-2 border-black">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-luckiest text-4xl md:text-5xl text-black tracking-wide">
            Let's Start a Project
          </h2>
          <p className="font-inter text-gray-700 mt-2 font-medium">
            Fill out the form below to book a free intro call or send us a message.
          </p>
        </div>

        {/* Neo-brutalist Contact Card */}
        <div className="bg-white border-2 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-cyan-400 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-black" />
              </div>
              <h3 className="font-luckiest text-2xl text-black">Message Sent!</h3>
              <p className="font-inter text-gray-700 max-w-md">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <Button 
                variant="secondary" 
                onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", message: "" }); }}
                className="mt-4"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Full Name Field */}
              <TextField
                id="name"
                label="Full Name"
                placeholder="John Doe"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />

              {/* Email Address Field */}
              <TextField
                id="email"
                type="email"
                label="Email Address"
                placeholder="you@email.com"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              />

              {/* Message Field */}
              <TextField
                id="message"
                label="Message"
                placeholder="Tell us about your project..."
                multiline
                rows={4}
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              />

              {/* Submit Button */}
              <div className="pt-2 flex justify-end">
                <Button 
                  type="submit" 
                  variant="primary" 
                  icon={Send} 
                  className="w-full md:w-auto"
                >
                  Send Message
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
