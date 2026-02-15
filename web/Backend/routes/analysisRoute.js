const express = require('express');
const { analyzeGeneral, analyzeXray, analyzeRetinopathy, analyzeSkin, simplifyAnalysis } = require('../controller/analysisController');
const router = express.Router();

router.route('/analysis/general').post(analyzeGeneral);
router.route('/analysis/xray').post(analyzeXray);
router.route('/analysis/retinopathy').post(analyzeRetinopathy);
router.route('/analysis/skin').post(analyzeSkin);
router.route('/analysis/simplify').post(simplifyAnalysis);

module.exports = router;
