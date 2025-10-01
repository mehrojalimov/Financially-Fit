import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Users, Play, Pause, Volume2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

export default function About() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            About FinanciallyFit
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering you to take control of your financial future
          </p>
        </div>

        {/* Project Pitch Video */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Our Project Pitch
            </CardTitle>
            <CardDescription>
              Listen to our team discuss the FinanciallyFit project and its vision
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                preload="metadata"
              >
                <source src="/123.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute top-4 right-4">
                <Button
                  onClick={togglePlayPause}
                  size="sm"
                  variant="secondary"
                  className="bg-black/50 hover:bg-black/70 text-white"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <Card>
            <CardHeader>
              <Target className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To provide simple, effective tools that help everyone manage their finances
                confidently and achieve their financial goals.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Our Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We believe in practical, proven methods like the 50/30/20 rule combined with
                modern technology to make budgeting accessible to everyone.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Our Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Join thousands of users who have taken control of their finances and are
                building a more secure financial future.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>What is FinanciallyFit?</CardTitle>
            <CardDescription>Your complete personal finance companion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              FinanciallyFit is a comprehensive personal finance management platform designed
              to help you track spending, plan budgets, and make informed financial decisions.
            </p>
            <p>
              Whether you're new to budgeting or a seasoned financial planner, our tools are
              designed to be intuitive and powerful. From the popular 50/30/20 budgeting rule
              to custom budget creation, spending tracking, and loan calculators, we provide
              everything you need in one place.
            </p>
            <p>
              Our mission is to make financial literacy and planning accessible to everyone,
              helping you build better money habits and achieve your financial goals.
            </p>
          </CardContent>
        </Card>

        {/* Developer Information */}
        <Card className="max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Developer Information
            </CardTitle>
            <CardDescription>Meet the developer behind FinanciallyFit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">MA</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Mehroj Alimov</h3>
                <p className="text-muted-foreground">Drexel University College of Computing and Information</p>
                <div className="mt-2">
                  <a 
                    href="https://www.linkedin.com/in/mehrojalimov/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Developed with ❤️ using React, TypeScript, and modern web technologies
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
