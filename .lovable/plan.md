

## Compliance Outreach Dashboard — Supabase-Powered Rebuild

This plan rebuilds the compliance/outreach dashboard from the provided code using Supabase for authentication and data storage, adapted for Lovable's environment.

---

### 1. Connect Supabase & Set Up Database

- **Enable Supabase** integration on this project
- Create the following tables:
  - **`outreach_logs`** — stores all outreach activity (target name, contact, email, category, follow-up count, response status, timestamps)
  - **`user_profiles`** — stores user preferences (LinkedIn bio, deck link, profile link, blog link)
- Enable **Row Level Security (RLS)** so each user only sees their own data
- Auto-create a profile row on signup via a database trigger

### 2. Authentication

- Add a **login/signup page** with email & password authentication
- Include a **forgot password** flow with a `/reset-password` page
- Protect all dashboard routes behind authentication

### 3. Dashboard Layout

- **Sidebar** with:
  - Mode toggle: **Remote Jobs** vs **Funded CEOs**
  - Navigation tabs: **Live Pipeline**, **Master Archive**, **Response Hub**
  - CSV export button
- **Top bar** with search input and status indicator
- Clean, modern design using existing shadcn/ui components

### 4. Live Pipeline (Sourcing Tab)

- Display lead cards with company name, contact, location, salary/funding info
- Each card has an action button: "Apply for Remote FCCO" (Jobs) or "Pitch Fractional Model" (CEOs)
- Clicking the button logs outreach to Supabase and opens a `mailto:` link with a pre-filled email template

### 5. Master Archive Tab

- Table view of all leads (new + contacted) with columns: Entity, Category, Status, Response, Activity
- Contacted leads show a dropdown to update response status (No Reply / Replied / Meeting Set)

### 6. Response Hub (Inbox Tab)

- List of all contacted leads with response status buttons
- Follow-up button to send the next outreach stage
- Visual tracking of follow-up count and last contact date

### 7. Profile & Settings

- Editable fields for LinkedIn bio and outreach links (deck, profile, blog)
- These values are used in auto-generated email templates

### 8. CSV Export

- Export current view data as a CSV file with appropriate headers for Jobs or CEOs

