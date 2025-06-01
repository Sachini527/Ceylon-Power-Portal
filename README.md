
# ⚡ Ceylon Power Billing System

The Ceylon Electricity Board requires a system to store customer electricity meter readings and allow customers to check their last electricity bill with a full breakdown of charges. This project fulfills that requirement with a web-based application (no mobile support needed at this stage) consisting of:

- A web interface for meter readers to input new readings for existing customers.
- A public interface for customers to check their latest bill by entering their account number.

Customer registration is not part of this project scope, and the initial customer database is assumed to be preloaded.

---

## 🧠 Project Overview

This system fulfills the following two core functionalities:

### 👷‍♂️ Meter Reader Features

- Interface to input new meter readings.
- Inputs required: Customer Account Number, Reading Date, Meter Reading Value.
- System only accepts readings for existing customers.
- Web-only interface (not mobile-optimized).

### 👨‍💼 Customer Features

- Publicly accessible bill viewer.
- Enter account number to view the latest bill.
- Displays the following:
  - Last Reading Date
  - Previous Reading Date
  - Last Meter Reading
  - Previous Meter Reading
  - Fixed Charge
  - First Range Charge
  - Second Range Charge
  - Third Range Charge
  - Total Bill

---

## 📐 Billing Calculation Logic

| Unit Range   | Fixed Charge | Per Unit Charge                                  |
|--------------|--------------|--------------------------------------------------|
| First Range  |  500 LKR     | 20 LKR per unit                                  |
| Second Range | 1000 LKR     | 35 LKR per unit                                  |
| Third Range  | 1500 LKR     | Starts at 40 LKR and increases by 1 LKR/unit     |

- Fixed charge is only applied when the third range is reached.
- Units allocated based on the number of days between the last two readings:
  - First Range Units = number of days
  - Second Range Units = 2 × number of days
  - Third Range Units = remaining units

💡 Example:

Reading difference: 80 units  
Date difference: 25 days

- First: 25 × 20 = 500
- Second: 50 × 35 = 1750
- Third: 5 units → 40 + 41 + 42 + 43 + 44 = 210
- Fixed Charge: 1500

💰 Total: 500 + 1750 + 210 + 1500 = 3960 LKR

📌 Assumptions:

- Meter readings are integer values only.
- All readings considered recorded at 09:00 AM.
- No login or authentication is implemented.

---

## 🧾 Database Structure

Step 1: Create the database

```sql
CREATE DATABASE IF NOT EXISTS ceylon_power;
USE ceylon_power;
```

Step 2: Customers Table

```sql
CREATE TABLE IF NOT EXISTS customers (
    account_number VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
```

Step 3: Meter Readings Table

```sql
CREATE TABLE IF NOT EXISTS meter_readings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(20),
    reading_date DATE NOT NULL,
    reading_value INT NOT NULL,
    FOREIGN KEY (account_number) REFERENCES customers(account_number)
);
```

Step 4: Sample Data

```sql
INSERT INTO customers (account_number, name) VALUES
('10000001', 'Patty O’Furniture'),
('10000002', 'Paddy O’Furniture'),
('10000003', 'Olive Yew'),
('10000004', 'Aida Bugg'),
('10000005', 'Maureen Biologist'),
('10000006', 'Teri Dactyl'),
('10000007', 'Peg Legge'),
('10000008', 'Allie Grater'),
('10000009', 'Liz Erd'),
('10000010', 'A. Mused');
```

---

## 🔁 Workflow

### 🧑‍💼 Customer Side

1. User visits the customer page.
2. Inputs their account number.
3. System fetches their last two readings.
4. Billing logic is applied based on readings and dates.
5. Result is displayed with full breakdown.

### 🧑‍🔧 Meter Reader Side

1. Meter reader opens the reading input form.
2. Enters account number, reading date, and value.
3. System validates if the customer exists.
4. If valid, the reading is saved and acknowledged.
5. If invalid, an error message is shown.

---

## 📁 Project Structure

### 🧠 Backend (Java Spring Boot)

backend/
```
├── com.ceylonpower
│   ├── controller
│   │   ├── BillController.java
│   │   └── ReadingController.java
│   ├── entity
│   │   ├── Customer.java
│   │   └── MeterReading.java
│   ├── repository
│   │   ├── CustomerRepository.java
│   │   └── MeterReadingRepository.java
│   ├── service
│   │   └── BillingService.java
│   ├── exception
│   │   └── GlobalExceptionHandler.java
│   └── config
│       └── WebConfig.java
└── CeylonPowerApplication.java
```

### 🖥 Frontend (React)

frontend/
```
├── components/
│   ├── BillForm.js
│   ├── BillResult.js
│   └── MeterReadingForm.js
├── App.js
├── App.css
└── index.js
---
```

---

## 💻 Technologies Used

### Frontend:

- React.js
- Axios
- HTML/CSS

### Backend:

- Java Spring Boot
- Spring Web, Spring Data JPA
- MySQL
- Lombok

---

## 🚀 Setup Instructions

### 🧩 Backend Setup

1. Create database using the script above.
2. Configure application.properties:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ceylon_power
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

3. Start the backend:

```bash
mvn spring-boot:run
```

### 📦 Frontend Setup

1. Navigate to the frontend folder:

```bash
cd ceylon-power-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React app:

```bash
npm start
```

Visit: http://localhost:3000

---

## 🔗 API Endpoints

- GET /api/bill/{accountNumber} — Fetches the latest bill with breakdown.
- POST /api/readings — Submits a new meter reading (for existing customers only).

---

## 🤝 Contribution

Contributions are welcome! Fork this repo, make changes, and open a pull request.

---

## 📃 License

🛑 Note: This project was developed as part of a placement test. All rights to the project idea and requirements belong to the respective company.

---

## 👩‍💻 Author

- Sachini Hansika Peduruhewa  
