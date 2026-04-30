import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }[] = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.1})`,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}

export default function HomePage() {
  const features = [
    {
      icon: "📊",
      title: "Advanced Analytics",
      desc: "Real-time dashboards with customizable metrics, cohort analysis, and predictive insights.",
    },
    {
      icon: "👥",
      title: "Team Collaboration",
      desc: "Built-in chat, comments, and file sharing. Work together seamlessly across departments.",
    },
    {
      icon: "⚡",
      title: "Workflow Automation",
      desc: "Create custom workflows with triggers, conditions, and actions. Save hours every week.",
    },
    {
      icon: "🔒",
      title: "Enterprise Security",
      desc: "SOC 2 compliant, SSO integration, role-based access, and end-to-end encryption.",
    },
    {
      icon: "📱",
      title: "Mobile First",
      desc: "Native iOS and Android apps. Manage your business from anywhere, anytime.",
    },
    {
      icon: "🔌",
      title: "100+ Integrations",
      desc: "Connect with Slack, Salesforce, HubSpot, Stripe, and many more tools you already use.",
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/mo",
      features: ["5 Team Members", "10GB Storage", "Basic Analytics", "Email Support"],
      popular: false,
    },
    {
      name: "Pro",
      price: "$79",
      period: "/mo",
      features: ["Unlimited Team", "100GB Storage", "Advanced Analytics", "Priority Support", "API Access"],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["Unlimited Everything", "Dedicated Manager", "Custom Integrations", "24/7 Phone Support", "SLA Guarantee"],
      popular: false,
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "50M+", label: "API Requests/Day" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "150+", label: "Countries" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-x-hidden">
      <ParticleCanvas />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 backdrop-blur-sm bg-gray-900/80 border-b border-gray-800">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          SaaS Pro
        </div>
        <div className="flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-white transition">
            Features
          </a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition">
            Pricing
          </a>
          <a href="#about" className="text-gray-300 hover:text-white transition">
            About
          </a>
          <Link to="/login" className="text-gray-300 hover:text-white transition">
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 font-medium"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-32 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            v3.0 Now Available
          </div>
          <h1 className="text-6xl font-bold leading-tight">
            The all-in-one platform for{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              modern teams
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
            Streamline your workflow with powerful automation, real-time
            collaboration, and actionable insights. Join 10,000+ companies
            shipping faster.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/login"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:opacity-90 font-medium text-lg"
            >
              Start Free Trial
            </Link>
            <button className="px-8 py-4 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 font-medium text-lg">
              Watch Demo
            </button>
          </div>
          <p className="mt-4 text-gray-500 text-sm">
            No credit card required • 14-day free trial
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 px-8 border-y border-gray-800 bg-gray-900/50">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="mt-2 text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Everything you need</h2>
            <p className="mt-4 text-gray-400 text-lg">
              Powerful features to help you scale your business
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 transition group"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-24 px-8 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">How it works</h2>
            <p className="mt-4 text-gray-400 text-lg">
              Get started in minutes, not days
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {[
              { step: "01", title: "Sign Up", desc: "Create your account in seconds" },
              { step: "02", title: "Connect", desc: "Integrate your existing tools" },
              { step: "03", title: "Scale", desc: "Watch your productivity soar" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-6xl font-bold text-gray-700">{item.step}</div>
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Simple, transparent pricing</h2>
            <p className="mt-4 text-gray-400 text-lg">
              Choose the plan that fits your needs
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-8 rounded-2xl border ${
                  plan.popular
                    ? "bg-gradient-to-b from-blue-600/20 to-purple-600/20 border-blue-500/50"
                    : "bg-gray-800/50 border-gray-700"
                }`}
              >
                {plan.popular && (
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`mt-8 block w-full py-3 rounded-lg text-center font-medium transition ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
                      : "border border-gray-600 hover:bg-gray-800"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-24 px-8 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Loved by teams everywhere</h2>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {[
              {
                quote: "SaaS Pro transformed how our team collaborates. We've cut meeting time by 50% and shipped 3x faster.",
                author: "Sarah Chen",
                role: "CTO at TechFlow",
              },
              {
                quote: "The analytics alone are worth the price. We now make data-driven decisions in minutes instead of days.",
                author: "Marcus Johnson",
                role: "Product Lead at ScaleUp",
              },
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700">
                <p className="text-lg text-gray-300">"{t.quote}"</p>
                <div className="mt-6">
                  <div className="font-semibold">{t.author}</div>
                  <div className="text-gray-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold">
            Ready to transform your workflow?
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Join 10,000+ teams already using SaaS Pro
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:opacity-90 font-medium text-lg"
            >
              Start Free Trial
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 font-medium text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              SaaS Pro
            </div>
            <div className="flex gap-8 text-gray-500 text-sm">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © 2026 SaaS Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}