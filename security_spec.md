# JezSmart Security Specification

## 1. Data Invariants
- A `User` must have a valid `uid` matching their auth ID and cannot self-assign points or roles.
- A `Petition` must have a valid `authorId` matching the creator, and its `votes` can only be incremented under specific conditions (if implemented).
- `BusRoute` data is only writable by system admins.

## 2. The "Dirty Dozen" Payloads (Denial Expected)

1. **Identity Spoofing**: Attempt to create a user profile with a different `uid`.
   - `path: /users/other_user_id`, `data: { uid: 'other_user_id', points: 100 }`
2. **Privilege Escalation**: Attempt to set `roles: ['admin']` during user creation.
   - `path: /users/my_id`, `data: { uid: 'my_id', roles: ['admin'] }`
3. **Ghost Field Injection**: Adding an unvetted `isVerified` field to a petition.
   - `path: /petitions/p1`, `data: { ..., isVerified: true }`
4. **ID Poisoning**: Using a 2KB string as a `routeId`.
   - `path: /routes/[2KB_STRING]`, `data: { ... }`
5. **Unauthorized Mutation**: User "A" trying to update user "B"'s points.
   - `path: /users/user_b`, `data: { points: 9999 }`
6. **State Shortcutting**: Skipping the `pending` status on a new petition.
   - `path: /petitions/pnew`, `data: { status: 'implemented' }`
7. **Resource Exhaustion**: Writing a 1MB string into a petition description.
8. **Orphaned Writes**: Creating a petition with a non-existent `authorId`.
9. **Timestamp Spoofing**: Sending a client-side `createdAt` in the past.
10. **Admin Bypass**: Attempting to write to `/routes/` as a regular resident.
11. **Negative Points**: Attempting to set `points: -50`.
12. **Malicious Vote Count**: Directly setting `votes: 1000000` on a new petition.

## 3. Test Runner Strategy
- We will use `firestore.rules` to enforce these blocks.
- Every `allow write` will be guarded by `isValid[Entity]()`.
