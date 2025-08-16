# 🏥 CuraNova – AI-Powered Medical Tools Platform

CuraNova is an AI-driven platform built to empower **medical students**, **researchers**, and **healthcare professionals** with intelligent, domain-specific tools.

It combines advanced **Natural Language Processing (NLP)**, secure web infrastructure, and intuitive interfaces to help users work more efficiently with medical information.

Currently, CuraNova includes two specialized tools:

* **CuraChat** – An AI medical assistant with Retrieval-Augmented Generation (RAG).
* **[CuraScan](https://disease-extraction-system.vercel.app/)** – A disease term extraction and highlighting tool powered by BioBERT.

---

## 📌 Platform Overview

CuraNova acts as a **central hub** that provides:

* Secure, authenticated access for users.
* A unified dashboard to launch AI-powered medical tools.
* Consistent design and branding for a seamless experience.
* Smooth navigation between tools without juggling multiple logins.

The platform focuses on **speed, reliability, and privacy**, ensuring medical data is always handled responsibly.

---

## ✨ Features

### 1. Unified Medical AI Workspace

* Access multiple AI tools from a single interface.
* Eliminate the need to manage multiple separate applications.

### 2. Secure User Authentication

* Email/password signup and login system.
* **JWT-based authentication** with HTTP-only cookies.
* Encrypted password storage using **bcrypt**.
* Hosting: **Render (backend)** + **Vercel (frontend)** + **MongoDB Atlas**.

### 3. Tool: **CuraChat – AI Medical Assistant**

* **Two Modes**:

  * **Docs-Only Mode (RAG):** Answers strictly from uploaded PDFs/DOCX using **Jina v3 embeddings** + **ChromaDB** vector store.
  * **General Medical Mode:** Provides concise answers to general medical questions without requiring documents.
* **Medical Upload Guard:** LLM-based classifier to filter only relevant medical documents.
* **Chat History Logging:** Stores conversations in MongoDB for continuity.

**Use Cases**:

* Extract guidelines from research papers.
* Quickly answer clinical questions from uploaded literature.
* Maintain context-aware follow-up conversations.

#### 🛠 Tech Stack (CuraChat – Backend)

⚡ **FastAPI** – REST API framework
🚀 **Uvicorn** – ASGI server
🔗 **LangChain** – RAG pipeline (retrievers, prompts, chains)
📂 **ChromaDB** – Local vector store for embeddings
🧠 **Jina Embeddings v3** – Document embeddings
🤖 **Groq LLMs** – `llama-3.1-8b-instant` (fast), `llama-3.1-70b-versatile` (optional)
📄 **PyPDF / Docx2txt** – PDF & DOCX loaders
🗄 **MongoDB Atlas** – Chat logs & document registry
✅ **Pydantic** – Typed models & validation
🔑 **python-dotenv** – Environment variable management
📦 **pymongo** – MongoDB driver

---

### 4. Tool: **CuraScan – Disease Term Extractor**

* Powered by **fine-tuned BioBERT** (`Ishan0612/biobert-ner-disease-ncbi`).
* Detects and highlights **disease mentions** in biomedical text and PDFs.
* **Performance Metrics**:

  * Accuracy: **98.64%**
  * F1-Score: **89.04%**
  * Precision: **86.80%**
  * Recall: **91.39%**
* **PDF & Text Support** – Process research papers or paste raw text.

**Use Cases**:

* Rapid literature review.
* Annotating research datasets.
* Medical education & exam preparation.

#### ⚙️ Tech Stack (CuraScan)

* **Backend:** FastAPI (Hugging Face Spaces)
* **NLP:** Fine-tuned BioBERT for Disease NER
* **PDF Processing:** PyMuPDF
* **Deployment:** Vercel + Hugging Face Spaces (Docker)

---

## 🛡 Security & Privacy

CuraNova is built with **data security** as a top priority:

* Encrypted database storage for sensitive data.
* Secure cookies with HTTPS in production.
* Uploaded documents are **not stored long-term** — only for processing.
* Passwords stored only as **bcrypt hashes**, never in plaintext.
* JWT tokens signed with strong secrets.

---

## 🌐 Tech Stack (CuraNova Website)

### **Frontend**

* ⚛ **Next.js (App Router)** – React framework for website & dashboard
* 🎨 **Tailwind CSS + DaisyUI** – Styling and responsive UI
* 🧩 **Custom Components** – Header, Footer, Hero, ValueGrid, Product Cards
* 🔐 **Next.js Server Components** – Reads cookies & handles session state
* 🌐 **API Helper (lib/api.js)** – Centralized communication with backend

### **Backend**

* ⚡ **FastAPI** – REST API for authentication
* 🚀 **Uvicorn** – ASGI server
* 🔑 **bcrypt** – Password hashing
* 🔒 **JWT (PyJWT)** – Secure authentication tokens
* 📦 **Motor (async MongoDB driver)** – Database access
* 📄 **Pydantic** – Request/response validation

### **Database**

* 🗄 **MongoDB Atlas** – Stores user accounts & sessions

### **Deployment**

* ☁️ **Vercel** – Hosts the Next.js frontend
* ☁️ **Render** – Hosts the FastAPI backend
* ☁️ **MongoDB Atlas** – Cloud database

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---