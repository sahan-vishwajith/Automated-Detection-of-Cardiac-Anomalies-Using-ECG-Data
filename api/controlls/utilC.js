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
            prediction:prediction,
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

export const getGenderComposition = async(req,res,next)=>{
  try {
    const genderComposition = await Patient.aggregate([
      {
        $group: {
          _id: "$gender",  // Group by gender
          count: { $sum: 1 } // Count the number of documents for each gender
        }
      }
    ]);

    // Transform the result to a more readable format if needed
    const composition = {
      male: genderComposition.find(g => g._id === 'Male')?.count || 0,
      female: genderComposition.find(g => g._id === 'Female')?.count || 0
    };
    res.status(200).json({ composition});
  } catch (error) {
    next(error);
  }
}

export const getDistrictComposition = async (req,res,next)=>{
  try {
    const districtData = await Patient.aggregate([
      {
        $group: {
          _id: "$district",       
          count: { $sum: 1 }        
        }
      }
    ]);

    // Convert the aggregation result into an object where district names are keys
    const districtComposition = districtData.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});
    res.status(200).json(districtComposition);
  } catch (error) {
    next(error); 
  }
}
