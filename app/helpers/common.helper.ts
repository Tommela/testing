export const commonHelper = {
  formatMoney: (money: number = 0) => {
    const safeValue = isNaN(money) ? 0 : money
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    })
      .format(safeValue)
      .replace(/\s?₫/, 'đ')
  },

  formatPriceInput: (value?: string) => {
    const data = value?.replace(/,/g, '').replace(/\D/g, '')
    return {
      raw: data || '',
      formatted: data?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') || ''
    }
  },

  copyToClipboard: async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  },

  isEmpty: (value: any) => {
    return (
      value === null || // null
      value === undefined || // undefined
      (typeof value === 'string' && value.trim() === '') || // chuỗi rỗng hoặc toàn dấu cách
      (Array.isArray(value) && value.length === 0) || // mảng rỗng []
      (typeof value === 'object' && Object.keys(value).length === 0) // object rỗng {}
    )
  },

  removeVietnameseTones: (str: string) => {
    if (!str) return ''
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
  }
}
