const express = require("express");
const router = express.Router();

// AI Prediction Logic (JavaScript implementation)
function predictHealth(age, bmi, sleep) {
  // Convert to numbers
  age = parseFloat(age);
  bmi = parseFloat(bmi);
  sleep = parseFloat(sleep);

  // Diabetes Risk Calculation
  let diabetesRisk = 0;
  if (age > 45) diabetesRisk += 0.2;
  if (bmi > 30) diabetesRisk += 0.3;
  else if (bmi > 25) diabetesRisk += 0.15;
  if (sleep < 6) diabetesRisk += 0.1;
  diabetesRisk = Math.min(diabetesRisk, 1.0);

  // Heart Disease Risk Calculation
  let heartRisk = 0;
  if (age > 50) heartRisk += 0.25;
  if (bmi > 28) heartRisk += 0.25;
  if (sleep < 7) heartRisk += 0.15;
  heartRisk = Math.min(heartRisk, 1.0);

  // Lifestyle Score (inverse - higher is better)
  let lifestyleScore = 1.0;
  if (bmi >= 18.5 && bmi <= 24.9) lifestyleScore = 0.9;
  else if (bmi > 30) lifestyleScore = 0.3;
  else lifestyleScore = 0.6;
  
  if (sleep >= 7 && sleep <= 9) lifestyleScore += 0.1;
  else lifestyleScore -= 0.2;
  
  lifestyleScore = Math.max(0, Math.min(1, lifestyleScore));

  // Overall Risk Score (weighted average)
  const overallRisk = (diabetesRisk * 0.35 + heartRisk * 0.45 + (1 - lifestyleScore) * 0.2);

  // Generate explanations
  let explanation = "";
  if (overallRisk > 0.6) {
    explanation = "High health risk detected. Immediate lifestyle changes recommended.";
  } else if (overallRisk > 0.3) {
    explanation = "Moderate health risk. Consider improving diet, exercise, and sleep habits.";
  } else {
    explanation = "Low health risk. Maintain your current healthy lifestyle!";
  }

  // Diabetes classification
  let diabetesLevel = "";
  if (diabetesRisk > 0.5) diabetesLevel = `High Risk - ${(diabetesRisk * 100).toFixed(0)}%`;
  else if (diabetesRisk > 0.25) diabetesLevel = `Medium Risk - ${(diabetesRisk * 100).toFixed(0)}%`;
  else diabetesLevel = `Low Risk - ${(diabetesRisk * 100).toFixed(0)}%`;

  // Heart disease classification
  let heartLevel = "";
  if (heartRisk > 0.5) heartLevel = `High Risk - ${(heartRisk * 100).toFixed(0)}%`;
  else if (heartRisk > 0.25) heartLevel = `Medium Risk - ${(heartRisk * 100).toFixed(0)}%`;
  else heartLevel = `Low Risk - ${(heartRisk * 100).toFixed(0)}%`;

  // Lifestyle classification
  let lifestyleLevel = "";
  if (lifestyleScore > 0.7) lifestyleLevel = "Excellent - Keep it up!";
  else if (lifestyleScore > 0.4) lifestyleLevel = "Good - Room for improvement";
  else lifestyleLevel = "Needs Attention - Make changes";

  return {
    risk_score: parseFloat(overallRisk.toFixed(3)),
    explanation: explanation,
    diabetes: diabetesLevel,
    heart: heartLevel,
    lifestyle: lifestyleLevel,
    age: age,
    bmi: bmi.toFixed(1),
    sleep: sleep.toFixed(1)
  };
}

router.post("/", (req, res) => {
  try {
    const { age, bmi, sleep } = req.body;

    // Validate inputs
    if (!age || !bmi || !sleep) {
      return res.status(400).json({
        error: "Missing required fields: age, bmi, sleep"
      });
    }

    // Run AI prediction
    const result = predictHealth(age, bmi, sleep);

    console.log("Prediction generated:", result);
    res.json(result);

  } catch (error) {
    console.error("Prediction error:", error);
    res.status(500).json({
      error: "Prediction failed",
      message: error.message
    });
  }
});

module.exports = router;