# Employer Home — Architecture & Component Inventory

- **Role**: Employer / HR manager; Home at `/` (`src/app/(employer)/`)
- **Layer boundaries**:
  1. `src/styles/` — Design system tokens (`tokens.css`, `typography.css`, `gradients.css`, `effects.css`)
  2. `src/components/ui/` — Domain-agnostic design system primitives
  3. `src/components/layout/` — App chrome (`EmployerShell`, `Sidebar`, `Header`, `PlaceholderPage`)
  4. `src/features/<domain>/` — Product features owning their section header, local UI state, and domain composition (`AtAGlance`, `TaskList`, `EmployeeParticipation`, `CareAccess`, `QuickActions`, `MetricCard`, `ParticipationChart`, `AddEmployeeDialog`)
  5. `src/views/` — Page-level layout grids assembling features (`DashboardView`)
  6. `src/types/` → `src/data/` → `src/services/` → Server Route (`src/app/`) → View

## UI Primitives (`src/components/ui/`)

| Component | Role | Notes |
| --- | --- | --- |
| `Button` | Canonical action button | Variants: `primary`, `secondary`, `white`, `action`, `pills`, `basic` |
| `Card` | Neutral surface container | `surface`: `default \| brand \| gradient`, `padding`: `none \| md \| lg`, `elevation`: `xs \| sm` |
| `SectionHeader` | Section heading bar | Renders `h2`/`h3`, optional `Icon`, and trailing `action` slot |
| `TileButton` | Horizontal icon + copy tile | Supports `href` (`Link`) or `onClick` (`button`) |
| `NavButton` | Sidebar route link | Active state via pathname, optional `icon` and `badge` |
| `PeriodSelect` | Hug-content period selector | Native `<select>` (`monthly \| weekly \| daily`) overlaid on synced display label |
| `Badge` | Status/trend pill | `tone`: `success \| error \| neutral` |
| `ProgressBar` | Determinate progress bar | Accessible `progressbar` with `value` and `max` |
| `Avatar` | Initials avatar | Used for org switcher and user profile |
| `Icon` | Inline SVG icon registry | Typed `IconName` and `IconSize` |
| `FormControls`, `HorizontalTabs`, `Toast`, `Tooltip` | Staged UI primitives | Ready for upcoming sub-routes |

## Privacy & Scope

- Employer sees aggregated, anonymized counts only.
- Destination routes (`/analytics`, `/employees`, `/integrations`, `/billing`, `/inbox`, `/support`, `/settings`) currently use `PlaceholderPage` pending their Figma frames.
