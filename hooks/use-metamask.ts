"use client"

import { useState, useEffect, useCallback } from "react"
import { ethers } from "ethers"

interface MetaMaskState {
  isConnected: boolean
  account: string | null
  isLoading: boolean
  error: string | null
  balance: string | null
  isOnCorrectNetwork: boolean
}

const BLOCKDAG_TESTNET = {
  chainId: "0x413", // 24171 in hex (BlockDAG Alpha testnet chain ID)
  chainName: "BlockDAG Primordial Testnet",
  nativeCurrency: {
    name: "BlockDAG Token",
    symbol: "BDAG",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.primordial.bdagscan.com"],
  blockExplorerUrls: ["https://bdagscan.com/"],
}

let isNetworkOperationPending = false

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (accounts: string[]) => void) => void
      removeListener: (event: string, callback: (accounts: string[]) => void) => void
      isMetaMask?: boolean
    }
  }
}

export function useMetaMask() {
  const [state, setState] = useState<MetaMaskState>({
    isConnected: false,
    account: null,
    isLoading: false,
    error: null,
    balance: null,
    isOnCorrectNetwork: false,
  })

  const checkNetwork = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) return false

    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" })
      const currentChainId = Number.parseInt(chainId, 16)
      const targetChainId = Number.parseInt(BLOCKDAG_TESTNET.chainId, 16)
      console.log(`[v0] Current chain: ${currentChainId}, Target chain: ${targetChainId}`)
      return currentChainId === targetChainId
    } catch (error) {
      console.error("[v0] Failed to check network:", error)
      return false
    }
  }, [])

  const switchToBlockDAGTestnet = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) return false

    if (isNetworkOperationPending) {
      console.log("[v0] Network operation already pending, waiting...")
      let attempts = 0
      while (isNetworkOperationPending && attempts < 30) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        attempts++
      }
      return await checkNetwork()
    }

    isNetworkOperationPending = true

    try {
      console.log("[v0] Attempting to switch to BlockDAG testnet...")
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BLOCKDAG_TESTNET.chainId }],
      })
      console.log("[v0] Successfully switched to BlockDAG testnet")

      // Wait for network switch to complete
      await new Promise<void>((resolve) => {
        const handler = (chainId: string) => {
          if (Number.parseInt(chainId, 16) === Number.parseInt(BLOCKDAG_TESTNET.chainId, 16)) {
            window.ethereum?.removeListener("chainChanged", handler)
            resolve()
          }
        }
        window.ethereum?.on("chainChanged", handler)
        setTimeout(() => {
          window.ethereum?.removeListener("chainChanged", handler)
          resolve()
        }, 3000)
      })

      return true
    } catch (switchError: any) {
      console.log("[v0] Switch error code:", switchError.code)
      if (switchError.code === 4902) {
        try {
          console.log("[v0] Adding BlockDAG testnet...")
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [BLOCKDAG_TESTNET],
          })
          console.log("[v0] Successfully added BlockDAG testnet")
          return true
        } catch (addError: any) {
          console.error("[v0] Failed to add BlockDAG testnet:", addError)
          if (addError.code === 4001) {
            throw new Error("Please approve adding BlockDAG testnet to MetaMask to continue")
          }
          return false
        }
      }
      if (switchError.code === 4001) {
        throw new Error("Please approve switching to BlockDAG testnet to continue")
      }
      console.error("[v0] Failed to switch to BlockDAG testnet:", switchError)
      return false
    } finally {
      isNetworkOperationPending = false
    }
  }, [checkNetwork])

  const checkConnection = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) return

    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" })
      const isOnCorrectNetwork = await checkNetwork()

      if (accounts.length > 0) {
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        })

        const bdagBalance = ethers.formatEther(balance)

        setState((prev) => ({
          ...prev,
          isConnected: true,
          account: accounts[0],
          balance: Number.parseFloat(bdagBalance).toFixed(8),
          isOnCorrectNetwork,
          error: null,
        }))
      } else {
        setState((prev) => ({
          ...prev,
          isConnected: false,
          account: null,
          balance: null,
          isOnCorrectNetwork,
          error: null,
        }))
      }
    } catch (error) {
      console.error("[v0] Failed to check connection:", error)
      setState((prev) => ({ ...prev, error: "Failed to check connection" }))
    }
  }, [checkNetwork])

  const connect = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setState((prev) => ({ ...prev, error: "MetaMask not installed" }))
      return
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const isOnCorrectNetwork = await checkNetwork()
      if (!isOnCorrectNetwork) {
        console.log("[v0] Not on correct network, switching...")
        try {
          const networkSwitched = await switchToBlockDAGTestnet()
          if (!networkSwitched) {
            setState((prev) => ({
              ...prev,
              isLoading: false,
              error:
                "Failed to switch to BlockDAG testnet. Please add and switch to BlockDAG testnet manually in MetaMask.",
            }))
            return
          }
          await checkConnection()
        } catch (networkError: any) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: networkError.message || "Failed to switch to BlockDAG testnet",
          }))
          return
        }
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length > 0) {
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        })

        const bdagBalance = ethers.formatEther(balance)

        setState((prev) => ({
          ...prev,
          isConnected: true,
          account: accounts[0],
          balance: Number.parseFloat(bdagBalance).toFixed(8),
          isOnCorrectNetwork: true,
          isLoading: false,
          error: null,
        }))
      }
    } catch (error) {
      console.error("[v0] Connection error:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to connect",
      }))
    }
  }, [switchToBlockDAGTestnet, checkNetwork, checkConnection])

  const disconnect = useCallback(() => {
    setState({
      isConnected: false,
      account: null,
      isLoading: false,
      error: null,
      balance: null,
      isOnCorrectNetwork: false,
    })
  }, [])

  const sendPayment = useCallback(
    async (amount: string) => {
      if (typeof window === "undefined" || !window.ethereum || !state.account) {
        throw new Error("MetaMask not connected")
      }

      console.log(`[v0] Starting payment process for ${amount} BDAG`)

      const isOnCorrectNetwork = await checkNetwork()
      if (!isOnCorrectNetwork) {
        console.log("[v0] Switching to BlockDAG testnet...")
        const switched = await switchToBlockDAGTestnet()
        if (!switched) throw new Error("Please switch to BlockDAG testnet to complete payment")
        await checkConnection()
      }

      try {
        console.log(`[v0] Sending payment of ${amount} BDAG`)

        const amountInWei = ethers.parseEther(amount)
        console.log("[v0] Amount in wei:", amountInWei.toString())

        const recipientAddress = "0xc9cD17b37B376490588EE03e4A305c5FD6962964"
        let recipient: string
        try {
          recipient = ethers.getAddress(recipientAddress)
          console.log("[v0] Normalized recipient address:", recipient)
        } catch (addressError) {
          console.error("[v0] Invalid recipient address:", addressError)
          throw new Error("Invalid recipient address - please contact support")
        }

        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()

        const balance = await provider.getBalance(state.account)
        console.log("[v0] Current balance:", ethers.formatEther(balance), "BDAG")

        if (balance < amountInWei) {
          throw new Error(
            `Insufficient BDAG balance. You have ${ethers.formatEther(balance)} BDAG but need ${amount} BDAG`,
          )
        }

        const feeData = await provider.getFeeData()
        console.log("[v0] Network fee data:", {
          gasPrice: feeData.gasPrice?.toString(),
          maxFeePerGas: feeData.maxFeePerGas?.toString(),
          maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.toString(),
        })

        const gasEstimate = await provider.estimateGas({
          to: recipient,
          value: amountInWei,
          from: state.account,
        })
        console.log("[v0] Gas estimate:", gasEstimate.toString())

        console.log("[v0] Sending transaction...")
        const tx = await signer.sendTransaction({
          to: recipient,
          value: amountInWei,
        })

        console.log("[v0] Transaction sent, hash:", tx.hash)

        const receipt = await tx.wait()
        console.log("[v0] Transaction confirmed in block:", receipt?.blockNumber)

        await checkConnection()
        return tx.hash
      } catch (error: any) {
        console.error("[v0] Payment error:", error)

        if (error.code === 4001) {
          throw new Error("Transaction rejected by user")
        } else if (error.code === -32603) {
          throw new Error("Network error - please try again or check your connection")
        } else if (error.code === -32000) {
          throw new Error("Insufficient funds for gas")
        } else if (error.message?.includes("insufficient funds")) {
          throw new Error("Insufficient BDAG balance for transaction and gas fees")
        } else {
          throw new Error(error.message || "Payment failed - please try again")
        }
      }
    },
    [state.account, checkNetwork, switchToBlockDAGTestnet, checkConnection],
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    checkConnection()

    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("[v0] Accounts changed:", accounts)
        if (accounts.length === 0) {
          disconnect()
        } else {
          checkConnection()
        }
      }

      const handleChainChanged = (chainId: string) => {
        console.log("[v0] Chain changed to:", chainId, "(" + Number.parseInt(chainId, 16) + ")")
        checkConnection()
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum?.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum?.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [checkConnection, disconnect])

  return {
    ...state,
    connect,
    disconnect,
    sendPayment,
    switchToSomniaTestnet: switchToBlockDAGTestnet,
    isMetaMaskInstalled: typeof window !== "undefined" && !!window.ethereum,
  }
}
