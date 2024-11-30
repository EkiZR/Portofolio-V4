import React from 'react';
import { motion } from 'framer-motion';

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120224] via-[#1e0542] to-[#0a011a] flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-700/20 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-800/20 rounded-full blur-[150px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10 max-w-2xl w-full bg-[#1a0b2e]/60 backdrop-blur-xl rounded-3xl border border-purple-900/30 shadow-2xl p-12 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-indigo-900/10 rounded-3xl -z-10 animate-pulse"></div>

        <div className="mb-10 relative">
          <div className="absolute -top-2 -left-2 right-0 bottom-0 bg-purple-900/30 rounded-full blur-2xl"></div>
          <div className="relative z-10 w-48 h-48 mx-auto bg-gradient-to-br from-[#2a1a40] to-[#1a0b2e] rounded-full border-4 border-purple-900/50 shadow-2xl flex items-center justify-center">
            <div className="text-4xl font-mono text-purple-300 tracking-widest">
              •••
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 mb-6 tracking-tight">
          Portfolio Update
        </h1>

        <p className="text-xl text-purple-200/80 mb-8 font-light">
          My portfolio is currently being updated. New content will be available soon.
        </p>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 bg-purple-800/30 border border-purple-700/50 rounded-full text-purple-200 hover:bg-purple-800/50 transition-all cursor-pointer"
        >
          Coming Soon
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MaintenancePage;