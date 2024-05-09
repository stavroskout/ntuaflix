// Test 1: Check if the response time is less than 200ms
pm.test("Response time is less than 200ms", function () {
    // Check if the response time is below 200ms
    pm.expect(pm.response.responseTime).to.be.below(200);
});

// Test 1: Check if the response status code is 200 when names are found
pm.test("Response status code is 200 when names are found", function () {
    pm.expect(pm.response.code).to.equal(200);
});

// Test 2: Check if the response status code is 204 when no names are found
pm.test("Response status code is 204 when no names are found", function () {
    pm.expect(pm.response.code).to.equal(204);
});

//JSON////////////////

// Test 3: Check if the response has the expected structure
pm.test("Response has the expected structure", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('array');
    if (responseData.length > 0) {
        const firstResult = responseData[0];
        pm.expect(firstResult).to.have.property('nameID');
        pm.expect(firstResult).to.have.property('name');
        pm.expect(firstResult).to.have.property('namePoster');
        pm.expect(firstResult).to.have.property('birthYr');
        pm.expect(firstResult).to.have.property('deathYr');
        pm.expect(firstResult).to.have.property('profession');
        pm.expect(firstResult).to.have.property('nameTitles').that.is.an('array');
    }
});

// Test 4: Check if NamePoster is either null or a valid URL
pm.test("NamePoster is either null or a valid URL", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('array');
    responseData.forEach(function (item) {
        pm.expect(item.namePoster).to.satisfy((value) => {
            return value === null || (typeof value === 'string' && value.match(/^http(s)?:\/\/.+/) !== null);
        });
    });
});

// Test 4: Check if Birth Year is either null or a valid year
pm.test("Birth Year is either null or a valid year", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('array');
    responseData.forEach(function (item) {
        pm.expect(item.birthYr).to.satisfy((value) => {
            return value === null || (typeof value === 'number' && value > 0);
        }, "Birth Year should be either null or a valid year");
    });
});


// Test 6: Check if Death Year is either null or a valid year
pm.test("Death Year is either null or a valid year", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('array');
    responseData.forEach(function (item) {
        pm.expect(item.deathYr).to.satisfy((value) => {
            return value === null || (typeof value === 'number' && value > item.birthYr);
        });
    });
});


// Test 8: Check if NameTitles array is present and contains expected number of elements
pm.test("NameTitles array is present and contains expected number of elements", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('array');
    responseData.forEach(function (item) {
        pm.expect(item.nameTitles).to.exist.and.to.be.an('array');
    });
});

// Test 9: Check if response content type is application/json
pm.test("Response content type is application/json", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
});

//CSV//////////////////

// Test 3: Check if the response has the expected header fields (CSV format)
pm.test("CSV response has the expected header fields", function () {
    const responseData = pm.response.text().split('\n');

    // Assuming the structure of each item in the response array
    const headerLine = responseData[0];
    if (headerLine) {
        const fields = headerLine.split(',');

        pm.expect(fields).to.have.lengthOf.at.least(7, "CSV should have at least 7 fields");
        pm.expect(fields[0]).to.equal('nameID');
        pm.expect(fields[1]).to.equal('name');
        pm.expect(fields[2]).to.equal('namePoster');
        pm.expect(fields[3]).to.equal('birthYr');
        pm.expect(fields[4]).to.equal('deathYr');
        pm.expect(fields[5]).to.equal('profession');
        pm.expect(fields[6]).to.equal('nameTitles');
    }
});


// Test 4: Check if NamePoster is either null or a valid URL
pm.test("NamePoster is either null or a valid URL", function () {
    const responseData = pm.response.text().trim().split('\n');

    pm.expect(responseData).to.be.an('array');
    responseData.slice(1).forEach(function (line) {
        const values = line.split(',');
        const namePoster = values[2];
        pm.expect(namePoster).to.satisfy((value) => {
            return value === '' || (typeof value === 'string' && value.match(/^http(s)?:\/\/.+/) !== null);
        });
    });
});

// Test 4: Check if Birth Year is either null or a valid year
pm.test("Birth Year is either null or a valid year", function () {
    const responseData = pm.response.text().trim().split('\n');

    pm.expect(responseData).to.be.an('array');
    responseData.slice(1).forEach(function (line) {
        const values = line.split(',');
        const birthYear = values[3];
        pm.expect(birthYear).to.satisfy((value) => {
            return value === '' || (!isNaN(value) && value > 0);
        }, "Birth Year should be either null or a valid year");
    });
});


// Test 6: Check if Death Year is either null or a valid year
pm.test("Death Year is either null or a valid year", function () {
    const responseData = pm.response.text().trim().split('\n');

    pm.expect(responseData).to.be.an('array');
    responseData.slice(1).forEach(function (line) {
        const values = line.split(',');
        const deathYear = values[4];
        pm.expect(deathYear).to.satisfy((value) => {
            return value === '' || (typeof value === 'number' && value > birthYear);
        });
    });
});

// Test 8: Check if NameTitles array is present and contains expected number of elements
pm.test("NameTitles array is present and contains expected number of elements", function () {
    const responseData = pm.response.text().trim().split('\n');

    pm.expect(responseData).to.be.an('array');
    responseData.slice(1).forEach(function (line) {
        const values = line.split(',');
        const nameTitles = values[6];
        pm.expect(nameTitles).to.exist.and.to.be.a('string');
    });
});

// Test 9: Check if response content type is text/csv
pm.test("Response content type is text/csv", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('text/csv');
});

