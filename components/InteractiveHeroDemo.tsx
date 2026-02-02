"use client";

import React, { useState } from "react";

const InteractiveHeroDemo = () => {
    const [status, setStatus] = useState<"idle" | "scanning" | "result">("idle");

    const handleEvaluate = () => {
        setStatus("scanning");
        setTimeout(() => setStatus("result"), 2000);
    };

    const handleReset = () => setStatus("idle");

    return (
        <div
            className="aspect-video rounded-2xl bg-primary p-3 shadow-2xl relative overflow-hidden group border-4 border-primary-dark"
        >
            {/* Code Window */}
            <div className="bg-[#0b1b2e] w-full h-full rounded-xl flex flex-col font-mono text-sm relative z-10 border border-slate-700 shadow-inner overflow-hidden">
                {/* Editor Header */}
                <div className="bg-[#0f243b] px-4 py-3 flex items-center justify-between border-b border-slate-800/60">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                    </div>
                    <div className="text-xs text-slate-500">assignment_01.py</div>
                    <div className="w-4" />
                </div>

                {/* Code Content */}
                <div className="p-6 text-slate-300 relative flex-1">
                    {status === "scanning" && (
                        <div
                            className="absolute left-0 right-0 h-1 bg-blue-400/80 shadow-[0_0_20px_rgba(96,165,250,0.8)] z-20 animate-scan"
                            style={{ top: "0%" }}
                        ></div>
                    )}

                    <div className="space-y-1 opacity-90">
                        <div className="flex"><span className="text-purple-400 w-8 text-right mr-4 opacity-40">1</span><span className="text-purple-400">def</span> <span className="text-blue-300">calculate_fibonacci</span>(n):</div>
                        <div className="flex"><span className="text-slate-600 w-8 text-right mr-4 opacity-40">2</span><span className="pl-4 text-slate-400"># Check for base cases</span></div>
                        <div className="flex"><span className="text-slate-600 w-8 text-right mr-4 opacity-40">3</span><span className="pl-4 text-purple-400">if</span> n {"<="} <span className="text-orange-300">1</span>:</div>
                        <div className="flex"><span className="text-slate-600 w-8 text-right mr-4 opacity-40">4</span><span className="pl-8 text-purple-400">return</span> n</div>
                        <div className="flex"><span className="text-slate-600 w-8 text-right mr-4 opacity-40">5</span><span className="pl-4 text-purple-400">else</span>:</div>
                        <div className="flex"><span className="text-slate-600 w-8 text-right mr-4 opacity-40">6</span><span className="pl-8 text-purple-400">return</span> calculate_fibonacci(n-<span className="text-orange-300">1</span>) + calculate_fibonacci(n-<span className="text-orange-300">2</span>)</div>
                    </div>

                    {/* Run */}
                    {status === "idle" && (
                        <div className="absolute bottom-6 right-6 z-30">
                            <button
                                onClick={handleEvaluate}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg shadow-green-900/40 transition-all hover:scale-105 active:scale-95"
                            >
                                <span className="material-symbols-outlined text-lg">play_arrow</span>
                                Run AI Evaluation
                            </button>
                        </div>
                    )}
                </div>

                {/* Result Popup */}
                {status === "result" && (
                    <div className="absolute inset-0 bg-[#091829]/90 backdrop-blur-sm z-40 flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
                        <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm border-t-4 border-primary">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase">Total Score</div>
                                    <div className="text-4xl font-black text-primary">92<span className="text-lg text-slate-400 font-medium">/100</span></div>
                                </div>
                                <div className="bg-green-100 text-green-700 p-2 rounded-full shadow-sm">
                                    <span className="material-symbols-outlined">check_circle</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-600">Logic & Correctness</span>
                                        <span className="font-bold text-green-600">Perfect</span>
                                    </div>
                                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                                        <div className="bg-green-500 h-full w-full"></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-600">Efficiency</span>
                                        <span className="font-bold text-yellow-600">Optimize</span>
                                    </div>
                                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                                        <div className="bg-yellow-500 h-full w-[70%]"></div>
                                    </div>
                                    <p className="text-xs text-slate-500 italic mt-1">&quot;Use memoization to improve speed for large inputs.&quot;</p>
                                </div>
                            </div>

                            <button
                                onClick={handleReset}
                                className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary-dark transition-all text-sm shadow-md"
                            >
                                Try Another
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 blur-[80px] opacity-20 pointer-events-none"></div>
        </div>
    );
};

export default InteractiveHeroDemo;
