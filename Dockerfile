FROM python
LABEL name "my-docker-deployment"
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 5000
RUN python manage.py runserver