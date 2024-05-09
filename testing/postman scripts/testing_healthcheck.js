// Test 1: Check if the response time is less than 200ms
pm.test("Response time is less than 200ms", function () {
    // Check if the response time is below 200ms
    pm.expect(pm.response.responseTime).to.be.below(200);
});

// Test 2: Check if the response status code is 200 OK
pm.test("Response status code is 200 OK", function () {
    pm.expect(pm.response.code).to.equal(200);
});


//JSON//

// Test 1: Check if the response Content-Type is application/json
pm.test("Response Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

// Test 2: Check if the "status" field is present in the response
pm.test("Status field is present in the response", function () {
    // Extract response data as JSON
    const responseData = pm.response.json();
    // Ensure that the "status" field exists
    pm.expect(responseData.status).to.exist;
});

// Test 3: Check if the "status" field is not empty
pm.test("Status field should not be empty", function () {
    // Extract response data as JSON
    const responseData = pm.response.json();
    
    // Ensure that the response data is an object
    pm.expect(responseData).to.be.an('object');
    // Check if "status" exists and is not empty
    pm.expect(responseData.status).to.exist.and.to.not.be.empty;
});

// Test 4: Check if the "dataconnection" field is not empty
pm.test("Dataconnection field should not be empty", function () {
    // Extract response data as JSON
    const responseData = pm.response.json();
    // Ensure that the response data is an object
    pm.expect(responseData).to.be.an('object');
    // Check if "dataconnection" exists and has a length of at least 1
    pm.expect(responseData.dataconnection).to.exist.and.to.have.lengthOf.at.least(1, "Value should not be empty");
});


// Test 6: Check if the response has the required fields - status and dataconnection
pm.test("Response has the required fields - status and dataconnection", function () {
    // Extract response data as JSON
    const responseData = pm.response.json();
    
    // Ensure that the response data is an object
    pm.expect(responseData).to.be.an('object');
    // Check if "status" and "dataconnection" fields exist
    pm.expect(responseData).to.have.property('status');
    pm.expect(responseData).to.have.property('dataconnection');
});

// Test 7: Check if "status" is a non-empty string
pm.test("Status is a non-empty string", function () {
    // Extract response data as JSON
    const responseData = pm.response.json();
    
    // Ensure that the response data is an object
    pm.expect(responseData).to.be.an('object');
    // Check if "status" is a string and not empty
    pm.expect(responseData.status).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty");
});

// Test 8: Check if "dataconnection" is not null or undefined
pm.test("Dataconnection is not null or undefined", function () {
    // Extract response data as JSON
    const responseData = pm.response.json();
    
    // Ensure that the response data is an object
    pm.expect(responseData).to.be.an('object');
    // Check if "dataconnection" is not null or undefined
    pm.expect(responseData.dataconnection).to.not.be.null.and.to.not.be.undefined;
});


//CSV//

// Test 1: Check if the response Content-Type is text/csv when format is csv
pm.test("Content-Type header is text/csv when format is csv", function () {
    // Check if the "format" query parameter is present in the request URL
    const formatQueryParam = pm.request.url.query.get('format');

    // If "format" is present and set to "csv", ensure the Content-Type is text/csv
    if (formatQueryParam && formatQueryParam.toLowerCase() === 'csv') {
        pm.expect(pm.response.headers.get("Content-Type")).to.include("text/csv");
    } 
});


// Test 4: Check if the "status" field is present in the response
pm.test("Status field is present in the response", function () {
    // Extract response data as CSV
    const responseData = pm.response.text().split('\n')[1].split(',');
    // Ensure that the "status" field exists
    pm.expect(responseData[0]).to.exist;
});

// Test 5: Check if the "status" field is not empty
pm.test("Status field should not be empty", function () {
    // Extract response data as CSV
    const responseData = pm.response.text().split('\n')[1].split(',');
    // Check if "status" exists and is not empty
    pm.expect(responseData[0]).to.not.be.empty;
});

// Test 6: Check if the "dataconnection" field is not empty
pm.test("Dataconnection field should not be empty", function () {
    // Extract response data as CSV
    const responseData = pm.response.text().split('\n')[1].split(',');
    // Check if "dataconnection" exists and has a length of at least 1
    pm.expect(responseData[1]).to.not.be.empty;
});

// Test 7: Check if "status" is a non-empty string
pm.test("Status is a non-empty string", function () {
    // Extract response data as CSV
    const responseData = pm.response.text().split('\n')[1].split(',');
    // Check if "status" is a string and not empty
    pm.expect(responseData[0]).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty");
});

// Test 8: Check if "dataconnection" is not null or undefined
pm.test("Dataconnection is not null or undefined", function () {
    // Extract response data as CSV
    const responseData = pm.response.text().split('\n')[1].split(',');
    // Check if "dataconnection" is not null or undefined
    pm.expect(responseData[1]).to.not.be.null.and.to.not.be.undefined;
});