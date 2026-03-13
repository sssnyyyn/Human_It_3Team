const pool = require('../config/db');
const geminiService = require('../services/geminiService');
const fs = require('fs');

exports.uploadReport = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: '파일이 업로드되지 않았습니다.' });
    }

    const { year } = req.body;
    if (!year) {
        return res.status(400).json({ success: false, message: '검진 연도를 입력해주세요.' });
    }

    try {
        // 1. Get user info for better AI analysis
        const [users] = await pool.query('SELECT birth_date, gender FROM users WHERE id = ?', [req.user.id]);
        const user = users[0];
        const age = new Date().getFullYear() - new Date(user.birth_date).getFullYear();

        // 2. AI Analysis
        const analysisResults = await geminiService.analyzeHealthReport(
            req.file.path,
            req.file.mimetype,
            { age, gender: user.gender }
        );

        const { healthRecord, aiReport } = analysisResults;

        // 3. Save to health_data
        const [existingData] = await pool.query(
            'SELECT id FROM health_data WHERE user_id = ? AND exam_year = ?',
            [req.user.id, year]
        );

        let healthDataId;
        const healthDataFields = {
            user_id: req.user.id,
            exam_year: year,
            waist: healthRecord.waist,
            blood_pressure_s: healthRecord.bpSys,
            blood_pressure_d: healthRecord.bpDia,
            fasting_glucose: healthRecord.glucose,
            tg: healthRecord.tg,
            hdl: healthRecord.hdl,
            ldl: healthRecord.ldl,
            ast: healthRecord.ast,
            alt: healthRecord.alt,
            gamma_gtp: healthRecord.gammaGtp,
            bmi: healthRecord.bmi,
            health_score: aiReport.healthScore,
            source_type: 'ocr'
        };

        if (existingData.length > 0) {
            healthDataId = existingData[0].id;
            await pool.query('UPDATE health_data SET ? WHERE id = ?', [healthDataFields, healthDataId]);
        } else {
            const [result] = await pool.query('INSERT INTO health_data SET ?', [healthDataFields]);
            healthDataId = result.insertId;
        }

        // 4. Save to ai_reports
        const aiReportFields = {
            user_id: req.user.id,
            health_data_id: healthDataId,
            exam_year: year,
            summary: aiReport.summary,
            medical_recommendation: aiReport.medicalRecommendation,
            risk_overview: JSON.stringify(aiReport.riskOverview),
            organ_heart_status: aiReport.organStatus.heart,
            organ_liver_status: aiReport.organStatus.liver,
            organ_pancreas_status: aiReport.organStatus.pancreas,
            organ_abdomen_status: aiReport.organStatus.abdomen,
            organ_vessels_status: aiReport.organStatus.vessels,
            analysis_precision: 100 // Mock precision
        };

        const [existingReport] = await pool.query(
            'SELECT id FROM ai_reports WHERE user_id = ? AND exam_year = ?',
            [req.user.id, year]
        );

        if (existingReport.length > 0) {
            await pool.query('UPDATE ai_reports SET ? WHERE id = ?', [aiReportFields, existingReport[0].id]);
        } else {
            await pool.query('INSERT INTO ai_reports SET ?', [aiReportFields]);
        }

        // Cleanup: remove file after processing (optional, depends on policy)
        // fs.unlinkSync(req.file.path);

        return res.json({
            success: true,
            message: '리포트 분석 및 저장이 완료되었습니다.',
            data: analysisResults
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'AI 분석 중 오류가 발생했습니다.' });
    }
};

exports.getYears = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT DISTINCT exam_year FROM health_data WHERE user_id = ? ORDER BY exam_year DESC',
            [req.user.id]
        );
        const availableYears = rows.map(r => r.exam_year);
        return res.json({
            success: true,
            data: {
                availableYears,
                latestYear: availableYears[0] || null
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: '연도 조회 중 오류가 발생했습니다.' });
    }
};

exports.getHealthReport = async (req, res) => {
    const { year } = req.query;
    if (!year) return res.status(400).json({ success: false, message: '연도를 지정해주세요.' });

    try {
        const [hdRows] = await pool.query(
            'SELECT * FROM health_data WHERE user_id = ? AND exam_year = ?',
            [req.user.id, year]
        );
        if (hdRows.length === 0) return res.status(404).json({ success: false, message: '해당 연도의 데이터가 없습니다.' });

        const [arRows] = await pool.query(
            'SELECT * FROM ai_reports WHERE user_id = ? AND exam_year = ?',
            [req.user.id, year]
        );

        return res.json({
            success: true,
            data: {
                healthRecord: hdRows[0],
                aiReport: arRows[0] ? {
                    ...arRows[0],
                    riskOverview: JSON.parse(arRows[0].risk_overview || '[]')
                } : null
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: '데이터 조회 중 오류가 발생했습니다.' });
    }
};
