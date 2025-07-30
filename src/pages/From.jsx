import React, { useState } from 'react';
import Button from '../components/comen/button/Button';
import Input from '../components/comen/Input';

function From() {
  const [formData, setFormData] = useState({
    githubUsername: '',
    repository: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.githubUsername || !formData.repository) {
      setMessage('Please fill in both fields');
      return;
    }

    setMessage(`Fetching data for ${formData.githubUsername}/${formData.repository}...`);

    // API logic goes here
    // Example: fetchCommits(formData.githubUsername, formData.repository);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                About <span className="text-blue-400">GHTrackr</span>
              </h1>
              <p className="text-lg text-gray-400">
                GHTrackr is a GitHub dashboard that helps developers track commits and activity with AI insights.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Track Repository Activity</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-1">GitHub Username</label>
                  <Input
                    type="text"
                    name="githubUsername"
                    placeholder="Enter your GitHub username"
                    value={formData.githubUsername}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block mb-1">Repository Name</label>
                  <Input
                    type="text"
                    name="repository"
                    placeholder="Enter repository name"
                    value={formData.repository}
                    onChange={handleChange}
                  />
                </div>

                <Button text="Get Info" className="mx-auto" />
              </form>

              {message && <p className="mt-4 text-blue-300">{message}</p>}
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-semibold mb-4 text-center">Features</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-lg mb-2">GitHub Integration</h4>
                  <p className="text-gray-400">
                    Seamlessly connect with GitHub to track repositories and commits.
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-lg mb-2">AI-Powered Insights</h4>
                  <p className="text-gray-400">
                    Get summaries of your commit activity and contributions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default From;
