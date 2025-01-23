## Personal Finance Tracker

Personal Finance Tracker is a web application designed to help users track their expenses, manage budgets, and generate financial reports. The application allows users to input their spending, set monthly or yearly budgets, and analyze trends in their financial data. The generated financial reports provide valuable insights into their financial behavior, making it easier to track spending, stay within budget, and improve financial planning.

## Features

- **Expense Tracking**: Users can record and categorize their expenses.
- **Budget Creation**: Users can set a budget for specific categories and periods.
- **Financial Reports**: Generate PDF reports that summarize spending, budget, and provide financial suggestions.
- **Spending Trend Analysis**: Visual representation of spending trends to identify patterns over time.
- **Category-wise Spending**: Detailed overview of spending by category (e.g., Food, Travel, Entertainment).

## Tech Stack

**Frontend**

- **TypeScript**
- **React.js**
- **RTK Query** for data fetching and caching.
- **Yup** for validation.
- **Skeleton** for loading states.
- **React-Hook-Form** for form management.
- **Material-UI** for UI components.

**Backend**

- **Node.js**
- **Express.js**
- **Typescript**
- **MongoDB** for database management.
- **JWT** (if required in the future for authentication)
- **PDFKit** for PDF generation.
- **API Documentation**: Swagger

## Installation

### Prerequisites

**Frontend**

- Node.js installed

**Backend**

- Node.js (v14 or higher)
- MongoDB (or a cloud MongoDB service like Atlas)

### Steps to Install

1. Clone the repository:

   ```bash
   git clone https://github.com/Rajveer75way/Assignment-2-Frontend.git

2. Install the dependencies:

   **Frontend**

   ```bash
   cd Assignment-2-Frontend/client
   npm install
   ```

   **Backend**

   ```bash
   cd backend
   npm install
   ```

3. Set up your MongoDB database (either locally or via MongoDB Atlas).

4. Create a `.env.local` file in the backend root directory (`server`) and add the following environment variables:

   ```bash
   MONGO_URI=<your_mongo_db_connection_string>
   PORT=5000
   GEMINI_API_KEY=''
   ```

5. Run the backend server:

   ```bash
   cd backend
   npm run local
   ```

6. Run the frontend development server:

   ```bash
   cd Assignment-2-Frontend/client
   npm run dev
   ```

7. The backend server will start at `http://localhost:5000` and the frontend development server will start at `http://localhost:5173`.

## API Documentation

The project includes API endpoints to perform CRUD operations for expenses, budgets, and generate reports. The API documentation is available via [Swagger UI](http://localhost:5000/docs) once the backend server is running.

### Endpoints

#### 1. Expense Routes

- **GET** `/api/expenses`  
  - Get a list of all expenses.

- **POST** `/api/expenses`  
  - Add a new expense.

- **GET** `/api/expenses/:id`  
  - Get a specific expense by its ID.

- **PUT** `/api/expenses/:id`  
  - Update an existing expense.

- **DELETE** `/api/expenses/:id`  
  - Delete an expense.

- **POST** `/api/expenses/all-category-date`  
  - Get expenses for all categories within a specific date range.

- **POST** `/api/expenses/particular-category-date`  
  - Get expenses for a particular category within a specific date range.

- **POST** `/api/expenses/spending-trends`  
  - Get spending trends based on the data.

### 2. Budget Routes

- **GET** `/api/budget`  
  - Get a list of all budgets.

- **POST** `/api/budget`  
  - Set a new budget.

- **GET** `/api/budget/:id`  
  - Get a specific budget by its ID.

- **PUT** `/api/budget/:id`  
  - Update an existing budget.

- **DELETE** `/api/budget/:id`  
  - Delete a budget.

- **POST** `/api/budget/particular-category-date`  
  - Get budgets for a specific category within a date
