export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">About ExpoEase</h1>

      <p className="text-gray-700 mb-4">
        ExpoEase is a smart service management platform designed specially
        for exhibitions, expos, and large events.
      </p>

      <p className="text-gray-700 mb-4">
        We help exhibitors easily book service staff like service boys,
        reception girls, and other event support professionals without hassle.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        What we offer
      </h2>

      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Quick service staff booking</li>
        <li>Verified profiles</li>
        <li>Admin-managed confirmations</li>
        <li>Easy order & service tracking</li>
      </ul>

      <p className="text-gray-700 mt-6">
        Our goal is to make exhibitions smoother and stress-free for everyone.
      </p>
    </div>
  );
}
