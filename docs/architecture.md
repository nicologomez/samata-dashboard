# Employer Home — Architecture & Component Inventory

- **Role**: Employer / HR manager; Home at `/` (`src/app/(employer)/`)
- **Layer boundaries**:
  1. `src/styles/` — Subatomic design system tokens (`tokens.css`, `typography.css`, `gradients.css`, `effects.css`)
  2. `src/components/ui/` — Domain-agnostic design system primitives (atoms & small molecules)
  3. `src/components/patterns/` — Cross-page / cross-portal reusable compositions (`MetricCard`, `MetricStrip`, `TrendChart`)
  4. `src/components/layout/` — App chrome (`EmployerShell`, `Sidebar`, `Header`, `PlaceholderPage`)
  5. `src/features/<domain>/` — Product features owning their `SectionHeader`, local UI state, and domain composition (`AtAGlance`, `TaskList`, `EmployeeParticipation`, `CareAccess`, `QuickActions`, `AddEmployeeDialog`)
  6. `src/views/` — Page-level layout grids assembling features (`DashboardView`)
  7. `src/types/` → `src/data/` → `src/services/` (`getEmployerShellData`, `getEmployerDashboard`, `runDemoTask`) → Server Route (`src/app/`) → View

## UI Primitives (`src/components/ui/`)

| Component | Role | Notes |
| --- | --- | --- |
| `Button` | Canonical action or link button | Variants: `primary`, `secondary`, `white`, `action`, `pills`, `basic`; supports `href` (`Link`) |
| `Card` | Neutral surface container | `surface`: `default \| brand \| gradient`, `padding`: `none \| md \| lg`, `elevation`: `xs \| sm` |
| `SectionHeader` | Section heading bar | Renders `h2`/`h3`, optional `Icon`, and trailing `action` slot |
| `TileButton` | Horizontal icon + copy tile | Supports `href` (`Link`) or `onClick` (`button`) |
| `NavButton` | Sidebar route link | Active state via pathname, optional `icon` and `badge` |
| `PeriodSelect` | Hug-content period selector | Native `<select>` (`monthly \| weekly \| daily`) overlaid on synced display label |
| `Badge` | Status/trend pill | `tone`: `success \| error \| neutral` |
| `ProgressBar` | Determinate progress bar | Accessible `progressbar` with `value` and `max` |
| `Avatar` | Initials avatar | Used for org switcher and user profile |
| `Icon` | Inline SVG icon registry | CSS-masked `IconName` and `IconSize` |
| `FormControls` | Accessible form inputs | `TextField`, `SelectField`, `CheckboxField`, `RadioField`, `ToggleField` |
| `HorizontalTabs`, `Toast`, `Tooltip` | Staged UI primitives | Ready for upcoming sub-routes |

## Reusable Patterns (`src/components/patterns/`)

| Component | Role | Notes |
| --- | --- | --- |
| `MetricCard` | KPI card pattern | Composes `Card`, `Badge`, `Icon`, and `ProgressBar` |
| `MetricStrip` | Responsive 3-column KPI strip | Wraps `MetricCard[]` cleanly for Home, Analytics, and other portals |
| `TrendChart` | Generic multi-series SVG line chart | Token-colored series (`blue`, `brand`, `orange`) driven by `series` config |

## Privacy & Scope

- Employer sees aggregated, anonymized counts only.
- Destination routes (`/analytics`, `/employees`, `/integrations`, `/billing`, `/inbox`, `/support`, `/settings`) currently use `PlaceholderPage` pending their Figma frames.
