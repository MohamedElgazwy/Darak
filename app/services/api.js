import axios from "axios";

// ─────────────────────────────────────────────────────────────
// Axios instance
// Proxy: /api/X  →  https://darak.runasp.net/API/X
// So paths here must NOT include the /API prefix (proxy adds it)
// ─────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

const TOKEN_KEYS = ["authToken", "token"];

// ── Request interceptor: attach Bearer token ─────────────────
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = TOKEN_KEYS.map((k) => localStorage.getItem(k)).find(Boolean);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: handle 401 ─────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      TOKEN_KEYS.forEach((k) => localStorage.removeItem(k));
      localStorage.removeItem("user");
      window.location.href = "/Auth/login";
    }
    return Promise.reject(error);
  }
);

// ─────────────────────────────────────────────────────────────
// Response helpers
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// Form-data helpers
// ─────────────────────────────────────────────────────────────
const appendIfPresent = (target, key, value) => {
  if (value === undefined || value === null || value === "") return;
  if (typeof target.append === "function") {
    target.append(key, value);
  } else {
    target[key] = value;
  }
};

const toAnnouncementPurpose = (value) => {
  const p = String(value || "").toLowerCase();
  if (p === "rent") return "Rent";
  if (p === "sale") return "Sale";
  return value || "Sale";
};

const toAnnouncementFormData = (
  payload = {},
  { includePrimary = true, includeImages = true } = {}
) => {
  const fd = new FormData();
  const images = payload.images || [];
  const primaryImage =
    payload.primaryImage || images[0]?.file || images[0];

  appendIfPresent(fd, "Title", payload.title);
  appendIfPresent(fd, "Description", payload.description);
  appendIfPresent(fd, "Price", payload.price);
  appendIfPresent(fd, "Purpose", toAnnouncementPurpose(payload.purpose || payload.type));
  appendIfPresent(fd, "Area", payload.area);
  appendIfPresent(fd, "Rooms", payload.rooms || payload.bedrooms);
  appendIfPresent(fd, "Bathrooms", payload.bathrooms);
  appendIfPresent(fd, "Floor", payload.floor);
  appendIfPresent(fd, "City", payload.city || payload.location?.city);
  appendIfPresent(fd, "Country", payload.country || "Egypt");
  appendIfPresent(fd, "Latitude", payload.latitude);
  appendIfPresent(fd, "Longitude", payload.longitude);
  appendIfPresent(fd, "Address", payload.address || payload.location?.street);
  appendIfPresent(fd, "PropertyType", payload.propertyType);

  if (includePrimary) appendIfPresent(fd, "PrimaryImage", primaryImage);

  if (includeImages) {
    images.forEach((img) => {
      const file = img?.file || img;
      if (file && file !== primaryImage) fd.append("Images", file);
    });
  }

  return fd;
};

const normalizeAnnouncementParams = (params = {}) => {
  const out = {};
  appendIfPresent(out, "PageNumber", params.PageNumber || params.page);
  appendIfPresent(out, "Purpose", toAnnouncementPurpose(params.Purpose || params.purpose || params.type));
  appendIfPresent(out, "PropertyType", params.PropertyType || params.propertyType);
  appendIfPresent(out, "MinPrice", params.MinPrice || params.priceMin);
  appendIfPresent(out, "MaxPrice", params.MaxPrice || params.priceMax);
  appendIfPresent(out, "MinArea", params.MinArea || params.areaMin);
  appendIfPresent(out, "MaxArea", params.MaxArea || params.areaMax);
  appendIfPresent(out, "Rooms", params.Rooms || params.rooms || params.bedrooms);
  appendIfPresent(out, "Bathrooms", params.Bathrooms || params.bathrooms);
  appendIfPresent(out, "Floor", params.Floor || params.floor);
  appendIfPresent(out, "City", params.City || params.city);
  appendIfPresent(out, "SearchTerm", params.SearchTerm || params.searchTerm || params.q);
  appendIfPresent(out, "SortBy", params.SortBy || params.sortBy);
  if (params.IsDescending !== undefined || params.isDescending !== undefined) {
    appendIfPresent(out, "IsDescending", params.IsDescending ?? params.isDescending);
  }
  // Strip accidental trailing "+"
  Object.keys(out).forEach((key) => {
    if (typeof out[key] === "string" && out[key].endsWith("+")) {
      out[key] = out[key].replace("+", "");
    }
  });
  return out;
};

// ─────────────────────────────────────────────────────────────
// Auth API  →  /api/Auth/…
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// Property / Announcement API  →  /api/Announcement/…
// ─────────────────────────────────────────────────────────────
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
    const fd = toAnnouncementFormData(payload, { includePrimary: false, includeImages: false });
    appendIfPresent(fd, "Id", payload.id || payload.Id);
    (payload.keepImageIds || []).forEach((imgId) => fd.append("KeepImageIds", imgId));
    (payload.newImages || []).forEach((img) => fd.append("NewImages", img?.file || img));
    appendIfPresent(fd, "NewPrimary", payload.newPrimary);

    const res = await api.put("/Announcement/Update", fd, {
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

// ─────────────────────────────────────────────────────────────
// Account (current user)  →  /api/me/…
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// Users  →  /api/Users/…  (proxy adds /API prefix)
// ─────────────────────────────────────────────────────────────
export const userApi = {
  async listUsers(params = {}) {
    const res = await api.get("/Users/List", { params });
    return unwrapPagedResponse(res);
  },
  async getUserById(id) {
    const res = await api.get(`/Users/${id}`);
    return extractResponseData(res);
  },
  async createUser(payload) {
    const res = await api.post("/Users/Create", payload);
    return res.data;
  },
  async updateUser(id, payload) {
    const res = await api.put(`/Users/${id}`, payload);
    return unwrapResponseData(res);
  },
  async toggleUserStatus(id) {
    const res = await api.put(`/Users/${id}/toggle-status`);
    return res.data;
  },
  async unlockUser(id) {
    const res = await api.put(`/Users/${id}/Unlock`);
    return res.data;
  },
};

// ─────────────────────────────────────────────────────────────
// Roles  →  /api/Roles/…
// ─────────────────────────────────────────────────────────────
export const roleApi = {
  async listRoles(includeDisable = false) {
    const res = await api.get("/Roles/List", { params: { includeDisable } });
    return unwrapPagedResponse(res);
  },
  async getRoleById(id) {
    const res = await api.get(`/Roles/${id}`);
    return extractResponseData(res);
  },
  async createRole(payload) {
    const res = await api.post("/Roles/Create", payload);
    return res.data;
  },
  async updateRole(id, payload) {
    const res = await api.put(`/Roles/${id}`, payload);
    return unwrapResponseData(res);
  },
  async toggleRoleStatus(id) {
    const res = await api.put(`/Roles/${id}/toggle-status`);
    return res.data;
  },
};

// ─────────────────────────────────────────────────────────────
// Subscriptions  →  /api/Subscriptions/…  (fixed typo)
// ─────────────────────────────────────────────────────────────
export const subscriptionApi = {
  async createSubscription(payload) {
    const res = await api.post("/Subscriptions/Create", payload);
    return res.data;
  },
  async getMySubscription() {
    const res = await api.get("/Subscriptions/me");
    return extractResponseData(res);
  },
};

// ─────────────────────────────────────────────────────────────
// Company Abouts  →  /api/CompanyAbouts/…
// ─────────────────────────────────────────────────────────────
export const companyAboutApi = {
  async list() {
    const res = await api.get("/CompanyAbouts/List");
    return unwrapPagedResponse(res);
  },
  async create(payload) {
    const res = await api.post("/CompanyAbouts/Create", payload);
    return res.data;
  },
  async update(payload) {
    const res = await api.put("/CompanyAbouts/Update", payload);
    return res.data;
  },
};

// ─────────────────────────────────────────────────────────────
// Company Services  →  /api/CompanyServices/…
// ─────────────────────────────────────────────────────────────
export const companyServiceApi = {
  async list() {
    const res = await api.get("/CompanyServices/List");
    return unwrapPagedResponse(res);
  },
  async create(payload) {
    const res = await api.post("/CompanyServices/Create", payload);
    return res.data;
  },
  async update(payload) {
    const res = await api.put("/CompanyServices/Update", payload);
    return res.data;
  },
};

// ─────────────────────────────────────────────────────────────
// Feedback  →  /api/Feedback/…
// ─────────────────────────────────────────────────────────────
export const feedbackApi = {
  async list() {
    const res = await api.get("/Feedback/List");
    return unwrapPagedResponse(res);
  },
  async create(payload) {
    const res = await api.post("/Feedback/Create", payload);
    return res.data;
  },
  async update(payload) {
    const res = await api.put("/Feedback/Update", payload);
    return res.data;
  },
  async delete(id) {
    const res = await api.delete(`/Feedback/${id}`);
    return res.data;
  },
};

// ─────────────────────────────────────────────────────────────
// Notifications  →  /api/Notifications/…
// ─────────────────────────────────────────────────────────────
export const notificationApi = {
  async list() {
    const res = await api.get("/Notifications/List");
    return unwrapPagedResponse(res);
  },
  async markAsRead(id) {
    const res = await api.put(`/Notifications/mark-as-read/${id}`);
    return res.data;
  },
};

// ─────────────────────────────────────────────────────────────
// Packages  →  /api/Packages/…
// ─────────────────────────────────────────────────────────────
export const packageApi = {
  async list() {
    const res = await api.get("/Packages/List");
    return unwrapPagedResponse(res);
  },
  async getById(id) {
    const res = await api.get(`/Packages/${id}`);
    return extractResponseData(res);
  },
};

// ─────────────────────────────────────────────────────────────
// Payments  →  /api/Payments/…
// ─────────────────────────────────────────────────────────────
export const paymentApi = {
  async confirmCash(payload) {
    const res = await api.post("/Payments/Confirm-Cash", payload);
    return res.data;
  },
};

// ─────────────────────────────────────────────────────────────
// Templates  →  /api/Templates/…
// ─────────────────────────────────────────────────────────────
export const templateApi = {
  async list() {
    const res = await api.get("/Templates/List");
    return unwrapPagedResponse(res);
  },
  async getById(id) {
    const res = await api.get(`/Templates/${id}`);
    return extractResponseData(res);
  },
};

export default api;