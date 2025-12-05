export const tableHelper = {
  getMaxHeightYarnCodeTableClass: () => {
    // 363 = HEIGHT_HEADER * 2 + HEIGHT_FILTER + HEIGHT_ACTION + GAP_SPACE
    // 363 = (76 * 2) + 55 + 36 + 120
    const maxHeightClass = `xl:max-h-[calc(100vh-363px)]`
    return maxHeightClass
  },
  getMaxHeightItemCodeTableClass: () => {
    // Same calculation as yarn-code table
    const maxHeightClass = `xl:max-h-[calc(100vh-363px)]`
    return maxHeightClass
  },
  getMaxHeightStaffCodeTableClass: () => {
    // Same calculation as yarn-code and item-code table
    const maxHeightClass = `xl:max-h-[calc(100vh-363px)]`
    return maxHeightClass
  },
  getMaxHeightBusinessCodeTableClass: () => {
    // Same calculation as other tables
    const maxHeightClass = `xl:max-h-[calc(100vh-363px)]`
    return maxHeightClass
  }
}
