# SpaceSync Resource Booking

SpaceSync is a role-based resource booking system for rooms, labs, equipment,
parking, and other shared workplace resources.

## Roles

- **Super Admin** manages users, roles, resources, approvals, and analytics.
- **Space Admin** manages resources, bookings, approvals, and analytics.
- **Member** registers, browses resources, and manages their own bookings.

Administrators can monitor and manage bookings but cannot create bookings.

## Technology

- React 19 and TypeScript
- Vinext
- Node.js and Express
- MongoDB Atlas
- JWT authentication
- bcrypt password hashing

## Local setup

Install dependencies:

```bash
npm install
```

Create the private environment file:

```powershell
Copy-Item atlas-credentials.env.example atlas-credentials.env
```

Fill in the MongoDB URI, JWT secret, and administrator account settings. Never
commit `atlas-credentials.env`.

Create or update the fixed administrator accounts:

```bash
npm run seed:admins
```

Start the API:

```bash
npm run backend
```

Start the frontend in another terminal:

```bash
npm run dev
```

The frontend normally runs at `http://localhost:3000` and the API at
`http://localhost:5000`.

## Verification

```bash
npm run db:test
npm run build
```
