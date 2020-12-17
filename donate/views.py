from django.http import HttpResponse
from django.views.generic import TemplateView
import json
from django.conf import settings
from django.core.mail import EmailMessage

# Create your views here.
class HomeView(TemplateView):
    template_name = "donate/home.html"


from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa

def render_to_pdf(template_src, context_dict={}):
    template = get_template(template_src)
    html  = template.render(context_dict)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
    if not pdf.err:
        return result.getvalue()
    return None

def sendMail(request):

    if request.method =='POST':
        data = json.loads(request.body)
        name = data['form']['name']
        email = data['form']['email']
        amount = data['form']['amount']

        subject = "Transaction Successful"
        message = 'Hi '+ name + ', We are really thankful for you support towards wildlife. Please find the attached invoice below.'
        emails = [email,]
        mail = EmailMessage(subject, message, settings.EMAIL_HOST_USER, emails)


        data = {
            'name': name,
            'amount': amount
        }
        pdf = render_to_pdf('donate/invoice.html', data)
        mail.attach('invoice.pdf', pdf, 'application/pdf')

        try:
            mail.send(fail_silently = False)
            print('mail sent')
            return HttpResponse("Mail Sent")
            
        except:
            print('mail not sent')
            return HttpResponse("Mail Not Sent")