# Employer Home — Architecture & Component Inventory

- **Role**: Employer / HR manager; Home at `/` (`src/app/(employer)/`)
- **Two-Bucket Rule**:
  - **Universal** (`src/styles/`, `src/components/ui/`, `src/components/patterns/`, `src/types/common.ts`, `src/types/asyncState.ts`, `src/lib/`, plus props-driven features `AtAGlance`, `EmployeeParticipation`, `QuickActions`, `TaskList`) — shared across all user portals.
  - **Role-specific** (`src/app/(employer)/`, `src/views/employer/`, `src/types/employer.ts`, `src/data/employerDashboard.ts`, `src/services/`, `CareAccess`, `AddEmployeeDialog`, `EmployerShell`) — scoped to Employer without deep folder nesting.

## Layer Boundaries

1. `src/styles/` — Subatomic design system tokens (`tokens.css`, `typography.css`, `gradients.css`, `effects.css`)
2. `src/components/ui/` — Domain-agnostic design system primitives (imports only `types/common.ts`)
3. `src/components/patterns/` — Cross-page / cross-portal reusable compositions (`MetricCard`, `MetricStrip`, `TrendChart`)
4. `src/components/layout/` — App chrome (`EmployerShell`, `Sidebar`, `Header`, `PlaceholderPage`)
5. `src/features/` — Product features owning their `SectionHeader`, local UI state, and props-driven composition (`AtAGlance`, `EmployeeParticipation`, `QuickActions`, `TaskList`, `CareAccess`, `AddEmployeeDialog`)
6. `src/views/<portal>/` — Page-level layout grids grouped by portal (`src/views/employer/EmployerDashboardView.tsx`)
7. `src/types/` → `src/data/` → `src/services/` (`getEmployerShellData`, `getEmployerDashboard`, `runDemoTask`) → Server Route (`src/app/`) → View

## UI Primitives (`src/components/ui/`)

| Component | Role | Notes |
| --- | --- | --- |
| `Button` | Canonical action or link button | Variants: `primary`, `secondary`, `white`, `action`, `pills`, `basic`; supports `href` (`Link`) |
| `Card` | Neutral surface container | `surface`: `default \| brand \| gradient`, `padding`: `none \| md \| lg`, `elevation`: `xs \| sm` |
| `SectionHeader` | Section heading bar | Renders `h2`/`h3`, optional `Icon`, and trailing `action` slot |
| `Select` | Universal hug-content select | Variants: `inline` and `pill` (with optional `leftIcon`) |
| `TileButton` | Horizontal icon + copy tile | Supports `href` (`Link`) or `onClick` (`button`) |
| `NavButton` | Sidebar route link | Active state via pathname, optional `icon` and `badge` |
| `PeriodSelect` | Period selector (`monthly \| weekly \| daily`) | Wraps universal `Select` |
| `Badge` | Status/trend pill | `tone`: `success \| error \| neutral` |
| `ProgressBar` | Determinate progress bar | Accessible `progressbar` with `value` and `max` |
| `Avatar` | Initials avatar | Used for org switcher and user profile |
| `Icon` | Inline SVG icon registry | CSS-masked `IconName` and `IconSize` |
| `FormControls` | Accessible form inputs | `TextField`, `SelectField`, `CheckboxField`, `RadioField`, `ToggleField` |
| `HorizontalTabs`, `Toast`, `Tooltip` | Tab bar, status banner, tooltip | `HorizontalTabs` powers Analytics participation tabs |

## Reusable Patterns (`src/components/patterns/`)

| Component | Role | Notes |
| --- | --- | --- |
| `MetricCard` | KPI card pattern | Composes `Card`, `Badge`, `Icon`, and `ProgressBar` |
| `MetricStrip` | Responsive 3-column KPI strip | Wraps `MetricCard[]` cleanly for Home and other portals |
| `MetricWideBlock` | Wide 4-column KPI banner | Gradient surface with dividers for Analytics (`At a Glance`) |
| `ActionBanner` | Promotional / export banner | `compact` (Promote Availability) and `wide` (Download Summary) variants |
| `Sparkline` | Mini smooth SVG trend curve | Used in metric breakdown tables |
| `TrendChart` | Generic multi-series SVG line chart | Token-colored series (`blue`, `brand`, `orange`) with optional Y-axis & area fill |

## Privacy & Scope

- Employer sees aggregated, anonymized counts only.
- Live Employer routes: `/` (`EmployerDashboardView`) and `/analytics` (`EmployerAnalyticsView`). Remaining routes (`/employees`, `/integrations`, `/billing`, `/inbox`, `/support`, `/settings`) use `PlaceholderPage` pending their Figma frames.
