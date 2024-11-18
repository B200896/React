exports.calculateMatchScore = (resumeData, jobDescription) => {
    const jobKeywords = jobDescription.toLowerCase().split(/[\s,]+/);  // Split on spaces and commas
    const resumeContent = JSON.stringify(resumeData).toLowerCase();
    let matchCount = 0;

    jobKeywords.forEach(keyword => {
        if (resumeContent.includes(keyword)) {
            matchCount++;
        }
    });

    const matchScore = Math.min(100, (matchCount / jobKeywords.length) * 100);
    return Math.round(matchScore);  // Return as a percentage
};