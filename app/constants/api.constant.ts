export const API_ENDPOINT = {
  AUTH: 'auth',
  CART: 'carts',
  INTRODUCE: 'introduce',
  YARN: 'yarn',
  CATEGORY: 'category',
  LOGIN: 'login',
  STAFF: 'staff',
  HR_INFORMATION: 'hrinfo',
  BUSINESS_CATEGORY: 'business_categories'
}

export const API_AUTH = {
  LOGIN: {
    URL: `${API_ENDPOINT.AUTH}/login`,
    KEY: [API_ENDPOINT.AUTH, 'login']
  },
  REGISTER: {
    URL: `${API_ENDPOINT.AUTH}/register`,
    KEY: [API_ENDPOINT.AUTH, 'register']
  }
}

export const API_CART = {
  ADD_TO_CART: {
    URL: 'add-to-cart',
    KEY: [API_ENDPOINT.CART, 'addToCart']
  }
}

export const API_INTRODUCE = {
  GET_LIST: {
    URL: `${API_ENDPOINT.INTRODUCE}`,
    KEY: [API_ENDPOINT.INTRODUCE, 'getList']
  },
  CREATE: {
    URL: `${API_ENDPOINT.INTRODUCE}`,
    KEY: [API_ENDPOINT.INTRODUCE, 'create']
  }
}

export const API_LOGIN = {
  SIGN_IN: {
    URL: `/api/${API_ENDPOINT.LOGIN}`,
    KEY: [API_ENDPOINT.LOGIN, 'signIn']
  }
}

export const API_YARN = {
  GET_ALL: {
    URL: `/api/${API_ENDPOINT.YARN}`,
    KEY: [API_ENDPOINT.YARN, 'getAll']
  },
  GET_DETAIL: {
    URL: (id: string) => `/api/${API_ENDPOINT.YARN}/${id}`,
    KEY: [API_ENDPOINT.YARN, 'getDetail']
  },
  GET_UNIQUE_NAMES: {
    URL: `/api/${API_ENDPOINT.YARN}/unique/name`,
    KEY: [API_ENDPOINT.YARN, 'getUniqueNames']
  },
  GET_UNIQUE_COLORS: {
    URL: `/api/${API_ENDPOINT.YARN}/unique/color`,
    KEY: [API_ENDPOINT.YARN, 'getUniqueColors']
  },
  CREATE: {
    URL: `/api/${API_ENDPOINT.YARN}`,
    KEY: [API_ENDPOINT.YARN, 'create']
  },
  UPDATE: {
    URL: `/api/${API_ENDPOINT.YARN}`,
    KEY: [API_ENDPOINT.YARN, 'update']
  },
  DELETE: {
    URL: (id: string) => `/api/${API_ENDPOINT.YARN}/${id}`,
    KEY: [API_ENDPOINT.YARN, 'delete']
  },
  DELETE_MULTI: {
    URL: `/api/${API_ENDPOINT.YARN}/delete/multi`,
    KEY: [API_ENDPOINT.YARN, 'deleteMulti']
  }
}

export const API_CATEGORY = {
  GET_ALL: {
    URL: `/api/${API_ENDPOINT.CATEGORY}`,
    KEY: [API_ENDPOINT.CATEGORY, 'getAll']
  },
  GET_DETAIL: {
    URL: (id: string) => `/api/${API_ENDPOINT.CATEGORY}/${id}`,
    KEY: [API_ENDPOINT.CATEGORY, 'getDetail']
  },
  CREATE: {
    URL: `/api/${API_ENDPOINT.CATEGORY}`,
    KEY: [API_ENDPOINT.CATEGORY, 'create']
  },
  UPDATE: {
    URL: `/api/${API_ENDPOINT.CATEGORY}`,
    KEY: [API_ENDPOINT.CATEGORY, 'update']
  },
  DELETE: {
    URL: (id: string) => `/api/${API_ENDPOINT.CATEGORY}/${id}`,
    KEY: [API_ENDPOINT.CATEGORY, 'delete']
  }
}

export const API_STAFF = {
  GET_ALL: {
    URL: `/api/${API_ENDPOINT.STAFF}`,
    KEY: [API_ENDPOINT.STAFF, 'getAll']
  },
  GET_DETAIL: {
    URL: (id: string) => `/api/${API_ENDPOINT.STAFF}/${id}`,
    KEY: [API_ENDPOINT.STAFF, 'getDetail']
  },
  CREATE: {
    URL: `/api/${API_ENDPOINT.STAFF}`,
    KEY: [API_ENDPOINT.STAFF, 'create']
  },
  UPDATE: {
    URL: `/api/${API_ENDPOINT.STAFF}`,
    KEY: [API_ENDPOINT.STAFF, 'update']
  },
  DELETE: {
    URL: (id: string) => `/api/${API_ENDPOINT.STAFF}/${id}`,
    KEY: [API_ENDPOINT.STAFF, 'delete']
  },
  GET_UNIQUE_NAME: {
    URL: `/api/${API_ENDPOINT.STAFF}/unique/name`,
    KEY: [API_ENDPOINT.STAFF, 'getUniqueName']
  },
  GET_UNIQUE_EMPNO: {
    URL: `/api/${API_ENDPOINT.STAFF}/unique/empno`,
    KEY: [API_ENDPOINT.STAFF, 'getUniqueEmpno']
  }
}

export const API_HR_INFORMATION = {
  GET_TYPE_ALL: {
    URL: `/api/${API_ENDPOINT.HR_INFORMATION}/type/all`,
    KEY: [API_ENDPOINT.HR_INFORMATION, 'getTypeAll']
  },
  GET_BY_TYPE: {
    URL: (type: string) => `/api/${API_ENDPOINT.HR_INFORMATION}/type/all/${type}`,
    KEY: [API_ENDPOINT.HR_INFORMATION, 'getByType']
  },
  GET_DETAIL: {
    URL: (id: string) => `/api/${API_ENDPOINT.HR_INFORMATION}/${id}`,
    KEY: [API_ENDPOINT.HR_INFORMATION, 'getDetail']
  },
  CREATE: {
    URL: `/api/${API_ENDPOINT.HR_INFORMATION}`,
    KEY: [API_ENDPOINT.HR_INFORMATION, 'create']
  },
  UPDATE: {
    URL: `/api/${API_ENDPOINT.HR_INFORMATION}`,
    KEY: [API_ENDPOINT.HR_INFORMATION, 'update']
  },
  DELETE: {
    URL: (id: string) => `/api/${API_ENDPOINT.HR_INFORMATION}/${id}`,
    KEY: [API_ENDPOINT.HR_INFORMATION, 'delete']
  },
  GET_PERMISSIONS: {
    URL: `/api/${API_ENDPOINT.HR_INFORMATION}/permissions`,
    KEY: [API_ENDPOINT.HR_INFORMATION, 'getPermissions']
  }
}

export const API_BUSINESS_CATEGORY = {
  GET_ALL: {
    URL: `/api/${API_ENDPOINT.BUSINESS_CATEGORY}`,
    KEY: [API_ENDPOINT.BUSINESS_CATEGORY, 'getAll']
  },
  GET_DETAIL: {
    URL: (id: string) => `/api/${API_ENDPOINT.BUSINESS_CATEGORY}/${id}`,
    KEY: [API_ENDPOINT.BUSINESS_CATEGORY, 'getDetail']
  },
  CREATE: {
    URL: `/api/${API_ENDPOINT.BUSINESS_CATEGORY}`,
    KEY: [API_ENDPOINT.BUSINESS_CATEGORY, 'create']
  },
  UPDATE: {
    URL: `/api/${API_ENDPOINT.BUSINESS_CATEGORY}`,
    KEY: [API_ENDPOINT.BUSINESS_CATEGORY, 'update']
  },
  DELETE: {
    URL: (id: string) => `/api/${API_ENDPOINT.BUSINESS_CATEGORY}/${id}`,
    KEY: [API_ENDPOINT.BUSINESS_CATEGORY, 'delete']
  }
}
