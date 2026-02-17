Incident Tracker Mini App – Backend
Overview:
This is the backend service for the Incident Tracker Mini App, a full-stack application designed to manage production incidents.
The backend provides RESTful APIs for creating, retrieving, updating, filtering, sorting, and paginating incident records.
The system is designed with scalability, validation, and clean API structure

Tech stack used:
  Runtime: Node.js
  Framework: Express.js
  Database: MongoDB Atlas
  ODM: Mongoose
  Environment Config: dotenv


Features Implemented:
 1.Create incidents with validation
 2.Fetch incidents with:
    Server-side pagination
    Filtering
    Sorting
    Search
 3.Fetch single incident by ID
 4.Update incident status/details
 5.Database seeding (~200 records)
 6.Proper schema validation
 7.Indexed fields for optimized querying
 8.Structured API responses
 9.Error handling middleware

 Setup instructions:

 1. Clone the Repository:
    git clone <your-repo-url>
    cd backend
 2. Install Dependencies:
    npm install
 3. Configure Environment Variables:
    inside .env->MONGO_URI=your_mongodb_atlas_connection_string(Make sure your MongoDB Atlas cluster allows your IP address).
 4. Run the Server:
    npm run dev (or) node server.js
    server will start on http://localhost:5000


Database Design:
  1.Incident Schema
    Fields:
    id (ObjectId)
    title (String, required)
    service (String, required)
    severity (Enum: SEV1–SEV4)
    status (Enum: OPEN, MITIGATED, RESOLVED)
    owner (String, optional)
    summary (String, optional)
    createdAt (Date, auto-generated)
    updatedAt (Date, auto-generated)

 2.Indexing Strategy:
   Indexes are created on:
    severity
    status
    service
    createdAt
These improve filtering and sorting performance for large datasets.

Seeding Database:
To seed ~200 records:
run ->node seed/seed.js
This generates randomized incidents for testing pagination and filtering.


API Endpoints:

1.Create Incident:
POST /incidents
Body:
    {
      "title": "string",
      "service": "string",
      "severity": "SEV1 | SEV2 | SEV3 | SEV4",
      "status": "OPEN | MITIGATED | RESOLVED",
      "owner": "string?",
      "summary": "string?"
    }

2.List incidents:
GET /incidents
QUERY PARAMS: 
    page        number (default: 1)
    limit       number (default: 10)
    severity    SEV1–SEV4
    status      OPEN | MITIGATED | RESOLVED
    service     string
    search      string (title search)
    sortBy      field (default: createdAt)
    order       asc | desc (default: desc)

3.Get incidents:
GET /incidents/:id

4.Update incidents:
PATCH /incidents/:id

Body: 
     {
        "title": "string?",
        "service": "string?",
        "severity": "SEV1–SEV4?",
        "st atus": "OPEN | MITIGATED | RESOLVED?",
        "owner": "string?",
        "summary": "string?"
    } 


      
