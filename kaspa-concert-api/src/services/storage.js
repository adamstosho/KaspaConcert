/**
 * Storage Service - File-based persistence using JSON
 * Provides atomic read/write operations for data persistence
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_DIR = path.join(__dirname, '../../data')
console.log('[Storage] Initializing storage at:', DATA_DIR)

/**
 * Ensure data directory exists
 */
export function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        console.log('[Storage] Creating data directory...')
        try {
            fs.mkdirSync(DATA_DIR, { recursive: true })
            console.log('[Storage] Data directory created successfully')
        } catch (err) {
            console.error('[Storage] Failed to create data directory:', err)
        }
    }
}

/**
 * Load data from JSON file
 * @param {string} filename - Name of the file (e.g., 'sessions.json')
 * @returns {any} Parsed JSON data or empty object if file doesn't exist
 */
export function loadData(filename) {
    ensureDataDir()
    const filepath = path.join(DATA_DIR, filename)

    try {
        if (!fs.existsSync(filepath)) {
            return {}
        }
        const content = fs.readFileSync(filepath, 'utf-8')
        return JSON.parse(content)
    } catch (error) {
        console.error(`Failed to load ${filename}:`, error.message)
        return {}
    }
}

/**
 * Save data to JSON file (atomic write using temp file)
 * @param {string} filename - Name of the file (e.g., 'sessions.json')
 * @param {any} data - Data to save (will be JSON.stringify'd)
 */
export function saveData(filename, data) {
    ensureDataDir()
    const filepath = path.join(DATA_DIR, filename)
    const tempPath = filepath + '.tmp'

    try {
        // Write to temp file first
        fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8')
        // Atomic rename
        fs.renameSync(tempPath, filepath)
    } catch (error) {
        console.error(`Failed to save ${filename}:`, error.message)
        // Clean up temp file if it exists
        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath)
        }
    }
}
