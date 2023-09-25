import express, { response } from "express";
import Form from "../models/forms.js";

const router = express.Router();


//route to add form data
router.post("/add", async (req, res) => {
  try {
    
    // Extract data from the request body
    const { name, email, contact, education, age, gender } = req.body;

    // Create a new instance of the Form model with the submitted data
    const formData = new Form({
      name,
      email,
      contact,
      education,
      age,
      gender,
    });

    // Save the form data to the database
    await formData.save();

    res.status(201).json({
      message: "Form data submitted successfully",
      data: formData, // Include the submitted data in the response
    });
  } catch (error) {
    console.error("Error submitting form data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// route to retrieve all form data
router.get("/all", async (req, res) => {
    try {
      // Fetch all form data from the database
      const allFormData = await Form.find();
  
      res.status(200).json({
        message: "Successfully retrieved all form data",
        data: allFormData,
      });
    } catch (error) {
      console.error("Error retrieving form data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  


// Get a specific product by ID
router.get('/:id', async (req, res) => {
  try {
      const data = await Form.findById(req.params.id);
      if (!data) {
          return res.status(404).json({ message: 'Data not found' });
      }
      res.json(data);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});



//route to edit form data
router.put("/edit/:id", async (req, res) => {
    try {
      const formId = req.params.id; // Extract the ID from the URL parameters
      const updatedData = req.body; // Extract the updated data from the request body
  
      // Find the form data by ID and update it
      const updatedFormData = await Form.findByIdAndUpdate(
        formId,
        updatedData,
        { new: true } // Set { new: true } to return the updated document
      );
  
      if (!updatedFormData) {
        return res.status(404).json({ message: "Form data not found" });
      }
  
      res.status(200).json({
        message: "Form data updated successfully",
        data: updatedFormData,
      });
    } catch (error) {
      console.error("Error updating form data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

  //route to delete form data by ID
router.delete("/delete/:id", async (req, res) => {
    try {
      const formId = req.params.id; // Extract the ID from the URL parameters
  
      // Find the form data by ID and delete it
      const deletedFormData = await Form.findByIdAndDelete(formId);
  
      if (!deletedFormData) {
        return res.status(404).json({ message: "Form data not found" });
      }
  
      res.status(200).json({
        message: "Form data deleted successfully",
        data: deletedFormData,
      });
    } catch (error) {
      console.error("Error deleting form data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  


export const formRouter = router;