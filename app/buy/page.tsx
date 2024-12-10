'use client'

import {useEffect, useRef} from 'react'

type RampSDK = {
    show: () => void
    close: () => void
}

export default function Buy() {
    const rampContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = rampContainerRef.current
        if (!container) return

        const initRamp = async () => {
            try {
                const { RampInstantSDK } = await import('@ramp-network/ramp-instant-sdk')

                return new RampInstantSDK({
                    hostAppName: 'Your App',
                    hostLogoUrl: 'https://assets.ramp.network/misc/test-logo.png',
                    hostApiKey: 'your_host_api_key',
                    variant: 'embedded-desktop',
                    containerNode: container,
                })
            } catch (error) {
                console.error('Failed to load Ramp widget:', error)
            }
        }

        let rampInstance: any = null
        initRamp().then(widget => {

            rampInstance = widget
        })

        return () => {
            if (rampInstance) {
                rampInstance.close()
            }
        }
    }, [])

    return (
        <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">Buy</h1>
            <div
                ref={rampContainerRef}
                className="w-[895px] h-[600px] rounded-lg border border-gray-200 bg-background"
            />
        </div>
    )
}