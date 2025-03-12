import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MessageSquare, BarChart3, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800">
      {/* Header */}
      <header className="bg-blue-900 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-cyan-400 flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-2xl font-bold">
              ReviewBoost<span className="text-cyan-400">.io</span>
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" className="text-white hover:text-cyan-400">
              Tour
            </Button>
            <Button variant="ghost" className="text-white hover:text-cyan-400">
              Features
            </Button>
            <Button variant="ghost" className="text-white hover:text-cyan-400">
              Pricing
            </Button>
            <Button variant="ghost" className="text-white hover:text-cyan-400">
              Support
            </Button>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-900"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              className="bg-cyan-400 hover:bg-cyan-500 text-white"
              onClick={() => navigate("/signup")}
            >
              Try Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Review management software
            <span className="text-cyan-400 block">for your business!</span>
          </h1>
          <p className="text-white/90 text-lg">
            Reviews are your online word-of-mouth advertising. Are you getting
            the most out of them? Or are you stuck with scattered reviews here
            and there? ReviewBoost helps you optimize your online reputation to
            maximize profits.
          </p>
          <Button
            size="lg"
            className="bg-cyan-400 hover:bg-cyan-500 text-white px-8 py-6 text-lg"
            onClick={() => navigate("/signup")}
          >
            Try ReviewBoost
          </Button>
        </div>
        <div className="md:w-1/2">
          <div className="relative">
            <div className="bg-white rounded-lg shadow-xl p-4 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/3">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
                    alt="Business person"
                    className="rounded-lg mb-4"
                  />
                </div>
                <div className="w-2/3 space-y-4">
                  <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-cyan-400 rounded-lg p-4 shadow-lg">
                <div className="text-white font-bold text-xl">8.8</div>
              </div>
            </div>
            <div className="absolute top-10 -right-10 bg-cyan-50 rounded-lg p-6 shadow-lg border border-cyan-200 z-0">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-cyan-400 overflow-hidden">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=lisa"
                    alt="Avatar"
                  />
                </div>
                <div>
                  <div className="font-medium">Customer Support</div>
                  <div className="text-sm text-gray-500">How can we help?</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/272px-Google_2015_logo.svg.png"
              alt="Google"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Yelp_Logo.svg/250px-Yelp_Logo.svg.png"
              alt="Yelp"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/240px-Facebook_Logo_%282019%29.png"
              alt="Facebook"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Tripadvisor_Logo_circle-green_vertical-lockup_registered_RGB.svg/240px-Tripadvisor_Logo_circle-green_vertical-lockup_registered_RGB.svg.png"
              alt="TripAdvisor"
              className="h-10"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/240px-Instagram_logo_2022.svg.png"
              alt="Instagram"
              className="h-8"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            The most complete review management software
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-blue-600">
              <CardContent className="pt-6">
                <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Review Collection</h3>
                <p className="text-gray-600 mb-4">
                  Automatically collect reviews from all major platforms in one
                  central dashboard.
                </p>
                <a
                  href="#"
                  className="text-blue-600 font-medium flex items-center hover:underline"
                >
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-cyan-500">
              <CardContent className="pt-6">
                <div className="bg-cyan-100 p-3 rounded-lg inline-block mb-4">
                  <MessageSquare className="h-6 w-6 text-cyan-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Response Management</h3>
                <p className="text-gray-600 mb-4">
                  Respond to all your reviews from different platforms in one
                  place.
                </p>
                <a
                  href="#"
                  className="text-cyan-500 font-medium flex items-center hover:underline"
                >
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-500">
              <CardContent className="pt-6">
                <div className="bg-green-100 p-3 rounded-lg inline-block mb-4">
                  <BarChart3 className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Analytics & Insights</h3>
                <p className="text-gray-600 mb-4">
                  Get detailed analytics and actionable insights to improve your
                  business.
                </p>
                <a
                  href="#"
                  className="text-green-500 font-medium flex items-center hover:underline"
                >
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to boost your online reputation?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that use ReviewBoost to manage and
            leverage their online reviews.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-cyan-400 hover:bg-cyan-500 text-white px-8"
              onClick={() => navigate("/signup")}
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-900"
              onClick={() => navigate("/login")}
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-cyan-400 flex items-center justify-center">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <span className="text-white text-xl font-bold">
                  ReviewBoost<span className="text-cyan-400">.io</span>
                </span>
              </div>
              <p className="text-gray-400">
                The complete solution for managing your online reviews and
                reputation.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Case Studies
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">
              © 2023 ReviewBoost. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-cyan-400">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
