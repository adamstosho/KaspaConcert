/**
 * Tip Service - Store and retrieve tip records
 * Persists tips to data/tips.json
 */

import { loadData, saveData } from './storage.js'

const TIPS_FILE = 'tips.json'

// In-memory cache: { sessionId: [tip1, tip2, ...] }
let tipsCache = {}

/**
 * Load tips from disk on startup
 */
export function loadTips() {
    tipsCache = loadData(TIPS_FILE)
    console.log(`Loaded ${Object.keys(tipsCache).length} session(s) with tips from storage`)
}

/**
 * Save tips to disk
 */
function saveTips() {
    saveData(TIPS_FILE, tipsCache)
}

/**
 * Record a tip (pending or confirmed)
 * @param {string} sessionId
 * @param {object} tip - { tipId, amount, from, txHash, status, timestamp }
 */
export function recordTip(sessionId, tip) {
    if (!tipsCache[sessionId]) {
        tipsCache[sessionId] = []
    }

    // Check if tip already exists (by tipId)
    const existingIndex = tipsCache[sessionId].findIndex(t => t.tipId === tip.tipId)

    if (existingIndex >= 0) {
        // Update existing tip (e.g., pending -> confirmed)
        tipsCache[sessionId][existingIndex] = { ...tipsCache[sessionId][existingIndex], ...tip }
    } else {
        // Add new tip
        tipsCache[sessionId].push(tip)
    }

    saveTips()
}

/**
 * Get all tips for a session
 * @param {string} sessionId
 * @returns {array} Array of tip objects
 */
export function getTips(sessionId) {
    return tipsCache[sessionId] || []
}

/**
 * Get all tips (for debugging)
 * @returns {object} All tips by session
 */
export function getAllTips() {
    return tipsCache
}
