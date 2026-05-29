"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PredictPage() {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  // IPL Teams
  const IPL_TEAMS = [
    "Mumbai Indians",
    "Chennai Super Kings",
    "Royal Challengers Bangalore",
    "Kolkata Knight Riders",
    "Delhi Capitals",
    "Punjab Kings",
    "Rajasthan Royals",
    "Sunrisers Hyderabad",
    "Lucknow Super Giants",
    "Gujarat Titans"
  ];

  // Team States
  const [team1, setTeam1] = useState("Mumbai Indians");
  const [team2, setTeam2] = useState("Chennai Super Kings");

  // Prediction Handler
  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    // Mock API delay
    setTimeout(() => {
      const randomWinner = Math.random() > 0.5 ? team1 : team2;

      setPrediction({
        winner: randomWinner,
        probability: (60 + Math.random() * 30).toFixed(1),
        confidence: "High",
        keyFactors: [
          "Venue Advantage",
          "Recent Form",
          "Toss Impact"
        ]
      });

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-8 flex flex-col md:flex-row gap-8">
      
      {/* Input Form */}
      <div className="w-full md:w-1/2 glass-card p-8 rounded-2xl border border-slate-700/50">
        
        <h2 className="text-2xl font-bold mb-6">
          Match Predictor
        </h2>

        <form onSubmit={handlePredict} className="space-y-4">

          {/* Team 1 */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Team 1
            </label>

            <select
              value={team1}
              onChange={(e) => {
                setTeam1(e.target.value);

                // Prevent same team selection
                if (e.target.value === team2) {
                  setTeam2(
                    IPL_TEAMS.find(
                      (team) => team !== e.target.value
                    ) || ""
                  );
                }
              }}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
            >
              {IPL_TEAMS.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          {/* Team 2 */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Team 2
            </label>

            <select
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
            >
              {IPL_TEAMS.filter(
                (team) => team !== team1
              ).map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Venue
            </label>

            <select className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500">
              <option>M. Chinnaswamy Stadium</option>
              <option>Wankhede Stadium</option>
              <option>Eden Gardens</option>
              <option>Narendra Modi Stadium</option>
            </select>
          </div>

          {/* Toss + Decision */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Toss Winner
              </label>

              <select className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500">
                <option>{team1}</option>
                <option>{team2}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Decision
              </label>

              <select className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500">
                <option>Bat</option>
                <option>Field</option>
              </select>
            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? "Analyzing..." : "Run AI Prediction"}
          </button>

        </form>
      </div>

      {/* Results Panel */}
      <div className="w-full md:w-1/2">

        {prediction ? (

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 rounded-2xl border border-blue-500/30 neon-border h-full flex flex-col justify-center"
          >

            <h3 className="text-xl text-slate-400 mb-2 text-center">
              Predicted Winner
            </h3>

            <div className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
              {prediction.winner}
            </div>

            <div className="space-y-6">

              {/* Probability */}
              <div>

                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">
                    Win Probability
                  </span>

                  <span className="font-bold text-blue-400">
                    {prediction.probability}%
                  </span>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-3">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${prediction.probability}%`
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeOut"
                    }}
                    className="bg-blue-500 h-3 rounded-full"
                  />

                </div>
              </div>

              {/* Key Factors */}
              <div className="pt-6 border-t border-slate-700/50">

                <h4 className="font-medium text-slate-300 mb-3">
                  Key Factors
                </h4>

                <ul className="space-y-2">

                  {prediction.keyFactors.map(
                    (factor: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-center text-slate-400 text-sm"
                      >
                        <div className="h-2 w-2 rounded-full bg-purple-500 mr-3" />
                        {factor}
                      </li>
                    )
                  )}

                </ul>
              </div>
            </div>
          </motion.div>

        ) : (

          <div className="h-full glass flex items-center justify-center rounded-2xl border border-slate-700/50 p-8 text-center text-slate-500">
            Awaiting input...
            <br />
            Select match parameters and run prediction.
          </div>

        )}
      </div>
    </div>
  );
}