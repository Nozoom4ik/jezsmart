# JezSmart Technical Specifications

## 1. Structured JSON Schema (Database)
This schema defines the core Firestore entities for tracking transport, rewards, and feedback.

### Users (Collection: `users`)
```json
{
  "uid": "string",
  "displayName": "string",
  "email": "string",
  "points": "number",
  "rewards": ["rewardId"],
  "medicalId": "string (optional)",
  "role": "resident | admin"
}
```

### Transport (Collection: `transport_routes`)
```json
{
  "routeId": "string",
  "number": "string",
  "stations": [
    { "name": "string", "location": "geopoint" }
  ],
  "activeBuses": [
    { "busId": "string", "location": "geopoint", "lastUpdate": "timestamp" }
  ]
}
```

### Feedback & Petitions (Collection: `petitions`)
```json
{
  "pid": "string",
  "title": "string",
  "description": "string",
  "authorId": "string",
  "votes": "number",
  "status": "pending | under_review | implemented",
  "location": "geopoint (optional)"
}
```

---

## 2. Home Screen Wireframe Description
The interface follows a **"Modular Bento"** layout for clarity and accessibility.

1. **Header**: 
   - Top-left: City Logo + "Zhezqazgan".
   - Top-right: User Profile (Avatar + JezPoints balance) & Notification Bell.
2. **Hero Search**: A prominent search bar "How can we help you today?" (triggers JezBot).
3. **Quick Actions (Icon Grid)**:
   - **Bus Tracker**: Real-time map & arrival times.
   - **Medical**: Quick link to MedElement.
   - **Reports**: Potholes, lighting, etc.
   - **SOS**: A distinctive red floating button for emergencies.
4. **City Pulse (Vertical List)**:
   - "Next Bus" card (dynamic based on nearest station).
   - "Air Quality" index badge.
   - "Active Roadwork" alerts.
5. **Latest News (Carousel)**: 
   - Official Akimat updates and cultural events.

---

## 3. Integration Roadmap

### Phase 1: Foundation (Current)
- [ ] Initialize Firebase Auth & Firestore.
- [ ] Set up AI Hub (Gemini) for JezBot interactions.
- [ ] Implement core Navigation (Safe-Area focused mobile UI).

### Phase 2: Mobility & Maps
- [ ] Integrate **2GIS Map SDK**.
- [ ] Develop Real-time Bus Tracker using mock GPS data (pre-hook for Avtobys API).
- [ ] Implement Route search.

### Phase 3: Services & AI
- [ ] **JezBot** integration: Natural Language processing for municipal queries.
- [ ] **MedElement** Redirects & Webview Integration.
- [ ] Infrastructure Reporting module with Photo Upload.

### Phase 4: Gamification & Launch
- [ ] **JezPoints** logic: Reward triggers for community reports.
- [ ] Multilingual support (Kazakh/Russian/English).
- [ ] Final performance optimization.
