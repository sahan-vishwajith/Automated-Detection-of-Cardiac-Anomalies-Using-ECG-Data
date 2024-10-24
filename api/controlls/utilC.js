import Patient from "../models/patient.js";
import Doctor from "../models/doctor.js";
import Predictions from "../models/predictions.js";

export const processPredictions = async (req, res, next) => {
    const pid = req.body.patientId; 
    const prediction = req.body.medical;
    const date = req.body.date

    try {
        const patient = await Patient.findOneAndUpdate(
            { idNumber: pid }, 
            { $push: { medicalHistory: `${prediction} - (${date})`}},
            { new: true } // This option returns the modified document
        );

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const newPrediction = new Predictions({
            prediciton:prediction,
            date: date,
            gender:patient.gender,
            district:patient.district,
            patientBday:patient.bday
        })
        await newPrediction.save()

        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
};

export const getTotalDocCount = async (req,res,next)=>{
    try {
        const doctorCount = await Doctor.countDocuments({});
        res.status(200).json({ totalDocCount: doctorCount });
      } catch (error) {
        next(error);
      }
};

export const getTotalPatientCount = async (req,res,next)=>{
    try {
        const patientCount = await Doctor.countDocuments({});
        res.status(200).json({ totalPatientCount: patientCount });
      } catch (error) {
        next(error);
      }
}

export const getPredictionComposition = async (req,res,next)=>{
    try {
        // Perform aggregation to count occurrences of each prediction name
        const predictionCounts = await Predictions.aggregate([
          {
            // Group by the prediction field and count occurrences
            $group: {
              _id: "$prediction", // Group by the 'prediction' field
              count: { $sum: 1 }  // Count each occurrence
            }
          },
          {
            // Only return the counts for the specific prediction names you are interested in
            $match: {
              _id: { $in: [
                "Atrial premature", 
                "Left bundle branch block", 
                "Paced", 
                "Premature ventricular contraction", 
                "Right bundle branch block", 
                "Ventricular escape", 
                "Normal"
              ]}
            }
          }
        ]);
    
        // Transform the result into a more readable format
        const formattedResult = predictionCounts.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {});
    
        // Send the formatted result as a response
        res.status(200).json({ predictionComposition: formattedResult});
      } catch (error) {
        // Handle any errors that occur
        next(error);
      }
}