import argparse
import requests
import json
import csv
import os

# Create a session object
#session = requests.Session()

API_BASE_URL = 'https://localhost:9876/ntuaflix_api'

CERT_PATH = ('./server.pem')  # Tuple containing certificate and private key paths

def save_credentials_to_config_file(user_cookie, admin_cookie):
    config_file_path = 'config.ini'

    # Save user_cookie and admin_cookie to the configuration file
    with open(config_file_path, 'w') as config_file:
        config_file.write(f'USER_COOKIE={user_cookie}\n')
        if admin_cookie:
            config_file.write(f'ADMIN_COOKIE={admin_cookie}\n')

def clear_credentials_from_config_file():
    config_file_path = 'config.ini'

    # Clear the contents of the configuration file
    with open(config_file_path, 'w'):
        pass


def load_credentials_from_config_file():
    config_file_path = 'config.ini'

    # Load token and user_role from the configuration file
    if os.path.exists(config_file_path):
        with open(config_file_path, 'r') as config_file:
            lines = config_file.readlines()
            token = None
            user_role = None

            for line in lines:
                if 'USER_COOKIE' in line:
                    token = line.split('=')[1].strip()
                elif 'ADMIN_COOKIE' in line:
                    user_role = line.split('=')[1].strip()

            return token, user_role

    return None, None


# Define the login function
def login(username, email, password, format='json'):

    params = {'format': format}

    url = f'https://localhost:9876/login/{username}/{email}/{password}'  # Construct the URL with parameters  # Replace with the appropriate login endpoint URL

    try:
        response = requests.post(url, verify=False, params=params)
        

        if response.status_code == 200:
            print('Login successful.')
            # If the format is CSV, let the API handle the conversion
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())

            # Extract 'user_cookie' and 'admin_cookie' from the response body
            user_cookie = response.json().get('user_cookie')
            admin_cookie = response.json().get('admin_cookie')

            # Save cookies to the configuration file
            save_credentials_to_config_file(user_cookie, admin_cookie)

        elif response.status_code == 400:
            print('Not Authorized')
        else:
            print('Login failed.')
            # If the format is CSV, let the API handle the conversion
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())

        # Print or inspect session cookies after login
        #print('Session cookies after login:', session.cookies)

    except requests.exceptions.RequestException as e:
        print(f'Login failed: {e}')

#Υλοποιήθηκε ως κανονικό και όχι admin request
def adduser(username, email, pwd, format='json'):
    params = {'format': format}

    url = f'https://localhost:9876/signup/{username}/{email}/{pwd}'

    try:
        response = requests.post(url, params=params, verify=False)

        if response.status_code == 200:
            print('User inserted/updated successfully.')

            # If the format is CSV, let the API handle the conversion
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())

        else:
            print(f'Request failed with status code {response.status_code}.')
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())

    except requests.exceptions.RequestException as e:
        print(f'Request failed: {e}')

def logout(format='json', cookie=None):

    headers = {'user_cookie': cookie}
    params = {'format': format}

    url = 'https://localhost:9876/ntuaflix_api/logout'  # Replace with the appropriate logout endpoint URL

    try:
        response = requests.post(url, verify=False, headers = headers, params=params, cookies = {'user_cookie': cookie})
        response.raise_for_status()

        if response.status_code == 200:
            clear_credentials_from_config_file()

            print('Logout successful.')
            # If the format is CSV, let the API handle the conversion
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())
        else:
            print('Logout failed.')
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())

    except requests.exceptions.RequestException as e:
        print(f'Logout failed: {e}')

def healthcheck(format='json', cookie=None, adm_cookie=None):

    headers = {'user_cookie': cookie, 'admin_cookie': adm_cookie}
    params = {'format': format}

    response = requests.get(f'{API_BASE_URL}/admin/healthcheck', params=params, verify=False, headers=headers, cookies={'user_cookie': cookie, 'admin_cookie': adm_cookie})
    if response.status_code == 200:
        print('Healthcheck successful.')
        # If the format is CSV, let the API handle the conversion
        if params.get('format', '').lower() == 'csv':
            print(response.text)
        else:
            print(response.json())

    else:
        print('Healthcheck failed.')

def users(username, format='json', cookie=None, adm_cookie=None):
    headers = {'user_cookie': cookie, 'admin_cookie': adm_cookie}
    params = {'format': format}

    url = f'{API_BASE_URL}/admin/users/{username}'

    try:
        response = requests.get(url, params=params, verify=False, headers=headers, cookies={'user_cookie': cookie, 'admin_cookie': adm_cookie})

        if response.status_code == 200:
            print('Request successful.')

            # If the format is CSV, let the API handle the conversion
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())

        elif response.status_code == 204:
            print('No data returned.')
        else:
            print(f'Request failed with status code {response.status_code}.')
            # If the format is CSV, let the API handle the conversion
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())


    except requests.exceptions.RequestException as e:
        print(f'Request failed: {e}')

def upload_file(api_endpoint, filename, format='json', cookie=None, adm_cookie=None):
    headers = {'user_cookie': cookie, 'admin_cookie': adm_cookie}
    params = {'format': format}

    url = f'{API_BASE_URL}/admin/upload/{api_endpoint}'  # Replace with the correct API endpoint

    with open(filename, 'rb') as file:
        files = {'file': file}
        response = requests.post(url, files=files, params=params, verify=False, headers=headers, cookies={'user_cookie': cookie, 'admin_cookie': adm_cookie})

    try:
        #response.raise_for_status()  # Raise an HTTPError for bad responses (4xx or 5xx)
        
        if response.status_code == 200:
            print('Upload successful.')

            # If the format is CSV, let the API handle the conversion
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())

        elif response.status_code == 400:
            print('Upload failed - Data error.')
            # If the format is CSV, let the API handle the conversion
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())


        elif response.status_code == 500:
            print('Upload failed: 500 Internal Server Error')
            # If the format is CSV, let the API handle the conversion
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())


    except requests.exceptions.RequestException as e:
        print(f'Upload failed: {e}')

def newtitles(filename, format='json', cookie=None, adm_cookie=None):
    upload_file('titlebasics', filename, format=format, cookie=cookie, adm_cookie=adm_cookie)

def newakas(filename, format='json', cookie=None, adm_cookie=None):
    upload_file('titleakas', filename, format=format, cookie=cookie, adm_cookie=adm_cookie)

def newnames(filename, format='json', cookie=None, adm_cookie=None):
    upload_file('namebasics', filename, format=format, cookie=cookie, adm_cookie=adm_cookie)

def newcrew(filename, format='json', cookie=None, adm_cookie=None):
    upload_file('titlecrew', filename, format=format, cookie=cookie, adm_cookie=adm_cookie)

def newepisode(filename, format='json', cookie=None, adm_cookie=None):
    upload_file('titleepisode', filename, format=format, cookie=cookie, adm_cookie=adm_cookie)

def newprincipals(filename, format='json', cookie=None, adm_cookie=None):
    upload_file('titleprincipals', filename, format=format, cookie=cookie, adm_cookie=adm_cookie)

def newratings(filename, format='json', cookie=None, adm_cookie=None):
    upload_file('titleratings', filename, format=format, cookie=cookie, adm_cookie=adm_cookie)

def searchname(name, cookie, format='json'):
    headers = {'user_cookie': cookie}
    params = {'format': format}

    url = f'{API_BASE_URL}/searchname'
    payload = {'nqueryObject': {'namePart': name}}

    try:
        response = requests.get(url, params=params, json=payload, verify=False, headers=headers, cookies={'user_cookie': cookie})

        if response.status_code == 200:
            print('Request successful.')

            # If the format is CSV, let the API handle the conversion
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())

        elif response.status_code == 204:
            print('Name not found.')
        else:
            print(f'Request failed with status code {response.status_code}.')
            print(response.json())

    except requests.exceptions.RequestException as e:
        print(f'Request failed: {e}')


def searchtitle(titlepart, format='json', cookie=None):
    
    headers = {'user_cookie': cookie}
    params = {'format': format}  # Pass the format as a query parameter

    url = f'{API_BASE_URL}/searchtitle'

    payload = {'tqueryObject': {'titlePart': titlepart}}

    try:
        response = requests.get(url, params=params, json=payload, verify=False, headers=headers, cookies={'user_cookie': cookie})
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx or 5xx)
        
        if response.status_code == 200:
            print('Request successful.')

            # If the format is CSV, let the API handle the conversion
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())

        elif response.status_code == 204:
            print('Title not found.')
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())
        else:
            print(f'Request failed with status code {response.status_code}.')
            print(response.json())
            
    except requests.exceptions.RequestException as e:
        print(f'Request failed: {e}')

def name(nameID, cookie, format='json'):

    headers = {'user_cookie': cookie}
    params = {'format': format}  # Pass the format as a query parameter

    url = f'{API_BASE_URL}/name/{nameID}'
    
    try:
        response = requests.get(url, params=params, verify=False, headers=headers, cookies={'user_cookie': cookie})
        response.raise_for_status()

        if response.status_code == 200:
            print('Request successful.')

            # If the format is CSV, let the API handle the conversion
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())

        elif response.status_code == 204:
            print('Name not found.')
            
        else:
            print(f'Request failed with status code {response.status_code}.')
            print(response.json())

    except requests.exceptions.RequestException as e:
        print(f'Request failed: {e}')

def title(titleID, cookie, format='json'):

    headers = {'user_cookie': cookie}
    params = {'format': format}  # Pass the format as a query parameter

    url = f'{API_BASE_URL}/title/{titleID}'
    
    try:
        response = requests.get(url, params=params, verify=False, headers=headers, cookies={'user_cookie': cookie})
        
     
        if response.status_code == 200:
            print('Request successful.')

            # If the format is CSV, let the API handle the conversion
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())

        elif response.status_code == 204:
            print('Title not found.')
           
        else:
            print(f'Request failed with status code {response.status_code}.')
            print(response.json())

    except requests.exceptions.RequestException as e:
        print(f'Request failed: {e}')

def bygenre(genre, minrating, yrFrom=None, yrTo=None, format='json', cookie=None):
    headers = {'user_cookie': cookie}
    params = {'format': format}
    
    url = f'{API_BASE_URL}/bygenre'

    payload = {'gqueryObject': {'qgenre': genre, 'minrating': minrating, 'yrFrom': yrFrom, 'yrTo': yrTo}}

    try:
        response = requests.get(url, json=payload, params=params, verify=False, headers=headers, cookies={'user_cookie': cookie})

        if response.status_code == 200:
            print('Request successful.')

            # If the format is CSV, let the API handle the conversion
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())

        elif response.status_code == 204:
            print('No titles found for the specified criteria.')
        else:
            print(f'Request failed with status code {response.status_code}.')
            if params.get('format', '').lower() == 'csv':
                print(response.text)
            else:
                print(response.json())

    except requests.exceptions.RequestException as e:
        print(f'Request failed: {e}')

def main():
    
    parser = argparse.ArgumentParser(description='CLI for se2352')
    subparsers = parser.add_subparsers(dest='scope', required=True)

# Healthcheck subparser
    healthcheck_parser = subparsers.add_parser('healthcheck')
    healthcheck_parser.add_argument('--format', type=str, choices=['json', 'csv'], default='json', help='Format of the output')

    # Subparser for 'login'
    login_parser = subparsers.add_parser('login')
    login_parser.add_argument('--username', type=str, required=True, help='Username for login')
    login_parser.add_argument('--email', type=str, required=True, help='Email for login')
    login_parser.add_argument('--passw', type=str, required=True, help='Password for login')
    login_parser.add_argument('--format', type=str, choices=['json', 'csv'], default='json', help='Format of the output')

    # Subparser for 'login'
    adduser_parser = subparsers.add_parser('adduser')
    adduser_parser.add_argument('--username', type=str, required=True, help='Username for login')
    adduser_parser.add_argument('--email', type=str, required=True, help='Email for login')
    adduser_parser.add_argument('--passw', type=str, required=True, help='Password for login')
    adduser_parser.add_argument('--format', type=str, choices=['json', 'csv'], default='json', help='Format of the output')

    logout_parser = subparsers.add_parser('logout')
    logout_parser.add_argument('--format', type=str, choices=['json', 'csv'], default='json', help='Format of the output')

    # Subparser for 'users'
    user_parser = subparsers.add_parser('user')
    user_parser.add_argument('--username', type=str, required=True, help='Username for the users endpoint')
    user_parser.add_argument('--format', type=str, choices=['json', 'csv'], default='json', help='Format of the output')

    # Subparser for searchtitle
    searchtitle_parser = subparsers.add_parser('searchtitle')
    searchtitle_parser.add_argument('--titlepart', type=str, help='Title part for the searchtitle endpoint')
    searchtitle_parser.add_argument('--format', type=str, choices=['json', 'csv'], default='json', help='Format of the output')

    searchname_parser = subparsers.add_parser('searchname')
    searchname_parser.add_argument('--name', type=str, help='Name part for the searchname endpoint')
    searchname_parser.add_argument('--format', type=str, choices=['json', 'csv'], default='json', help='Format of the output')

    # Subparser for name
    name_parser = subparsers.add_parser('name')
    name_parser.add_argument('--nameid', type=str, help='Name ID for the bynameID endpoint')
    name_parser.add_argument('--format', type=str, choices=['json', 'csv'], default='json', help='Format of the output')

    # Subparser for name
    title_parser = subparsers.add_parser('title')
    title_parser.add_argument('--titleid', type=str, help='Title ID for the bytitleID endpoint')
    title_parser.add_argument('--format', type=str, choices=['json', 'csv'], default='json', help='Format of the output')

    # Subparser for bygenre
    bygenre_parser = subparsers.add_parser('bygenre')
    bygenre_parser.add_argument('--genre', type=str, required=True, help='Genre for the bygenre endpoint')
    bygenre_parser.add_argument('--minrating', type=float, required=True, help='Minimum rating for the bygenre endpoint')
    bygenre_parser.add_argument('--yrFrom', type=int, help='Starting year for the bygenre endpoint')
    bygenre_parser.add_argument('--yrTo', type=int, help='Ending year for the bygenre endpoint')
    bygenre_parser.add_argument('--format', type=str, choices=['json', 'csv'], default='json', help='Format of the output')

    # Subparsers for file upload commands
    upload_scopes = ['newtitles', 'newakas', 'newnames', 'newcrew', 'newepisode', 'newprincipals', 'newratings']
    for scope in upload_scopes:
        upload_parser = subparsers.add_parser(scope)
        upload_parser.add_argument('--filename', type=argparse.FileType('rb'), required=True, help='Path to the file for upload')
        upload_parser.add_argument('--format', type=str, choices=['json', 'csv'], default='json', help='Format of the output')


    args = parser.parse_args()

    if args.scope == 'login':
        login(args.username, args.email, args.passw, args.format)

    elif args.scope == 'adduser':
        adduser(args.username, args.email, args.passw, args.format)


    else:
        user_cookie, admin_cookie = load_credentials_from_config_file()
        #print(user_cookie, 'usr')
        #print(admin_cookie, 'adm')

        if user_cookie is None:
            print('Login requiredddd')
            return None
        
        if args.scope == 'searchtitle':
            searchtitle(args.titlepart, args.format, user_cookie)

        elif args.scope == 'searchname':
            searchname(args.name, user_cookie, args.format)

        elif args.scope == 'name':
            name(args.nameid, user_cookie, args.format)

        elif args.scope == 'title':
            title(args.titleid, user_cookie, args.format)

        elif args.scope == 'bygenre':
            bygenre(args.genre, args.minrating, args.yrFrom, args.yrTo, args.format, user_cookie)

        elif args.scope == 'logout':
            logout(args.format, user_cookie)

        elif (admin_cookie):
            if args.scope == 'healthcheck':
                healthcheck(args.format, user_cookie, admin_cookie)
            elif args.scope == 'user':
                users(args.username, args.format, user_cookie, admin_cookie)
            elif args.scope in upload_scopes:
                globals()[args.scope](args.filename.name, args.format, user_cookie, admin_cookie)

        else :
            print ("No admin authorization")


if __name__ == '__main__':
    main()