import { supabase } from './supabaseClient'

/**
 * Fetch all stations, ordered by last_updated descending.
 */
export async function getStations() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('stations')
    .select('*')
    .order('last_updated', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Fetch a single station by ID.
 */
export async function getStationById(id) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }
  const { data, error } = await supabase
    .from('stations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

/**
 * Submit a crowd report and update the station's current status.
 * Runs as two operations: insert report + update station.
 */
export async function submitReport({ stationId, fuelStatus, queueLength, comment }) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }
  // 1. Insert into reports table
  const { error: reportError } = await supabase.from('reports').insert({
    station_id: stationId,
    fuel_status: fuelStatus,
    queue_length: queueLength,
    comment: comment || null,
  })

  if (reportError) throw reportError

  // 2. Update the station's current status and last_updated timestamp
  const { error: stationError } = await supabase
    .from('stations')
    .update({
      fuel_status: fuelStatus,
      queue_length: queueLength,
      last_updated: new Date().toISOString(),
    })
    .eq('id', stationId)

  if (stationError) throw stationError
}

/**
 * Get the report count for each station (for reliability indicator).
 */
export async function getReportCounts() {
  if (!supabase) return {}
  const { data, error } = await supabase
    .from('reports')
    .select('station_id')

  if (error) throw error

  // Count reports per station
  return data.reduce((acc, row) => {
    acc[row.station_id] = (acc[row.station_id] || 0) + 1
    return acc
  }, {})
}

/**
 * Subscribe to real-time station updates.
 * Returns the subscription channel so you can unsubscribe later.
 */
export function subscribeToStations(callback) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }
  return supabase
    .channel('stations-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'stations' }, callback)
    .subscribe()
}
