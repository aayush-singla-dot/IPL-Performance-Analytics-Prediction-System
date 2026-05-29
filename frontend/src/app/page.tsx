"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BarChart3, BrainCircuit, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[200px] left-[-100px] w-[300px] h-[300px] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
            Next-Gen Sports Analytics
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">IPL Performance</span>
            <br /> Analytics & Match Prediction
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Harness the power of machine learning to predict match outcomes, analyze player form, and visualize venue dynamics with unprecedented accuracy.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center transition-all">
                Explore Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <Link href="/predict">
              <button className="px-8 py-4 glass text-slate-200 hover:text-white rounded-lg font-semibold flex items-center transition-all hover:bg-slate-800/50">
                Predict Match
                <Zap className="ml-2 h-5 w-5 text-yellow-400" />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Enterprise-Grade AI Capabilities</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Explore our suite of advanced machine learning tools designed for precision sports forecasting.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<BrainCircuit className="h-8 w-8 text-purple-400" />}
            title="AI Match Prediction"
            description="Our ensemble models (Random Forest & XGBoost) process historical data to predict match winners with high confidence."
          />
          <FeatureCard 
            icon={<BarChart3 className="h-8 w-8 text-blue-400" />}
            title="Deep Analytics Dashboard"
            description="Interactive visualizations for team comparisons, venue impacts, and player strike rates."
          />
          <FeatureCard 
            icon={<ShieldCheck className="h-8 w-8 text-green-400" />}
            title="SHAP Explainability"
            description="Understand the 'why' behind every prediction with transparent AI feature importance tracking."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-8 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors"
    >
      <div className="h-12 w-12 rounded-lg bg-slate-800/50 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
