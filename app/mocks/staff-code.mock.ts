import type { IStaffCode } from '~/types'

/**
 * Generate mock data for staff code table
 * Returns 50 rows of employee data with varied information
 */
export const generateStaffCodeMockData = (): IStaffCode[] => {
  const departments = ['Sales', 'HR', 'IT', 'Finance', 'Marketing', 'Operations', 'Production', 'Quality']
  const jobTitles = ['Team Leader', 'Manager', 'Developer', 'Analyst', 'Coordinator', 'Specialist', 'Director', 'Assistant']
  const employmentStatuses: ('Active' | 'On Leave' | 'Resigned')[] = ['Active', 'On Leave', 'Resigned']
  const contractTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary']
  const permissions = ['System Admin', 'Manager', 'User', 'Viewer', 'Editor']
  const banks = ['Shinhan Bank', 'KB Bank', 'Woori Bank', 'Hana Bank', 'NH Bank']
  const firstNames = ['Hong', 'Kim', 'Lee', 'Park', 'Choi', 'Jung', 'Kang', 'Yoon', 'Jang', 'Lim']
  const lastNames = ['Gil-dong', 'Min-su', 'So-young', 'Jae-ho', 'Hye-jin', 'Seung-ho', 'Ji-eun', 'Tae-hyun', 'Mi-kyung', 'Dong-wook']

  const items: IStaffCode[] = []

  for (let i = 0; i < 50; i++) {
    const firstName = firstNames[i % firstNames.length]
    const lastName = lastNames[i % lastNames.length]
    const name = `${firstName} ${lastName}${i > 0 ? i : ''}`
    const email = `${firstName.toLowerCase()}${i}@gmail.com`
    const employeeNo = `E25-${String(i + 1).padStart(4, '0')}`
    const department = departments[i % departments.length]
    const jobTitle = jobTitles[i % jobTitles.length]
    const employmentStatus = employmentStatuses[i % employmentStatuses.length]
    const contractType = contractTypes[i % contractTypes.length]
    const permission = permissions[i % permissions.length]
    const bank = banks[i % banks.length]
    const accountNumber = `${String(i + 1).padStart(4, '0')}-${String(i + 1).padStart(4, '0')}-${String(i + 1).padStart(5, '0')}`
    const depository = `${firstName} ${lastName}`
    const contact = `010${String(i + 10000000).slice(-8)}`

    // Date of hire - varied dates
    const hireYear = 2020 + (i % 5)
    const hireMonth = (i % 12) + 1
    const hireDay = (i % 28) + 1
    const dateOfHire = new Date(hireYear, hireMonth - 1, hireDay).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

    // Exit date - only for resigned employees
    let exitDate = '-'
    if (employmentStatus === 'Resigned') {
      const exitYear = 2024 + (i % 2)
      const exitMonth = (i % 12) + 1
      const exitDay = (i % 28) + 1
      exitDate = new Date(exitYear, exitMonth - 1, exitDay).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    items.push({
      id: `staff-${i + 1}`,
      email,
      employeeNo,
      name,
      department: `${department}${i > 0 ? i : ''}`,
      jobTitle,
      employmentStatus,
      dateOfHire,
      exitDate,
      contact,
      contractTypes: contractType,
      permissions: permission,
      payrollAccountInfo: {
        bankName: bank,
        accountNumber,
        depository
      }
    })
  }

  return items
}

