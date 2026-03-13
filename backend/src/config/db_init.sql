-- carelink/backend/src/config/db_init.sql

-- users table
CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(50) NOT NULL,
  birth_date DATE NOT NULL,
  gender ENUM('M','F') NOT NULL,
  phone VARCHAR(20) NULL,
  login_option ENUM('none','keep','save_id') DEFAULT 'none',
  email_verified TINYINT(1) DEFAULT 0,
  email_change_token VARCHAR(6) NULL,
  email_change_pending VARCHAR(255) NULL,
  email_token_expires DATETIME NULL,
  marketing_agreed TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- health_data table
CREATE TABLE IF NOT EXISTS health_data (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  exam_year INT NOT NULL,
  examined_at DATE NULL,

  height DECIMAL(5,2) NULL COMMENT 'cm',
  weight DECIMAL(5,2) NULL COMMENT 'kg',
  waist DECIMAL(5,2) NULL COMMENT 'cm',

  blood_pressure_s DECIMAL(5,1) NULL COMMENT '수축기',
  blood_pressure_d DECIMAL(5,1) NULL COMMENT '이완기',

  fasting_glucose DECIMAL(6,2) NULL COMMENT 'mg/dL',
  tg DECIMAL(6,2) NULL COMMENT 'mg/dL',
  hdl DECIMAL(6,2) NULL COMMENT 'mg/dL',
  ldl DECIMAL(6,2) NULL COMMENT 'mg/dL',

  ast DECIMAL(6,2) NULL,
  alt DECIMAL(6,2) NULL,
  gamma_gtp DECIMAL(6,2) NULL,

  hba1c DECIMAL(4,2) NULL,
  egfr DECIMAL(6,2) NULL,
  hemoglobin DECIMAL(5,2) NULL,

  bmi DECIMAL(5,2) NULL,
  health_score INT NULL,

  source_type ENUM('manual','ocr','api') DEFAULT 'manual',
  ocr_confidence DECIMAL(5,2) NULL,
  verification_status ENUM('pending','verified','corrected') DEFAULT 'pending',

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_health_data_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  UNIQUE KEY uq_user_exam_year (user_id, exam_year)
);

-- ai_reports table
CREATE TABLE IF NOT EXISTS ai_reports (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  health_data_id BIGINT NOT NULL,
  exam_year INT NOT NULL,

  summary TEXT NULL,
  medical_recommendation TEXT NULL,
  risk_overview TEXT NULL,

  organ_heart_status ENUM('normal','borderline','risk','unknown') DEFAULT 'unknown',
  organ_liver_status ENUM('normal','borderline','risk','unknown') DEFAULT 'unknown',
  organ_pancreas_status ENUM('normal','borderline','risk','unknown') DEFAULT 'unknown',
  organ_abdomen_status ENUM('normal','borderline','risk','unknown') DEFAULT 'unknown',
  organ_vessels_status ENUM('normal','borderline','risk','unknown') DEFAULT 'unknown',

  analysis_precision DECIMAL(5,2) NULL,
  warning_items_count INT DEFAULT 0,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_ai_reports_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_ai_reports_health_data
    FOREIGN KEY (health_data_id) REFERENCES health_data(id)
    ON DELETE CASCADE,
  UNIQUE KEY uq_ai_report_year (user_id, exam_year)
);

-- action_plans table
CREATE TABLE IF NOT EXISTS action_plans (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  health_data_id BIGINT NOT NULL,
  exam_year INT NOT NULL,

  diet_plan TEXT NULL,
  exercise_plan TEXT NULL,
  medical_guidance TEXT NULL,

  plan_status ENUM('active','archived') DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_action_plans_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_action_plans_health_data
    FOREIGN KEY (health_data_id) REFERENCES health_data(id)
    ON DELETE CASCADE
);

-- chatbot_history table
CREATE TABLE IF NOT EXISTS chatbot_history (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  exam_year INT NULL,
  role ENUM('user','assistant') NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_chatbot_history_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

-- contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NULL,
  name VARCHAR(100),
  email VARCHAR(255),
  message TEXT,
  status ENUM('pending','done') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  content TEXT,
  rating TINYINT(1),
  is_public TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
