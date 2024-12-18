// authLogger.ts
const LOG_STORAGE_KEY = 'auth_debug_logs'
const MAX_LOGS = 1000 // Maximum number of log entries to keep

interface LogEntry {
    timestamp: string
    type: 'info' | 'error' | 'warn'
    message: string
    data?: any
}

class AuthLogger {
    private logs: LogEntry[] = []

    constructor() {
        this.loadLogs()
    }

    private loadLogs() {
        const savedLogs = localStorage.getItem(LOG_STORAGE_KEY)
        if (savedLogs) {
            try {
                this.logs = JSON.parse(savedLogs)
            } catch (e) {
                console.error('Failed to parse saved logs:', e)
                this.logs = []
            }
        }
    }

    private saveLogs() {
        try {
            localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(this.logs))
        } catch (e) {
            console.error('Failed to save logs:', e)
        }
    }

    private addLog(type: 'info' | 'error' | 'warn', message: string, data?: any) {
        const entry: LogEntry = {
            timestamp: new Date().toISOString(),
            type,
            message,
            data: data ? this.sanitizeData(data) : undefined
        }

        this.logs.push(entry)
        if (this.logs.length > MAX_LOGS) {
            this.logs.shift() // Remove oldest log if we exceed max
        }

        // Always log to console as well
        console[type](message, data)

        this.saveLogs()
    }

    private sanitizeData(data: any): any {
        try {
            // Convert to JSON and back to remove circular references
            return JSON.parse(JSON.stringify(data))
        } catch (e) {
            console.error('Failed to parse sanitizeData:', e)
            return '[Circular or Invalid Data]'
        }
    }

    info(message: string, data?: any) {
        this.addLog('info', message, data)
    }

    error(message: string, data?: any) {
        this.addLog('error', message, data)
    }

    warn(message: string, data?: any) {
        this.addLog('warn', message, data)
    }

    getLogs(): LogEntry[] {
        return [...this.logs]
    }

    clearLogs() {
        this.logs = []
        localStorage.removeItem(LOG_STORAGE_KEY)
    }

    exportLogs(): string {
        return JSON.stringify(this.logs, null, 2)
    }
}

export const authLogger = new AuthLogger();