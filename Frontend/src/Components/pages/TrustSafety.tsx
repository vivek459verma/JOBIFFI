const TrustSafety = () => {
  return (
    <div className="bg-blue-50 min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* HERO SECTION */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            🔐 Trust & Safety at Jobiffi
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Your Trust Matters to Us. We are committed to creating a secure,
            transparent, and reliable platform where job seekers and employers
            can connect with confidence.
          </p>
        </div>

        {/* HOW WE KEEP SAFE */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            🛡️ How We Keep Jobiffi Safe
          </h2>

          <div className="space-y-6 text-gray-700">

            <div>
              <h3 className="font-semibold text-lg text-blue-700">
                ✔ Verified Employers & Job Listings
              </h3>
              <p>
                We follow structured review processes to reduce fake or
                misleading job postings. Employers are encouraged to provide
                accurate information.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-blue-700">
                ✔ Fraud & Scam Prevention
              </h3>
              <p>
                We monitor suspicious activity and remove violating content.
                We never ask for:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Registration or application fees</li>
                <li>Bank details or OTPs</li>
                <li>Personal financial information</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-blue-700">
                ✔ Data Privacy & Security
              </h3>
              <p>
                Your data belongs to you. We safeguard personal information and
                do not sell or misuse user data.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-blue-700">
                ✔ Transparent Hiring Practices
              </h3>
              <p>
                We promote ethical, inclusive hiring without discrimination or
                hidden conditions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-blue-700">
                ✔ User Reporting & Support
              </h3>
              <p>
                Report suspicious activity directly from the platform.
                Our team reviews reports seriously and takes action.
              </p>
            </div>

          </div>
        </div>

        {/* SAFETY TIPS */}
        <div className="bg-blue-100 border border-blue-300 rounded-xl p-8 mb-10">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">
            🔍 Safety Tips for Job Seekers
          </h2>

          <ul className="list-disc ml-6 space-y-2 text-gray-800">
            <li>Apply only through trusted communication channels</li>
            <li>Be cautious of unrealistic salary offers</li>
            <li>Never share OTPs, passwords, or payment details</li>
            <li>Verify company details before attending interviews</li>
          </ul>
        </div>

        {/* COMMITMENT */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            🤝 Our Commitment
          </h2>
          <p className="text-gray-700">
            We continuously improve our systems, policies, and moderation tools
            to ensure Jobiffi remains a safe and trustworthy job platform.
            Your trust drives our responsibility.
          </p>
        </div>

        {/* CTA SECTION */}
        <div className="text-center bg-blue-900 text-white rounded-xl p-10">
          <h2 className="text-2xl font-semibold mb-6">
            📩 Need Help or Want to Report an Issue?
          </h2>

          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href="/report-job"
              className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              🔵 Report a Job
            </a>

            <a
              href="mailto:support@jobiffi.com"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              ⚪ Contact Support
            </a>
          </div>

          <p className="text-sm mt-6 opacity-80">
            Our support team reviews every report carefully and responds as quickly as possible.
          </p>
        </div>

      </div>
    </div>
  );
};

export default TrustSafety;
