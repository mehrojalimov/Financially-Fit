import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Users, Play, Pause, Volume2, GraduationCap, Code, Database, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

export default function About() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

// Initialize video when component mounts (no auto-play due to browser restrictions)
useEffect(() => {
if (videoRef.current) {
// Don't auto-play - browsers block this without user interaction
setIsPlaying(false);
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
Listen to our team discuss the FinanciallyFit project and its vision. Click play to start the video.
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

        <Card className="max-w-4xl mx-auto mb-12">
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

        {/* Developer Information Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Development Team</h2>
            <p className="text-lg text-muted-foreground">
              First-year Computer Science students at Drexel University passionate about helping others manage their finances
            </p>
          </div>

          {/* Mehroj Alimov - Main Developer */}
          <div className="mb-12">
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader className="text-center">
                <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                  <Code className="h-16 w-16 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold">Mehroj Alimov</CardTitle>
                <CardDescription className="text-lg">Lead Developer & Computer Science Student</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Computer Science major with a minor in Finance. A passionate developer with expertise in various programming languages and a knack for problem-solving. Believes in the transformative power of technology and its ability to make a positive impact. Let's collaborate and drive change through creative and impactful digital solutions.
                </p>
                <div className="flex justify-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">Computer Science</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">Finance</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">Developer</span>
                </div>
                <Button 
                  asChild 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <a 
                    href="https://www.linkedin.com/in/mehrojalimov/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Linkedin className="h-4 w-4" />
                    Connect on LinkedIn
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Other Team Members - Smaller Cards */}
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto mb-12">
            {/* Megan Ehrnfeldt */}
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-3">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg">Megan Ehrnfeldt</CardTitle>
                <CardDescription>Student-Athlete & Developer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  First-year student-athlete at Drexel University. Currently majoring in Computer Science and minoring in Data Science. Also a member of the swim team.
                </p>
                <div className="flex justify-center gap-1 flex-wrap">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Computer Science</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Data Science</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Swim Team</span>
                </div>
              </CardContent>
            </Card>

            {/* Savit Tumuluri */}
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-3">
                  <Database className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg">Savit Tumuluri</CardTitle>
                <CardDescription>Computer Science Student</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  First-year student at Drexel University currently majoring in Computer Science. Passionate about technology and software development.
                </p>
                <div className="flex justify-center gap-1 flex-wrap">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Computer Science</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Developer</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Mission Statement */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-4">Our Team's Mission</h3>
                <p className="text-muted-foreground max-w-4xl mx-auto">
                  As first-year computer science students at Drexel University, we developed this website to help other college students and everyone in general control their spending urges and manage their spending habits. Our website allows you to input your monthly income and see the perfect breakdown of spending on your needs, wants, and necessities for that month. You can also input your spending for the month and see your specific breakdown in those categories.
                </p>
                <p className="text-muted-foreground mt-4 font-medium">
                  We hope this website helps you achieve your financial goals! 💰
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}