# 🏥 CuraNova – AI-Powered Medical Tools Platform

CuraNova is an AI-driven platform designed to empower **medical students**, **researchers**, and **healthcare professionals** with intelligent, domain-specific tools.
It brings together advanced **Natural Language Processing (NLP)** models, secure web infrastructure, and user-friendly interfaces to help users work efficiently with medical information.

Currently, CuraNova includes two specialized tools:

* **CuraChat** – An AI medical assistant with Retrieval-Augmented Generation (RAG).
* **[CuraScan](https://disease-extraction-system.vercel.app/)** – A disease term extraction and highlighting tool powered by BioBERT.

---

## 📌 Platform Overview

CuraNova acts as a **central hub** that provides:

* A secure, authenticated environment for users.
* A dashboard to access and launch AI-powered medical tools.
* A unified design and branding for a consistent user experience.
* Clear navigation between tools without forcing users to manage multiple logins.

The platform focuses on **speed, reliability, and privacy**, ensuring medical data is handled responsibly.

---

## ✨ Features

### **1. Unified Medical AI Workspace**

* All tools accessible from a single interface.
* No need to juggle multiple apps — CuraNova keeps them in one place.

### **2. Secure User Authentication**

* Email/password signup and login system.
* JWT-based authentication with secure, HTTP-only cookies.
* Encrypted password storage using **bcrypt**.
* Hosted on **Render (backend)** + **Vercel (frontend)** + **MongoDB Atlas** for reliability and scalability.

### **3. Tool: CuraChat – AI Medical Assistant**

* **Two Modes**:

  * **Docs-Only Mode (RAG):** Answers strictly from uploaded PDFs/DOCX using **Jina v3 embeddings** + **ChromaDB** vector store.
  * **General Medical Mode:** Provides concise answers to general medical questions without requiring documents.
* **Medical Upload Guard:** LLM-based classifier to ensure only relevant medical documents are processed.
* **Chat History Logging:** Stores conversations and context in MongoDB for continuity.
* **Use Cases:**

  * Extract guidelines from research papers.
  * Quickly answer clinical questions from a literature set.
  * Maintain context-aware, follow-up conversations.

### **4. Tool: CuraScan – Disease Term Extractor**

* Powered by **fine-tuned BioBERT** (`Ishan0612/biobert-ner-disease-ncbi`).
* Detects and highlights **disease mentions** in biomedical text and PDFs.
* **High Accuracy Metrics**:

  * Accuracy: **98.64%**
  * F1-Score: **89.04%**
  * Precision: **86.80%**
  * Recall: **91.39%**
* **PDF & Text Support** – Process documents or paste raw text.
* Ideal for:

  * Rapid literature review.
  * Annotating research datasets.
  * Medical education & exam preparation.

### **5. Cloud-Native & Accessible Anywhere**

* **Frontend Hosting:** Vercel (Next.js) and Streamlit Cloud.
* **Backend Hosting:** Render and Hugging Face Spaces.
* **Zero Local Setup:** All tools run fully in the browser.
* **Mobile-Friendly UI** for on-the-go usage.

---

## 🛡 Security & Privacy

CuraNova is built with **data security** as a top priority:

* Encrypted database storage for sensitive information.
* Secure cookies with HTTPS in production.
* No storage of uploaded documents beyond what’s needed for processing.
* No raw passwords stored — only bcrypt hashes.
* JWT tokens signed with strong secrets.

---

## 📜 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.


