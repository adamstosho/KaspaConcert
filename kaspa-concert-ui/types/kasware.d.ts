/**
 * TypeScript declarations for KasWare Wallet
 * Extends the Window interface to include kasware object
 */

export interface KasWareBalance {
  confirmed: number
  unconfirmed: number
  total: number
}

export interface KasWareWallet {
  /**
   * Request permission to access user accounts
   * Opens KasWare popup for user approval
   * @returns Array of account addresses
   */
  requestAccounts(): Promise<string[]>

  /**
   * Get currently connected accounts (no permission request)
   * @returns Array of account addresses
   */
  getAccounts(): Promise<string[]>

  /**
   * Get balance for current account
   * @returns Balance object with confirmed, unconfirmed, and total in sompi
   */
  getBalance(): Promise<KasWareBalance>

  /**
   * Get current network (mainnet, testnet, etc.)
   * @returns Network name
   */
  getNetwork(): Promise<string>

  /**
   * Send KAS to an address
   * Opens KasWare popup for user confirmation
   * @param toAddress - Recipient Kaspa address
   * @param amount - Amount in sompi (1 KAS = 100,000,000 sompi)
   * @returns Transaction hash
   */
  sendKaspa(toAddress: string, amount: number): Promise<string>

  /**
   * Sign a message with the current account
   * @param message - Message to sign
   * @returns Signature
   */
  signMessage(message: string): Promise<string>

  /**
   * Disconnect wallet from current origin
   * @param origin - Origin to disconnect from
   */
  disconnect(origin: string): Promise<void>

  /**
   * Listen for wallet events
   * @param event - Event name ('accountsChanged', 'networkChanged', etc.)
   * @param callback - Event handler
   */
  on(event: string, callback: (...args: any[]) => void): void

  /**
   * Remove event listener
   * @param event - Event name
   * @param callback - Event handler to remove
   */
  removeListener(event: string, callback: (...args: any[]) => void): void
}

declare global {
  interface Window {
    /**
     * KasWare Wallet extension API
     * Available when KasWare extension is installed
     */
    kasware?: KasWareWallet
  }
}

export { }
