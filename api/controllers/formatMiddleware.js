function convertToCSV(data) {
    const headers = Object.keys(data[0]).join(',') + '\n';
  
    const rows = data.map(row => {
      return Object.values(row).join(',') + '\n';
    });
  
    return headers + rows.join('');
}
function convert_singleToCSV(data) {
    const headers = Object.keys(data).join(',') + '\n';
  
    const row =Object.values(data).map((value) =>{ if(Array.isArray(value)){return convertToCSV(value)} else return value}).join(',') + '\n';
  
    return headers + row;
}

const formatMiddleware = (req, res, next) => {
    const { format } = req.query
    if (format === 'csv'){
        // Set the appropriate content type for CSV
        res.setHeader('Content-Type', 'text/csv');
        // Override the res.send function to send CSV data
        res.send = (data) => {
            if(data.length>=0){
            const csvData = convertToCSV(data);
            res.end(csvData);}
            else{
            const csvData = convert_singleToCSV(data);
            res.end(csvData);
            }
        }
    }
    else if(format === 'json'){
        res.setHeader('Content-Type', 'application/json');
    }
    next();
}

module.exports = formatMiddleware;
  