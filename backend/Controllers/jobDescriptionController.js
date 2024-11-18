const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL; // Your Supabase URL
const supabaseKey = process.env.SUPABASE_KEY; // Your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);


// Function to match resume with job descriptions
exports.jobDescriptionMatch = async (req, res) => {
    try{
        const { data: jobDescriptions, error } = await supabase
      .from('Job_descriptions') // Table name
      .select('*') // Column to select
      

    if (error) {
      return res.status(500).json({ message: 'Error fetching job descriptions', error });
    }

    // You now have all the job descriptions in the 'jobDescriptions' variable.
    console.log('Job Descriptions:', jobDescriptions);
    res.status(200).json({ message: 'Job descriptions fetched successfully', jobDescriptions });
    }
    catch (err) {
        console.error('Error in jobDescriptionMatch:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
      }
};