/**
 * KasWare Wallet Integration
 * Real Kaspa wallet connection using KasWare browser extension
 * Replaces mock wallet with actual blockchain functionality
 */

// KasWare wallet interface (injected by extension)
interface KasWareWallet {
    requestAccounts: () => Promise<string[]>
    getAccounts: () => Promise<string[]>
    getBalance: () => Promise<{ confirmed: number; unconfirmed: number; total: number }>
    getNetwork: () => Promise<string>
    sendKaspa: (toAddress: string, amount: number) => Promise<string>
    signMessage: (message: string) => Promise<string>
    on: (event: string, callback: (...args: any[]) => void) => void
    removeListener: (event: string, callback: (...args: any[]) => void) => void
}

declare global {
    interface Window {
        kasware?: KasWareWallet
    }
}

export interface KasWareConnection {
    address: string
    balance: number
    network: string
}

/**
 * Check if KasWare wallet extension is installed
 */
export function isKasWareInstalled(): boolean {
    return typeof window !== 'undefined' && typeof window.kasware !== 'undefined'
}

/**
 * Connect to KasWare wallet
 * Requests user permission and returns account info
 */
export async function connectKasWare(): Promise<KasWareConnection> {
    if (!isKasWareInstalled()) {
        throw new Error('KasWare wallet not installed. Please install from https://kasware.xyz')
    }

    try {
        // Request account access
        const accounts = await window.kasware!.requestAccounts()

        if (!accounts || accounts.length === 0) {
            throw new Error('No accounts found. Please create a wallet in KasWare.')
        }

        const address = accounts[0]

        // Get balance
        const balanceData = await window.kasware!.getBalance()
        const balance = balanceData.total / 100000000 // Convert from sompi to KAS

        // Get network
        const network = await window.kasware!.getNetwork()

        return {
            address,
            balance,
            network,
        }
    } catch (error) {
        if (error instanceof Error) {
            // User rejected the connection
            if (error.message.includes('User rejected') || error.message.includes('rejected')) {
                throw new Error('Connection rejected. Please approve the connection in KasWare.')
            }
            // Network or WebSocket errors
            if (error.message.includes('WebSocket') || error.message.includes('network')) {
                throw new Error(`Network error: ${error.message}. Please check that KasWare is on the correct network (Testnet 10).`)
            }
            // Preserve the original error message for debugging
            throw new Error(`KasWare error: ${error.message}`)
        }
        throw new Error('Failed to connect to KasWare wallet')
    }
}

/**
 * Get current connected accounts (if any)
 * Does not trigger permission request
 */
export async function getKasWareAccounts(): Promise<string[]> {
    if (!isKasWareInstalled()) {
        return []
    }

    try {
        return await window.kasware!.getAccounts()
    } catch (error) {
        console.error('Failed to get KasWare accounts:', error)
        return []
    }
}

/**
 * Get balance for connected account
 */
export async function getKasWareBalance(): Promise<number> {
    if (!isKasWareInstalled()) {
        throw new Error('KasWare wallet not installed')
    }

    try {
        const balanceData = await window.kasware!.getBalance()

        // Handle null or invalid response
        if (!balanceData || typeof balanceData.total !== 'number') {
            console.warn('KasWare returned invalid balance data:', balanceData)
            return 0
        }

        return balanceData.total / 100000000 // Convert from sompi to KAS
    } catch (error) {
        console.error('Failed to get balance:', error)
        throw new Error('Failed to get wallet balance')
    }
}

/**
 * Send KAS tip to creator
 * @param toAddress - Creator's Kaspa address
 * @param amount - Amount in KAS (not sompi)
 * @returns Transaction hash
 */
export async function sendKasTip(toAddress: string, amount: number): Promise<string> {
    if (!isKasWareInstalled()) {
        throw new Error('KasWare wallet not installed')
    }

    if (!toAddress || !isValidKaspaAddress(toAddress)) {
        throw new Error('Invalid Kaspa address')
    }

    if (amount <= 0) {
        throw new Error('Amount must be greater than 0')
    }

    try {
        // KasWare expects amount in sompi (1 KAS = 100,000,000 sompi)
        const amountInSompi = Math.floor(amount * 100000000)

        // Send transaction (KasWare will prompt user for confirmation)
        const txHash = await window.kasware!.sendKaspa(toAddress, amountInSompi)

        return txHash
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('User rejected')) {
                throw new Error('Transaction rejected by user')
            }
            if (error.message.includes('Insufficient')) {
                throw new Error('Insufficient balance')
            }
            throw error
        }
        throw new Error('Failed to send transaction')
    }
}

/**
 * Listen for account changes
 */
export function onAccountsChanged(callback: (accounts: string[]) => void): () => void {
    if (!isKasWareInstalled()) {
        return () => { }
    }

    const handler = (accounts: string[]) => {
        callback(accounts)
    }

    window.kasware!.on('accountsChanged', handler)

    // Return cleanup function
    return () => {
        window.kasware!.removeListener('accountsChanged', handler)
    }
}

/**
 * Listen for network changes
 */
export function onNetworkChanged(callback: (network: string) => void): () => void {
    if (!isKasWareInstalled()) {
        return () => { }
    }

    const handler = (network: string) => {
        callback(network)
    }

    window.kasware!.on('networkChanged', handler)

    // Return cleanup function
    return () => {
        window.kasware!.removeListener('networkChanged', handler)
    }
}

/**
 * Format Kaspa address for display (shorten middle)
 */
export function formatKaspaAddress(address: string, startChars = 10, endChars = 8): string {
    if (!address) return ''
    if (address.length <= startChars + endChars) return address

    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`
}

/**
 * Validate Kaspa address format
 */
export function isValidKaspaAddress(address: string): boolean {
    if (!address) return false

    // Kaspa addresses start with "kaspa:" or "kaspatest:" etc.
    const prefixRegex = /^kaspa(test|dev|sim)?:/
    if (!prefixRegex.test(address)) return false

    // Length check (Testnet addresses can be longer)
    if (address.length < 50 || address.length > 90) return false

    // Check for valid characters (base58 - roughly)
    // allowing the prefix part + valid payload
    const fullRegex = /^kaspa(test|dev|sim)?:[a-z0-9]+$/
    return fullRegex.test(address)
}

/**
 * Get Kaspa explorer URL for transaction
 */
export function getExplorerUrl(txHash: string, network: string = 'mainnet'): string {
    if (network === 'testnet' || network.includes('tn')) {
        return `https://explorer-tn10.kaspa.org/txs/${txHash}`
    }
    return `https://explorer.kaspa.org/txs/${txHash}`
}

/**
 * Convert KAS to Sompi
 */
export function kasToSompi(kas: number): number {
    return Math.floor(kas * 100000000)
}

/**
 * Convert Sompi to KAS
 */
export function sompiToKas(sompi: number): number {
    return sompi / 100000000
}
