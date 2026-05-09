# Security Specification - Bakery Brand

## Data Invariants
1. **Global Configuration Stability**: Settings can only be modified by authorized administrators to prevent unauthorized branding or contact information changes.
2. **Product Integrity**: Cakes and options must have valid numeric prices and strictly defined tags (flavor, occasion).
3. **Identity Verification**: No unauthorized user can modify categories or product listings.
4. **Validation Blueprints**: Every write operation must undergo schema validation (types, sizes, required keys).

## The "Dirty Dozen" Payloads (Test Case Requirements)
1. **Unauthenticated Write**: An anonymous user trying to update `brandName`.
2. **Identity Spoofing**: An authenticated user (non-admin) trying to change `deliveredCakes` count.
3. **Invalid Type (Number to String)**: Setting `basePrice` as a string instead of a number.
4. **Resource Poisoning (Large Data)**: Sending a 1MB string to `loadingSubtext`.
5. **State Shortcutting**: Updating `shopStatus` to an invalid enum value like `on-vacation`.
6. **Shadow Field Injection**: Adding `isVerified: true` to a cake document which isn't in the schema.
7. **Invalid ID Format**: Creating a cake with an ID containing special characters like `cake$#1`.
8. **PII Blanket Read**: Trying to query a sensitive path without specific relational ownership (Not applicable here as all data is public-read).
9. **Missing Required Field**: Creating a cake without the `image` field.
10. **Zero/Negative Price**: Setting `basePrice` to -100.
11. **Currency Hijack**: Changing `currencySymbol` to a malicious script string.
12. **Color Injection**: Setting `primaryColor` to a 500-character string instead of a hex code.

## Test Runner (Simplified logic for firestore.rules.test.ts)
- `it('rejects unauthenticated settings update')` -> `deny`
- `it('rejects invalid color hex code')` -> `deny`
- `it('permits admin to update branding')` -> `allow`
- `it('permits public to read products')` -> `allow`
