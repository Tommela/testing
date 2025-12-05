export interface IStaffCode {
  id: string
  email?: string
  employeeNo?: string
  name?: string
  department?: string
  jobTitle?: string
  employmentStatus?: 'Active' | 'On Leave' | 'Resigned'
  dateOfHire?: string
  exitDate?: string
  contact?: string
  contactInfo?: string
  contractTypes?: string
  permissions?: string
  payrollAccountInfo?: {
    bankName?: string
    accountNumber?: string
    depository?: string
  },
  password?: string
}

