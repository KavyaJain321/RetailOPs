# RetailOps: A Modern Management System for Distributors 🚀

[<img width="1336" height="619" alt="image" src="https://github.com/user-attachments/assets/07ffa6ed-67f3-42bb-9348-08f78296a44e" />](https://github.com/KavyaJain321/retailops/blob/main/WhatsApp%20Image%202025-07-21%20at%205.57.44%20PM.jpeg)

<p align="center">A clean, at-a-glance dashboard to monitor key business metrics.</p>

---

### **[Live Demo on Render](https://retailops-iq67.onrender.com)** 🌐

---

## ✨ About The Project

Many small distributors still rely on manual ledgers, leading to errors and inefficiency. RetailOps solves this by providing a full-stack web application designed to digitize and streamline their core operations. This tool streamlines day-to-day operations, from order creation and stock management to payment tracking and automated customer communication, all from a single, centralized platform.

Built with a modern tech stack, this project demonstrates a practical, real-world application of Node.js, Express, and MongoDB, integrated with the Twilio API for real-time WhatsApp notifications.

---

## 🎯 Key Features

* **📊 Interactive Dashboard:** A comprehensive overview of total revenue, pending payments, order volume, and low-stock alerts.
* **📦 Order Management:** A seamless workflow to create new orders, which automatically updates stock levels and generates payment records.
* **💳 Payment Tracking:** Automatically tracks payment statuses (Pending, Completed, Overdue) based on order dates and payment terms.
* **👥 Retailer & Product CRM:** Full CRUD (Create, Read, Update, Delete) functionality for managing retailer profiles and product inventory.
* **🤖 Automated WhatsApp Notifications:** Integrated with the Twilio API to send real, automated order confirmations and payment reminders directly to retailers.
* **☁️ Cloud-Based & Persistent:** Data is securely stored in a MongoDB Atlas cloud database, ensuring persistence and reliability.
* **📱 Fully Responsive:** A mobile-first design that works beautifully on desktops, tablets, and smartphones.

---

## 🛠️ Tech Stack

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Twilio](https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=twilio&logoColor=white) ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

---

## ⚙️ Getting Started: Running Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js installed (`v18.x` or higher)
* npm (Node Package Manager)
* A free MongoDB Atlas account
* A free Twilio account

### Installation & Setup

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/KavyaJain321/retailops.git](https://github.com/KavyaJain321/retailops.git)
    ```
   

2.  **Navigate to the project directory**
    ```sh
    cd retailops
    ```

3.  **Install NPM packages**
    ```sh
    npm install
    ```

4.  **Set up your Environment Variables**
    * Create a file named `.env` in the root of the project.
    * Add the following variables, replacing the placeholder values with your actual credentials:

    ```env
    # MongoDB Connection String from Atlas
    MONGO_URI="mongodb+srv://<user>:<password>@cluster..."

    # Twilio Credentials
    TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    TWILIO_AUTH_TOKEN="your_auth_token_here"
    TWILIO_WHATSAPP_NUMBER="whatsapp:+14155238886"
    ```

5.  **Start the server**
    ```sh
    npm start
    ```
    Your application should now be running on `http://localhost:3000`.

---

## 🚀 Deployment

This application is deployed on **Render**. The live deployment on Render is configured for continuous integration. A new build is automatically triggered upon every push to the `main` branch. All sensitive credentials, such as API keys and database URIs, are securely managed as Environment Variables in the Render dashboard, not in the code.

---

## 🗺️ Future Roadmap

* [ ] **User Authentication:** Implement a login system to support multiple users.
* [ ] **Advanced Analytics:** Add a dedicated reports page with charts for sales trends and product performance.
* [ ] **Automated Cron Jobs:** Create a scheduled task to send all pending payment reminders automatically every morning.
* [ ] **PDF Invoice Generation:** Add a feature to generate and download PDF invoices for orders.

---

## 🙏 Acknowledgements

A special thanks to my professors and mentors for their guidance and support throughout this project.
