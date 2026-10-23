# Fitnetheist Role-Based Coaching OS, Subscription Tracking, Invoicing & Diet Management

This upgrade transforms Fitnetheist into an end-to-end role-governed coaching platform where regular clients are routed directly to their personal dashboard to track assigned workouts, packages, and daily meal completion, while administrators manage leads, package subscriptions, direct client invoicing, and custom diet plans from the Admin OS.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following product and UX decisions were confirmed during clarification and govern the implementation:

- **Confirmed Decision 1 — Package Catalog & Client Categories**: The Package dropdown across Leads, Clients, and Invoices includes the **4 Official Coaching Protocols** (`3 Months Protocol - ₹8,000`, `6 Months Protocol - ₹18,000`, `9 Months Protocol - ₹20,000`, `12 Months Protocol - ₹25,000`) plus **Challenge & Custom Coaching Tiers** (`21-Day Ignite Shred Challenge`, `60-Day Body Recomposition`, `Custom Coaching Protocol`), automatically categorizing every client by their assigned package.
- **Confirmed Decision 2 — Automatic Subscription Status & Expiry Threshold**: Subscription status is calculated dynamically using local calendar date comparisons (`YYYY-MM-DD`): **Active** (more than 7 days remaining), **Expiring Soon** (1 to 7 days remaining before end date), and **Subscription Over** (past the end date), without deleting or hiding expired client profiles.
- **Confirmed Decision 3 — Admin-Only Diet Authoring & Read-Only Client Tracking**: Creating, editing, and assigning diet plans is restricted exclusively to the Admin Dashboard. For regular users, the client-facing Nutrition and Dashboard views display their **read-only assigned diet plan** with interactive **daily food/meal check-off boxes** and live calorie progress tracking that resets each local calendar day while preserving historical logs.

---

## 1. Overview & Core Concept

- **What It Does**:
  1. **Role-Based Authentication & Redirection**: Separates regular user sign-in/sign-up from Admin OS authentication. Regular users are redirected to their personal Client Dashboard upon login and are blocked from accessing `/admin` routes or admin views. Admin users authenticate via the Admin Portal and are routed to the Admin Dashboard.
  2. **Lead Package Selection & Conversion Continuity**: Adds package selection when creating or editing any lead, displays the package across the CRM table and lead detail view, and automatically carries the selected package and price forward when converting a lead into a client.
  3. **Client Categorization & Dynamic Subscription Tracking**: Categorizes clients by package, allows package/category filtering, captures subscription start and end dates on intake/conversion, and automatically computes real-time status badges (**Active**, **Expiring Soon**, **Subscription Over**).
  4. **Complete Client Dossier & Direct Invoicing**: Upgrades the Admin Client Profile into a 360-degree report displaying personal details, prominent package/subscription status, assigned exercise plan, assigned diet plan, daily calorie adherence history, and full billing history with a pre-filled **Create Invoice** modal/drawer that calculates discounts, taxes, partial payments, and outstanding balances.
  5. **Admin-Only Diet Management Module**: Adds a dedicated **Diet Management** tab in the Admin Dashboard (mirroring the Exercise Bank workflow) where admins build custom meal schedules, add food items with serving sizes and auto-summed meal/daily calories, save reusable templates, and assign tailored diet plans to individual clients.
  6. **User Daily Diet Check-Off & Calorie Progress**: Displays the client's assigned diet plan on their dashboard with per-food-item checkboxes, live consumed vs. remaining calorie calculations, percentage progress bars, and date-keyed persistence (`YYYY-MM-DD`) in Firebase Realtime Database and local storage.
- **Target Audience / Persona**:
  - **Administrators & Head Coach (Coach Neetu)**: Full operational control over CRM leads, client subscriptions, billing/invoices, exercise prescriptions, and nutrition plans.
  - **Enrolled Clients**: Focused personal dashboard experience to view their active package, check off daily prescribed meals, monitor calorie progress, and follow their assigned workout split.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  - **Regular User Login & Dashboard Flow**: User signs in via the Auth Modal $\rightarrow$ automatically lands on their personal Client Dashboard (`/dashboard` / `plan`) $\rightarrow$ views active package & subscription validity $\rightarrow$ opens Today's Diet to check off consumed food items $\rightarrow$ sees Consumed Calories, Remaining Calories, and Progress % update immediately. Attempting to visit `#admin` or `/admin` as a non-admin redirects safely to the user dashboard.
  - **Lead-to-Client Package Flow**: Admin creates or edits a lead $\rightarrow$ selects a Package from the dropdown $\rightarrow$ clicks Convert to Client $\rightarrow$ modal pre-fills the lead's selected package, price, and default start/end dates based on package duration (e.g., +3, +6, +9, or +12 months) $\rightarrow$ client is added to the categorized roster.
  - **Client Profile & Direct Invoice Creation Flow**: Admin opens any client in the Clients section $\rightarrow$ views the top summary banner with Package Category, Start/End Dates, and live Subscription Status badge $\rightarrow$ switches between Overview, Exercise Plan, Diet Plan, and Billing & Invoices $\rightarrow$ clicks **Create Invoice** $\rightarrow$ pre-filled form computes Subtotal, Discount, Tax, Total Payable, Amount Paid, and Outstanding Balance $\rightarrow$ saves directly to the client's record and updates billing summaries immediately.
  - **Admin Diet Plan Builder & Assignment Flow**: Admin opens the **Diet** tab in Admin OS $\rightarrow$ creates a custom diet plan with meal schedule (Breakfast, Lunch, Snack, Dinner), adds food items with quantities and calories $\rightarrow$ meal and daily calorie totals auto-calculate $\rightarrow$ selects a client and assigns the plan $\rightarrow$ client's profile and user dashboard reflect the assigned diet plan immediately.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: High-contrast athletic performance console matching the existing Fitnetheist obsidian-and-gold design system.
  - *Color Palette & Mood*: Deep obsidian canvas (`#08080a`), structured charcoal containers (`#0e0e12` / `#141418`) with `1px` hairline borders (`border-white/10`), signature gold (`#FFC515`) and volt (`#d8ff38`) accents, and semantic status colors: Emerald (`#10B981`) for Active / Paid, Amber (`#F59E0B`) for Expiring Soon / Partially Paid, and Crimson (`#EF4444`) for Subscription Over / Unpaid.
  - *Typography & Hierarchy*: Condensed athletic display headings paired with readable sans body copy and strict `tabular-nums` monospace (`font-mono-num`) for all calorie counts, dates, invoice figures, and progress percentages.
  - *Component Styling & Layout*: Full-width 1440px desktop workspace with left Admin sidebar, clean single-elevation cards, unboxed metadata separators, and responsive mobile drawer/bottom navigation.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Local Date-Only Subscription Status Engine**
  - *Chosen Approach*: Parse `startDate` and `endDate` as local `YYYY-MM-DD` calendar dates (midnight local time) rather than raw UTC timestamps, and compute status on every render/selector pass.
  - *Why*: Prevents timezone offset bugs where a subscription ending today appears expired hours early, and ensures expired subscriptions automatically transition to **"Subscription Over"** without manual admin edits.
- **Decision 2: Immutable Snapshot Assignment for Diet Plans**
  - *Chosen Approach*: When an admin assigns a diet plan template to a client, store a deep-cloned, client-specific snapshot (`assignedDietPlan`) on the client's profile and in the database (`clientDietPlans/{clientId}`).
  - *Why*: Guarantees that future edits to a reusable master diet template never overwrite a client's active customized diet or historical calorie logs.
- **Decision 3: Date-Keyed Daily Food Check-Off Ledger**
  - *Chosen Approach*: Store checked food item IDs and consumed calorie totals keyed by `userId` and local calendar date (`dailyDietTracking/{userId}/{YYYY-MM-DD}`).
  - *Why*: Ensures rapid idempotent checkbox toggling (preventing duplicate calorie addition on rapid clicks), automatic fresh reset at midnight local time for the new day, and complete preservation of prior days' adherence records for both the user and admin to inspect.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        EXPRESS SERVER & API GUARD LAYER                      │
│  • Role Verification Middleware (Admin vs. Regular User Authorization)       │
│  • Protected Admin Endpoints (/api/admin/diet-plans, /api/admin/invoices)    │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼───────────────────────────────────────┐
│              FIREBASE REALTIME DATABASE + LOCAL STORAGE SYNC                 │
│  • leads/{id} (with packageId, packageName, estimatedValue)                  │
│  • customers/{id} (packageCategory, startDate, endDate, assignedDietPlan)    │
│  • invoices/{id} (clientId, totalAmount, amountPaid, balanceDue, status)     │
│  • customDietPlans/{id} (reusable admin diet templates & meal schedules)     │
│  • dailyDietTracking/{clientId}/{YYYY-MM-DD} (checkedFoodIds, consumedKcal)  │
└──────────────────┬───────────────────────────────────────┬───────────────────┘
                   │                                       │
┌──────────────────▼───────────────────┐ ┌─────────────────▼───────────────────┐
│        ADMIN OS (ADMIN ONLY)         │ │    REGULAR USER DASHBOARD & PLAN    │
│  • Route Guard: Blocks regular users │ │  • Auto-redirect here on User Login │
│  • Leads CRM: Package Dropdown       │ │  • Package & Subscription Banner    │
│  • Clients Roster: Category Filter   │ │  • Assigned Workout Split Viewer    │
│    & Auto Subscription Status        │ │  • Today's Assigned Diet View       │
│  • Client Profile Report:            │ │    (Read-Only + Food Checkboxes)    │
│    - Package & Expiry Header         │ │  • Live Calorie Progress Bar        │
│    - Assigned Exercise & Diet Plans  │ │    (Target / Consumed / Remaining)  │
│    - Direct "Create Invoice" Modal   │ │  • Date-Keyed Daily History Log     │
│  • Diet Management Tab:              │ └─────────────────────────────────────┘
│    - Custom Meal & Food Builder      │
│    - Auto Calorie Calculator         │
│    - Client Diet Assignment          │
└──────────────────────────────────────┘
```

### Data Model & State

- **Package Catalog (`CoachingPackage`)**: Standardized list of packages (`3 Months Protocol`, `6 Months Protocol`, `9 Months Protocol`, `12 Months Protocol`, `21-Day Ignite Challenge`, `60-Day Transform Cohort`, `Custom Coaching Protocol`) with default duration in days/months, category label, and base price.
- **Lead Record (`Lead`)**: Extended with `packageId`, `packageName`, and `packageCategory`, synced to `leads/{id}` and preserved across lead edits and lead-to-client conversion.
- **Client Record (`Customer`)**: Extended with `packageId`, `packageName`, `packageCategory`, `packagePrice`, `startDate`, `endDate`, `assignedDietPlan` (`AdminDietPlan`), and computed `subscriptionStatus` (`ACTIVE` | `EXPIRING_SOON` | `SUBSCRIPTION_OVER` | `ONBOARDING`).
- **Admin Custom Diet Plan (`AdminDietPlan`)**: Contains `id`, `name`, `description`, `targetCalories`, `meals` (array of `AdminDietMeal` with `id`, `name`, `scheduledTime`, `instructions`, `items` array of `AdminDietFoodItem` with `id`, `name`, `quantity`, `calories`, `protein`, `carbs`, `fats`, and auto-calculated `totalCalories`), `totalDailyCalories`, `assignedClientId`, and `updatedAt`.
- **Invoice Record (`Invoice`)**: Extended with `clientId`, `packageName`, `paymentStatus` (`PAID` | `PARTIALLY_PAID` | `UNPAID`), `amountPaid`, and `outstandingBalance` (`Math.max(0, totalAmount - amountPaid)`).
- **Daily Diet Tracking Record (`DailyDietLog`)**: Keyed by `{clientId}_{YYYY-MM-DD}` with `date`, `clientId`, `planId`, `targetCalories`, `completedItemIds` (unique set of checked food item IDs), `consumedCalories`, `remainingCalories`, and `progressPercent`.

### Interactive Component & State Mapping

- **Authentication & Route Guard**:
  - When a regular user logs in or signs up via `AuthModal`, `activeTab` is set to `'dashboard'` (or `'plan'`), never `'admin'`.
  - In `App.tsx`, `Navbar.tsx`, and URL hash/pathname listeners, if a regular user (non-admin) attempts to navigate to `#admin` or `/admin`, the app intercepts the route and redirects to the user dashboard unless an active admin session (`isAdminAuthenticated`) is present or explicitly logging in through the Admin Login screen.
  - Logging out as a regular user clears the user session and returns to `'home'`; logging out as an admin clears the admin session and returns to `'home'`.
- **Lead Create/Edit & Conversion**:
  - Both the Create Lead modal and Lead Detail view include a **Package Dropdown** (plus Edit Lead modal) that updates `packageName`, `challengeInterest`, and `estimatedValue` in state and Firebase Realtime Database.
  - Converting a lead opens the Client Intake/Conversion modal with the lead's package, price, start date (today), and end date (auto-calculated from package duration) pre-filled.
- **Client Profile Complete Report & Invoice Creation**:
  - Clicking **Create Invoice** inside `ClientProfileDetailView` opens a dedicated modal pre-populated with the client's name, email, phone, address, selected package, and a unique `INV-YYYY-XXXX` number verified against existing invoices to prevent duplicates.
  - Changing price, discount, tax, payment status (`Paid`, `Partially Paid`, `Unpaid`), or `Amount Paid` dynamically recalculates `Final Payable Amount` and `Outstanding Balance`.
- **Admin Diet Tab & User Check-Off**:
  - Adding/editing food items or quantities in the Admin **Diet** tab immediately recalculates `meal.totalCalories` and `plan.totalDailyCalories` and validates that calorie and quantity inputs are non-negative before saving.
  - On the User Dashboard and Client Plan Nutrition tab, checking or unchecking a food item toggles its ID in a deduplicated `Set` for today's local date (`YYYY-MM-DD`), recalculates `consumedCalories`, `remainingCalories`, and `progressPercent`, and persists immediately to Firebase Realtime Database and `localStorage` as well as syncing back to the client record so the Admin can view the client's daily diet adherence.
