import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
            Transform Your Ideas Into Reality
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of creators, innovators, and professionals who trust our platform to bring their visions to life.
          </p>
          <div className="space-x-4">
            <Link 
              to="/home"
              className="inline-block bg-black hover:bg-gray-800 text-white text-lg px-8 py-3 rounded-full transition-colors duration-200"
            >
              Get Started
            </Link>
            <Link
              to="/demo"
              className="inline-block border-2 border-black hover:bg-gray-100 text-black text-lg px-8 py-3 rounded-full transition-colors duration-200"
            >
              Watch Demo
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-black mb-2">100K+</p>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-black mb-2">50M+</p>
            <p className="text-gray-600">Projects Created</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-black mb-2">99.9%</p>
            <p className="text-gray-600">Uptime</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-black mb-2">24/7</p>
            <p className="text-gray-600">Support</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
              <p className="text-gray-600">Experience blazing-fast performance with our optimized infrastructure.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-4">Enterprise Security</h3>
              <p className="text-gray-600">Bank-grade security ensuring your data is always protected.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-4">Easy Integration</h3>
              <p className="text-gray-600">Seamlessly integrate with your existing tools and workflows.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Simple, Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Starter</h3>
              <p className="text-4xl font-bold mb-4">$0<span className="text-lg text-gray-600">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><span className="mr-2">✓</span> Basic features</li>
                <li className="flex items-center"><span className="mr-2">✓</span> 1 project</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Community support</li>
              </ul>
              <button className="w-full py-2 border-2 border-black rounded-lg hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>
            <div className="border-2 border-black rounded-xl p-8 transform scale-105">
              <h3 className="text-xl font-semibold mb-4">Pro</h3>
              <p className="text-4xl font-bold mb-4">$29<span className="text-lg text-gray-600">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><span className="mr-2">✓</span> Advanced features</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Unlimited projects</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Priority support</li>
                <li className="flex items-center"><span className="mr-2">✓</span> API access</li>
              </ul>
              <button className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Get Started
              </button>
            </div>
            <div className="border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
              <p className="text-4xl font-bold mb-4">Custom</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><span className="mr-2">✓</span> Custom features</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Dedicated support</li>
                <li className="flex items-center"><span className="mr-2">✓</span> SLA guarantee</li>
              </ul>
              <button className="w-full py-2 border-2 border-black rounded-lg hover:bg-gray-100 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-6">"This platform has completely transformed how we handle our projects. The efficiency gains are remarkable."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-gray-600">CTO, TechCorp</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-6">"The best investment we've made for our business. The ROI was visible within the first month."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold">Mark Thompson</p>
                  <p className="text-gray-600">Founder, StartupX</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-6">"The support team is exceptional. They've been incredibly helpful throughout our journey."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold">Emily Chen</p>
                  <p className="text-gray-600">PM, GrowthCo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of satisfied customers who have transformed their workflow with our platform.</p>
          <Link 
            to="/signup"
            className="inline-block bg-white text-black text-lg px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            Start Your Free Trial
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-600 hover:text-gray-900">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
                <li><Link to="/security" className="text-gray-600 hover:text-gray-900">Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
                <li><Link to="/careers" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
                <li><Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/documentation" className="text-gray-600 hover:text-gray-900">Documentation</Link></li>
                <li><Link to="/help" className="text-gray-600 hover:text-gray-900">Help Center</Link></li>
                <li><Link to="/guides" className="text-gray-600 hover:text-gray-900">Guides</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
                <li><Link to="/compliance" className="text-gray-600 hover:text-gray-900">Compliance</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">© 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;