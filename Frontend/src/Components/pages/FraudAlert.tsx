const FraudAlert = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-16 px-4">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-10">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">
          Fraud Alert
        </h1>

        <p className="text-center text-blue-600 font-medium mb-8">
          Protecting You from Job Scams & Fake Recruiters
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          At <span className="font-semibold text-blue-800">Jobiffi.com (Job I Find)</span>,
          your safety is our top priority. We alert job seekers and employers
          about fraudulent activities carried out by individuals falsely
          claiming to represent Jobiffi or its partner companies.
        </p>

        {/* Warning Box */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-5 mb-10">
          <p className="text-red-600 font-semibold text-lg">
            ⚠️ Jobiffi does NOT charge job seekers any fees for job applications,
            interviews, or offers.
          </p>
        </div>

        <div className="space-y-10">

          {/* Section 1 */}
          <div className="bg-blue-50 rounded-xl p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">
              ❌ Jobiffi Will NEVER Ask For
            </h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Registration or placement fees</li>
              <li>Interview or training charges</li>
              <li>Bank account details, UPI IDs, or card information</li>
              <li>OTPs, passwords, or verification codes</li>
              <li>Payments via WhatsApp, Telegram, or personal email IDs</li>
            </ul>
            <p className="text-red-600 mt-4 font-medium">
              If you receive such requests, it is a scam.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-blue-50 rounded-xl p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">
              ⚠️ Common Job Scam Warning Signs
            </h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Guaranteed job offers without interviews</li>
              <li>Unrealistically high salaries for minimal experience</li>
              <li>Requests for urgent payments to secure a job</li>
              <li>Communication from unofficial email IDs or phone numbers</li>
              <li>Poorly written job offers or pressure tactics</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-blue-50 rounded-xl p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">
              🔐 How Jobiffi Protects You
            </h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Regular monitoring of job listings and employer activity</li>
              <li>Prompt action on reported suspicious posts</li>
              <li>Easy reporting tools for users</li>
              <li>Continuous security improvements</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Despite our best efforts, fraudsters may attempt to misuse online platforms.
              Staying alert is the best protection.
            </p>
          </div>

          {/* Section 4 */}
          <div className="bg-blue-50 rounded-xl p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">
              🧠 Safety Tips for Job Seekers
            </h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Apply only through the official Jobiffi platform</li>
              <li>Verify employer details before sharing personal information</li>
              <li>Never make payments for job offers</li>
              <li>Trust your instincts — report suspicious behavior</li>
            </ul>
          </div>

        </div>

        {/* Report Section */}
        <div className="mt-12 pt-8 border-t border-blue-200 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📩 Report Fraud or Suspicious Activity
          </h3>

          <p className="text-gray-700 mb-3">
            If you come across suspicious job listings or individuals claiming to represent Jobiffi:
          </p>

          <a
            href="mailto:support@jobiffi.com"
            className="text-blue-700 font-semibold hover:underline"
          >
            support@jobiffi.com
          </a>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-6 border-t border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📌 Important Disclaimer
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Jobiffi is not responsible for communications or transactions conducted
            outside its official platform. Users are advised to exercise caution and
            report any misuse of the Jobiffi name or services.
          </p>
        </div>

      </div>
    </div>
  );
};

export default FraudAlert;
