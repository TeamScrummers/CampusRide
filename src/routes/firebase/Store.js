import { writable, readable } from 'svelte/store'

export const storedID = writable('Loading...')
export const passengerLocation = writable('Loading...')
export const driverLocation = writable('Loading...')
export const storedLocation = writable('Loading...')
export const destinationCoords = writable('Loading...')
export const latestArrival = writable('Loading...')
export const userCoords = writable('Loading...')
export const driverCoords = writable('Loading...')
export const appMode = writable('N/A') // 4 possible states: N/A (error), Available, Searching, Taken 
export const userObj = writable('')

// Hacky
export const fareStore = writable(5.32)
export const tempA = writable('Loading...')
export const tempB = writable('Loading...')

// These should be offloaded to the database at a later date.
export const matchMakingPool = writable([])
export const waitingPool = writable([])
export const storedPair = writable([])
