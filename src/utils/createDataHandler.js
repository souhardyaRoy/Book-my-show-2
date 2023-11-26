const handleCreateDataError = (error) => {
    if (error.code === 11000) {
        // Extract the duplicate field from the error message
        const duplicateField = Object.keys(error.keyValue)[0];
        return `Duplicate data found for field: ${duplicateField}`;
    } else if (error.name === 'ValidationError') {
        // Extract the mandatory field from the error message
        const mandatoryField = Object.keys(error.errors)[0];
        return `Mandatory field missing: ${mandatoryField}`;
    }
    return error.message;
};
 
module.exports = { handleCreateDataError };
