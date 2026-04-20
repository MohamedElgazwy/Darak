# MAWA SaaS Architecture Upgrade

## Clean architecture folders

- `app/features/auth` — role constants, auth hook, role guards.
- `app/features/property` — owner/agency badge + ownership mapper.
- `app/features/subscription` — plans, subscription hook, UI components.
- `app/features/agency` — paid template catalog for agency pages.
- `app/features/platform` — API response examples for integration.

## NestJS data models

### User
- id
- name
- email
- role
- subscriptionPlan
- agencyProfileId

### AgencyProfile
- id
- userId
- plan
- template
- listingsCount
- verified

### Property
- id
- title
- price
- ownerType
- ownerId
- agencyId
- status

## Example API responses

```json
{
  "user": {
    "id": "usr_101",
    "name": "Nile Estates",
    "email": "hello@nileestates.eg",
    "role": "Agency",
    "subscriptionPlan": "pro",
    "agencyProfileId": "agp_990"
  },
  "agencyProfile": {
    "id": "agp_990",
    "plan": "pro",
    "template": "executive",
    "listingsCount": 7,
    "verified": true
  },
  "property": {
    "id": "prop_22",
    "ownerType": "agency",
    "ownerId": "usr_101",
    "agencyId": "agp_990"
  },
  "error": {
    "code": "PLAN_LIMIT_REACHED",
    "upgradeUrl": "/Dashboard/Agency?upgrade=true"
  }
}
```
