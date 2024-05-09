// Test 1: Check if the response time is less than 200ms
pm.test("Response time is less than 200ms", function () {
    // Check if the response time is below 200ms
    pm.expect(pm.response.responseTime).to.be.below(200);
});

// Test 2: Check if the response status code is 200
pm.test("Response status code is 200", function () {
    pm.expect(pm.response.code).to.equal(200);
});


//JSON///////////

// Test 3: Check if NamePoster is either null or a valid URL
pm.test("NamePoster is either null or a valid URL", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.namePoster).to.satisfy((value) => {
        return value === null || (typeof value === 'string' && value.match(/^http(s)?:\/\/.+/) !== null);
    });
});

// Test 4: Check if Birth Year is a valid year
pm.test("Birth Year is a valid year", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.birthYr).to.be.a('number').and.to.be.above(0);
});

// Test 5: Check if Death Year is either null or a valid year
pm.test("Death Year is either null or a valid year", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.deathYr).to.satisfy((value) => {
        return value === null || (typeof value === 'number' && value > responseData.birthYr);
    });
});

// Test 6: Check if Profession is a non-empty string and contains valid values
pm.test("Profession is a non-empty string and contains valid values", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.profession).to.be.a('string').and.to.have.lengthOf.at.least(1, "Profession should not be empty");
    pm.expect(responseData.profession.split(',')).to.include.members(['music_department', 'soundtrack', 'composer']);
});

// Test 7: Check if NameTitles array is present and contains expected number of elements
pm.test("NameTitles array is present and contains expected number of elements", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.nameTitles).to.exist.and.to.be.an('array');
    pm.expect(responseData.nameTitles).to.have.lengthOf.at.least(1, "NameTitles array should have at least one element");
});

// Test 8: Check if response content type is application/json
pm.test("Response content type is application/json", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
});

// Test 9: Check if the response has the required fields
pm.test("Response has the required fields", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.nameID).to.exist;
    pm.expect(responseData.name).to.exist;
});

//CSV//////////////

// Test 3: Check if NamePoster is either null or a valid URL (CSV format)
pm.test("NamePoster is either null or a valid URL (CSV format)", function () {
    const responseData = pm.response.text().split('\n');

    // Assuming the structure of the response
    const namePoster = responseData[1].split(',')[2]; // 3rd field is 'namePoster'
    if (namePoster) {
        pm.expect(namePoster).to.satisfy((value) => {
            return value === 'null' || (typeof value === 'string' && value.match(/^http(s)?:\/\/.+/) !== null);
        });
    }
});

// Test 4: Check if Birth Year is a valid year (CSV format)
pm.test("Birth Year is a valid year (CSV format)", function () {
    const responseData = pm.response.text().split('\n');

    // Assuming the structure of the response
    const birthYear = responseData[1].split(',')[3]; // 4th field is 'birthYr'
    if (birthYear) {
        pm.expect(Number(birthYear)).to.be.a('number').and.to.be.above(0);
    }
});

// Test 5: Check if Death Year is either null or a valid year (CSV format)
pm.test("Death Year is either null or a valid year (CSV format)", function () {
    const responseData = pm.response.text().split('\n');

    // Assuming the structure of the response
    const deathYear = responseData[1].split(',')[4]; // 5th field is 'deathYr'
    if (deathYear) {
        pm.expect(Number(deathYear)).to.satisfy((value) => {
            return value === 'null' || (typeof value === 'number' && value > Number(responseData[1].split(',')[3])); // Assuming birthYr is present
        });
    }
});



// Test 7: Check if NameTitles array is present and contains expected number of elements (CSV format)
pm.test("NameTitles array is present and contains expected number of elements (CSV format)", function () {
    const responseData = pm.response.text().split('\n');

    // Assuming the structure of the response
    const nameTitles = responseData[1].split(',')[6]; // 7th field is 'nameTitles'
    if (nameTitles) {
        const nameTitlesArray = nameTitles.split('\n');
        pm.expect(nameTitlesArray).to.be.an('array');
        pm.expect(nameTitlesArray).to.have.lengthOf.at.least(1, "NameTitles array should have at least one element");
    }
});

// Test 8: Check if response content type is text/csv
pm.test("Response content type is text/csv for CSV response", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('text/csv');
});

// Test 9: Check if the response has the required fields for CSV response
pm.test("Response has the required fields for CSV response", function () {
    const responseData = pm.response.text();

    // Assuming the structure of the CSV response
    pm.expect(responseData).to.include('nameID,name,namePoster,birthYr,deathYr,profession,nameTitles');
});

