import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../Context/UseAuth';
import hero from '../../Hero/hero.png';

const LandingPage = () => {
  const { isLoggedIn } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Access comprehensive financial data and analytics in real-time without any delays.',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      icon: '🔍',
      title: 'Smart Search',
      description: 'Find relevant financial documents and statements with our intelligent search engine.',
      gradient: 'from-green-400 to-green-600',
    },
    {
      icon: '📈',
      title: 'Portfolio Management',
      description: 'Manage and track your investment portfolio with detailed insights and analytics.',
      gradient: 'from-purple-400 to-purple-600',
    },
    {
      icon: '💬',
      title: 'Community Insights',
      description: 'Share and read insightful comments from other investors and analysts.',
      gradient: 'from-pink-400 to-pink-600',
    },
    {
      icon: '🎯',
      title: 'No Bias, No Hype',
      description: 'Pure financial data without fear-mongering, fake news, or sensationalism.',
      gradient: 'from-yellow-400 to-yellow-600',
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your financial data is secure with enterprise-grade encryption and privacy controls.',
      gradient: 'from-red-400 to-red-600',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Sign up in seconds and get instant access to all financial tools.',
    },
    {
      number: '02',
      title: 'Search Companies',
      description: 'Explore detailed financial profiles of thousands of companies.',
    },
    {
      number: '03',
      title: 'Analyze Data',
      description: 'Review financial statements, ratios, and key metrics instantly.',
    },
    {
      number: '04',
      title: 'Build Portfolio',
      description: 'Create and manage your investment portfolio with ease.',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Companies' },
    { number: '1M+', label: 'Data Points' },
    { number: '5K+', label: 'Active Users' },
    { number: '99.9%', label: 'Uptime' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center gradient-primary overflow-hidden pt-20">
        {/* Animated background elements */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-lightGreen opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="container-responsive relative z-10 grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-fade-in-left">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Financial Data with{' '}
              <span className="text-gradient">No Bias</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Access comprehensive financial statements, real-time analytics, and community insights without fear-mongering or fake news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to={isLoggedIn() ? '/search' : '/register'}
                className="btn-primary text-lg text-center"
              >
                {isLoggedIn() ? 'Start Analyzing' : 'Get Started Free'}
              </Link>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary text-lg"
              >
                Learn More ↓
              </button>
            </div>
            <div className="flex gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                  <p className="text-3xl font-bold text-accent">{stat.number}</p>
                  <p className="text-gray-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="animate-fade-in-right hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-lightGreen opacity-25 blur-3xl rounded-2xl"></div>
              <img src={hero} alt="Financial Dashboard" className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful <span className="text-gradient">Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to make informed investment decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card hover:scale-105 group"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-3xl mb-4 group-hover:shadow-glow transition-all`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in just 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="stagger">
                <div className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-lightGreen to-transparent"></div>
                  )}
                  <div className="bg-white rounded-2xl p-8 shadow-lg relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-success flex items-center justify-center text-2xl font-bold text-white mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 gradient-primary">
        <div className="container-responsive">
          <div className="grid md:grid-cols-4 gap-8 text-center stagger">
            {[
              { icon: '📊', number: '10,000+', label: 'Companies', sublabel: 'Indexed & Searchable' },
              { icon: '⚡', number: '1M+', label: 'Data Points', sublabel: 'Updated Daily' },
              { icon: '👥', number: '5,000+', label: 'Active Users', sublabel: 'Growing Community' },
              { icon: '🔒', number: '99.9%', label: 'Uptime', sublabel: 'Enterprise Grade' },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-xl mb-1">{stat.label}</p>
                <p className="text-gray-200 text-sm">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container-responsive text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start <span className="text-gradient">Investing Wisely?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who are making better decisions with our financial intelligence platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to={isLoggedIn() ? '/search' : '/register'}
              className="btn-primary text-lg"
            >
              {isLoggedIn() ? 'Go to Dashboard' : 'Create Free Account'}
            </Link>
            <Link
              to="/login"
              className="btn-secondary text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container-responsive">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Finskark</h4>
              <p className="text-sm">Financial data with no bias, no hype, just pure facts.</p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Product</h5>
              <ul className="text-sm space-y-2">
                <li><a href="#features" className="hover:text-accent">Features</a></li>
                <li><a href="#" className="hover:text-accent">Pricing</a></li>
                <li><a href="#" className="hover:text-accent">API</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Company</h5>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-accent">About</a></li>
                <li><a href="#" className="hover:text-accent">Blog</a></li>
                <li><a href="#" className="hover:text-accent">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Legal</h5>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-accent">Privacy</a></li>
                <li><a href="#" className="hover:text-accent">Terms</a></li>
                <li><a href="#" className="hover:text-accent">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2026 Finskark. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
