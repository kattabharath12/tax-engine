import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  User,
  LogOut,
  Plus,
  X,
  Eye,
  Loader2,
} from "lucide-react";

const TaxEngineApp = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const mockLogin = () => {
    setUser({
      id: "123",
      email: "user@example.com",
      name: "John Taxpayer",
    });
  };

  const logout = () => {
    setUser(null);
    setActiveTab("upload");
    setUploadedFiles([]);
    setJobs([]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Tax Engine
            </h1>
            <p className="text-gray-600">Automated Tax Document Processing</p>
          </div>

          <button
            onClick={mockLogin}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Sign In with Mock Account
          </button>

          <div className="mt-6 text-sm text-gray-500 text-center">
            <p>Demo Features:</p>
            <ul className="mt-2 space-y-1">
              <li>• Upload W-2 and 1099 documents</li>
              <li>• Automated data extraction</li>
              <li>• 1040 form generation</li>
              <li>• JSON and PDF downloads</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Tax Engine</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <User className="w-4 h-4 mr-2" />
                {user.name}
              </div>
              <button
                onClick={logout}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to Tax Engine!
          </h2>
          <p className="text-gray-600">
            Your tax processing application is ready. Click the button above to get started.
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  return <TaxEngineApp />;
}

export default App;