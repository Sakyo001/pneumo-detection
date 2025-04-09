"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface AnalysisResult {
  id: string;
  reference_number: string;
  image_url: string;
  analysis_result: string;
  confidence_score: number;
  created_at: string;
  doctor_name: string;
  pneumonia_type?: string | null;
  severity?: string | null;
  recommended_action?: string | null;
  patient_name?: string;
}

export default function PatientDashboard() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleTrackScan = async () => {
    if (!referenceNumber.trim()) {
      setError("Please enter a reference number");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`/api/analysis/${referenceNumber}`);
      
      // Log the response status and headers
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Try to get the response text first
      const text = await response.text();
      console.log('Response text:', text);
      
      // Then parse it as JSON if possible
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid response format from server');
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch analysis results");
      }

      setResult(data);
    } catch (err) {
      console.error('Error details:', err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!result) return;
    
    setIsPdfLoading(true);
    
    try {
      const response = await fetch(`/api/analysis/${referenceNumber}`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
      
      // Get the blob from the response
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const a = document.createElement('a');
      a.href = url;
      a.download = `xray-analysis-${referenceNumber}.pdf`;
      
      // Append to the document, click it, and remove it
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert('Failed to download PDF report. Please try again.');
    } finally {
      setIsPdfLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      {/* Header/Navigation - Enhanced with animations */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-gray-100 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="mr-3 flex items-center justify-center w-8 h-8">
                <Image src="/icons/logo.png" alt="Logo" width={20} height={20} />
              </div>
              <h1 className="font-semibold text-gray-800 text-lg">MedRecord Hub</h1>
            </motion.div>
            <div className="flex items-center space-x-6">
              <motion.a 
                href="#" 
                className="text-gray-500 hover:text-indigo-600 text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Help
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center transition-colors">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Welcome Banner - Enhanced with gradient and animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white"
      >
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold">Welcome to Patient Portal</h2>
          <p className="mt-3 text-indigo-100 opacity-90 text-lg">Track your X-ray scans and medical records in one place</p>
        </div>
      </motion.div>

      {/* Main Content - Enhanced with animations and spacing */}
      <div className="flex-grow max-w-7xl mx-auto w-full px-6 py-10">
        {/* Search Section - Enhanced with animations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-50 p-8 mb-10"
        >
          <h3 className="text-xl font-medium text-gray-800 mb-5">Track Your X-Ray Analysis</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="Enter reference number provided by your doctor"
                  className="block w-full pl-12 pr-4 py-3.5 border text-gray-700 border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  suppressHydrationWarning
                />
              </div>
              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {error}
                </motion.p>
              )}
            </div>
            <motion.button 
              onClick={handleTrackScan}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-indigo-600 text-white px-8 py-3.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              suppressHydrationWarning
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                "Track Scan"
              )}
            </motion.button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Enter the reference number provided by your doctor to view your X-ray analysis results
          </p>
        </motion.div>

        {/* Analysis Results Section - Enhanced with animations */}
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-50 p-8 mb-10"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-gray-800">Analysis Results</h3>
              <motion.button
                onClick={handleDownloadPdf}
                disabled={isPdfLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isPdfLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF Report
                  </>
                )}
              </motion.button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* X-ray Image */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-50"
              >
                <Image
                  src={result.image_url}
                  alt="X-ray Image"
                  fill
                  className="object-contain"
                />
              </motion.div>
              
              {/* Analysis Details */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Diagnosis</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      result.analysis_result === "Normal" 
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {result.analysis_result}
                    </span>
                    <span className="text-sm text-gray-500">
                      Confidence: {(result.confidence_score * 100).toFixed(1)}%
                    </span>
                  </div>
                  
                  {/* Additional diagnosis details */}
                  {result.pneumonia_type && (
                    <div className="mt-2">
                      <span className="text-sm font-medium text-gray-700">Type:</span>
                      <span className="ml-2 text-sm text-gray-600">{result.pneumonia_type}</span>
                    </div>
                  )}
                  
                  {result.severity && (
                    <div className="mt-1">
                      <span className="text-sm font-medium text-gray-700">Severity:</span>
                      <span className="ml-2 text-sm text-gray-600">{result.severity}</span>
                </div>
                  )}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Details</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Reference Number:</span> {result.reference_number}</p>
                    <p><span className="font-medium">Patient Name:</span> {result.patient_name || 'Not provided'}</p>
                    <p><span className="font-medium">Analyzed By:</span> {result.doctor_name}</p>
                    <p><span className="font-medium">Date:</span> {new Date(result.created_at).toLocaleDateString()}</p>
                  </div>
                </motion.div>
                
                {result.recommended_action && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Recommended Action</h4>
                    <div className="p-3 bg-indigo-50 rounded-lg text-sm text-gray-700">
                      {result.recommended_action}
                </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Actions Section - Enhanced with animations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-50 p-6 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="text-md font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">Schedule Appointment</h4>
                <p className="text-sm text-gray-500 mt-1">Book a new consultation with your doctor</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-50 p-6 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="text-md font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">Medical Records</h4>
                <p className="text-sm text-gray-500 mt-1">View your complete medical history</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-50 p-6 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="text-md font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">Contact Support</h4>
                <p className="text-sm text-gray-500 mt-1">Get help with any questions or concerns</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Health Tips Section - Enhanced with animations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-50 p-8"
        >
          <h3 className="text-xl font-medium text-gray-800 mb-6">Health Tips & Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 rounded-xl p-6 hover:bg-indigo-50 transition-colors group"
            >
              <h4 className="font-medium text-gray-800 mb-3 group-hover:text-indigo-700 transition-colors">Understanding Your X-Ray Results</h4>
              <p className="text-sm text-gray-600 mb-4">Learn how to interpret common X-ray findings and what they might mean for your health.</p>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                Read more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 rounded-xl p-6 hover:bg-indigo-50 transition-colors group"
            >
              <h4 className="font-medium text-gray-800 mb-3 group-hover:text-indigo-700 transition-colors">Preventive Care Guide</h4>
              <p className="text-sm text-gray-600 mb-4">Discover tips and best practices for maintaining good respiratory health.</p>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                Read more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer - Simplified and more modern */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <div className="flex items-center">
                <div className="mr-2 flex items-center justify-center w-7 h-7">
                  <Image src="/icons/logo.png" alt="Logo" width={16} height={16} />
                </div>
                <span className="text-gray-500 text-sm">© 2023 MedRecord Hub. All rights reserved.</span>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex justify-center">
              <div className="flex space-x-8">
                <a href="#" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
