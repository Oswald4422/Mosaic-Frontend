import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CalendarIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Event Discovery',
    description: 'Find and join exciting events happening around you.',
    icon: SparklesIcon,
  },
  {
    name: 'Easy Registration',
    description: 'Simple one-click registration for any event.',
    icon: UserGroupIcon,
  },
  {
    name: 'Event Management',
    description: 'Create and manage your own events with ease.',
    icon: CalendarIcon,
  },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="relative isolate">
      {/* Background */}
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-accent-200 opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="animate-fade-in text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="block">Welcome to</span>
              <span className="mt-2 block bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                Mosaic
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 animate-slide-up">
              Discover. Engage. Belong.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-slide-up">
              {user ? (
                <>
                  <Link
                    to="/events"
                    className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-200 hover:scale-105"
                  >
                    Browse Events
                  </Link>
                  <Link
                    to="/profile"
                    className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors duration-200"
                  >
                    View Profile <span aria-hidden="true">→</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-200 hover:scale-105"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors duration-200"
                  >
                    Log in <span aria-hidden="true">→</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Discover Amazing Events
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Join a vibrant community of event organizers and attendees. Create, discover, and participate in events that matter to you.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Background decoration */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary-200 to-accent-200 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
}
