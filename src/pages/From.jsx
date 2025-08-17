import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/comen/button/Button';
import Input from '../components/comen/Input';
import { useGithubCommits } from '../hook/useGithubCommits';

function From() {
  const [formData, setFormData] = useState({
    githubUsername: '',
    repository: '',
    submitted: false, // flag to track when we want to fetch
  });

  const navigate = useNavigate();

  // Only pass username/repo to hook when submitted
  const { commits, loading, error } = useGithubCommits(
    formData.submitted ? formData.githubUsername : '',
    formData.submitted ? formData.repository : ''
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { githubUsername, repository } = formData;
    if (!githubUsername || !repository) return;

    setFormData((prev) => ({
      ...prev,
      submitted: true, // trigger hook fetch
    }));
  };

  // Redirect when commits are fetched
  useEffect(() => {
    if (formData.submitted && commits.length > 0) {
      navigate(`/user-repo/${formData.githubUsername}/${formData.repository}`);
    }
  }, [commits, formData, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center">
              Track <span className="text-blue-400">GitHub Commits</span>
            </h1>

            <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 shadow-sm mb-8">
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

                <Button text="Get Commits" className="mx-auto" />
              </form>

              {loading && formData.submitted && <p>Checking commits...</p>}
              {error && formData.submitted && (
                <p className="text-red-400">{error}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default From;
