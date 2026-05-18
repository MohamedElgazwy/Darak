import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

const tokenKeys = ["authToken", "token"];

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = tokenKeys.map((k) => localStorage.getItem(k)).find(Boolean);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (typeof window !== "undefined" && status === 401) {
      tokenKeys.forEach((k) => localStorage.removeItem(k));
      localStorage.removeItem("user");
      window.location.href = "/Auth/login";
    }

    return Promise.reject(error);
  }
);

const extractResponseData = (res) => {
  const data = res?.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data?.items)) return data.data.items;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.result?.items)) return data.result.items;
  if (Array.isArray(data?.result)) return data.result;
  return data;
};

const unwrapResponseData = (res) => {
  const data = res?.data;
  return data?.data ?? data?.result ?? data;
};

const unwrapPagedResponse = (res) => {
  const data = unwrapResponseData(res);
  const items = Array.isArray(data) ? data : data?.items || [];

  return {
    items,
    currentPage: data?.currentPage || 1,
    totalPages: data?.totalPages || 1,
    totalCount: data?.totalCount || items.length,
    pageSize: data?.pageSize || items.length,
    hasPreviousPage: data?.hasPreviousPage || false,
    hasNextPage: data?.hasNextPage || false,
  };
};

const appendIfPresent = (formData, key, value) => {
  if (value !== undefined && value !== null && value !== "") {
    if (typeof formData.append === "function") {
      formData.append(key, value);
    } else {
      formData[key] = value;
    }
  }
};

const toAnnouncementPurpose = (value) => {
  const purpose = String(value || "").toLowerCase();
  if (purpose === "rent") return "Rent";
  if (purpose === "sale") return "Sale";
  return value || "Sale";
};

const toAnnouncementFormData = (payload = {}, { includePrimary = true, includeImages = true } = {}) => {
  const formData = new FormData();
  const location = payload.location || {};
  const images = payload.images || [];
  const primaryImage = payload.primaryImage || images[0]?.file || images[0];

  appendIfPresent(formData, "Title", payload.title);
  appendIfPresent(formData, "Description", payload.description);
  appendIfPresent(formData, "Price", payload.price);
  appendIfPresent(formData, "Purpose", toAnnouncementPurpose(payload.purpose || payload.type));
  appendIfPresent(formData, "Area", payload.area);
  appendIfPresent(formData, "Rooms", payload.rooms || payload.bedrooms);
  appendIfPresent(formData, "Bathrooms", payload.bathrooms);
  appendIfPresent(formData, "Floor", payload.floor);
  appendIfPresent(formData, "City", payload.city || location.city);
  appendIfPresent(formData, "Country", payload.country || "Egypt");
  appendIfPresent(formData, "Latitude", payload.latitude);
  appendIfPresent(formData, "Longitude", payload.longitude);
  appendIfPresent(formData, "Address", payload.address || location.street);
  appendIfPresent(formData, "PropertyType", payload.propertyType);
  if (includePrimary) {
    appendIfPresent(formData, "PrimaryImage", primaryImage);
  }

  if (includeImages) {
    images.forEach((image) => {
      const file = image?.file || image;
      if (file && file !== primaryImage) {
        formData.append("Images", file);
      }
    });
  }

  return formData;
};

const normalizeAnnouncementParams = (params = {}) => {
  const normalized = {};

  appendIfPresent(normalized, "PageNumber", params.PageNumber || params.page);
  appendIfPresent(normalized, "Purpose", toAnnouncementPurpose(params.Purpose || params.purpose || params.type));
  appendIfPresent(normalized, "PropertyType", params.PropertyType || params.propertyType);
  appendIfPresent(normalized, "MinPrice", params.MinPrice || params.priceMin);
  appendIfPresent(normalized, "MaxPrice", params.MaxPrice || params.priceMax);
  appendIfPresent(normalized, "MinArea", params.MinArea || params.areaMin);
  appendIfPresent(normalized, "MaxArea", params.MaxArea || params.areaMax);
  appendIfPresent(normalized, "Rooms", params.Rooms || params.rooms || params.bedrooms);
  appendIfPresent(normalized, "Bathrooms", params.Bathrooms || params.bathrooms);
  appendIfPresent(normalized, "Floor", params.Floor || params.floor);
  appendIfPresent(normalized, "City", params.City || params.city);
  appendIfPresent(normalized, "SearchTerm", params.SearchTerm || params.searchTerm || params.q);
  appendIfPresent(normalized, "SortBy", params.SortBy || params.sortBy);
  appendIfPresent(normalized, "IsDescending", params.IsDescending ?? params.isDescending);

  Object.keys(normalized).forEach((key) => {
    if (String(normalized[key]).endsWith("+")) {
      normalized[key] = String(normalized[key]).replace("+", "");
    }
  });

  return normalized;
};

export const authApi = {
  async login(payload) {
    const res = await api.post("/Auth/Login", payload);
    return res.data;
  },
  async register(payload) {
    const res = await api.post("/Auth/Register", payload);
    return res.data;
  },
  async confirmEmail(payload) {
    const res = await api.post("/Auth/ConfirmEmail", payload);
    return res.data;
  },
  async resendConfirmEmail(payload) {
    const res = await api.post("/Auth/ResendConfirmEmail", payload);
    return res.data;
  },
  async refresh(payload) {
    const res = await api.post("/Auth/Refresh", payload);
    return res.data;
  },
  async revokeRefreshToken(payload) {
    const res = await api.post("/Auth/RevokeRefreshToken", payload);
    return res.data;
  },
  async forgetPassword(payload) {
    const res = await api.post("/Auth/ForgetPassword", payload);
    return res.data;
  },
  async resetPassword(payload) {
    const res = await api.post("/Auth/ResetPassword", payload);
    return res.data;
  },
};

export const propertyApi = {
  async listPage(params = {}) {
    const res = await api.get("/Announcement/Paginated", {
      params: normalizeAnnouncementParams(params),
    });
    return unwrapPagedResponse(res);
  },
  async list(params = {}) {
    const data = await this.listPage(params);
    return data.items;
  },
  async getById(id) {
    const res = await api.get(`/Announcement/${id}`);
    return extractResponseData(res);
  },
  async create(payload) {
    const res = await api.post("/Announcement/Create", toAnnouncementFormData(payload), {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  async update(payload) {
    const formData = toAnnouncementFormData(payload, { includePrimary: false, includeImages: false });
    appendIfPresent(formData, "Id", payload.id || payload.Id);

    (payload.keepImageIds || []).forEach((id) => {
      formData.append("KeepImageIds", id);
    });

    (payload.newImages || []).forEach((image) => {
      formData.append("NewImages", image?.file || image);
    });

    appendIfPresent(formData, "NewPrimary", payload.newPrimary);

    const res = await api.put("/Announcement/Update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  async delete(id) {
    const res = await api.delete(`/Announcement/${id}`);
    return res.data;
  },
  async changeStatus(id, status) {
    const res = await api.put("/Announcement/ChangeStatus", { id, status });
    return res.data;
  },
  async listAdminPage(params = {}) {
    const res = await api.get("/Announcement/Admin", {
      params: {
        Status: params.Status || params.status,
        PageNumber: params.PageNumber || params.page,
      },
    });
    return unwrapPagedResponse(res);
  },
  async listAdmin(params = {}) {
    const data = await this.listAdminPage(params);
    return data.items;
  },
  async getGovernorates() {
    const res = await api.get("/Announcement/Governorates");
    return extractResponseData(res) || [];
  },
  async getPropertyTypes() {
    const res = await api.get("/Announcement/PropertyTypes");
    return extractResponseData(res) || [];
  },
  async getPurposes() {
    const res = await api.get("/Announcement/Purposes");
    return extractResponseData(res) || [];
  },
  async getStatuses() {
    const res = await api.get("/Announcement/Statuses");
    return extractResponseData(res) || [];
  },
};

export const accountApi = {
  async getMe() {
    const res = await api.get("/me");
    return unwrapResponseData(res);
  },
  async updateInfo(payload) {
    const res = await api.put("/me/Info", payload);
    return unwrapResponseData(res);
  },
  async changePassword(payload) {
    const res = await api.put("/me/change-password", {
      currentPassword: payload.currentPassword,
      newPassword: payload.newPassword,
    });
    return unwrapResponseData(res);
  },
};

export const userApi = {
  async listUsers() {
    const res = await api.get("/API/Users/List");
    return unwrapPagedResponse(res);
  },
  async getUserById(id) {
    const res = await api.get(`/API/Users/${id}`);
    return extractResponseData(res);
  },
  async createUser(payload) {
    const res = await api.post("/API/Users/Create", payload);
    return res.data;
  },
  async updateUser(id, payload) {
    const res = await api.put(`/API/Users/${id}`, payload);
    return unwrapResponseData(res);
  },
  async toggleUserStatus(id) {
    const res = await api.put(`/API/Users/${id}/toggle-status`);
    return res.data;
  },
  async unlockUser(id) {
    const res = await api.put(`/API/Users/${id}/Unlock`);
    return res.data;
  }
};


// Keep existing exports
  async listUsers() {
    const res = await api.get("/API/Users/List");
    return unwrapPagedResponse(res);
  },
  async getUserById(id) {
    const res = await api.get(`/API/Users/${id}`);
    return extractResponseData(res);
  },
  async createUser(payload) {
    const res = await api.post("/API/Users/Create", payload);
    return res.data;
  },
  async updateUser(id, payload) {
    const res = await api.put(`/API/Users/${id}", payload);
    return unwrapResponseData(res);
  },
  async toggleUserStatus(id) {
    const res = await api.put(`/API/Users/${id}/toggle-status");
    return res.data;
  },
  async unlockUser(id) {
    const res = await api.put(`/API/Users/${id}/Unlock");
    return res.data;
  }
};

// Keep existing exports
export const authApi = {
  // ...
};
export const propertyApi = {
  // ...
};
export const roleApi = {
  async listRoles(includeDisable = false) {
    const res = await api.get('/API/Roles/List', { params: { includeDisable } });
    return unwrapPagedResponse(res);
  },
  async getRoleById(id) {
    const res = await api.get(`/API/Roles/${id}`);
    return extractResponseData(res);
  },
  async createRole(payload) {
    const res = await api.post('/API/Roles/Create', payload);
    return res.data;
  },
  async updateRole(id, payload) {
    const res = await api.put(`/API/Roles/${id}`, payload);
    return unwrapResponseData(res);
  },
  async toggleRoleStatus(id) {
    const res = await api.put(`/API/Roles/${id}/toggle-status`);
    return res.data;
  }
};

export const subscriptionApi = {
  async createSubscription(payload) {
    const res = await api.post('/API/Subscriotions/Create', payload);
    return res.data;
  },
  async getMySubscription() {
    const res = await api.get('/API/Subscriotions/me');
    return extractResponseData(res);
  }
};

export const companyAboutApi = {
  async list() {
    const res = await api.get('/API/CompanyAbouts/List');
    return unwrapPagedResponse(res);
  },
  async create(payload) {
    const res = await api.post('/API/CompanyAbouts/Create', payload);
    return res.data;
  },
  async update(payload) {
    const res = await api.put('/API/CompanyAbouts/Update', payload);
    return res.data;
  }
};

export const companyServiceApi = {
  async list() {
    const res = await api.get('/API/CompanyServices/List');
    return unwrapPagedResponse(res);
  },
  async create(payload) {
    const res = await api.post('/API/CompanyServices/Create', payload);
    return res.data;
  },
  async update(payload) {
    const res = await api.put('/API/CompanyServices/Update', payload);
    return res.data;
  }
};

export const feedbackApi = {
  async list() {
    const res = await api.get('/API/Feedback/List');
    return unwrapPagedResponse(res);
  },
  async create(payload) {
    const res = await api.post('/API/Feedback/Create', payload);
    return res.data;
  },
  async update(payload) {
    const res = await api.put('/API/Feedback/Update', payload);
    return res.data;
  },
  async delete(id) {
    const res = await api.delete(`/API/Feedback/${id}`);
    return res.data;
  }
};

export const feedbackApi = {
  async list() {
    const res = await api.get('/API/Feedback/List');
    return unwrapPagedResponse(res);
  },
  async create(payload) {
    const res = await api.post('/API/Feedback/Create', payload);
    return res.data;
  },
  async update(payload) {
    const res = await api.put('/API/Feedback/Update', payload);
    return res.data;
  },
  async delete(id) {
    const res = await api.delete(`/API/Feedback/${id}`);
    return res.data;
  }
};

export const notificationApi = {
  async list() {
    const res = await api.get('/API/Notifications/List');
    return unwrapPagedResponse(res);
  },
  async markAsRead(id) {
    const res = await api.put(`/API/Notifications/mark-as-read/${id}`);
    return res.data;
  }
};

export const packageApi = {
  async list() {
    const res = await api.get('/API/Packages/List');
    return unwrapPagedResponse(res);
  },
  async getById(id) {
    const res = await api.get(`/API/Packages/${id}`);
    return extractResponseData(res);
  }
};

export const paymentApi = {
  async confirmCash(payload) {
    const res = await api.post('/API/Payments/Confirm-Cash', payload);
    return res.data;
  }
};

export const templateApi = {
  async list() {
    const res = await api.get('/API/Templates/List');
    return unwrapPagedResponse(res);
  },
  async getById(id) {
    const res = await api.get(`/API/Templates/${id}`);
    return extractResponseData(res);
  }
};

export default api;
