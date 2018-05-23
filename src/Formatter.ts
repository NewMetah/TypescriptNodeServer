// Used to format variable types from request input so it is consistent thru out app.
export class Formatter {
    // Boolean
    public getBoolean(data: any): boolean {
        if (data !== undefined && data != null) {
            const raw = String(data).replace(/\s+/g, '')
            if (String(raw).toUpperCase() === 'Y' || String(raw).toUpperCase() === 'TRUE' || String(raw).toUpperCase() === 'T') return true
            else if (String(raw).toUpperCase() === 'N' || String(raw).toUpperCase() === 'FALSE' || String(raw).toUpperCase() === 'F') return false
            return undefined
        }
        return undefined
    }

    // Date
    public getDate(data: any): Date {
        if (data) {
            const raw = new Date(String(data))
            if (!isNaN(raw.getTime())) return raw
            return undefined
        }
        return undefined
    }

    // Email
    public getEmail(data: any): string {
        if (data) {
            const regEmail = RegExp('^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$')
            const raw = String(data).replace(/\s+/g, '')
            if (regEmail.test(raw)) return raw.toLowerCase()
            return undefined
        }
        return undefined
    }

    // Number
    public getNumber(data: any): number {
        if (data)
            if (!isNaN(parseFloat(data))) return parseFloat(data)
        return undefined
    }

    // Phone - will return pure numerical phone number.
    public getPhone(data: any): string {
        if (data) {
            const raw = String(data).replace(/[\(\)\-\.\s]/g, '').replace(/\+1/g, '')
            if (!isNaN(parseFloat(raw))) return raw
            return undefined
        }
        return undefined
    }

    // Postcode USA - will strip the extra four at end if added.
    public getZipUsa(data: any): string {
        if (data) {
            const raw = String(data).replace(/\-.*/g, '')
            if (!isNaN(parseFloat(raw))) return raw
            return undefined
        }
        return undefined
    }

    // String - will strip trailing and leading space.
    public getString(data: any): string {
        if (data) {
            const raw = String(data).replace(/^\s+|\s+$/g, '')
            if (raw !== '') return raw
            return undefined
        }
        return undefined
    }

    // Website - will strip http* from the beginning of string and will strip trailing and leading space.
    public getWebsite(data: any): string {
        if (data) {
            const regUrl = /^.*\..*$/
            const raw = String(data).replace(/\s+/g, '').replace(RegExp('https:\/\/', 'g'), '').replace(RegExp('http:\/\/', 'g'), '').replace(/\/$/, '')
            if (regUrl.test(raw)) return raw.toLowerCase()
            return undefined
        }
        return undefined
    }
}
