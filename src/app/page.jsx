import Link from 'next/link'
import { getStations } from '@/services/stationService'

export const revalidate = 60 // revalidate every 60 seconds

async function getStats() {
  try {
    const stations = await getStations()
    const available = stations.filter(s => s.fuel_status === 'available').length
    return { total: stations.length, available }
  } catch {
    return { total: 0, available: 0 }
  }
}

export default async function HomePage() {
  const stats = await getStats()

  return (
    <div>
      {/* Hero */}
      <section className="py-12 text-center">
        <div className="inline-flex items-center gap-2 bg-fuel-card border border-fuel-border rounded-full px-4 py-1.5 text-xs text-fuel-muted font-medium uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-fuel-green animate-pulse" />
          Live crowd data
        </div>

        <h1 className="font-syne font-extrabold text-5xl md:text-6xl leading-none mb-4">
          Find fuel,<br />
          <span className="text-fuel-accent">skip the queue.</span>
        </h1>

        <p className="text-fuel-muted text-base max-w-sm mx-auto leading-relaxed mb-8">
          Real-time fuel availability across Nigeria, powered by drivers like you.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/stations" className="btn-primary">
            Find Fuel Stations →
          </Link>
          <Link href="/report" className="btn-outline">
            Submit a Report
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-3 mb-10">
        {[
          { value: stats.total, label: 'Stations tracked' },
          { value: stats.available, label: 'With fuel now' },
          { value: '24/7', label: 'Crowd powered' },
        ].map(stat => (
          <div key={stat.label} className="card p-5 text-center flex flex-col items-center justify-center sm:block">
            <div
              className={`font-syne font-extrabold text-fuel-accent mb-1 ${
                stat.value === '24/7' ? 'text-2xl sm:text-3xl' : 'text-3xl'
              }`}
            >
              {stat.value}
            </div>
            <div className="text-xs text-fuel-muted">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section>
        <h2 className="font-syne font-bold text-xl mb-4">How it works</h2>
        <div className="space-y-3">
          {[
            {
              step: '1',
              title: 'Find a station',
              desc: 'Browse stations near you and see live fuel availability and queue length.',
            },
            {
              step: '2',
              title: 'Check the crowd data',
              desc: 'Each station shows the last update time so you know how fresh the info is.',
            },
            {
              step: '3',
              title: 'Submit a report',
              desc: 'Help other drivers by reporting what you see at any station in under 10 seconds.',
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="card p-4 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-fuel-accent text-white font-syne font-bold text-sm flex items-center justify-center flex-shrink-0">
                {step}
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">{title}</h3>
                <p className="text-xs text-fuel-muted leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-xs text-gray-300 py-6">
        FuelSpotter NG · Built for Lagos Drivers.
      </footer>

    </div>
  )
}
