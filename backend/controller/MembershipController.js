const MembershipModel = require('../model/Membership');
const UserModel = require('../model/User');

const createPlan = async (req, res) => {
    try {
        const plan = new MembershipModel(req.body);
        await plan.save();
        res.status(201).json({ message: "Plan created successfully", plan });
    } catch (err) {
        res.status(500).json({ message: "Error creating plan", error: err.message });
    }
};

const getAllPlans = async (req, res) => {
    try {
        const plans = await MembershipModel.find();

        const plansWithStats = await Promise.all(plans.map(async (plan) => {
            const subscribersCount = await UserModel.countDocuments({ membership: plan._id, membershipStatus: 'Active' });

            // Approximate revenue (monthly revenue from active subscribers)
            const revenue = subscribersCount * plan.price;

            return {
                ...plan.toObject(),
                id: plan._id,
                totalSubscribers: subscribersCount,
                revenue: revenue
            };
        }));

        res.status(200).json(plansWithStats);
    } catch (err) {
        res.status(500).json({ message: "Error fetching plans", error: err.message });
    }
};

const updatePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await MembershipModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Plan updated", plan });
    } catch (err) {
        res.status(500).json({ message: "Error updating plan", error: err.message });
    }
};

const deletePlan = async (req, res) => {
    try {
        const { id } = req.params;
        await MembershipModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Plan deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting plan", error: err.message });
    }
};

const togglePlanStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await MembershipModel.findById(id);
        if (!plan) return res.status(404).json({ message: "Plan not found" });

        plan.isActive = !plan.isActive;
        await plan.save();
        res.status(200).json({ message: "Status updated", plan });
    } catch (err) {
        res.status(500).json({ message: "Error updating status", error: err.message });
    }
};

const getAllSubscriptions = async (req, res) => {
    try {
        const users = await UserModel.find({ membership: { $ne: null } }).populate('membership');

        const subscriptions = users.map(user => {
            if (!user.membership) return null;
            return {
                id: user._id,
                userId: user._id,
                userName: user.name,
                userEmail: user.email,
                userPhone: user.phone,
                planName: user.membership.planName,
                planType: user.membership.planType,
                startDate: user.membershipStartDate,
                endDate: user.membershipEndDate,
                status: user.membershipStatus,
                ordersUsed: user.ordersUsed,
                saladsPerWeek: user.membership.saladsPerWeek
            };
        }).filter(sub => sub !== null);

        res.status(200).json(subscriptions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching subscriptions", error: err.message });
    }
};

const updateSubscriptionStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { status } = req.body; // Active, Expired, Cancelled

        if (!['Active', 'Expired', 'Cancelled'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.membershipStatus = status;
        await user.save();

        res.status(200).json({ message: "Subscription status updated", status: user.membershipStatus });
    } catch (err) {
        res.status(500).json({ message: "Error updating subscription", error: err.message });
    }
};

module.exports = {
    createPlan,
    getAllPlans,
    updatePlan,
    deletePlan,
    togglePlanStatus,
    getAllSubscriptions,
    updateSubscriptionStatus
};
