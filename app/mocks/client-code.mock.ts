import type { ClientCode } from '~/types/models/baseline-information-management/client-code.model'

/**
 * Generate mock data for client code table
 * Returns 48 rows of client data with varied information
 */
export const generateClientCodeMockData = (): ClientCode[] => {
  const clientTypes = ['의류브랜드', '패션몰', '소매점', '도매업체', '온라인마켓', '오프라인매장']
  const companyNames = ['고객사A', '고객사B', '고객사C', '패션하우스', '스타일샵', '트렌드코', '모던스타일', '엘레강스']
  const brandNames = ['브랜드A', '브랜드B', '브랜드C', '스타일라인', '트렌드라인', '모던라인', '엘레강스라인', '프리미엄라인']
  const clientTiers = ['브론즈', '실버', '골드', '플래티넘', '다이아몬드']
  const platforms = [
    ['Musina', '29cm', 'Brandi'],
    ['Queenit', 'Ably', 'Zigzag'],
    ['Seoulstore', 'Codybook', 'Onthelook'],
    ['Lookpin', 'Acloset', 'Musina'],
    ['29cm', 'Brandi', 'Queenit']
  ]
  const addresses = [
    '서울 특별시 강남구 테헤란로 123, 4층 406호',
    '서울 특별시 서초구 서초대로 456, 5층 501호',
    '서울 특별시 송파구 올림픽로 789, 2층 201호',
    '부산광역시 해운대구 해운대해변로 321, 10층 1001호',
    '인천광역시 연수구 송도과학로 654, 3층 301호'
  ]
  const salesUrls = ['www.recoveric.com', 'www.fashionhub.com', 'www.stylezone.com', 'www.trendmall.com', 'www.modernstyle.com']
  const contactNames = ['이순영', '김민수', '박지영', '최성호', '정혜진', '강태현', '윤미경', '장동욱']
  const titles = ['팀장', '대리', '과장', '차장', '부장', '이사', '상무', '전무']
  const contacts = ['010-1234-5678', '010-2345-6789', '010-3456-7890', '010-4567-8901', '010-5678-9012']
  const emails = ['company@gmail.com', 'info@company.com', 'contact@company.com', 'sales@company.com', 'support@company.com']
  const referrers = ['수아레/수아레 김수영 010-1234-5678', '추천인A/추천인A 홍길동 010-1111-2222', '추천인B/추천인B 이순신 010-3333-4444']

  const items: ClientCode[] = []

  for (let i = 0; i < 48; i++) {
    const businessRegNo = `123-${String(45 + i).padStart(2, '0')}-${String(67890 + i).padStart(5, '0')}`
    const clientType = clientTypes[i % clientTypes.length]
    const companyName = `${companyNames[i % companyNames.length]}${i > 0 ? i : ''}`
    const brandName = `${brandNames[i % brandNames.length]}${i > 0 ? i : ''}`
    const tier = clientTiers[i % clientTiers.length]
    const platform = platforms[i % platforms.length]
    const address = addresses[i % addresses.length]
    const salesUrl = salesUrls[i % salesUrls.length]
    const contactName = contactNames[i % contactNames.length]
    const title = titles[i % titles.length]
    const contact = contacts[i % contacts.length]
    const email = emails[i % emails.length]
    const referrer = referrers[i % referrers.length]

    // Join date - varied dates
    const joinYear = 2023 + (i % 3)
    const joinMonth = (i % 12) + 1
    const joinDay = (i % 28) + 1
    const joinDate = `${String(joinDay).padStart(2, '0')}.${String(joinMonth).padStart(2, '0')}.${joinYear}`

    // Last accessed - recent dates
    const lastYear = 2025
    const lastMonth = (i % 12) + 1
    const lastDay = (i % 28) + 1
    const lastAccessed = `${String(lastDay).padStart(2, '0')}.${String(lastMonth).padStart(2, '0')}.${lastYear}`

    // Map values to dropdown-compatible format
    // For dropdowns that use "raw-a", "raw-b", "raw-c" pattern, we'll use the actual values
    // but ensure they match what the form expects
    const clientCategoryValue = clientType // Use actual client type
    const clientTierValue = tier // Use actual tier
    const businessRegNoValue = businessRegNo // Use actual business reg number
    const businessLicenseValue = `license-${i + 1}` // Generate license value
    const representativeTitleValue = title // Use actual title
    const groupChatAgreementValue = i % 2 === 0 ? 'Y' : 'N' // Use Y or N
    const brandValue = brandName // Use actual brand name

    items.push({
      id: `client-${i + 1}`,
      businessRegistrationNumber: businessRegNo,
      businessRegisterationNo: businessRegNoValue, // For dropdown
      clientType,
      clientCategory: clientCategoryValue, // For dropdown
      companyName,
      brandName,
      clientTiers: clientTierValue, // For dropdown
      mainSalesChannel: {
        market: i % 3 === 0,
        officialMall: i % 4 === 0,
        platform: platform,
        others: i % 5 === 0,
        othersText: i % 5 === 0 ? '기타 플랫폼' : ''
      },
      headOfficeAddress: address,
      salesUrl,
      companyEmail: email,
      contactName,
      representativeTitle: representativeTitleValue, // For dropdown
      contactPerson: contact,
      contactInfo: `${contactName} (${title}) ${contact} ${email}`,
      referrer,
      groupChatAgreement: groupChatAgreementValue, // For dropdown
      password: `password${i + 1}`, // Add password for form
      businessLicense: businessLicenseValue, // For dropdown
      joinDate,
      lastAccessed,
      company: companyName,
      brand: brandValue, // For dropdown
      name: contactName,
      contact: contact
    })
  }

  return items
}

