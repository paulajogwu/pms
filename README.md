#  Project Management System (PMS) API

A RESTful API built with Node.js, Express, and MongoDB (Mongoose) for managing projects.
The API supports project creation, listing, filtering, status updates, and soft deletion.



##  Tech Stack

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   UUID
-   dotenv
-   CORS
-   Body-parser




##Environment Variables

Create a `.env` file in the root directory:

    MONGO_URI=mongodb://localhost:27017/pms
    PORT=3000




##Installation & Setup

### 1️ Clone the repository


git clone <url>
cd pms


### 2️ Install dependencies


npm install


### 3️ Start the server


npm start


Server runs on:

    http://localhost:3000

Base API URL:

    http://localhost:3000/api/v1/pms



## Database Schema

## Project Model

  Field        Type      Required   Description
  ------------ --------- ---------- ----------------------------------
  id           String    Yes        UUID (auto-generated)
  name         String    Yes        Project name
  clientName   String    Yes        Client name
  status       String    No         Enum: Active, on_hold, completed
  startDate    Date      Yes        Project start date
  endDate      Date      No         Project end date
  isDeleted    Boolean   No         Soft delete flag
  createdAt    Date      Auto       Creation timestamp
  updatedAt    Date      Auto       Last update timestamp



#  API Endpoints

Base URL:

    /api/v1/pms



## 1️ Create Project

               ### POST /projects

### Request Body


{
  "name": "Website Redesign",
  "clientName": "Julius berger Company",
  "status": "Active",
  "startDate": "2026-02-10",
  "endDate": "2026-04-10"
}


### Validation Rules

-   `name` is required
-   `clientName` is required
-   `startDate` is required
-   `endDate` cannot be earlier than `startDate`



## 2 List Projects

               ### GET /projects

### Optional Query Parameters

  Query Param   Description
  ------------- ---------------------------------------
  status        Filter by project status
  search        Search by project name or client name
  sort          Sort by createdAt or startDate

Example:

    GET /projects?status=Active&search=website&sort=startDate



## 3️ Get Project By ID

          ### GET /projects/:id

Example:

    GET /projects/550e8400-e29b-41d4-a716-446655440000



## 4️ Update Project Status

          ### PATCH /projects/:id/status

Request Body:


{
  "status": "completed"
}



## 5️ Delete Project (Soft Delete)

         ### DELETE /projects/:id

-   Does NOT permanently delete.
-   Sets `isDeleted = true`



## Error Handling

  Status Code   Meaning
  ------------- --------------------
  400           Bad Request
  404           Resource Not Found
  500           Server Error



# Business Logic

        ### Soft Delete

Projects are not permanently removed. Instead, `isDeleted = true` is
set, and all queries exclude deleted records.

### Status Enum

-   Active
-   on_hold
-   completed

### Date Validation

-   `endDate` must not be before `startDate`




