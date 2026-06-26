import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 text-gray-800">
      {/* HERO */}
      <section className="text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4"
        >
          FocusSprint
        </motion.h1>

        <p className="text-lg text-gray-600 mb-8">
          The smartest way to stay focused, beat distractions, and build deep
          work habits.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-purple-700">
            Get Started Free
          </button>
          <button className="bg-white px-6 py-3 rounded-xl shadow">
            See Demo
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Why FocusSprint?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Adaptive focus timer",
            "Distraction tracking",
            "Daily goals & streaks",
            "Analytics dashboard",
            "Smart productivity insights",
            "Ambient focus sounds",
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              {feature}
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-white text-center px-6">
        <h2 className="text-3xl font-semibold mb-10">How it works</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="font-semibold mb-2">1. Start a session</h3>
            <p className="text-gray-600">Set your focus timer instantly</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">2. Stay distraction-free</h3>
            <p className="text-gray-600">
              We track interruptions automatically
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">3. Improve daily</h3>
            <p className="text-gray-600">Get insights & build streaks</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10">Simple pricing</h2>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <div className="bg-white p-8 rounded-2xl shadow w-72">
            <h3 className="text-xl font-semibold mb-2">Free</h3>
            <p className="text-3xl font-bold mb-4">$0</p>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>Basic timer</li>
              <li>Distraction tracking</li>
              <li>Daily stats</li>
            </ul>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
              Start Free
            </button>
          </div>

          <div className="bg-purple-600 text-white p-8 rounded-2xl shadow w-72">
            <h3 className="text-xl font-semibold mb-2">Pro</h3>
            <p className="text-3xl font-bold mb-4">$5/mo</p>
            <ul className="mb-6 space-y-2">
              <li>Advanced analytics</li>
              <li>Weekly reports</li>
              <li>Focus insights</li>
              <li>Premium sounds</li>
            </ul>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg">
              Upgrade
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to take control of your focus?
        </h2>
        <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold">
          Start Your First Sprint
        </button>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © 2026 FocusSprint. All rights reserved.
      </footer>
    </div>
  );
}
