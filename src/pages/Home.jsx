import { Github, Activity, BarChart3 } from "lucide-react";
import heroImage from "../assets/img/hero-illustration.jpg";
import { useAuth } from "../hook/useAuth";
import { Link } from "react-router";

const Hero = () => {
  const { user } = useAuth();
  return (
    <section className="relative w-full bg-gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Track Your{" "}
                <span className="text-gradient-primary">
                  GitHub Activity
                </span>{" "}
                with Ease
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Log in with GitHub to view your latest commits and summaries powered by AI.
                Get insights into your development patterns and productivity.
              </p>

              {/* ✅ Show button only if user exists */}
              {user && (
                <Link to={"/dashboard"}>
                  <button className="px-6 py-2 mt-3 bg-primary text-white rounded-xl font-medium shadow-md hover:bg-primary/90 transition">
                  Start Now
                </button>
                  </Link>
              )}

            </div>

            {/* Feature highlights */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4 text-primary" />
                Real-time tracking
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart3 className="h-4 w-4 text-accent" />
                AI-powered insights
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Github className="h-4 w-4 text-primary" />
                GitHub integration
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="relative">
              <img
                src={heroImage}
                alt="GitHub Dashboard Illustration"
                className="w-full h-auto rounded-2xl shadow-card hover-lift"
              />

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-card rounded-lg p-3 shadow-glow">
                <Github className="h-6 w-6 text-primary" />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-gradient-card rounded-lg p-3 shadow-glow">
                <Activity className="h-6 w-6 text-accent" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;