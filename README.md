# SpecView - Jest Test Analyzer

[![Live Demo](https://img.shields.io/badge/demo-live-green?style=flat-square)](https://specview.koszuta.dev)
[![Backend Repo](https://img.shields.io/badge/backend-source-blue?style=flat-square)](https://github.com/AlexKosz/SpecViewServer)

![SpecView Interface](/public/screenshots/fileDetails.png)
![SpecView Interface](/public/screenshots/userDash.png)

A web interface for analyzing and sharing Jest test results. Upload JSON reports, search assertions, and collaborate with your team.

## Key Features

- **Instant Analysis**: Upload Jest JSON output (`jest --json --outputFile=results.json`)
- **Smart Search**: Filter by test name, file, status, or assertion text
- **Secure Accounts**: Save reports to your profile
- **Shareable Links**: Generate URLs to share test results
- **CI/CD Ready**: Designed for modern development workflows

## How to Use

1. **Upload** your Jest JSON file (drag & drop or file picker)
2. **Search** tests by:
   - File path (`src/components/Button.test.js`)
   - Folder within path (`src/components/Button.test.js`)
   - Assertion text (`Login Modal should display all proper fields`)
3. **Save** (requires login) or **Share** (public link)

## Tech Stack

| Area       | Technology    |
| ---------- | ------------- |
| Framework  | React 18      |
| State      | Redux Toolkit |
| Styling    | Mui           |
| API Client | Axios         |
| Hosting    | AWS           |

## .env

set this in your .env

```bash
REACT_APP_API_URL=

```

## Contributing

Issues and PRs welcome!

## Development Setup

```bash
npm install  # Install dependencies
npm start   # Run dev server (http://localhost:3000)
```
