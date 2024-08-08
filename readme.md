# Business Workflow API

This project is a simple API to manage the workflow stages of a business. The workflow stages are:
- **New**: A new business has been created in the system.
- **Market Approved**: The business industry is within the target market.
- **Market Declined**: The business industry is not within the target market.
- **Sales Approved**: The business is now part of the sales process.
- **Won**: The business deal was won.
- **Lost**: The business deal was not closed.

## Project Structure

```
business-workflow/
├── src/
│   ├── controllers/
│   │   └── business/
│   │       ├── dto.ts
│   │       └── index.ts
│   ├── middlewares/
│   │   └── validationMiddleware.ts
│   ├── models/
│   │   └── business.ts
│   ├── routes/
│   │   └── business.ts
│   └── types/
│       └── businessTypes.ts
├── tsconfig.json
└── package.json
```

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd business-workflow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000`.

## API Endpoints

### Create a New Business

**Endpoint:** `POST /api/businesses`

**Body:**
```json
{
    "fein": "123456789",
    "name": "Sample Business",
    "industry": "restaurants",
    "contact": {
        "name": "John Doe",
        "phone": "555-1234"
    }
}
```

**Response:**
```json
{
    "business": {
        "fein": "123456789",
        "name": "Sample Business",
        "industry": "restaurants",
        "contact": {
            "name": "John Doe",
            "phone": "555-1234"
        },
        "status": "New"
    },
    "nextStep": "Provide industry to progress to Market Approved or Market Declined."
}
```

### Progress a Business

**Endpoint:** `POST /api/businesses/:fein/progress`

**Body:**
```json
{
    "status": "Won" // or "Lost"
}
```

**Response:**
```json
{
    "business": {
        "fein": "123456789",
        "name": "Sample Business",
        "industry": "restaurants",
        "contact": {
            "name": "John Doe",
            "phone": "555-1234"
        },
        "status": "Won" // or "Lost"
    },
    "nextStep": "The business deal is won. No further steps."
}
```

## Workflow Rules

1. **New**: 
   - A new business starts in the `New` status.
   - Provide industry to progress to `Market Approved` or `Market Declined`.

2. **Market Approved**:
   - The business industry is within the target market.
   - Provide valid contact information to progress to `Sales Approved`.

3. **Market Declined**:
   - The business industry is not within the target market.
   - No further steps.

4. **Sales Approved**:
   - The business is now part of the sales process.
   - Mark the business as `Won` or `Lost` to finalize the workflow.

5. **Won**:
   - The business deal was won.
   - No further steps.

6. **Lost**:
   - The business deal was not closed.
   - No further steps.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **TypeScript**: Typed superset of JavaScript.
- **class-validator**: Validation for TypeScript classes.
- **class-transformer**: Transformation for TypeScript classes.

## License

This project is licensed under the MIT License.