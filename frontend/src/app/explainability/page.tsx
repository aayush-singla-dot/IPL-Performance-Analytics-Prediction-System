"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BarChart2 } from "lucide-react";

export default function ExplainabilityPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center mb-8">
        <ShieldCheck className="h-8 w-8 text-green-400 mr-4" />
        <h1 className="text-3xl font-bold">Enterprise AI Explainability</h1>
      </div>
      <p className="text-slate-400 mb-8 max-w-3xl">
        Understand exactly how our machine learning models arrive at their predictions. This dashboard provides 
        transparency into feature importance and decision trees using SHAP (SHapley Additive exPlanations).
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SHAP Summary Plot Placeholder */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Global Feature Importance</h3>
            <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400">Random Forest Model</span>
          </div>
          
          <div className="space-y-4">
            <FeatureBar name="Toss Decision" importance={85} color="bg-purple-500" />
            <FeatureBar name="Venue Historic Win Rate" importance={72} color="bg-blue-500" />
            <FeatureBar name="Team 1 Recent Form" importance={68} color="bg-green-500" />
            <FeatureBar name="Team 2 Recent Form" importance={45} color="bg-yellow-500" />
            <FeatureBar name="Batting First Advantage" importance={30} color="bg-red-500" />
          </div>
        </div>

        {/* Local Explainability */}
        <div className="glass-card p-6 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-4">
              <BarChart2 className="h-5 w-5 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold">Local Explainability</h3>
            </div>
            <p className="text-sm text-slate-400 mb-6">
              Select a recent prediction to see the exact factors that drove the AI decision.
            </p>
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 mb-4 cursor-pointer hover:bg-slate-700/50 transition-colors">
              <p className="font-medium text-white text-sm">CSK vs MI (Final)</p>
              <p className="text-xs text-slate-500">Predicted: CSK (68%)</p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 cursor-pointer hover:bg-slate-700/50 transition-colors">
              <p className="font-medium text-white text-sm">RCB vs KKR</p>
              <p className="text-xs text-slate-500">Predicted: KKR (55%)</p>
            </div>
          </div>
          <button className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-medium transition-colors">
            Generate Waterfall Plot
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureBar({ name, importance, color }: { name: string, importance: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-300">{name}</span>
        <span className="text-slate-500">{importance}%</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-2">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${importance}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`${color} h-2 rounded-full`}
        />
      </div>
    </div>
  );
}
