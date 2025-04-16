# Bidirectional ClickHouse & Flat File Data Ingestion Tool

## DEMO VIDEO
[https://youtu.be/97P0kVbOCZw](https://youtu.be/97P0kVbOCZw)

## Overview

This tool facilitates seamless data transfer between ClickHouse and flat files (CSV). It supports:

- **ClickHouse → CSV**: Exporting data from ClickHouse tables to CSV files.
- **CSV → ClickHouse**: Importing data from CSV files into ClickHouse tables.

The application features a user-friendly web interface built with React, allowing users to configure connections, select tables and columns, upload files, and monitor ingestion progress.

## Features

- **Secure Connection**: Authenticate ClickHouse access using JWT tokens.
- **Dynamic Schema Discovery**: Automatically retrieve available tables and columns.
- **Flexible Ingestion**: Supports both data export and import operations.
- **Error Handling & Logging**: Provides detailed error messages and logs for troubleshooting.
- **Data Preview**: Allows users to preview data before ingestion.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **CSV Parsing**: csv-parser, fast-csv
- **ClickHouse Client**: clickhouse package (legacy)
- **Authentication**: JWT tokens

## Prerequisites

Ensure the following are installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **Docker**: [Install Docker](https://www.docker.com/get-started)

## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/akshay07k/clickhouse-flatfile-ingestor.git
cd clickhouse-flatfile-ingestor
```

### 2. Start ClickHouse Server Using Docker

```bash
docker run -d --name clickhouse-server --ulimit nofile=262144:262144 -p 8123:8123 -p 9000:9000 yandex/clickhouse-server
```

#### Verify the container is running:

```bash
docker ps
```

### 3. Backend Setup

```bash
cd server
npm install
```

#### Create a `.env` file in the `server` directory by copying from the sample: 

```bash
cp .env.sample .env
```

#### Start the backend server:

```bash
npm run dev
```

### 4. Frontend Setup

#### Open a new terminal window:

```bash
cd client
npm install
npm run dev
```
#### The application should now be running at `http://localhost:3000`.


## Usage

### ClickHouse → CSV
- Select ClickHouse as the source.
- Enter ClickHouse connection details.
- Choose the target table and columns.
- Click Export to download the data as a CSV file.

### CSV → ClickHouse
- Select CSV as the source.
- Upload the CSV file.
- Specify the target ClickHouse table.
- Click Upload to import the data into ClickHouse.