import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, LogIn, LogOut, User, LayoutDashboard, Plus, ClipboardList, Menu, X, Filter, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname.startsWith('/admin')) {
      return true;
    }
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await signOut();
    setMobileMenuOpen(false);
    navigate('/home');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center justify-start space-x-8">
            <Link
              to="/home"
              className="flex items-center space-x-4 text-2xl font-heading font-bold text-gradient hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <span className="whitespace-nowrap">Improve My City</span>
            </Link>

            <div className="hidden md:flex space-x-2">
              <Link
                to="/home"
                className={`flex items-center justify-center px-5 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                  isActive('/home')
                    ? 'bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                }`}
              >
                <span className="text-center">Home</span>
              </Link>

              {user && (profile?.role === 'citizen' || !profile?.role) && (
                <>
                  <Link
                    to="/report"
                    className={`flex items-center justify-center space-x-3 px-5 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                      isActive('/report')
                        ? 'bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-700 shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-secondary-600'
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                    <span className="whitespace-nowrap">Report Issue</span>
                  </Link>
                  <Link
                    to="/my-complaints"
                    className={`flex items-center space-x-3 px-5 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                      isActive('/my-complaints')
                        ? 'bg-gradient-to-r from-accent-100 to-accent-200 text-accent-700 shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-accent-600'
                    }`}
                  >
                    <ClipboardList className="w-5 h-5" />
                    <span>My Complaints</span>
                  </Link>
                </>
              )}

              {user && profile?.role === 'admin' && (
                <>
                  <Link
                    to="/admin"
                    className={`flex items-center justify-center space-x-3 px-5 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                      isActive('/admin')
                        ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }`}
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="whitespace-nowrap">Admin Dashboard</span>
                  </Link>
                  <Link
                    to="/admin/action-panel"
                    className={`flex items-center justify-center space-x-3 px-5 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                      isActive('/admin/action-panel')
                        ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-purple-600'
                    }`}
                  >
                    <Filter className="w-5 h-5" />
                    <span>Action Panel</span>
                  </Link>
                  <Link
                    to="/admin/analytics"
                    className={`flex items-center justify-center space-x-3 px-5 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                      isActive('/admin/analytics')
                        ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-green-600'
                    }`}
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>Analytics</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive('/profile')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <span className="text-sm text-gray-700 flex items-center space-x-2">
                  <span>{profile?.full_name}</span>
                  {profile?.role === 'admin' && (
                    <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                      Admin
                    </span>
                  )}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/home"
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition ${
                  isActive('/home')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Home
              </Link>

              {user && (profile?.role === 'citizen' || !profile?.role) && (
                <>
                  <Link
                    to="/report"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-base font-medium transition ${
                      isActive('/report')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Report Issue</span>
                  </Link>
                  <Link
                    to="/my-complaints"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-base font-medium transition ${
                      isActive('/my-complaints')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ClipboardList className="w-4 h-4" />
                    <span>My Complaints</span>
                  </Link>
                </>
              )}

              {user && profile?.role === 'admin' && (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-base font-medium transition ${
                      isActive('/admin')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                  <Link
                    to="/admin/action-panel"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-base font-medium transition ${
                      isActive('/admin/action-panel')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    <span>Action Panel</span>
                  </Link>
                  <Link
                    to="/admin/analytics"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-base font-medium transition ${
                      isActive('/admin/analytics')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Analytics</span>
                  </Link>
                </>
              )}

              <div className="border-t border-gray-200 pt-3 mt-3">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-base font-medium transition ${
                        isActive('/profile')
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <div className="px-3 py-2 text-sm text-gray-700 flex items-center space-x-2">
                      <span>{profile?.full_name}</span>
                      {profile?.role === 'admin' && (
                        <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                          Admin
                        </span>
                      )}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 transition"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
