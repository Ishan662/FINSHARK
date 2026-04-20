import React from 'react'
import hero from './hero.png'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="flex flex-col space-y-6 lg:space-y-8 animate-fadeIn">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/50 rounded-full text-sm font-semibold text-purple-200 backdrop-blur-sm">
                  Financial Intelligence Platform
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-white mb-2">Financial Data</span>
                <span className="block text-pink-400 drop-shadow-lg font-bold">
                  with No Bias
                </span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-lg">
              Search relevant financial documents and analyze stocks without the fear-mongering and fake news. Get pure, unbiased financial insights.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/search"
                className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                Get Started
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <button className="px-8 py-4 border-2 border-purple-400/50 text-purple-300 font-bold rounded-lg hover:bg-purple-500/10 transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-purple-500/20">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-purple-300">10K+</p>
                <p className="text-sm text-gray-400">Stocks Indexed</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-blue-300">1M+</p>
                <p className="text-sm text-gray-400">Filings Analyzed</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-cyan-300">99%</p>
                <p className="text-sm text-gray-400">Data Accuracy</p>
              </div>
            </div>
          </div>

          {/* Right side - Hero image */}
          <div className="relative hidden lg:block animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl rounded-3xl"></div>
            <div className="relative bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
              <img src={hero} alt="Financial Dashboard" className="w-full h-auto rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

export default Hero
