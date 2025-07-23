import { useState } from "react";

export default function ContactSection() {
  const [emailCopied, setEmailCopied] = useState(false);

  const emailAddress = "edwchan7529@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-white pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-2xl font-light tracking-tight mb-12 text-center text-gray-800">
          Contact Me
        </h2>

        <div className="space-y-8">
          <div className="border-b border-gray-100 pb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Email</h3>
            <div className="flex items-center">
              <a
                href={`mailto:${emailAddress}`}
                className="text-gray-700 hover:text-black transition-colors mr-3 truncate"
              >
                {emailAddress}
              </a>
              <button
                onClick={handleCopyEmail}
                className="text-xs px-2 py-1 text-gray-400 hover:text-gray-700 transition-colors"
              >
                {emailCopied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Connect</h3>
            <div className="space-y-3">
              <a
                href="https://github.com/echan23"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-700 hover:text-black transition-colors"
              >
                GitHub
              </a>

              <a
                href="https://linkedin.com/in/edchan23"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-700 hover:text-black transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
