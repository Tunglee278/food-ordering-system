# Food Ordering Data Warehouse & Analytics System

A data-oriented food-ordering project that connects an operational web application with MongoDB-backed order and product services. The wider project was designed to turn transactional data into structured datasets for sales and customer analysis.

> Personal project by **Le Thanh Tung** | January 2026 - February 2026

## Project objective

Design and implement a unified system that captures food-ordering transactions and prepares the underlying data for reporting and business analysis. The public repository contains the customer-facing application, administration interface and MongoDB transaction service that form the operational source layer of the broader warehouse workflow.

## My contributions

- Integrated the food-ordering frontend with backend and database services.
- Designed MongoDB schemas for products, customers and orders.
- Implemented APIs for product retrieval, product creation, checkout and order-status updates.
- Built the transaction source used by the wider ETL and analytics workflow.
- Designed ETL logic for extracting, transforming and loading operational records.
- Used Pandas in the analytics workflow to prepare sales and customer datasets.
- Connected backend, database and analysis components into a unified project.

## System architecture

```text
Customer storefront / Admin interface
              -> REST API
              -> MongoDB operational data
              -> ETL transformation workflow
              -> Structured analytical datasets
              -> Sales and customer analysis
```

## Technology stack

| Layer | Technologies |
| --- | --- |
| Frontend | HTML, CSS, JavaScript |
| Public transaction API | Node.js, Express |
| Database | MongoDB, Mongoose |
| Wider analytics workflow | Python, Flask, Pandas, ETL |

## Results

- Integrated the storefront, administration tools, backend and database into one working system.
- Created a structured source of order and product data for downstream analysis.
- Enabled sales and customer-behavior analysis through the wider warehouse workflow.

## Public repository structure

```text
Backend/          Express and MongoDB transaction service
Webbanhang-main/  Storefront, checkout and administration interface
```

## Run locally

### Backend

```bash
cd Backend
npm install
```

Copy `.env.example` to `.env`, replace the sample value with your own MongoDB Atlas URI, then run:

```bash
npm start
```

### Frontend

Serve `Webbanhang-main` with a local web server and open `index.html`. Update the frontend API base URL if the backend is running on a different host or port.

## Security and repository scope

The MongoDB credential and local `.env` file are excluded. The public repository focuses on the application and transaction layer; the broader analytical workflow described in the CV is documented here as project context.

## Author

**Le Thanh Tung** - AI Engineer

[Portfolio](https://le-thanh-tung-ai-portfolio.vercel.app/) | [GitHub](https://github.com/Tunglee278)
