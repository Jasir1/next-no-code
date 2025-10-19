'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  Zap, Layout, Smartphone, Code, ArrowRight, Palette, 
  MousePointer, Sparkles, Globe, Rocket, PlayCircle, 
  Star, Award, Clock, Users, CheckCircle, Move, Plus, Minus, RotateCw 
} from 'lucide-react';
import BuilderInterface from '@/components/builder/BuilderInterface';

// Gradient text component
const GradientText = ({ children, className = '', from = 'from-blue-500', via = 'via-purple-500', to = 'to-pink-500' }) => (
  <span className={`bg-gradient-to-r ${from} ${via} ${to} bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

// Floating animation component
const Floating = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: delay,
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Animated background blobs
const AnimatedBlobs = () => (
  <div className="fixed inset-0 overflow-hidden -z-10">
    {[
      { color: 'from-pink-500/20 to-purple-500/20', size: 'w-96 h-96', delay: 0 },
      { color: 'from-blue-500/20 to-cyan-500/20', size: 'w-80 h-80', delay: 0.2 },
      { color: 'from-yellow-400/20 to-orange-500/20', size: 'w-64 h-64', delay: 0.4 },
      { color: 'from-emerald-400/20 to-teal-500/20', size: 'w-72 h-72', delay: 0.6 },
    ].map((blob, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full bg-gradient-to-br ${blob.color} ${blob.size} -z-10`}
        style={{
          top: `${10 + Math.random() * 80}%`,
          left: `${Math.random() * 100}%`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 0.5, 0.3],
          scale: [0.8, 1.1, 0.9],
          x: [0, Math.random() * 100 - 50],
          y: [0, Math.random() * 100 - 50],
        }}
        transition={{
          duration: 20 + Math.random() * 20,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: blob.delay,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({ 
        y: -10, 
        transition: { 
          duration: 2, 
          repeat: Infinity, 
          repeatType: 'reverse',
          ease: 'easeInOut'
        } 
      });
    };
    sequence();
  }, [controls]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      } 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <AnimatedBlobs />

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50 border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/img/layers.png" 
                alt="WebBuilder Logo" 
                className="w-full h-full object-contain"
              />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              WebBuilder
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {['Features', 'Templates', 'Pricing', 'Blog'].map((item, i) => (
              <motion.div
                key={item}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300 group"
                >
                  {item}
                  <span className="block h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              </motion.div>
            ))}
            <Link
              href="/dashboard"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-2 group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Get Started
              <motion.span
                animate={isHovered ? { x: 5 } : { x: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-40 pb-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent opacity-70"></div>
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="show"
            variants={container}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-100 mb-6 shadow-sm"
              variants={item}
            >
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                The most powerful website builder
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              variants={item}
            >
              Build <GradientText from="from-blue-500" to="to-purple-600">Stunning Websites</GradientText>
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
                Without Writing Code
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              variants={item}
            >
              Create professional, responsive websites with our intuitive drag-and-drop builder.
              <span className="block text-blue-500 font-medium mt-2">
                No technical skills required. Launch your dream site in minutes, not weeks.
              </span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center" 
              variants={item}
            >
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Floating delay={0.2}>
                  <span className="flex items-center gap-2">
                    Start Building Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Floating>
              </Link>
              <Link
                href="#how-it-works"
                className="px-8 py-4 bg-white text-gray-700 border border-gray-200 text-lg font-medium rounded-full hover:bg-gray-50 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Floating delay={0.3}>
                  <span className="flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-purple-500" />
                    Watch Demo
                  </span>
                </Floating>
              </Link>
            </motion.div>
            
            <motion.div 
              className="mt-16 relative"
              variants={item}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-20 blur-2xl"></div>
              <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-4">
                      <MousePointer className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700 font-medium">Drag & Drop Interface</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Build Your Dream Website</h3>
                    <p className="text-gray-500 mb-4">Start with a template or from scratch</p>
                    <div className="flex justify-center gap-3">
                      {['Header', 'Hero', 'Features', 'Testimonials', 'Pricing', 'Contact'].map((item) => (
                        <div key={item} className="px-3 py-1.5 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Drag, Drop, and Build with Ease
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Experience the most intuitive website builder with real-time preview
            </p>
          </motion.div>

          <BuilderInterface />

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Intuitive Interface",
                description: "Drag and drop components with ease using our visual editor.",
                icon: "🎨"
              },
              {
                title: "Real-time Preview",
                description: "See your changes instantly as you build your website.",
                icon: "⚡"
              },
              {
                title: "Fully Responsive",
                description: "Your website will look great on all devices automatically.",
                icon: "📱"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-100 mb-4">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose <GradientText from="from-blue-500" to="to-purple-600">WebBuilder</GradientText>?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to create a stunning website without the complexity</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Lightning Fast",
                description: "Build and publish websites in minutes with our optimized builder and global CDN.",
                color: "blue",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Smartphone className="w-6 h-6" />,
                title: "Fully Responsive",
                description: "Your websites automatically adapt to look perfect on all devices and screen sizes.",
                color: "purple",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <Code className="w-6 h-6" />,
                title: "Export Code",
                description: "Own your website with the ability to export clean, production-ready HTML/CSS/JS code.",
                color: "indigo",
                gradient: "from-indigo-500 to-blue-500"
              },
              {
                icon: <Palette className="w-6 h-6" />,
                title: "Beautiful Templates",
                description: "Start with professionally designed templates for any type of website or business.",
                color: "pink",
                gradient: "from-pink-500 to-rose-500"
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Global Hosting",
                description: "Blazing fast hosting with 99.9% uptime and automatic SSL certificates.",
                color: "emerald",
                gradient: "from-emerald-500 to-teal-500"
              },
              {
                icon: <Rocket className="w-6 h-6" />,
                title: "SEO Optimized",
                description: "Built-in SEO tools to help your website rank higher in search results.",
                color: "orange",
                gradient: "from-orange-500 to-amber-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {/* Gradient highlight on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}></div>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:via-white/20 transition-all duration-500 -z-20">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-gray-50 -z-30"></div>
                </div>
                
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg shadow-${feature.color}-500/20 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
                
                <div className="absolute bottom-6 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-gray-100 to-transparent group-hover:via-gray-200 transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 group"
            >
              <span>Start Building for Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: `${Math.random() * 400 + 200}px`,
                height: `${Math.random() * 400 + 200}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Start Building Today</span>
            </motion.div>

            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Ready to Build Your <GradientText from="from-yellow-300" to="to-amber-400" className="drop-shadow-lg">Dream Website</GradientText>?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Join thousands of creators and businesses who've built their online presence with WebBuilder
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href="/dashboard"
                className="group relative px-8 py-4 bg-gradient-to-r from-yellow-300 to-amber-400 text-gray-900 text-lg font-semibold rounded-full hover:shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              
              <Link
                href="#"
                className="group relative px-8 py-4 bg-transparent border-2 border-white/30 text-white text-lg font-medium rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Schedule a Demo
                </span>
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </motion.div>

            <motion.div 
              className="mt-10 flex flex-wrap items-center justify-center gap-6 text-blue-100/80 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>No credit card required</span>
              </div>
              <div className="w-px h-5 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-200" />
                <span>Get started in minutes</span>
              </div>
              <div className="w-px h-5 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-200" />
                <span>24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="/img/layers.png" 
                    alt="WebBuilder Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-white">WebBuilder</span>
              </div>
              <p className="text-gray-400">The most powerful website builder for the modern web.</p>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Templates", "Pricing", "Integrations", "Updates"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Press", "Contact"]
              },
              {
                title: "Resources",
                links: ["Documentation", "Tutorials", "Help Center", "Community", "Webinars"]
              }
            ].map((column, i) => (
              <div key={i}>
                <h4 className="text-white font-semibold mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} WebBuilder. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'GitHub'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}