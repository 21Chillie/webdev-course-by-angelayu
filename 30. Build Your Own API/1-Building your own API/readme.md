# Building Your Own APIs - Section 234

## Summary

This section covers creating APIs from scratch with a focus on RESTful principles.

### Key Topics
- **Public vs Internal APIs**  
  - Public APIs (documented for external use)  
  - Internal APIs (organization-only)  
  - Platforms like RapidAPI for discovery/hosting  

- **Monetizable API Traits**  
  1. Large valuable data collection  
  2. Proprietary algorithm/service  
  3. Simplified user interface  

- **REST API Fundamentals**  
  - Standard HTTP methods (GET/POST/PUT/PATCH/DELETE)  
  - JSON data format  
  - Client-server separation  
  - Stateless operations  

- **Hands-On Project**  
  Build a joke API implementing REST principles  

## Core REST Characteristics
```javascript
// Example Endpoints
GET    /api/jokes       // Fetch all
POST   /api/jokes       // Create new
GET    /api/jokes/:id   // Get one
PUT    /api/jokes/:id   // Update all
PATCH  /api/jokes/:id   // Partial update
DELETE /api/jokes/:id   // Remove
```