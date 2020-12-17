# paypal-django
A sample wildlife support app to demonstrate the integration of payment gateway in Django.

### Installation

1 - Setup the Project

```bash
git clone https://github.com/ashutosh-874/paypal-django.git
cd paypal-django
```

2 - Activate Virual Environment

```bash
python -m venv venv
.\venv\Scripts\activate
```

3 - Install requirements

```bash
pip install -r requirements.txt
```

4 - Runserver on port 8000

```bash
python manage.py runserver
    
http://127.0.0.1:8000/
```

5 - Additional Setup

In order to acheive the paypal functionality, create your own App at https://developer.paypal.com/developer/applications and put its 'client id' in 'donate/templates/donate/home.html' at marked location.
For the email functionality, enter your Gmail credentials in projects' settings.py file.

![Screenshot](thumbnail(ws).png)
