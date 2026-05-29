"use client";

import { motion } from "framer-motion";
import { Users, Trophy, Target, Activity } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      
      {/* Top Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Widget 
          title="Prediction Accuracy" 
          value="87.5%" 
          subtitle="Last 30 days"
          icon={<Target className="text-green-400 h-6 w-6" />}
        />
        <Widget 
          title="Total Matches Analyzed" 
          value="1,024" 
          subtitle="Since 2008"
          icon={<Activity className="text-blue-400 h-6 w-6" />}
        />
        <Widget 
          title="Best Performing Team" 
          value="CSK" 
          subtitle="65% Win Rate"
          icon={<Trophy className="text-yellow-400 h-6 w-6" />}
        />
        <Widget 
          title="Most Valuable Player" 
          value="V Kohli" 
          subtitle="Avg Form Score: 9.2"
          icon={<Users className="text-purple-400 h-6 w-6" />}
        />
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-xl h-80 flex flex-col items-center justify-center border border-slate-700/50">
          <p className="text-slate-400">Team Win Percentage Chart (Recharts integration coming next)</p>
        </div>
        <div className="glass-card p-6 rounded-xl h-80 flex flex-col items-center justify-center border border-slate-700/50">
          <p className="text-slate-400">Player Form Trends (Recharts integration coming next)</p>
        </div>
      </div>
    </div>
  );
}

function Widget({ title, value, subtitle, icon }: { title: string, value: string, subtitle: string, icon: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 rounded-xl border border-slate-700/50 flex items-center justify-between"
    >
      <div>
        <p className="text-sm text-slate-400 font-medium mb-1">{title}</p>
        <h4 className="text-2xl font-bold text-white mb-1">{value}</h4>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <div className="h-12 w-12 rounded-full bg-slate-800/80 flex items-center justify-center border border-slate-700">
        {icon}
      </div>
    </motion.div>
  );
}
