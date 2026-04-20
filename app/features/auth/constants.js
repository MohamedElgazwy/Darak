export const USER_ROLES = {
  SEEKER: "Seeker",
  OWNER: "Owner",
  AGENCY: "Agency",
  ADMIN: "Admin",
};

export const DEFAULT_USER = {
  id: "guest",
  name: "Guest User",
  email: "",
  role: USER_ROLES.SEEKER,
  subscriptionPlan: null,
  agencyProfileId: null,
};
