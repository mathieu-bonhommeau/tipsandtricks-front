export const formatDateWithTime = (date: string, locale: string) => {
    try {
        return new Date(date).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute:'2-digit'
        })
    } catch {
        return date
    }

}