const express = require('express');
const router = express.Router();
const MembershipController = require('../controller/MembershipController');

router.post('/create', MembershipController.createPlan);
router.get('/all', MembershipController.getAllPlans);
router.put('/update/:id', MembershipController.updatePlan);
router.delete('/delete/:id', MembershipController.deletePlan);
router.put('/toggle-status/:id', MembershipController.togglePlanStatus);
router.get('/subscriptions', MembershipController.getAllSubscriptions);
router.put('/update-status/:userId', MembershipController.updateSubscriptionStatus);

module.exports = router;
