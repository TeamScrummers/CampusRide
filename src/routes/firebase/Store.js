import {  } from '../matching/User.js'
import { User } from '../matching/User.js';
import { Trip } from '../matching/Trip.js';
import { writable } from 'svelte/store'

export const storedID = writable('Loading...')
export const storedLocation = writable('Loading...')
export const destinationCoords = writable('Loading...')
export const latestArrival = writable('Loading...')
export const userCoords = writable('Loading...')
export const driverCoords = writable('Loading...')
export const appMode = writable('N/A') // 4 possible states: N/A (error), Available, Searching, Taken 
export const userObj = writable('')

// These should be offloaded to the database at a later date.
export const matchMakingPool = writable([])
