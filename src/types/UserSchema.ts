import * as z from "zod";

export const PrivateMetadataSchema = z.object({});
export type PrivateMetadata = z.infer<typeof PrivateMetadataSchema>;

export const VerificationSchema = z.object({
  _Verification: PrivateMetadataSchema,
});
export type Verification = z.infer<typeof VerificationSchema>;

export const ExternalAccountSchema = z.object({
  id: z.string(),
  provider: z.null(),
  identificationId: z.null(),
  externalId: z.null(),
  approvedScopes: z.string(),
  emailAddress: z.string(),
  firstName: z.null(),
  lastName: z.null(),
  imageUrl: z.string(),
  username: z.string(),
  publicMetadata: PrivateMetadataSchema,
  label: z.null(),
  verification: VerificationSchema,
});
export type ExternalAccount = z.infer<typeof ExternalAccountSchema>;

export const EmailAddressSchema = z.object({
  id: z.string(),
  emailAddress: z.string(),
  verification: VerificationSchema,
  linkedTo: z.array(z.any()),
});
export type EmailAddress = z.infer<typeof EmailAddressSchema>;

export const UserSchema = z.object({
  id: z.string(),
  passwordEnabled: z.boolean(),
  totpEnabled: z.boolean(),
  backupCodeEnabled: z.boolean(),
  twoFactorEnabled: z.boolean(),
  banned: z.boolean(),
  locked: z.boolean(),
  createdAt: z.number(),
  updatedAt: z.number(),
  imageUrl: z.string(),
  hasImage: z.boolean(),
  primaryEmailAddressId: z.string(),
  primaryPhoneNumberId: z.null(),
  primaryWeb3WalletId: z.null(),
  lastSignInAt: z.number(),
  externalId: z.null(),
  username: z.null(),
  firstName: z.string(),
  lastName: z.string(),
  publicMetadata: PrivateMetadataSchema,
  privateMetadata: PrivateMetadataSchema,
  unsafeMetadata: PrivateMetadataSchema,
  emailAddresses: z.array(EmailAddressSchema),
  phoneNumbers: z.array(z.any()),
  web3Wallets: z.array(z.any()),
  externalAccounts: z.array(ExternalAccountSchema),
  samlAccounts: z.array(z.any()),
  lastActiveAt: z.number(),
  createOrganizationEnabled: z.boolean(),
  createOrganizationsLimit: z.null(),
  deleteSelfEnabled: z.boolean(),
  legalAcceptedAt: z.null(),
});
export type UserSchema = z.infer<typeof UserSchema>;
