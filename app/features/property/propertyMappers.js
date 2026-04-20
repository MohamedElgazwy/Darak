export function buildOwnerMetadata(user) {
  const isAgency = user.role === "Agency";

  return {
    ownerType: isAgency ? "agency" : "owner",
    ownerId: user.id,
    agencyId: isAgency ? user.agencyProfileId : null,
  };
}
