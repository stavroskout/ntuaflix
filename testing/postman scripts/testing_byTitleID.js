// Test 1: Check if the response time is less than 200ms
pm.test("Response time is less than 200ms", function () {
    // Check if the response time is below 200ms
    pm.expect(pm.response.responseTime).to.be.below(200);
});

// Test 2: Check if the response status code is 200
pm.test("Response status code is 200", function () {
    pm.expect(pm.response.code).to.equal(200);
});

// Test 3: Check if TitlePoster is either null or a valid URL
pm.test("TitlePoster is either null or a valid URL", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.titlePoster).to.satisfy((value) => {
        return value === null || (typeof value === 'string' && value.match(/^http(s)?:\/\/.+/) !== null);
    });
});

// Test 4: Check if Genres array is present and has the expected number of elements
pm.test("Genres array is present and has expected number of elements", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.genres).to.exist.and.to.be.an('array');
    pm.expect(responseData.genres).to.have.lengthOf.at.least(1, "Genres array should have at least one element");
});

// Test 5: Check if TitleAkas array is present
pm.test("TitleAkas array is present and contains expected number of elements", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.titleAkas).to.exist.and.to.be.an('array');
});

// Test 6: Check if response content type is application/json
pm.test("Response content type is application/json", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
});

// Test 7: Check if the response has the required fields
pm.test("Response has the required fields", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.titleID).to.exist;
    pm.expect(responseData.type).to.exist;
    pm.expect(responseData.originalTitle).to.exist;
    pm.expect(responseData.startYear).to.exist;
    pm.expect(responseData.genres).to.exist.and.to.be.an('array');
});

// Test 8: Check if OriginalTitle is a non-empty string
pm.test("OriginalTitle is a non-empty string", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.originalTitle).to.be.a('string').and.to.have.lengthOf.at.least(1, "OriginalTitle should not be empty");
});

// Test 9: Check if Principals array is present and contains at least one element
pm.test("Principals array is present and contains at least one element", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.principals).to.exist.and.to.be.an('array').that.is.not.empty;
});

// Test 10: Check if Rating object has non-negative avRating and nVotes properties
pm.test("Rating object has non-negative avRating and nVotes properties", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.rating).to.exist.and.to.be.an('object');
    pm.expect(responseData.rating.avRating).to.exist.and.to.be.at.least(0);
    pm.expect(responseData.rating.nVotes).to.exist.and.to.be.at.least(0);
});

// Test 11: Check if Name in principals array must be a non-empty string
pm.test("Name in principals array must be a non-empty string", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.principals).to.be.an('array');
    responseData.principals.forEach(function (principal) {
        pm.expect(principal.name).to.be.a('string').and.to.have.lengthOf.at.least(1, "Name should not be empty");
    });
});

//CSV

// Test 6: Check if response content type is text/csv
pm.test("Response content type is text/csv for CSV response", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('text/csv');
});

// Test 7: Check if the response has the required fields for CSV response
pm.test("Response has the required fields for CSV response", function () {
    const responseData = pm.response.text();

    // Add CSV-specific assertions based on the actual structure of your CSV response
    pm.expect(responseData).to.include('titleID,type,originalTitle,titlePoster,startYear,endYear,genres,titleAkas,principals,rating');
});

