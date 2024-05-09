import subprocess
import pytest

def run_cli_command(command):
    result = subprocess.run(
        command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        shell=True
    )
    return result.stdout.strip(), result.returncode


#######################SUCCESSFUL COMMANDS########################3

def test_login_successful():
    login_command = f'.\\se2352.bat login --username "Steve Koutentakis" --email stevekoutentakis@gmail.com --passw password'

    output, returncode = run_cli_command(login_command)
    assert 'Login successful' in output
    assert returncode == 0  # Assuming a successful exit code


def test_logout_successful():

    login_command = f'.\\se2352.bat login --username "Steve Koutentakis" --email stevekoutentakis@gmail.com --passw password'

    output, returncode = run_cli_command(login_command)

    logout_command = f'.\\se2352.bat logout'

    output, returncode = run_cli_command(logout_command)
    assert 'Logout successful' in output
    assert returncode == 0  # Assuming a successful exit code



def test_adduser_successful():
    adduser_command = f'.\\se2352.bat adduser --username "New" --email new@gmail.com --passw new'

    output, returncode = run_cli_command(adduser_command)
    assert 'User inserted/updated successfully' in output
    assert returncode == 0  # Assuming a successful exit code

# Add more test functions for other CLI commands...
    

def test_healthcheck_successful():
    
    # Run login command before testing healthcheck
    admin_login_command = f'.\\se2352.bat login --username "Steve Koutentakis" --email stevekoutentakis@gmail.com --passw password'
    run_cli_command(admin_login_command)

    healthcheck_command = '.\\se2352.bat healthcheck'
    output, returncode = run_cli_command(healthcheck_command)

    assert 'Healthcheck successful' in output
    assert returncode == 0  # Assuming a successful exit code  



def test_searchtitle_successful():
    
    # Run login command before testing healthcheck
    admin_login_command = f'.\\se2352.bat login --username "Steve Koutentakis" --email stevekoutentakis@gmail.com --passw password'
    run_cli_command(admin_login_command)

    healthcheck_command = '.\\se2352.bat searchtitle --titlepart Grand'
    output, returncode = run_cli_command(healthcheck_command)

    assert 'Request successful' in output
    assert returncode == 0  # Assuming a successful exit code 



def test_searchname_csv_successful():
    
    # Run login command before testing healthcheck
    user_login_command = f'.\\se2352.bat login --username "A" --email a@gmail.com --passw a'
    run_cli_command(user_login_command)

    healthcheck_command = '.\\se2352.bat searchname --name james --format csv'
    output, returncode = run_cli_command(healthcheck_command)

    assert 'Request successful' in output
    assert returncode == 0  # Assuming a successful exit code 

def test_nameID_successful():
    
    # Run login command before testing healthcheck
    user_login_command = f'.\\se2352.bat login --username "A" --email a@gmail.com --passw a'
    run_cli_command(user_login_command)

    healthcheck_command = '.\\se2352.bat name --nameid nm0000035'
    output, returncode = run_cli_command(healthcheck_command)

    assert 'Name found' in output
    assert returncode == 0  # Assuming a successful exit code 

def test_titleID_successful():
    
    # Run login command before testing healthcheck
    user_login_command = f'.\\se2352.bat login --username "A" --email a@gmail.com --passw a'
    run_cli_command(user_login_command)

    titleID_command = '.\\se2352.bat title --titleid tt0000929'
    output, returncode = run_cli_command(titleID_command)

    assert 'Title found' in output
    assert returncode == 0  # Assuming a successful exit code 

def test_byGenre_successful():
    
    # Run login command before testing healthcheck
    user_login_command = f'.\\se2352.bat login --username "A" --email a@gmail.com --passw a'
    run_cli_command(user_login_command)

    byGenre_command = '.\\se2352.bat bygenre --genre drama --minrating 8.6 --yrFrom 1990 --yrTo 1991'
    output, returncode = run_cli_command(byGenre_command)

    assert 'Request successful' in output
    assert returncode == 0  # Assuming a successful exit code 


def test_user_successful():
    
    # Run login command before testing healthcheck
    admin_login_command = f'.\\se2352.bat login --username "Steve Koutentakis" --email stevekoutentakis@gmail.com --passw password'
    run_cli_command(admin_login_command)

    healthcheck_command = '.\\se2352.bat user --username jorge'
    output, returncode = run_cli_command(healthcheck_command)

    assert 'Request successful' in output
    assert returncode == 0  # Assuming a successful exit code 


#however after 1st run they are duplicate entries unless for newnames
def test_uploads_successful():

    # Run login command before testing healthcheck
    admin_login_command = f'.\\se2352.bat login --username "Steve Koutentakis" --email stevekoutentakis@gmail.com --passw password'
    run_cli_command(admin_login_command)

    # List of upload endpoint scope names
    upload_scopes = ['newakas', 'newnames']

    # Υποθέτουμε ότι ο φάκελος test_admin_endpoints βρίσκεται στο ίδιο directory με τον κώδικα
    upload_filenames = ['./test_admin_endpoints/titleakas_test.txt',
                        './test_admin_endpoints/namebasics_test.txt']

    for scope, filename in zip(upload_scopes, upload_filenames):
        upload_command = f'.\\se2352.bat {scope} --filename {filename}'
        output, returncode = run_cli_command(upload_command)

        assert 'Upload successful' in output
        assert returncode == 0  # Assuming a successful exit code

#################ERROR COMMANDS#################################
        
def test_login_unsuccessful():
    invalid_login_command = '.\\se2352.bat login --username "InvalidUser" --email invalid@example.com --passw invalidpassword'
    output, returncode = run_cli_command(invalid_login_command)
    assert 'not authorized' in output.lower()
    assert returncode == 0  # Assuming  exit code for failure

def test_healthcheck_no_admin():
    
    # Run login command before testing healthcheck
    user_login_command = f'.\\se2352.bat login --username "A" --email a@gmail.com --passw a'
    run_cli_command(user_login_command)

    healthcheck_command = '.\\se2352.bat healthcheck'
    output, returncode = run_cli_command(healthcheck_command)

    assert 'No admin authorization' in output
    assert returncode == 0  # Assuming a successful exit code 

def test_no_login():
    logout_command = f'.\\se2352.bat logout'
    output, returncode = run_cli_command(logout_command)
    
    searchtitle_command = '.\\se2352.bat searchtitle --titlepart Grand'
    output, returncode = run_cli_command(searchtitle_command)

    assert 'LOGIN REQUIRED' in output
    assert returncode == 0  # Assuming a successful exit code 


def test_duplicate_entries():
   
    # Run login command before testing healthcheck
    admin_login_command = f'.\\se2352.bat login --username "Steve Koutentakis" --email stevekoutentakis@gmail.com --passw password'
    run_cli_command(admin_login_command)

    # List of upload endpoint scope names
    upload_scopes = ['newtitles', 'newcrew', 'newepisode', 'newprincipals', 'newratings']

    # Υποθέτουμε ότι ο φάκελος test_admin_endpoints βρίσκεται στο ίδιο directory με τον κώδικα
    upload_filenames = ['./test_admin_endpoints/titlebasics_test.txt',
                        './test_admin_endpoints/titlecrew_test.txt',
                        './test_admin_endpoints/titleepisode_test.txt',
                        './test_admin_endpoints/titleprincipals_test.txt',
                        './test_admin_endpoints/titleratings_test.txt',
]

    duplicate_entries = ['tt9999999', 't9999', 't999999', 't9999999', 't999999']

    for scope, filename, duplicate in zip(upload_scopes, upload_filenames, duplicate_entries):
        upload_command = f'.\\se2352.bat {scope} --filename {filename}'
        output, returncode = run_cli_command(upload_command)

        assert 'Upload failed: 500 Internal Server Error' in output
        assert "'status': 'failed'" in output
        assert "'message': 'Error uploading file'" in output
        assert f"'error': \"Duplicate entry '{duplicate}' for key 'PRIMARY'\"" in output
        assert returncode == 0  # Assuming a successful exit code for the CLI command


if __name__ == '__main__':
    pytest.main()