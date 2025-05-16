
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-analyzer-primary sm:text-5xl mb-6">
            CodeAnalyzer<span className="text-analyzer-secondary">Pro</span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-10">
            Automated code quality and standards compliance analyzer for your development workflow. 
            Ensure your code meets company standards, identifies issues early, and improves overall code quality.
          </p>
          
          <div className="mt-8">
            <Button 
              onClick={() => navigate('/dashboard')}
              size="lg" 
              className="bg-analyzer-primary hover:bg-analyzer-secondary text-lg px-8 py-6"
            >
              Go to Dashboard
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-analyzer-primary">Detect Code Issues</h3>
              <p className="text-gray-600">
                Automatically identify common problems, coding standard violations, and potential bugs before they reach production.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-analyzer-primary">Enforce Standards</h3>
              <p className="text-gray-600">
                Ensure consistency across your codebase by enforcing organizational coding guidelines and best practices.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-analyzer-primary">Improve Quality</h3>
              <p className="text-gray-600">
                Get actionable feedback to improve your code quality, maintainability, and reliability over time.
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2025 CodeAnalyzerPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
